// Get Project List from Local Storage
const projectsList = localStorage.getItem('projectsList');
if(projectsList === null){
    console.log('Project List Not Found');
    localStorage.setItem('projectsList', '');
}

// All the Elements
const clientNameEl = document.querySelector('#client-name');
const platformEl = document.querySelector('#platform');
const budgetEl = document.querySelector('#budget');
const clientForm = document.querySelector('#client-form');
const searchBarEl = document.querySelector('#search-bar');
const syncBtnEl = document.querySelector('#sync-btn');
const projectTableEl = document.querySelector('#project-table');
const projectBodyEl = document.querySelector('#project-body');

// Project Class
class Project {
    constructor(name, platform, budget){
        this.name = name,
        this.platform = platform,
        this.budget = budget
    }

    formatBudget(){
        return `$${this.budget}`;
    }
}
const newProject = new Project('Car', 'Script', 100);

// Render Table with Data
function renderTable(data){
    if(data){
        console.log(data);
    }else {
        projectBodyEl.innerHTML += `<tr><td colspan="5" style="text-align: center;">No Client Found</td></tr>`;
    }
}
renderTable(projectsList);

// Add Project on Click
clientForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Got Data');
})