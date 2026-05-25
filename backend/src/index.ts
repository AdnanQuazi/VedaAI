import http from 'http';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './config/db';
import { redisConnection } from './config/redis';
import assignmentRoutes from './routes/assignments.routes';
import './workers/generator.worker';
import './workers/pdf.worker';
import { errorHandler } from './middleware/errorHandler';
import { initSocket } from './socket';

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const port = process.env.PORT || 5000;

app.get('/', (_, res) => {
  res.send('Backend running');
});

app.use('/api/assignments', assignmentRoutes);
app.use(errorHandler);

const server = http.createServer(app);
initSocket(server);

const startServer = async () => {
  try {
    await connectDB();
    redisConnection;

    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
