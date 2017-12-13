export class TodoItem {
  public _id: string;

  constructor(
    public text?: string,
    public completed?: boolean,
    public completedAt?: Date,
  ) {
  }
}
