const model = document.getElementById("modal-task")
const title = document.getElementById("task-title")
const priority = document.getElementById("task-priority")
const status = document.getElementById("task-status")
const date = document.getElementById("task-date")
const description = document.getElementById("task-description")

const addTAsk = document.getElementById("task-add");


addTAsk.addEventListener('click', () => {
   
   
   model.classList.add('taskModal1')
   model.classList.remove('taskModal')
   
}
);

document.getElementById("task-delete-btn").style.display = 'none';
document.getElementById("task-update-btn").style.display = 'none';
   


 