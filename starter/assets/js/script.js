// Sélection des éléments HTML
const model = document.getElementById("modal-task");
const openTask = document.getElementById("task-add");
const cancel = document.getElementById("cancel");
const fermer = document.getElementById("fermer");
const taskForm = document.getElementById("form-task");
const taskTitle = document.getElementById('task-title');
const taskPriority = document.getElementById('task-priority');
const taskStatus = document.getElementById('task-status');
const taskDescription = document.getElementById('task-description');
const taskDate = document.getElementById('task-date');
const save = document.getElementById("task-save-btn");
const todo = document.getElementById("to-do-tasks");
const done = document.getElementById("done-tasks");
const inprogress = document.getElementById("in-progress-tasks");
const buttontask =document.querySelector('.buttontask');
let i=1 ;
// Afficher le formulaire avec un clic sur "Add Task"
openTask.addEventListener('click', () => {
    model.classList.add('taskModal1');
    model.classList.remove('taskModal');
    taskForm.reset(); // Réinitialise le formulaire
});

// Masquer les boutons de suppression et de mise à jour au démarrage
document.getElementById("task-delete-btn").style.display = 'none';
document.getElementById("task-update-btn").style.display = 'none';

// Fermer le formulaire avec "Cancel" ou "Fermer"
fermer.addEventListener('click', () => {
    closeModal();
});

cancel.addEventListener('click', () => {
    closeModal();
});

function closeModal() {
    model.classList.add('taskModal');
    model.classList.remove('taskModal1');
    taskForm.reset(); // Réinitialise le formulaire
}

// Tableau pour stocker les tâches
let tasks = [];

// Fonction pour ajouter une nouvelle tâche
function addTask() {
    // Récupère les valeurs des champs de formulaire
    const title = taskTitle.value;
    const type = document.querySelector('input[name="task-type"]:checked').value;
    const priority = taskPriority.value;
    const status = taskStatus.value;
    const description = taskDescription.value;
    const date = taskDate.value;

    // Créer un objet de tâche
    const newTask = {
        id:i++, // Utilise un ID unique basé sur le timestamp
        title: title,
        type: type,
        priority: priority,
        status: status,
        description: description,
        date: date
    };

    // Ajoute la nouvelle tâche au tableau des tâches
    tasks.push(newTask);

    // Ajoute la tâche dans l'interface HTML
    renderTask(newTask);

    // Ferme le modal
    closeModal();
}



// Fonction pour afficher une tâche dans la section correspondante
function renderTask(task) {
    // Crée un nouvel élément de tâche
    
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.innerHTML = `
      
           <button class="buttontask" >
                  <div class="">
                    <i class=""></i>
                  </div>
                  <div class="txttask">
                    <h1 class="">
                    ${task.title}
                    </h1>
                    <div class="">
                      <div class="">#${task.id} created in ${task.date}</div>
                      <div
                        class=""
                        title="There is hardly anything more frustrating than having to look for current requirements in tens of comments under the actual description or having to decide which commenter is actually authorized to change the requirements. The goal here is to keep all the up-to-date requirements and details in the main/primary description of a task. Even though the information in comments may affect initial criteria, just update this primary description accordingly."
                      >
                      ${task.description}
                      </div>
                    </div>
                    <div class="">
                      <span class="btn btn-primary task-action-btn">${task.priority}</span>
                      <span class="btn btn-white">${task.type}</span>
                    </div>
                  </div>
                </button>
    `;

    // Ajoute l'élément de tâche à la section correspondante en fonction de son statut
    if (task.status === "To Do") {
        todo.appendChild(taskElement);
    } else if (task.status === "In Progress") {
        inprogress.appendChild(taskElement);
    } else if (task.status === "Done") {
        done.appendChild(taskElement);
    }

}

// Sauvegarder la tâche en cliquant sur le bouton "Save"
save.addEventListener('click', (event) => {
    event.preventDefault(); // Empêche le rechargement de la page
    addTask();
});

