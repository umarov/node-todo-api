export class TodoItem {
  public id: number;

  constructor(
    public text?: string,
    public completed?: boolean,
    public completedAt?: Date,
  ) {
  }
}
