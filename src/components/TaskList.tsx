import { useSelector } from "react-redux";
import { addTask } from "../store/taskSlice";
import { RootState } from "../store/store";
import { TaskItem } from "./TaskItem";

export function HandleAddTask(taskName: string) {
  let newTask = {
    taskName,
    taskID: 1,
  };
  addTask(newTask);
}

//Display all the task
export default function TaskList() {
  const userTasks = useSelector((state: RootState) => state.tasks.tasks);

  return (
    <section className="flex flex-col gap-2 p-1 ">
      {userTasks.map(({ taskName, taskID }) => (
        <TaskItem taskName={taskName} taskID={taskID} />
      ))}
    </section>
  );
}
