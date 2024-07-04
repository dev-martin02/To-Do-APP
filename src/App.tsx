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
    // const findTask = tasks.find(({ taskID }) => taskID === id);
    // if (findTask) {
    //   findTask.taskName = updatedTask;

    // }
    setTasks(
      tasks.map((task) =>
        task.taskID === id ? { ...task, taskName: editText } : task
      )
    );
    setEditMode("");
  };

  const x = (id: Number, taskName: string) => {
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

      <section>
        {tasks.map(({ taskName, taskID }) => (
          <div key={Number(taskID)}>
            {Number(editMode) === taskID ? (
              <>
                <input
                  type="text"
                  onChange={(e) => setEditText(e.target.value)}
                  value={editText}
                />
                <button onClick={() => editTask(taskID)}>Update</button>
              </>
            ) : (
              <>
                <p>{taskName}</p>
                <button onClick={() => deleteTask(taskID)}>Delete</button>
                <button onClick={() => x(taskID, taskName)}>Edit</button>
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
    Randoms ID functions where it gives each task an unique ID
    Better Handling Errors 
  <div key={Number(taskID)}>
            <p>{taskName}</p>
            <button onClick={() => deleteTask(taskID)}>Delete</button>
            <button onClick={() => editTask(taskID)}>Edit</button>
          </div>

*/
