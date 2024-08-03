export default interface Task {
  id: string;
  created?: Date;
  date?: string;
  public: boolean;
  task: string;
  username: string;
}
