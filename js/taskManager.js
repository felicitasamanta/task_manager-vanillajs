import * as storage from "./storage.js";
import * as userManager from "./userManager.js";

const getTasks = () => {
  const username = userManager.getUser();
  const tasks = storage.getTasks();
  return tasks[username] || [];
};

const addTask = (dueDate, task) => {
  const tasks = storage.getTasks();
  const username = userManager.getUser();

  if (!tasks[username]) tasks[username] = {};

  if (!tasks[username][dueDate]) tasks[username][dueDate] = [];

  tasks[username][dueDate].push(task);
  storage.updateTasks(tasks);
};

const updateTask = (dueDate, taskName) => {
  const tasks = storage.getTasks();
  const username = userManager.getUser();

  tasks[username][dueDate] = tasks[username][dueDate].map((task) => {
    if (task.taskName === taskName) {
      return { ...task, isDone: !task.isDone };
    }

    return task;
  });

  storage.updateTasks(tasks);
};

const removeTask = (dueDate, taskName) => {
  const tasks = storage.getTasks();
  const username = userManager.getUser();

  tasks[username][dueDate] = tasks[username][dueDate].filter(
    (el) => el.taskName !== taskName
  );

  if (!tasks[username][dueDate].length) delete tasks[username][dueDate];

  storage.updateTasks(tasks);
};

const clearTasks = (dueDate) => {
  const tasks = storage.getTasks();
  const username = userManager.getUser();

  delete tasks[username][dueDate];

  storage.updateTasks(tasks);
};

const clearAllTasks = () => storage.clearTasks();

const expanded = {};

const isExpanded = (dueDate) => {
  return !!expanded[dueDate];
};

const setExpanded = (dueDate, isExpanded) => {
  expanded[dueDate] = isExpanded;
};

export {
  getTasks,
  addTask,
  updateTask,
  removeTask,
  clearTasks,
  clearAllTasks,
  isExpanded,
  setExpanded,
};
