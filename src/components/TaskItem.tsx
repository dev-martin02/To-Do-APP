import { useSelector, useDispatch } from "react-redux";
import { removeTask, editTask } from "../store/taskSlice";
import { RootState } from "../store/store";
import { useState } from "react";

type TaskItemProps = {
  taskName: string;
  taskID: number;
};

export const TaskItem: React.FC<TaskItemProps> = ({ taskName, taskID }) => {
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

  //Task card
  return (
    <div key={Number(taskID)} className="border-2 rounded-lg p-2 ">
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
          <label className="flex gap-2 items-center">
            <input
              type="checkbox"
              className="checkbox checkbox-success text-white"
            />
            <p className="text-xl mb-1">{taskName}</p>
          </label>

          <button
            className=" mr-1 btn btn-xs btn-outline btn-accent"
            onClick={() => editStage(taskID)}
          >
            Edit
          </button>

          <button
            className="btn btn-xs  btn-outline btn-error"
            onClick={() => HandleRemoveTask(taskID)}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};
