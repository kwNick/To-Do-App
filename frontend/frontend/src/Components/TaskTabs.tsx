import type { TaskTab } from "../Types/Types";

export default function TaskTabs({activeTab, setActiveTab}: {activeTab: TaskTab, setActiveTab: (tab: TaskTab) => void}){
    return (
        <div className="taskTabs">
          <button 
          className={activeTab === "To-Do" ? "active" : ""}
          onClick={() => setActiveTab("To-Do")}>
            To-Do
          </button>

          <button 
          className={activeTab === "Completed" ? "active" : ""}
          onClick={() => setActiveTab("Completed")}>
            Completed
          </button>

          <button 
          className={activeTab === "All" ? "active" : ""}
          onClick={() => setActiveTab("All")}>
            All Tasks
          </button>
        </div>
    );
}