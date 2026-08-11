import { Link } from "react-router-dom";
import type { Task } from "../Types/Types";

export default function TaskItem({
    task,
    handleFinishTask,
    handleDeleteTask,
  }: {
    task: Task;
    handleFinishTask: (id: number) => void;
    handleDeleteTask: (id: number) => void;
  }) {

    return (
      <div className={`taskItem `}
        key={task.id} >
          <Link to={`/tasks/${task.id}`} className={`taskText  
                ${task.priority + " " + task?.status?.replace(" ", "").toLowerCase()} 
                ${task.completed ? 'completed' : 'incomplete'}`}
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
          </Link>

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