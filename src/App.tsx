import { useState } from "react";
import { TaskList } from "./components/TaskList";

function App() {
  const [addTaskStage, setAddStage] = useState(false);

  const TaskModeState = () => setAddStage(!addTaskStage);

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
        <TaskList addTaskStage={addTaskStage} setAddStage={setAddStage} />
      </div>
    </main>
  );
}

export default App;
