// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));
const titleEl = $("#inputTask");
const dueDateEl = $("#inputDueDate");
const descriptionEl = $("#inputDescription");
const cardContainer = $("#todo-cards");
const addTaskButton = $("#add-task-btn");
const task = {
  title: titleEl.val(),
  dueDate: dueDateEl.val(),
  description: descriptionEl.val(),
};

// Todo: create a function to generate a unique task id
function generateTaskId() {
  // check if the nextId exists in localStroage. if it doesnt make nextId = 1
  if (nextId === null) {
    nextId = 1;
  } else {
    // if it does increase the nextId by 1
    nextId++;
  }
  // store nextId in local storage
  localStorage.setItem("nextId", JSON.stringify(nextId));

  return nextId;
}

// Todo: create a function to create a task card
function createTaskCard(userObj) {
  const taskCard = $("<div>").addClass("task-card");
  taskCard.attr("id", userObj.id);
  const titleEl = $("<h2>");
  titleEl.text(userObj.title);
  const dueDateEl = $("<p>");
  dueDateEl.text(userObj.dueDate);
  const descriptionEl = $("<p>");
  descriptionEl.text(userObj.description);
  const delBtn = $(
    `<button type="button" class="btn btn-danger data-id="${userObj.id}">Delete</button>`
  );

  taskCard.append(titleEl, dueDateEl, descriptionEl, delBtn);
  cardContainer.append(taskCard);

  //if else conditional using status key value pair on object, need variables referencing id's on cards

  return taskCard;
}

// const taskCard = createTaskCard(userObj);
// $(cardContainer).append(taskCard);

// Todo: create a function to render the task list and make cards draggable
function renderTaskList(task) {
  //   $("taskList");
}

//{
//   taskList.forEach(function (task) {
//       createTaskCard(task);

//   });
// }

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();
  // create an object that stores the following: id, title, dueDate, description, status: to-do

  //   const userObj = {
  // Todo: create a function to handle adding a new task
  // id: function handleAddTask(event) {
  //   event.preventDefault();
  // create an object that stores the following: id, title, dueDate, description, status: to-do

  const taskId = generateTaskId();

  const userObj = {
    id: taskId,
    title: $("#inputTask").val(),
    duedate: $("#inputDate").val(),
    description: $("#inputDescription").val(),
    status: "to-do",
  };

  // added the newly created obj into taskList
  taskList.push(userObj);

  // save tasklist to localStorage
  localStorage.setItem("tasks", JSON.stringify(taskList));
  createTaskCard(userObj);
  location.reload();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}
// $(.lane) -- changes status based on lane conditional and for of (loops through array to determine which has id that matches then finds that id within the array andchanges status from this to that)
// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  //   renderTaskList();
  $(addTaskButton).on("submit", handleAddTask);
});
