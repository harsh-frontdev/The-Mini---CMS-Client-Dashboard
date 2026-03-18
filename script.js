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
const submitEl = document.querySelector('#submit');
const searchBarEl = document.querySelector('#search-bar');
const syncBtnEl = document.querySelector('#sync-btn');
const projectTableEl = document.querySelector('#project-table');

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
    console.log(data);
}
renderTable(projectsList);