import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/UserController';
import { User } from '../models/User';

const router = Router();

router.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await UserController.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/users/:id', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  try {
    const user = await UserController.getUserById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/users', async (req: Request, res: Response) => {
  const newUser: User = req.body;
  try {
    const createdUser = await UserController.createUser(newUser);
    res.status(201).json(createdUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.put('/users/:id', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const updatedUser: User = req.body;
  try {
    const user = await UserController.updateUser(userId, updatedUser);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete('/users/:id', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  try {
    const result = await UserController.deleteUser(userId);

    if (result.user) {
      res.json({message: result.message});
    } else {
      res.status(404).json({ message: result.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


export default router;
