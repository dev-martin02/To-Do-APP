import { useState } from "react";
interface TaskStructure {
  taskName: string;
  taskID: number;
}

function App() {
  const [tasks, setTasks] = useState<TaskStructure[]>([]);
  const [newTask, setNewTask] = useState("");

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

  return (
    <>
      <h1>To-Do</h1>
      <input
        type="text"
        placeholder="Please write your task"
        onChange={(e) => setNewTask(e.target.value)}
        value={newTask}
      />
      <button onClick={addTask}>Add</button>

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
                <p className="text-xl mb-1">{taskName}</p>
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
    </>
  );
}

export default App;

/*
  Future updates
    Better Handling Errors 
*/
