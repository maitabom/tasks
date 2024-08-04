import Task from "./task";

export default interface Comment {
  id: string;
  comment: string;
  task?: Task;
  taskId?: string;
  user: string;
  name: string;
}
