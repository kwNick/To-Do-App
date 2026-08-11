import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Task } from "../Types/Types";
import { getTask, getTasks, updateTask } from "../Services/TaskServices";
import { calculateStatus } from "../Utils/TaskUtils";

function TaskDetailsPage() {
    const { id } = useParams();
    const [, setTasks] = useState<Task[]>([]);
    const [task, setTask] = useState<Task | null>(null);

    // Checks status on interval for expired
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

    // Fetches task with id from params
    useEffect(() => {
        const fetchTask = async () => {
        if(!id) return;
        const res = await getTask(id);

        setTask(res);
        };

        fetchTask();
    }, [id]);

    // Fetch tasks on mount
    useEffect(() =>{
        const fetchTasksOnMount = async () => {
        try {
        //   setLoading(true);
            // await refreshTasks();
            const data = await getTasks();
            setTasks(data);
        } catch (error) {
            console.error("Error Fetching Tasks: ", error);
        }finally{
        //   setLoading(false);
        }
        };

        fetchTasksOnMount();
    }, []);

  if (!task) {
    return <p>Loading...</p>;
  }

  return (
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
  );
}

export default TaskDetailsPage;