import * as helpers from "./helpers.js";
import * as taskManager from "./taskManager.js";
import * as userManager from "./userManager.js";
import * as modal from "./modal.js";

let initialRender = true;
const content = document.querySelector(".content");

const renderLogin = () => {
  content.insertAdjacentHTML(
    "afterbegin",
    `  <div class="login">
        <form id="loginForm">
          <input type="text" required placeholder="Your username" class="login" />
          <button type="submit" id="login">Login</button>
        </form>
      </div>`
  );
  helpers.addLoginListeners();
};

const renderLogout = (username) => {
  content.insertAdjacentHTML(
    "afterbegin",
    `
      <div class="logout">
        <p>You are logged in as ${username}</p>
        <button type="button" id="logout">Logout</button>
      </div>`
  );
  helpers.addLogoutListeners();
};

const renderModal = () => {
  content.insertAdjacentHTML(
    "afterbegin",
    `<section class="modal hidden">
      <form id="taskForm" class="taskForm">
        <button type="button" class="close">
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"
              fill="black"
            />
          </svg>
        </button>
        <select id="priority" name="priority">
          <option value="" disabled selected>Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input
          type="text"
          id="taskName"
          name="taskName"
          placeholder="Task name"
        />
        <input type="date" id="dueDate" name="dueDate" />
        <div>
          <button class="cancel btn" type="button">Cancel</button>
          <button class="submit btn" type="submit">Submit</button>
        </div>
      </form>
    </section>

    <div class="overlay hidden"></div>`
  );
  modal.addModalListeners();
};

const renderStaticContent = () => {
  content.insertAdjacentHTML(
    "beforeend",
    `
   <div class="pageContainer">
      <div class="top">
        <p>Tasks</p>
        <div class="buttons">
          <button class="clearAll" id="clearAll">Clear all</button>
          <button class="new">New</button>
        </div>
      </div>

      <div class="allTasks"></div>
    </div>`
  );
  helpers.addHeaderListeners();
  helpers.clearAllTasks();
};

const renderTask = ({ taskName, priority, isDone }) => {
  let classes = "task";

  if (isDone) classes += " done";

  return `
    <div class="${classes}">
      <h2>${taskName}</h2>
      <div class="properties">
        <p class="priority">${priority}</p>
        <div class="icons">
          <button class="remove">
            <svg
              viewBox="0 0 24 24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"
                fill="red"
              />
            </svg>
          </button>
          ${
            isDone
              ? `
          <button class="undoneBtn" >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.33929 4.46777H7.33929V7.02487C8.52931 6.08978 10.0299 5.53207 11.6607 5.53207C15.5267 5.53207 18.6607 8.66608 18.6607 12.5321C18.6607 16.3981 15.5267 19.5321 11.6607 19.5321C9.51025 19.5321 7.58625 18.5623 6.30219 17.0363L7.92151 15.8515C8.83741 16.8825 10.1732 17.5321 11.6607 17.5321C14.4222 17.5321 16.6607 15.2935 16.6607 12.5321C16.6607 9.77065 14.4222 7.53207 11.6607 7.53207C10.5739 7.53207 9.56805 7.87884 8.74779 8.46777L11.3393 8.46777V10.4678H5.33929V4.46777Z"
                fill="white"
              />
            </svg>
          </button>
          `
              : `
          <button class="doneBtn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285"
                fill="green"
              />
            </svg>
          </button> `
          }
        </div>
      </div>
    </div>
  `;
};

let renderTasks = () => {
  const tasksContainer = document.querySelector(".allTasks");
  const tasks = taskManager.getTasks();

  if (!Object.keys(tasks).length) return (tasksContainer.innerHTML = "");

  const blocks = Object.entries(tasks).sort((a, b) => (a[0] < b[0] ? 1 : -1));

  tasksContainer.innerHTML = blocks
    .map(([dueDate, tasks], i) => {
      let isHidden = false;

      if (initialRender && i === 0) taskManager.setExpanded(dueDate, true);
      if (!taskManager.isExpanded(dueDate)) isHidden = true;

      return `
      <div class="dateBlock">
        <div class="date">
          <p>${dueDate}</p>
          <div class="buttons">
            <button class="add ${helpers.addHiddenClass(isHidden)}">Add</button>
            <button class="clear ${helpers.addHiddenClass(
              isHidden
            )}">Clear</button>
            <button class="subtract">Subtract</button>
          </div>
        </div>
        <div class="tasks ${helpers.addHiddenClass(isHidden)}">${tasks
        .map(renderTask)
        .join("")}</div>
      </div>
    `;
    })
    .join("");

  helpers.addTaskListeners();
  initialRender = false;
};

const renderContent = (username) => {
  renderLogout(username);
  renderModal();
  renderStaticContent();
  renderTasks();
};

const renderInitialScreen = () => {
  const user = userManager.getUser();
  content.innerHTML = "";

  if (user) renderContent(user);
  else renderLogin();
};

export { renderLogin, renderStaticContent, renderTasks, renderInitialScreen };
