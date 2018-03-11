import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  getManager,
  getRepository,
  BeforeUpdate,
  BeforeInsert
} from 'typeorm';
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';

import { TodoList } from './TodoList';

@Entity()
export class User {
  public static create({ name = '', email = '', password = '' }: Partial<User>) {
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;

    return getRepository(User).save(user);
  }

  public static findByToken(token: string) {
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.userId) {
        return User.findById(decoded.userId);
      } else {
        return Promise.reject('User not found');
      }
    } catch {
      return Promise.reject('User not found');
    }
  }

  public static findById(id: number) {
    return getManager()
      .createQueryBuilder(User, 'user')
      .select(['user.id', 'user.name', 'user.email'])
      .leftJoinAndSelect('user.todoLists', 'todoList')
      .leftJoinAndSelect('todoList.todoItems', 'todoItem')
      .where('user.id = :id', { id })
      .getOne();
  }

  public static findByEmail(email: string) {
    return getRepository(User).findOne({
      where: { email }
    });
  }

  public static async findByCredentials(email: string, password: string) {
    const user = await User.findByEmail(email);

    if (!user) {
      throw new Error('Could not find an account with that email');
    } else {
      if (await user.authenticateUser(password)) {
        return user;
      } else {
        throw new Error('Password did not match');
      }
    }
  }

  @PrimaryGeneratedColumn() public id: number;
  @Column('character varying', { nullable: false })
  name: string;

  @Column('character varying', { nullable: false, unique: true })
  email: string;

  @Column('character varying', { nullable: true })
  passwordHash: string;

  @Column('character varying', { nullable: true })
  token: string;

  @OneToMany(_ => TodoList, todoList => todoList.user)
  todoLists: TodoList[];

  @Column()
  @CreateDateColumn()
  public createdAt: Date;

  @Column()
  @UpdateDateColumn()
  public updatedAt: Date;

  public password: string;

  @BeforeUpdate()
  @BeforeInsert()
  public async hashPassword() {
    const options = {
      memoryCost: 15,
      parallelism: 2,
      timeCost: 8,
      type: argon2.argon2d
    };

    if (this.password) {
      this.passwordHash = await argon2.hash(this.password, options);
      this.password = '';
    }
  }

  public authenticateUser(password: string) {
    return argon2.verify(this.passwordHash, password);
  }

  public generateAuthToken() {
    this.token = jwt.sign(
      {
        userId: this.id
      },
      process.env.JWT_SECRET,
      { expiresIn: '12 hours' }
    );

    return getRepository(User).save(this);
  }
}
