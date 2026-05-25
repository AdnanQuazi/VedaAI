import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

import { Assignment } from '../models/Assignment.model';

import { subscriber } from '../config/redisPubSub';
let io: Server;

export const initSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  // socket auth middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;

      if (!token) {
        return next(new Error('Unauthorized'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

      socket.data.user = decoded;

      next();
    } catch {
      next(new Error('Unauthorized'));
    }
  });

  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    socket.on('join-assignment', async (assignmentId: string) => {
      try {
        const assignment = await Assignment.findById(assignmentId);

        if (!assignment) return;

        // secure room join
        if (assignment.userId.toString() !== socket.data.user.id) {
          return;
        }

        socket.join(assignmentId);

        console.log(`Socket joined room ${assignmentId}`);
      } catch (error) {
        console.error(error);
      }
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.id);
    });
  });

  subscriber.subscribe('assignment-status', (err) => {
    if (err) {
      console.error('Redis subscribe error:', err);
    } else {
      console.log('Subscribed to assignment-status channel');
    }
  });

  subscriber.on('message', (channel, message) => {
    if (channel === 'assignment-status') {
      try {
        const payload = JSON.parse(message);

        io.to(payload.assignmentId).emit('assignment-status', payload);
      } catch (error) {
        console.error('Redis message parse error:', error);
      }
    }
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }

  return io;
};
