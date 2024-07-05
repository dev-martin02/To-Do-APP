import { useState } from "react";
interface TaskStructure {
  taskName: string;
  taskID: number;
}

function App() {
  const [tasks, setTasks] = useState<TaskStructure[]>([]);
  const [newTask, setNewTask] = useState("");

  const [addTaskMode, setAddTaskMode] = useState(false);

  const [editMode, setEditMode] = useState("");
  const [editText, setEditText] = useState("");

  const addTask = () => {
    if (newTask) {
      const uniqueID = Date.now();
      const taskObj = {
        taskName: newTask,
        taskID: uniqueID,
      };

      setTasks([...tasks, taskObj]);
      setNewTask("");
    } else {
      console.log("Needs to type something");
      return null;
    }
  };

  const deleteTask = (id: Number) => {
    try {
      const allTask = tasks.filter(({ taskID }) => taskID !== id);
      setTasks(allTask);
    } catch (err) {
      if (err instanceof Error) {
        console.log("Oops there was an error " + err.message);
      }
    }
  };

  const editTask = (id: Number) => {
    setTasks(
      tasks.map((task) =>
        task.taskID === id ? { ...task, taskName: editText } : task
      )
    );
    setEditMode("");
  };

  const enableEditMode = (id: Number, taskName: string) => {
    const idString = String(id);
    setEditMode(idString);
    setEditText(taskName);
  };

  const TaskModeState = () => setAddTaskMode(!addTaskMode);

  return (
    <main className="md:flex md:flex-col md:items-center min-h-screen  ">
      <div className="md:w-2/6">
        {" "}
        <h1 className=" text-2xl border-b-2 m-2 p-1">To-Do</h1>
        <button
          onClick={TaskModeState}
          className="btn bg-indigo-700 text-white border-transparent m-2"
        >
          + New Task
        </button>
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
                  onClick={() => (addTask(), TaskModeState())}
                  className="btn btn-active btn-primary"
                >
                  New Task
                </button>
                <button className="btn btn-error" onClick={TaskModeState}>
                  Cancel
                </button>
              </div>
            </div>
          </section>
        )}
        <section className="flex flex-col gap-2 p-1 ">
          {tasks.map(({ taskName, taskID }) => (
            <div key={Number(taskID)} className="border-2 rounded-lg p-2 ">
              {Number(editMode) === taskID ? (
                <>
                  <input
                    type="text"
                    onChange={(e) => setEditText(e.target.value)}
                    value={editText}
                    className="input input-bordered input-md text-lg w-full max-w-xs block mb-1"
                  />
                  <button
                    className="ml-1 btn btn-sm btn-outline btn-accent"
                    onClick={() => editTask(taskID)}
                  >
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
                    onClick={() => deleteTask(taskID)}
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
          ))}
        </section>
      </div>
    </main>
  );
}

export default App;

/*
  Future updates
    Better Handling Errors 
*/
