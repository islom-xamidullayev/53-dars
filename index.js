const input = document.getElementById("text");
const submitBtn = document.getElementById("submit");
const taskList = document.querySelector(".task__list");
const doneList = document.querySelector(".done__list");
const taskCon = document.querySelector(".taskCon");
const doneCon = document.querySelector(".done__title");

let tasks;
let doneTasks;



try {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  doneTasks = JSON.parse(localStorage.getItem("doneTasks")) || [];
} catch (error) {
  tasks = [];
  doneTasks = [];
}


// har bitta taskni domga tasklist listiga qushdik

tasks.forEach((value) => {

    
  // yangi li elementrini value b yaratdik

  const newElement = createElementForTask(value);
  taskList.appendChild(newElement);
});

doneTasks.forEach((value) => {
  const newElement = createElementForDoneTask(value);
  doneList.appendChild(newElement);
});

updateTaskCounter();
updateDoneCounter();

submitBtn.addEventListener("click", () => {
  const value = input.value.trim().toLowerCase();
  if (!value) return;

  if (tasks.includes(value)) {
    alert("Buni yozgansiz☺   ");
    return;
  }

  const newElement = createElementForTask(value);
  taskList.appendChild(newElement);

  tasks.push(value);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  updateTaskCounter();
  input.value = "";
});

function deleteItem(e) {
  const pressedBtn = e.target;
  const itemElement = pressedBtn.closest("li");
  const item = itemElement.querySelector("p").innerText;

  itemElement.classList.add("fade-out");

  setTimeout(() => {
    tasks = tasks.filter((el) => el !== item);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    itemElement.remove();

    updateTaskCounter();
  }, 500); // Animatsiya davomiyligi
}

function moveItem(e) {
  const pressedBtn = e.target;
  const itemElement = pressedBtn.closest("li");
  const value = itemElement.querySelector("p").innerText;

  itemElement.classList.add("fade-out");

  setTimeout(() => {
    
    tasks = tasks.filter((el) => el !== value);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    itemElement.remove();

    doneTasks.push(value);
    localStorage.setItem("doneTasks", JSON.stringify(doneTasks));

    const newEl = createElementForDoneTask(value);
    newEl.classList.add("fade-in");
    doneList.appendChild(newEl);

    updateDoneCounter();
  }, 500); // Animatsiya davomiyligi
}

function createElementForTask(value) {
  const newElement = document.createElement("li");
  newElement.classList.add("task__item");

  newElement.innerHTML = `

    <p>${value}</p>
    <div class="task__controller">
      <div class="move-btn">
        <img src="./img/Group 1 (3).svg" alt="" />
      </div>
      <div class="delete-btn">
        <img src="./img/Group 2.svg" alt="" />
      </div>
    </div>
  `;


  newElement.querySelector(".move-btn").addEventListener("click", moveItem);
  newElement.querySelector(".delete-btn").addEventListener("click", deleteItem);

  return newElement;
}

function createElementForDoneTask(value) {

      // yangi li yaratib uni done listga qushib quyamiz


  const newElement = document.createElement("li");
  newElement.classList.add("strike");
  newElement.innerText = value;

  return newElement;
}


function updateTaskCounter() {
  taskCon.innerText = `Tasks to do - ${tasks.length}`;
}


function updateDoneCounter() {
  const doneTasksCount = doneList.children.length;
  doneCon.innerText = `Done - ${doneTasksCount}`;
}
