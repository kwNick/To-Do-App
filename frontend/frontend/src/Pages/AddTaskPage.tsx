import { useEffect, useState } from "react";
import AddTaskForm from "../Components/AddTaskForm";
import { createTask, getTasks } from "../Services/TaskServices";
import { calculateStatus } from "../Utils/TaskUtils";
import type { Task } from "../Types/Types";

const AddTaskPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [deadlineTime, setDeadlineTime] = useState<string>("");
  const [priority, setPriority] = useState<Task["priority"]>("Low");

  const [error, setError] = useState("");

  const handleAddTask = async () => {
    const trimmedName = name.trim();
    if(!trimmedName){
      setError("Task Name is Required!");
      return;
    }
    
    if(tasks.find(t => t.name.toLowerCase() === trimmedName.toLowerCase())){
      setError("Task already exists!");
      return;
    }

    if(calculateStatus(deadline, deadlineTime) == "Expired"){
      setError("Task Deadline must be a future date!");
      return;
    }

      const status = calculateStatus(deadline, deadlineTime);
      const newTask = { name, description, deadline, deadlineTime, priority, status, completed: false };

      // Optimistic Update
      setTasks(prevTasks => [...prevTasks, {...newTask, id: (tasks.length !== 0 ? tasks[tasks.length - 1].id + 1 : 1)}]);

      setError(""); // Clear any previous error message
      try{
        await createTask(newTask);

        setName("");
        setDescription("");
        setDeadline("");
        setDeadlineTime("");
        setPriority("Low");

      }catch(error){
        console.error("Error adding task:", error);

        // Undo Optimistic Update
        setTasks(prevTasks => prevTasks.filter(t => t !== newTask));
      }
  };

  useEffect(() => {
      const remErrors = async () => {
      setError("");
      };
      remErrors();
  }, [name, deadline, deadlineTime]);

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
  
  return (
    <AddTaskForm handleAddTask={handleAddTask} name={name} description={description} deadline={deadline}  deadlineTime={deadlineTime} priority={priority} error={error} setName={setName} setDescription={setDescription} setDeadline={setDeadline} setDeadlineTime={setDeadlineTime} setPriority={setPriority}/>
  )
}
export default AddTaskPage