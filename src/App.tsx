import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "./store/taskSlice";
import { AppDispatch } from "./store/store";
import TaskList from "./components/TaskList";

function App() {
  const [newTask, setNewTask] = useState("");

  const [addTaskMode, setAddTaskMode] = useState(false);

  // Store Task!
  const dispatch = useDispatch<AppDispatch>();

  const addTaskX = () => {
    if (newTask) {
      const uniqueID = Date.now();
      const taskObj = {
        taskName: newTask,
        taskID: uniqueID,
      };

      dispatch(addTask(taskObj));

      setNewTask("");
    } else {
      console.log("Needs to type something");
      return null;
    }
  };

  const TaskModeState = () => setAddTaskMode(!addTaskMode);

  return (
    <main className="sm:flex sm:flex-col sm:items-center min-h-screen  ">
      <div className=" sm:w-5/6  md:w-4/6 lg:w-3/6 xl:w-2/6">
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
                  onClick={() => (addTaskX(), TaskModeState())}
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
        <TaskList />
      </div>
    </main>
  );
}

export default App;

/*
  Future updates
    Better Handling Errors 
*/
