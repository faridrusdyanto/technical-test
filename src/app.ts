import express, { Application, Request, Response, NextFunction } from 'express';
import userRoutes from './routes/UserRouter';

const app: Application = express();
const port = 3000;

app.use(express.json());

app.use('/api', userRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});