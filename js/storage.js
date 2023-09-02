const TASKS_KEY = "tasks";

const getTasks = () => {
  return JSON.parse(localStorage.getItem(TASKS_KEY) || "{}");
};

const updateTasks = (tasks) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

const clearTasks = () => {
  localStorage.clear(TASKS_KEY);
};

export { getTasks, updateTasks, clearTasks };
