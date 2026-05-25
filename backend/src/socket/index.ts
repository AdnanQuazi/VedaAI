import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

import { Assignment } from '../models/Assignment.model';

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

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }

  return io;
};
