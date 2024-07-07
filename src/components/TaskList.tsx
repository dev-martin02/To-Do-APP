import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../store/taskSlice";
import { AppDispatch, RootState } from "../store/store";
import { TaskItem } from "./TaskItem";
import { useState } from "react";

type TaskListProps = {
  addTaskStage: boolean;
  setAddStage: React.Dispatch<React.SetStateAction<boolean>>;
};

//Display all the task
export const TaskList: React.FC<TaskListProps> = ({
  addTaskStage: addTaskMode,
  setAddStage,
}) => {
  // Select the state and dispatch actions
  const userTasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch<AppDispatch>();

  const [newTask, setNewTask] = useState("");

  // Add task
  function HandleAddTask() {
    if (newTask) {
      const uniqueID = Date.now();
      const taskObj = {
        taskName: newTask,
        taskID: uniqueID,
      };

      dispatch(addTask(taskObj));
      setAddStage(false);
      setNewTask("");
    } else {
      alert("Needs to type something");
      return null;
    }
  }

  // Display all the tasks
  return (
    <>
      {addTaskMode && (
        <section className="fixed top-0 left-0 w-full h-screen bg-gray-200 bg-opacity-50 flex justify-center items-center">
          <div className="border-2 p-3 m-1 flex w-96 h-40 flex-col justify-center bg-white rounded">
            <input
              type="text"
              placeholder="Please write your task"
              onChange={(e) => setNewTask(e.target.value)}
              value={newTask}
              className="block mb-2 input "
            />
            <div className="flex gap-1">
              <button
                onClick={HandleAddTask}
                className="btn btn-active btn-primary"
              >
                New Task
              </button>
              <button
                className="btn btn-error"
                onClick={() => setAddStage(!addTaskMode)}
              >
                Cancel
              </button>
            </div>
          </div>
        </section>
      )}

      <section className="flex flex-col gap-2 p-1 ">
        {userTasks.map(({ taskName, taskID }) => (
          <TaskItem taskName={taskName} taskID={taskID} />
        ))}
      </section>
    </>
  );
};
