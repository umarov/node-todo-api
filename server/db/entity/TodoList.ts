import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  getRepository,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';
import { TodoItem } from './TodoItem';
import { User } from './User';

@Entity()
export class TodoList {
  public static create({
    title = '',
    color = 'yellow',
    completed = false,
    user
  }: Partial<TodoList>) {
    const todoList = new TodoList();
    todoList.title = title;
    todoList.color = color;
    todoList.completed = completed;

    if (user) {
      todoList.user = user;
    }

    return getRepository(TodoList).save(todoList);
  }

  public static update(todoList: TodoList, {
    title = '',
    color = 'yellow',
    completed = false,
    user
  }: Partial<TodoList>) {
    todoList.title = title;
    todoList.color = color;
    todoList.completed = completed;

    if (user) {
      todoList.user = user;
    }

    return getRepository(TodoList).save(todoList);
  }

  @PrimaryGeneratedColumn() public id: number;
  @Column('character varying', { nullable: false })
  title: string;

  @Column('character varying', { default: 'yellow' })
  color: string;

  @Column('boolean', { default: false })
  completed: boolean;

  @Column('date', { nullable: true }) completedAt: Date;

  @OneToMany(_ => TodoItem, todoItem => todoItem.todoList)
  todoItems: TodoItem[];

  @ManyToOne(_ => User, user => user.todoLists)
  user: User;

  @Column()
  @CreateDateColumn()
  public createdAt: Date;

  @Column()
  @UpdateDateColumn()
  public updatedAt: Date;

  @BeforeUpdate()
  @BeforeInsert()
  public updateCompletedAtDate() {
    if (this.completed) {
      this.completedAt = new Date();
    }
  }
}
