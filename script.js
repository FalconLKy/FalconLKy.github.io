// Get the table and form elements
const projectTable = document.getElementById('project-table');
const projectList = document.getElementById('project-list');
const addProjectForm = document.getElementById('add-project-form');

// Initialize an empty array to store projects
let projects = [];

// Add event listener to the form to add new projects
addProjectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const projectName = document.getElementById('project-name').value;
    const expectedHours = document.getElementById('expected-hours').value;
    addProject(projectName, expectedHours);
    document.getElementById('project-name').value = '';
    document.getElementById('expected-hours').value = '';
});

// Function to add a new project
function addProject(projectName, expectedHours) {
    const project = {
        name: projectName,
        expectedHours: expectedHours,
        elapsedTime: 0,
        timer: null
    };
    projects.push(project);
    renderProjectList();
}

// Function to render the project list
function renderProjectList() {
    projectList.innerHTML = '';
    projects.forEach((project) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${project.name}</td>
            <td>${project.expectedHours} hours</td>
            <td>${formatTime(project.elapsedTime)}</td>
            <td>
                <button class="start-button" data-project-index="${projects.indexOf(project)}">Start</button>
                <button class="pause-button" data-project-index="${projects.indexOf(project)}" disabled>Pause</button>
            </td>
        `;
        projectList.appendChild(row);
    });
    addEventListenersToButtons();
}

// Function to add event listeners to the start and pause buttons
function addEventListenersToButtons() {
    const startButtons = document.querySelectorAll('.start-button');
    const pauseButtons = document.querySelectorAll('.pause-button');
    startButtons.forEach((button) => {
        button.addEventListener('click', () => {
            startTimer(button.dataset.projectIndex);
        });
    });
    pauseButtons.forEach((button) => {
        button.addEventListener('click', () => {
            pauseTimer(button.dataset.projectIndex);
        });
    });
}

// Function to start the timer
function startTimer(projectIndex) {
    const project = projects[projectIndex];
    project.timer = setInterval(() => {
        project.elapsedTime += 1;
        renderProjectList();
    }, 1000);
    const startButton = document.querySelector(`.start-button[data-project-index="${projectIndex}"]`);
    startButton.disabled = true;
    const pauseButton = document.querySelector(`.pause-button[data-project-index="${projectIndex}"]`);
    pauseButton.disabled = false;
}

// Function to pause the timer
function pauseTimer(projectIndex) {
    const project = projects[projectIndex];
    clearInterval(project.timer);
    project.timer = null;
    const pauseButton = document.querySelector(`.pause-button[data-project-index="${projectIndex}"]`);
    pauseButton.disabled = true;
    const startButton = document.querySelector(`.start-button[data-project-index="${projectIndex}"]`)

}
