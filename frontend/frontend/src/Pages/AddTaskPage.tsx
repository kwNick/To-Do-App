import { useEffect, useState } from "react";
// import AddTaskForm from "../Components/AddTaskForm";
import { createTask, getTasks } from "../Services/TaskServices";
import { calculateStatus } from "../Utils/TaskUtils";
import type { Task } from "../Types/Types";
import { Link, useNavigate } from "react-router-dom";

const AddTaskPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [deadlineTime, setDeadlineTime] = useState<string>("");
  const [priority, setPriority] = useState<Task["priority"]>("Low");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleAddTask = async () => {
    const trimmedName = name.trim();
    if(!trimmedName){
      setError("Task Name cannot only be space characters!");
      return;
    }
    
    if(tasks.find(t => t.name.toLowerCase() === trimmedName.toLowerCase())){
      setError("Task with that name already exists!");
      return;
    }

    if(calculateStatus(deadline, deadlineTime) == "Expired"){
      setError("Task Deadline must be a future date!");
      return;
    }

    const status = calculateStatus(deadline, deadlineTime);
    const newTask = { name: trimmedName, description, deadline, deadlineTime, priority, status, completed: false };

    setError(""); // Clear any previous error message
    try{
      await createTask(newTask);

      setName("");
      setDescription("");
      setDeadline("");
      setDeadlineTime("");
      setPriority("Low");

      navigate('/tasks');

    }catch(error){
      console.error("Error adding task:", error);
      setError("Failed to add task: "+error);
    }
  };

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
    // <AddTaskForm handleAddTask={handleAddTask} name={name} description={description} deadline={deadline}  deadlineTime={deadlineTime} priority={priority} error={error} setName={setName} setDescription={setDescription} setDeadline={setDeadline} setDeadlineTime={setDeadlineTime} setPriority={setPriority}/>

    <div className="addTaskForm">
      <div className="tasksLink">
        <Link to="/tasks">Tasks</Link>
      </div>
      <h1>Add Task</h1>

      <form className="addTaskInput" onSubmit={(e) => {
          e.preventDefault();
          handleAddTask();
          }}>

          <div className="labelInput">
            <label>Name</label>
          <input
          type="text"
          value={name}
          required
          onChange={(e) => {setName(e.target.value); setError("");}}
          placeholder="Enter name"
          />
          </div>

          <div className="labelInput">
            <label>Description</label>
            <textarea
            className="descriptionInput"
            // type=""
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            />
          </div>
          
          <div className="labelInput">
            <label>Deadline</label>
            <div className="deadlineInput">
            <input
                type="text"
                pattern="\d{2}/\d{2}/\d{4}"
                value={deadline}
                onChange={(e) => {setDeadline(e.target.value); setError("");}}
                placeholder="(MM/DD/YYYY)"
            />
            <input
                type="time"
                // pattern="(\d{2}:\d{2}|\d{1}:\d{2})\s*(AM|PM)"
                value={deadlineTime}
                onChange={(e) => {setDeadlineTime(e.target.value); setError("");}}
                placeholder="(HH:MM AM/PM)"
            />
            </div>
          </div>

          {/* <input
          type="text"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          placeholder="Priority (Low, Medium, High)"
          /> */}
          <div className="labelInput">
            <label>Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value as Task["priority"])}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            </select>
          </div>

          <div className="addButton">
            <button type="submit">
              Add Task
            </button>
          </div>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};
export default AddTaskPage