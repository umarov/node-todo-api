import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  BeforeUpdate,
  BeforeInsert
} from 'typeorm';
import { TodoList } from './TodoList';

@Entity()
export class TodoItem {
  @PrimaryGeneratedColumn() public id: number;

  @Column('character varying', { nullable: false })
  text: string;

  @Column('boolean', { default: false })
  completed: boolean;

  @Column('date', { nullable: true })
  completedAt: Date;

  @ManyToOne(type => TodoList, todoList => todoList.todoItems)
  todoList: TodoList;

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
