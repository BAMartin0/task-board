// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
var myModal = document.getElementById('myModal')
var myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', function () {
  myInput.focus()
})

// Todo: create a function to generate a unique task id
function generateTaskId() {

    //create element
    const 
    //add content

    //append element
}

// Todo: create a function to create a task card
function createTaskCard(task) {

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    const addTaskEl = getElementById('addTaskBtn'); 

    addTaskEl.addEventListener('click', )
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});


// create modal in HTML
// create an object within the modal (task title, task due date, task description) CSS
//within task due day add calender mm/dd/yyyy format 
//save object to local storage? to get to display under proper column 
//create drag and drop (where?)
//create styling for dates in the past
//create styling for objects indidually
//create a delete button on object 
//cards for objects 