import { User } from '../db/entity/User';
import { Request, Response, NextFunction } from 'express';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('X-AUTH');

  try {
    const user = await User.findByToken(token);
    if (user) {
      req.user = user;
      req.token = token;
      next();
    } else {
      res.status(401).send();
    }
  } catch (err) {
    res.status(401).send();
  }
};
