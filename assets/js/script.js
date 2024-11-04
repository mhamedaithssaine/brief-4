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
const uptade = document.getElementById("task-update-btn");
const delet = document.getElementById("task-delete-btn");
let i=1 ;


  


function oppentask(){
  model.classList.add('taskModal1');
    model.classList.remove('taskModal');
    taskForm.reset(); // Réinitialise le formulaire
}

// Afficher le formulaire avec un clic sur "Add Task"
openTask.addEventListener('click', () => {
    oppentask();
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
//closse Modale 
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
        id:i++, 
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
      
           <button  class="list-group-item d-flex border-top-0" style="width:100% ;"  >
                  <div class="me-3 fs-16px">
                    <i class="fa-regular fa-circle-question" style="color: #47c266;"></i>
                  </div>
                  <div class="txttask">
                    <h1 class="">
                    ${task.title}
                    </h1>
                    <div class="">
                      <div class="">#${task.id+1} created in ${task.date}</div>
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
    event.preventDefault(); 
    addTask();
    saveTasksToLocalStorage();
});



// Sauvegarder la tâche en cliquant sur le bouton "Save" ou "Update"
uptade.addEventListener('click', (event) => {
    event.preventDefault();
        updateTask(); // Si une tâche est en cours de modification, appelle updateTask
    
    saveTasksToLocalStorage(); // Sauvegarde les tâches dans le local storage
    window.location.reload();
});



// Fonction pour afficher les tâches dans la section appropriée
function renderTask(task) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.innerHTML = `
        <button class="list-group-item d-flex border-top-0" style="width:100%;">
            <div class="me-3 fs-16px">
                <i class="fa-regular fa-circle-question" style="color: #47c266;"></i>
            </div>
            <div class="txttask">
                <h1>${task.title}</h1>
                <div>#${task.id} created in ${task.date}</div>
                <div>${task.description}</div>
                <div>
                    <span class="btn btn-primary task-action-btn">${task.priority}</span>
                    <span class="btn btn-white">${task.type}</span>
                </div>
            </div>
        </button>
    `;

    // event click sur task pour ouvrir le formulaire avec les valeurs de la tâche
    taskElement.addEventListener('click', () => {
      document.getElementById("task-update-btn").style.display = 'block';
      document.getElementById("task-delete-btn").style.display = 'block';
        model.classList.add('taskModal1');
        model.classList.remove('taskModal');
        fillTaskForm(task); // 
        editingTaskId = task.id; // Définit l'ID de la tâche en cours de modification
        
    });

    if (task.status === "To Do") {
        todo.appendChild(taskElement);
    } else if (task.status === "In Progress") {
        inprogress.appendChild(taskElement);
    } else if (task.status === "Done") {
        done.appendChild(taskElement);
    }
}

// Fonction pour remplir le formulaire avec les données de la tâche
function fillTaskForm(task) {
    taskTitle.value = task.title;
    document.querySelector(`input[name="task-type"][value="${task.type}"]`).checked = true;
    taskPriority.value = task.priority;
    taskStatus.value = task.status;
    taskDescription.value = task.description;
    taskDate.value = task.date;
}

// Variable pour stocker l'ID de la tâche en cours de modification
let editingTaskId = null;

// Fonction pour ajouter une nouvelle tâche
function addTask() {
    const title = taskTitle.value;
    const type = document.querySelector('input[name="task-type"]:checked').value;
    const priority = taskPriority.value;
    const status = taskStatus.value;
    const description = taskDescription.value;
    const date = taskDate.value;

    const newTask = {
        id: i++, 
        title: title,
        type: type,
        priority: priority,
        status: status,
        description: description,
        date: date
    };

    tasks.push(newTask);
    renderTask(newTask);
    closeModal();
    editingTaskId = 0; // Réinitialise l'ID de la tâche
    document.getElementById("task-save-btn").textContent = "Save"; // Remet le bouton en "Save"
}

// Fonction pour mettre à jour une tâche existante
function updateTask() {
    const title = taskTitle.value;
    const type = document.querySelector('input[name="task-type"]:checked').value;
    const priority = taskPriority.value;
    const status = taskStatus.value;
    const description = taskDescription.value;
    const date = taskDate.value;

    // Trouve la tâche dans le tableau et met à jour ses valeurs
    const taskIndex = tasks.findIndex(task => task.id === editingTaskId);
    if (taskIndex !== -1) {
        tasks[taskIndex] = {
            id: editingTaskId, // Utilise l'ID existant
            title: title,
            type: type,
            priority: priority,
            status: status,
            description: description,
            date: date
        };
    }
    // refreshTasks(); // Recharge l'affichage des tâches
    closeModal();
    editingTaskId = null; // Réinitialise l'ID de la tâche
    document.getElementById("task-update-btn").textContent = "uptadte"; // Remet le bouton en "Save"
}

// Fonction pour sauvegarder les tâches dans le local storage
function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Fonction pour récupérer les tâches depuis le local storage au chargement de la page
(() => {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => renderTask(task)); // Affiche toutes les tâches récupérées
})();

// Fonction pour recharger l'affichage des tâches
function refreshTasks() {
    todo.innerHTML = '';
    inprogress.innerHTML = '';
    done.innerHTML = '';

    tasks.forEach(task => renderTask(task));
}

// Fonction pour fermer le formulaire modal
function closeModal() {
    model.classList.add('taskModal');
    model.classList.remove('taskModal1');
    taskForm.reset(); // Réinitialise le formulaire
}



// click du bouton de suppression

delet.addEventListener('click', (event) => {
  event.preventDefault();
  deleteTask(); // Appeler la fonction deleteTask pour supprimer la tâche
});

function deleteTask() {
  // Vérifier si une tâche est en cours d'édition (via editingTaskId)
  if (editingTaskId !== null) {
      // Trouver l'index de la tâche à supprimer
      const taskIndex = tasks.findIndex(task => task.id === editingTaskId);

      // Vérifier si l'index est valide (c'est-à-dire si la tâche existe)
      if (taskIndex !== -1) {
          // Supprimer la tache a l'index trouvé
          tasks.splice(taskIndex, 1);
          saveTasksToLocalStorage();

          refreshTasks();
      }
      
      closeModal();
  }
}
