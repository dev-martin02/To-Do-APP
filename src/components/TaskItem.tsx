import { useDispatch } from "react-redux";
import { removeTask, editTask } from "../store/taskSlice";

type TaskItemProps = {
  taskName: string;
  taskID: number;
};

export const TaskItem: React.FC<TaskItemProps> = ({ taskName, taskID }) => {
  //Delete this variable
  const editMode = "x";

  const dispatch = useDispatch();

  function HandleRemoveTask(taskID: number) {
    dispatch(removeTask(taskID));
  }

  function enableEditMode(x: number, y: string) {
    dispatch(
      editTask({
        taskName: "martin",
        taskID: 2,
      })
    );
    console.log(x);
    console.log(y);
  }
  return (
    <div key={Number(taskID)} className="border-2 rounded-lg p-2 ">
      {Number(editMode) === taskID ? (
        <>
          <input
            type="text"
            className="input input-bordered input-md text-lg w-full max-w-xs block mb-1"
          />
          <button className="ml-1 btn btn-sm btn-outline btn-accent">
            Update
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
            className="btn btn-xs  btn-outline btn-error"
            onClick={() => HandleRemoveTask(taskID)}
          >
            Delete
          </button>
          <button
            className=" ml-1 btn btn-xs btn-outline btn-accent"
            onClick={() => enableEditMode(taskID, taskName)}
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
};
