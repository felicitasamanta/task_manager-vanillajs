import * as helpers from "./helpers.js";
import * as view from "./view.js";
import * as taskManager from "./taskManager.js";
import * as userManager from "./userManager.js";
import * as modal from "./modal.js";

const onLogin = (e) => {
  e.preventDefault();
  const username = helpers.getUsername(e);
  userManager.setUser(username);
  view.renderInitialScreen();
};

const onLogout = (e) => {
  e.preventDefault();
  userManager.removeUser();
  view.renderInitialScreen();
};

const onClearAll = () => {
  taskManager.clearAllTasks();
  view.renderTasks();
};

const onAddTaskToBlock = (e) => {
  const dueDate = helpers.getDueDate(e);

  modal.onToggleModal(dueDate);
};

const onClear = (e) => {
  const dueDate = helpers.getDueDate(e);

  taskManager.clearTasks(dueDate);
  view.renderTasks();
};

const onSubtractToggle = (e) => {
  let btn = e.target;
  const dueDate = helpers.getDueDate(e);
  let container = btn.closest(".dateBlock");
  const tasks = container.querySelector(".tasks");
  const addBtn = container.querySelector(".add");
  const clearBtn = container.querySelector(".clear");

  helpers.toggleHidden(tasks);
  helpers.toggleHidden(clearBtn);
  helpers.toggleHidden(addBtn);
  helpers.toggleExpandSubtract(btn);
  taskManager.setExpanded(dueDate, helpers.isHidden(tasks));
};

const onRemoveItem = (e) => {
  const taskName = helpers.getTaskName(e);
  const date = helpers.getDueDate(e);

  taskManager.removeTask(date, taskName);
  view.renderTasks();
};

const onTaskStatusToggle = (e) => {
  const date = helpers.getDueDate(e);
  const taskName = helpers.getTaskName(e);

  taskManager.updateTask(date, taskName);
  view.renderTasks();
};

export {
  onLogin,
  onLogout,
  onClearAll,
  onAddTaskToBlock,
  onClear,
  onSubtractToggle,
  onRemoveItem,
  onTaskStatusToggle,
};
