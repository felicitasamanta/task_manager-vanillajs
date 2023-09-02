import * as taskManager from "./taskManager.js";
import * as view from "./view.js";
import * as helpers from "./helpers.js";

const onToggleModal = (dueDate) => {
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  const priorityInput = document.querySelector("#priority");
  const taskNameInput = document.querySelector("#taskName");
  const dueDateInput = document.querySelector("#dueDate");

  helpers.toggleHidden(modal);
  helpers.toggleHidden(overlay);

  if (dueDate) {
    dueDateInput.value = dueDate;
    dueDateInput.setAttribute("disabled", true);
  }

  if (!helpers.isHidden(modal)) {
    priorityInput.setAttribute("required", "true");
    taskNameInput.setAttribute("required", "true");
    dueDateInput.setAttribute("required", "true");
  } else {
    priorityInput.removeAttribute("required");
    taskNameInput.removeAttribute("required");
    dueDateInput.removeAttribute("required");
    dueDateInput.removeAttribute("disabled");
  }
};

const onSubmit = (e) => {
  e.preventDefault();
  const form = document.getElementById("taskForm");
  const dueDate = document.getElementById("dueDate").value;
  const taskName = document.getElementById("taskName").value;
  const priority = document.getElementById("priority").value;

  taskManager.addTask(dueDate, { taskName, priority });
  taskManager.setExpanded(dueDate, true);
  onToggleModal();
  form.reset();
  view.renderTasks();
};

const addModalListeners = () => {
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  const closeModal = document.querySelector(".close");
  const cancelBtn = document.querySelector(".cancel");
  const form = document.querySelector("#taskForm");

  closeModal.addEventListener("click", onToggleModal);
  overlay.addEventListener("click", onToggleModal);
  cancelBtn.addEventListener("click", onToggleModal);
  form.addEventListener("submit", onSubmit);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !helpers.isHidden(modal)) onToggleModal();
  });
};

export { onToggleModal, onSubmit, addModalListeners };
