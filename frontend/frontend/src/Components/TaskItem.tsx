import type { Task } from "../Types/Types";

export default function TaskItem({
    task,
    selectedTaskID,
    setSelectedTaskID,
    handleFinishTask,
    handleDeleteTask,
  }: {
    task: Task;
    selectedTaskID: number | null;
    setSelectedTaskID: (id: number | null) => void;
    handleFinishTask: (id: number) => void;
    handleDeleteTask: (id: number) => void;
  }) {

    const handleSelect = () => {
      setSelectedTaskID(
        selectedTaskID === task.id ? null : task.id
      );
    };


    return (
      <div className={`taskItem `}
        key={task.id} >
          <div className={`taskText 
                ${selectedTaskID === task.id ? "selectedTask" : ""} 
                ${task.priority + " " + task?.status?.replace(" ", "").toLowerCase()} 
                ${task.completed ? 'completed' : 'incomplete'}`}
              onClick={handleSelect}
            >
            <p style={{color: "black", width: "33%", maxWidth: "33%"}}>
              {task.name}
            </p>
            <p style={{ width: "33%", maxWidth: "33%"}}>
              {/* Complete:  */}
              <span style={{color: "green"}}>
                {task.completed && " Completed ✅"}
                {/* {task.completed && " ✓"} */}
              </span>
              <span style={{color: "red"}}>
                {!task.completed && " Not Complete ❌" }
                {/* {!task.completed && " ✕"} */}
              </span>
            </p>
            <p style={{width: "33%", maxWidth: "33%"}}>
              {/* Status: */}
              <span style={{color: "red"}}>
                {task.status == "Expired" && " ❌ Expired" }
              </span>
              {/* <span style={{color: ""}}>
                {task.status != "Expired" && " In Progress"}
              </span> */}
            </p>
          </div>

          <div className="taskButtons">
            <button 
            className="finishButton" 
            onClick={(e) => {
                e.stopPropagation();
                handleFinishTask(task.id );
            }}
            >
                {task.completed ? 'UnFinish' : 'Finish'}</button>   <button className="deleteButton" 
                onClick={(e) => {
                e.stopPropagation();
                handleDeleteTask(task.id);
                }}>
                Delete
            </button>
        </div>
      </div>
    )
  };