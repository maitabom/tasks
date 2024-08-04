import Comment from "@/models/comment";
import Task from "@/models/task";

export default interface TaskDetailsProps {
  task: Task;
  comments: Comment[]
}
