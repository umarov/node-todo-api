import { User } from '../db/entity/User';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

const postUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });
    await user.generateAuthToken();

    res.header('X-AUTH', user.token).send({ user });
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: 'Something went wrong' });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);
    user.generateAuthToken();

    res.header('X-AUTH', user.token).send({ user, token: user.token });
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
};

const logoutUser = async (req: Request, res: Response) => {
  try {
    const { user } = req;

    await getRepository(User).update(user, { token: '' });
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
};

const showUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (user) {
      res.send({ user });
    } else {
      res.status(404).send();
    }
  } catch (err) {
    res.status(404).send();
  }
};

const getMe = async (req: Request, res: Response) => {
  res.send({ user: req.user });
};

export { postUser, loginUser, logoutUser, showUser, getMe };
