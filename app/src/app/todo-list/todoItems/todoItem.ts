export class TodoItem {
  public id: string;

  constructor(
    public text?: string,
    public completed?: boolean,
    public completedAt?: Date,
  ) {
  }
}
