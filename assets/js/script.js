// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));

const addTaskButton = $("#add-task-btn");

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
function createTaskCard(task) {

  const taskCard = $("<div>")
    .addClass("card task-card draggable my-3")
    .attr("data-task-id", task.id);
  const cardHeader = $("<div>").addClass("card-header h4").text(task.title);
  const cardBody = $("<div>").addClass("card-body");
  const cardDescription = $("<p>").addClass("card-text").text(task.description);
  const cardDueDate = $("<p>").addClass("card-text").text(task.dueDate);
  const cardDeleteBtn = $("<button>")
    .addClass("btn btn-danger delete")
    .text("Delete")
    .attr("data-task-id", task.id);
  cardDeleteBtn.on("click", handleDeleteTask);

  // ? Sets the card background color based on due date. Only apply the styles if the dueDate exists and the status is not done.
  if (task.dueDate && task.status !== "done") {
    const now = dayjs();
    const taskDueDate = dayjs(task.dueDate, "DD/MM/YYYY");

    // ? If the task is due today, make the card yellow. If it is overdue, make it red.
    if (now.isSame(taskDueDate, "day")) {
      taskCard.addClass("bg-warning text-white");
    } else if (now.isAfter(taskDueDate)) {
      taskCard.addClass("bg-danger text-white");
      cardDeleteBtn.addClass("border-light");
    }
  }

  // ? Gather all the elements created above and append them to the correct elements.
  cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
  taskCard.append(cardHeader, cardBody);

  // ? Return the card so it can be appended to the correct lane.
  return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  // ? Empty existing project cards out of the lanes
  const todoList = $("#todo-cards");
  todoList.empty();

  const inProgressList = $("#in-progress-cards");
  inProgressList.empty();

  const doneList = $("#done-cards");
  doneList.empty();

  taskList.forEach(function (task) {
    // createTaskCard(task);
    if (task.status === "to-do") {
      $("#todo-cards").append(createTaskCard(task));
    } else if (task.status === "in-progress") {
      $("#in-progress-cards").append(createTaskCard(task));
    } else {
      $("#done-cards").append(createTaskCard(task));
    }
  });

  // ? Use JQuery UI to make task cards draggable
  $(".draggable").draggable({
    opacity: 0.7,
    zIndex: 100,
    // ? This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
    helper: function (e) {
      // ? Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
      const original = $(e.target).hasClass("ui-draggable")
        ? $(e.target)
        : $(e.target).closest(".ui-draggable");
      // ? Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
      return original.clone().css({
        width: original.outerWidth(),
      });
    },
  });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();

  const titleEl = $("#inputTask");
  const dueDateEl = $("#inputDate");
  const descriptionEl = $("#inputDescription");
  // create an object that stores the following: id, title, dueDate, description, status: to-do
  const taskId = generateTaskId();

  const userObj = {
    id: taskId,
    title: titleEl.val(),
    dueDate: dueDateEl.val(),
    description: descriptionEl.val(),
    status: "to-do",
  };
  console.log(userObj);

  // added the newly created obj into taskList
  taskList.push(userObj);

  // save tasklist to localStorage
  localStorage.setItem("tasks", JSON.stringify(taskList));
  renderTaskList();

  titleEl.val("");
  dueDateEl.val("");
  descriptionEl.val("");
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  event.preventDefault();
  const taskId = $(this).attr("data-task-id");
  // ? Remove task from the array. There is a method called `filter()` for this that is better suited which we will go over in a later activity. For now, we will use a `forEach()` loop to remove the task.
  taskList.forEach((task) => {
    if (task.id === parseInt(taskId)) {
      taskList.splice(taskList.indexOf(task), 1);
    }
  });

  // save tasklist to localStorage
  localStorage.setItem("tasks", JSON.stringify(taskList));
  renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  // ? Get the project id from the event
  const taskId = ui.draggable[0].dataset.taskId;

  // ? Get the id of the lane that the card was dropped into
  const newStatus = event.target.id;

  for (let task of taskList) {
    // ? Find the task card by the `id` and update the task status.
    if (task.id === parseInt(taskId)) {
      task.status = newStatus;
    }
  }
  // ? Save the updated projects array to localStorage (overwritting the previous one) and render the new project data to the screen.
  localStorage.setItem("tasks", JSON.stringify(taskList));
  renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();

  // ? Make lanes droppable
  $(".lane").droppable({
    accept: ".draggable",
    drop: handleDrop,
  });
  $(addTaskButton).on("click", handleAddTask);
});
