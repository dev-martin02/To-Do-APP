import { useSelector, useDispatch } from "react-redux";
import { removeTask, editTask, taskCompleted } from "../store/taskSlice";
import { RootState } from "../store/store";
import { useState } from "react";

type TaskItemProps = {
  taskName: string;
  taskID: number;
  completed: boolean;
};

export const TaskItem: React.FC<TaskItemProps> = ({
  taskName,
  taskID,
  completed,
}) => {
  const [editTaskText, setEditTaskText] = useState("");
  const [taskToEdit, setTaskToEdit] = useState(0);

  const dispatch = useDispatch();

  const userTasks = useSelector((state: RootState) => state.tasks.tasks);

  //Delete task
  function HandleRemoveTask(taskID: number) {
    dispatch(removeTask(taskID));
  }

  //Edit task
  function enableEditMode(taskID: number) {
    if (editTaskText) {
      dispatch(
        editTask({
          taskName: editTaskText,
          completed: false,
          taskID: taskID,
        })
      );
      setTaskToEdit(0);
    } else {
      alert("please type something");
    }
  }

  function editStage(taskID: number) {
    const taskToEdit = userTasks.find((task) => taskID === task.taskID);
    if (taskToEdit) {
      setTaskToEdit(taskID);
      setEditTaskText(taskToEdit.taskName);
    }
  }

  // mark task completed or not
  function taskProgress(event: boolean) {
    dispatch(
      taskCompleted({
        taskName: taskName,
        taskID: taskID,
        completed: event,
      })
    );
  }

  //Task card
  return (
    <div key={Number(taskID)} className="border-2 rounded-lg p-2 ">
      {/* Edit task card */}
      {Number(taskToEdit) === taskID ? (
        <>
          <input
            type="text"
            className="input input-bordered input-md text-lg w-full max-w-xs block mb-1"
            onChange={(e) => setEditTaskText(e.target.value)}
            value={editTaskText}
          />
          <button
            className="ml-1 btn btn-sm btn-outline btn-accent"
            onClick={() => enableEditMode(taskID)}
          >
            Update
          </button>
          <button
            className="ml-1 btn btn-sm btn-outline btn-error"
            onClick={() => setTaskToEdit(0)}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          {/* Task card */}
          <label className="flex gap-2 items-center">
            <input
              type="checkbox"
              onChange={(e) => taskProgress(e.target.checked)}
              className="checkbox checkbox-success text-white"
            />
            <p className={`text-xl mb-1 ${completed && "line-through"}`}>
              {taskName}
            </p>
          </label>

          <button
            className={`mr-1 btn btn-xs btn-outline btn-accent ${
              completed && "btn-disabled"
            }`}
            onClick={() => editStage(taskID)}
          >
            Edit
          </button>

          <button
            className={`btn btn-xs  btn-outline btn-error ${
              completed && "btn-disabled"
            }`}
            onClick={() => HandleRemoveTask(taskID)}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};
