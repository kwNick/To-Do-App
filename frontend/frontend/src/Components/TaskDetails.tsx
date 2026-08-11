import { useNavigate } from "react-router-dom";
import type { Task } from "../Types/Types";
import { useEffect, useState } from "react";
import { deleteTask, getTasks, updateTask } from "../Services/TaskServices";
import { calculateStatus } from "../Utils/TaskUtils";

export default function TaskDetails({task}:{task: Task | null}){
  const [tasks, setTasks] = useState<Task[]>([]);

  const navigate = useNavigate();

  const handleFinishTask = async (id: number) => {
          const thisTask = tasks.find((task) => task.id == id);
  
          if(!thisTask) return;
  
          // Optimistic update
          setTasks(prevTasks =>
          prevTasks.map(task =>
              task.id === id
              ? { ...task, completed: !task.completed }
              : task
              )
          );
      
          try{
              await updateTask(id, {
              completed: !thisTask.completed,
              });
              
              // setSelectedTaskID(null);
  
              // await refreshTasks(); // Maybe don't need this if your doing optimistic updates
  
          }catch(error){
              console.error("Error finishing task:", error);
  
              // Optimistic update undo
              setTasks(prevTasks =>
              prevTasks.map(task =>
              task.id === id
                  ? { ...task, completed: thisTask.completed }
                  : task
              )
              );
          }
      };
  
      const handleDeleteTask = async (id: number) => {
          const thisTask = tasks.find((task) => task.id == id);
  
          if(!thisTask) return;
  
          // Optimistic Update
          setTasks(prevTasks => prevTasks.filter(t => t !== thisTask));
  
          try{
              await deleteTask(id);
              
              // await refreshTasks(); // Maybe don't need this if your doing optimistic updates
  
              // if(id === selectedTaskID){
              // setSelectedTaskID(null);
              // }
  
          }catch(error){
              console.error("Error deleting task:", error);
  
              // Undo Optimistic Update
              setTasks(prevTasks => [...prevTasks, thisTask]);
          }
      };
  
      useEffect(() => {
          const checkStatus = setInterval(() => {
              setTasks(prevTasks => {
              return prevTasks.map(task => {
                  const newStatus = calculateStatus(
                  task.deadline,
                  task.deadlineTime
                  );
  
                  if (newStatus !== task.status) {
                  updateTask(task.id, {status: newStatus})
                      .catch(error => {console.error("Error updating task status:", error);});
  
                  return {
                      ...task,
                      status: newStatus
                  };
                  }
  
                  return task;
              });
              });
              
          }, 1000);
  
          return () => clearInterval(checkStatus);
      }, []);
  
      useEffect(() =>{
          const fetchTasksOnMount = async () => {
            try {
              // setLoading(true);
              // await refreshTasks();
              const data = await getTasks();
              setTasks(data);
            } catch (error) {
              console.error("Error Fetching Tasks: ", error);
            }finally{
              // setLoading(false);
            }
          };
      
          fetchTasksOnMount();
      }, []);
    return (
      <div>
        <div>
          <button onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
        <div className="taskDetails">
          <h1>Task Details</h1>

          <div >
            {task ? (
              <div className="taskDetailsContent">
                <p><strong>Name:</strong> {task.name}</p>
                <p><strong>Description:</strong> {task.description}</p>
                <p><strong>Deadline:</strong> {task.deadline} {task.deadlineTime}</p>
                <p><strong>Priority:</strong> {task.priority}</p>
                <p><strong>Status:</strong> {task.status}</p>
                <p>{task.completed ? <strong>Completed <span style={{color: "green"}}>✓</span></strong> : <strong>Incomplete</strong>}</p>
              </div>
            ):(
              <p>Select a task to see details</p>
            )}
          </div>
        </div>
        <div>
          {task && (
            <>
            <button 
            className="finishButton" 
            onClick={() => {
                // e.stopPropagation();
                handleFinishTask(task.id );
            }}
            >
                {task.completed ? 'UnFinish' : 'Finish'}</button>   <button className="deleteButton" 
                onClick={() => {
                // e.stopPropagation();
                handleDeleteTask(task.id);
                }}>
                Delete
            </button>
            </>
          )}
        </div>
      </div>
    );
};