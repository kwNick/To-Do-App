import { useEffect, useState } from "react";
import type { Task } from "../Types/Types";
import { calculateStatus, sortTasks } from "../Utils/TaskUtils";
import { deleteTask, getTasks, updateTask } from "../Services/TaskServices";
import TaskTabs from "../Components/TaskTabs";
import TaskItem from "../Components/TaskItem";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const TasksPage = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [activeTab, setActiveTab] = useState<"To-Do" | "Completed" | "All">("To-Do");
    const [loading, setLoading] = useState(true);
    const {logout} = useAuth();

    const filteredTasks = sortTasks(tasks).filter(task => {
        if(activeTab === "To-Do") {
        return (!task.completed);
        }

        if(activeTab === "Completed") {
        return task.completed;
        }

        return true;

    });

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
            setLoading(true);
            // await refreshTasks();
            const data = await getTasks();
            setTasks(data);
          } catch (error) {
            console.error("Error Fetching Tasks: ", error);
          }finally{
            setLoading(false);
          }
        };
    
        fetchTasksOnMount();
    }, []);

  return (
    <div className="App">
      <div className="taskList">

        <h1>Tasks</h1>

        <button className="logoutButton" onClick={logout}>
          Logout
        </button>

        <TaskTabs activeTab={activeTab} setActiveTab={setActiveTab}/>

        <div className="taskListContent">
          <div className="tasksContainer">
            <div className="addTaskLink">
              <Link to={`/tasks/add`}>
              Add Task +
              </Link>
            </div>
            <h2>{activeTab}</h2>
              {loading ? (
                  <p>Loading tasks...</p>
                ) : (filteredTasks.map((task: Task) => {
                  return (
                    <TaskItem 
                      key={task.id}
                      task={task} 
                      handleFinishTask={handleFinishTask} 
                      handleDeleteTask={handleDeleteTask}
                    />
                  )}
                )
              )}
          </div>

        </div>
      </div>
    </div>
  );
};
export default TasksPage