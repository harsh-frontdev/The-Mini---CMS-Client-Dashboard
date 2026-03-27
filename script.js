// Get Project List from Local Storage
let projectsList = JSON.parse(localStorage.getItem('projectsList') || '[]');

// All the Elements
const clientNameEl = document.querySelector('#client-name');
const platformEl = document.querySelector('#platform');
const budgetEl = document.querySelector('#budget');
const clientForm = document.querySelector('#client-form');
const searchBarEl = document.querySelector('#search-bar');
const syncBtnEl = document.querySelector('#sync-btn');
const projectTableEl = document.querySelector('#project-table');
const projectBodyEl = document.querySelector('#project-body');
const loaderEl = document.querySelector('#loader');

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

// Render Table with Data
function renderTable(data){
    projectBodyEl.innerHTML = '';
    if(data.length){
        data.forEach(element => {
            const project = new Project(element.name, element.platform, element.budget);
            projectBodyEl.innerHTML += `<tr><td>${project.name}</td><td>${project.platform}</td><td>${project.formatBudget()}</td><td>Active</td><td>Delete</td></tr>`
        });
    } else {
        projectBodyEl.innerHTML = `<tr><td colspan="5" style="text-align: center;">No Client Found</td></tr>`;
    }
}
renderTable(projectsList);

// Add Project on Click
clientForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newProject  = new Object({id: Date.now(), name: clientNameEl.value, platform: platformEl.value, budget: budgetEl.value, status: 'active'});
    projectsList.push(newProject);
    localStorage.setItem('projectsList', JSON.stringify(projectsList));
    renderTable(projectsList);
    clientNameEl.value = '';
    budgetEl.value = '';
})

// Filter Projects
searchBarEl.addEventListener('input', (e) => {
    const searchValue = e.target.value.toLowerCase().trim();

    if(searchValue.length > 0){
        projectBodyEl.innerHTML = '';
        projectsList = JSON.parse(localStorage.getItem('projectsList') || '[]');
        
        const filteredProjects = projectsList.filter((element) => element.name.toLowerCase().includes(searchValue));
        renderTable(filteredProjects);
    } else {
        renderTable(projectsList);
    }
})

// Sync Data
async function syncData(duration){
    return new Promise((resolve, reject) => {
        projectBodyEl.innerHTML = '';
        loaderEl.classList.remove('hidden')
        setTimeout(() => {
            loaderEl.classList.add('hidden')
            renderTable(projectsList);
            resolve('Data Synced');
        } ,duration);
    });
}

syncBtnEl.addEventListener('click', () => {
    syncData(2000)
});
