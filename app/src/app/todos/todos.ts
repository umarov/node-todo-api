export class Todos {
  constructor(
    public _id?: string,
    public text?: string,
    public completed?: boolean,
    public completedAt?: Date,
    public todoListId?: string
  ) {}
}
