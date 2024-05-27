import { useState } from "react";
import "./styles.css";

const initialTasks = [
  { id: 1, name: "Buy groceries", completed: false },
  { id: 2, name: "Jogging", completed: true },
  { id: 3, name: "Read a book", completed: false },
];

function Button({ children, onClick, className }) {
  return <button onClick={onClick} className={className}>{children}</button>;
}

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [showAddTask, setShowAddTask] = useState(false);

  function handleShowAddTask() {
    setShowAddTask((showTask) => !showTask);
  }

  function handleAddTask(task) {
    setTasks((tasks) => [...tasks, task]);
    setShowAddTask(false);
  }

  function handleDeleteTask(id) {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  }

  function handleToggleTask(id) {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function handleClearTasks() {
    const confirm = window.confirm('Are you sure you want to clear all tasks?');
    if(confirm) setTasks([])
  }

  return (
    <div className="app">
      <h1>Task Management</h1>
      <TaskList
        tasks={tasks}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
        onClearTasks={handleClearTasks}
      />
      {showAddTask && <FormAddTask onAddTask={handleAddTask} />}
      <div className="button-container"> 
      <Button onClick={handleShowAddTask} className="toggle-add-task">
        {showAddTask ? "Close" : "Add Task"}
      </Button>
      <Button className="clear-tasks" onClick={handleClearTasks}>Clear Tasks</Button>
      </div>
    </div>
  );
}

function TaskList({ tasks, onToggleTask, onDeleteTask }) {
  return (
    <ul>
      {tasks.map((task) => (
        <Task
          task={task}
          key={task.id}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </ul>
  );
}

function Task({ task, onToggleTask, onDeleteTask }) {
  return (
    <li>
      <input
        type="checkbox"
        value={task.completed}
        onChange={(e) => onToggleTask(task.id)}
      />
      <span style={task.completed ? { textDecoration: "line-through" } : {}}>
        {task.name}
      </span>
      <Button onClick={() => onDeleteTask(task.id)}>Delete</Button>
    </li>
  );
}

function FormAddTask({ onAddTask }) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name) return;

    const newTask = {
      id: crypto.randomUUID(),
      name,
      completed: false,
    };
    onAddTask(newTask);

    setName("");
  }

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button className="add-button">Add Task</Button>
    </form>
  );
}
