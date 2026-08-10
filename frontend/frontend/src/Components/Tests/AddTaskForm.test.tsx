import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import AddTaskForm from "../AddTaskForm";
import TaskItem from "../TaskItem";
import type { Task } from "../../Types/Types";
// import refreshTask

describe("AddTaskForm", () => {
it("renders the task name input", () => {
        render(
            <AddTaskForm
                handleAddTask={vi.fn()}
                name=""
                description=""
                deadline=""
                deadlineTime=""
                priority="Low"
                error=""
                setName={vi.fn()}
                setDescription={vi.fn()}
                setDeadline={vi.fn()}
                setDeadlineTime={vi.fn()}
                setPriority={vi.fn()}
            />
        );

        expect(
            screen.getByPlaceholderText("Enter name")
        ).toBeInTheDocument();
    });

    // it("allows the user to enter a task name", async () => {
    //     const user = userEvent.setup();
    //     const setName = vi.fn();

    //     render(
    //         <AddTaskForm
    //             handleAddTask={vi.fn()}
    //             name=""
    //             description=""
    //             deadline=""
    //             deadlineTime=""
    //             priority="Low"
    //             error=""
    //             setName={setName}
    //             setDescription={vi.fn()}
    //             setDeadline={vi.fn()}
    //             setDeadlineTime={vi.fn()}
    //             setPriority={vi.fn()}
    //         />
    //     );

    //     // const input = screen.getByPlaceholderText("Enter name");
    //     const inputs = screen.getAllByRole("textbox");

    //     const input = inputs[0];

    //     await user.type(input, "Learn React Testing Library");

    //     expect(setName).toHaveBeenCalled();
    // });

    // it("disables Add Task when the name is empty", () => {
    //     render(
    //         <AddTaskForm
    //             handleAddTask={vi.fn()}
    //             name=""
    //             description=""
    //             deadline=""
    //             deadlineTime=""
    //             priority="Low"
    //             error=""
    //             setName={vi.fn()}
    //             setDescription={vi.fn()}
    //             setDeadline={vi.fn()}
    //             setDeadlineTime={vi.fn()}
    //             setPriority={vi.fn()}
    //         />
    //     );

    //     const button = screen.getByRole("button", {
    //         name: /add task/i
    //     });

    //     expect(button).toBeDisabled();
    // });
    
});

describe("TaskItem", () => {
    it("calls completeTask when Complete is clicked", async () => {
        const user = userEvent.setup();
        const completeTask = vi.fn();

        const task: Task = {
            id: 1,
            name: "Learn React",
            description: "Study RTL",
            deadline: "08/10/2026",
            deadlineTime: "10:00 PM",
            priority: "High",
            status: "In Progress",
            completed: false,
        };

        render(
            <TaskItem
                task={task}
                selectedTaskID={null}
                setSelectedTaskID={vi.fn()}
                handleFinishTask={completeTask}
                handleDeleteTask={vi.fn()}
            />
        );

        await user.click(
            screen.getByRole("button", {
            name: /finish/i
            })
        );

        expect(completeTask).toHaveBeenCalledWith(1);
    });
});


describe("calculateStatus", () => {
  it("returns Expired for a past deadline", () => {
    
  });

  it("returns In Progress for a future deadline", () => {
    
  });
});