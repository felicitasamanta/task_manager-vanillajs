import * as actions from "./actions.js";
import * as modal from "./modal.js";

const addTaskListeners = () => {
  const addTaskToBlockBtns = document.querySelectorAll(".add");
  const removeItemBtns = document.querySelectorAll(".remove");
  const doneBtns = document.querySelectorAll(".doneBtn");
  const undoneBtns = document.querySelectorAll(".undoneBtn");
  const clearBtns = document.querySelectorAll(".clear");
  const subtracts = document.querySelectorAll(".subtract");

  addTaskToBlockBtns.forEach((el) => {
    el.addEventListener("click", actions.onAddTaskToBlock);
  });
  removeItemBtns.forEach((el) =>
    el.addEventListener("click", actions.onRemoveItem)
  );
  clearBtns.forEach((el) => el.addEventListener("click", actions.onClear));
  doneBtns.forEach((el) =>
    el.addEventListener("click", actions.onTaskStatusToggle)
  );
  undoneBtns.forEach((el) =>
    el.addEventListener("click", actions.onTaskStatusToggle)
  );
  subtracts.forEach((el) =>
    el.addEventListener("click", actions.onSubtractToggle)
  );
};

const clearAllTasks = () => {
  const clearAllBtn = document.querySelector(".clearAll");
  clearAllBtn.addEventListener("click", actions.onClearAll);
};

const addLoginListeners = () => {
  const form = document.getElementById("loginForm");
  form.addEventListener("submit", actions.onLogin);
};

const addLogoutListeners = () => {
  const logoutBtn = document.getElementById("logout");
  logoutBtn.addEventListener("click", actions.onLogout);
};

const addHeaderListeners = () => {
  const openModalBtn = document.querySelector(".new");
  openModalBtn.addEventListener("click", () => modal.onToggleModal());
};

const addHiddenClass = (isHidden) => (isHidden ? "hidden" : "");

const getUsername = (e) => {
  return e.target.closest("#loginForm").querySelector("input ").value;
};

const getDueDate = (e) => {
  return e.target.closest(".dateBlock").querySelector(".date p").textContent;
};

const getTaskName = (e) => {
  return e.target.closest(".task").querySelector("h2").textContent;
};

const toggleHidden = (el) => el.classList.toggle("hidden");

const isHidden = (el) => el.classList.contains("hidden");

const toggleExpandSubtract = (btn) => {
  btn.textContent = isHidden(btn) ? "Expand" : "Subtract";
};

export {
  addLoginListeners,
  addLogoutListeners,
  addTaskListeners,
  addHeaderListeners,
  addHiddenClass,
  clearAllTasks,
  getUsername,
  getDueDate,
  getTaskName,
  toggleHidden,
  isHidden,
  toggleExpandSubtract,
};
