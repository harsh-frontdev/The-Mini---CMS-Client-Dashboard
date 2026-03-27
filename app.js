import { Storage } from "./modules/Storage.js";
import { UI } from "./modules/UI.js";

// All the Elements
const clientNameEl = document.querySelector('#client-name');
const platformEl = document.querySelector('#platform');
const budgetEl = document.querySelector('#budget');
const clientForm = document.querySelector('#client-form');
const syncBtnEl = document.querySelector('#sync-btn');
const loaderEl = document.querySelector('#loader');

// Global State
let projectsList = Storage.load();
const tableBody = document.querySelector('#project-body');

// Initial Load
UI.renderTable(projectsList, tableBody);

// Event Listener
// Add Project on Click
clientForm.addEventListener('submit', (e) => {
    e.preventDefault();
    projectsList = Storage.load();

    const newProject  = new Object({id: Date.now(), name: clientNameEl.value, platform: platformEl.value, budget: budgetEl.value, status: 'active'});
    projectsList.push(newProject);
    Storage.save(projectsList);
    // localStorage.setItem('projectsList', JSON.stringify(projectsList));
    // renderTable(projectsList);
    UI.renderTable(projectsList, tableBody);
    clientNameEl.value = '';
    budgetEl.value = '';
});

// Filter Projects
const searchBarEl = document.querySelector('#search-bar');
const minBudgetEl = document.querySelector('#min-budget');
const maxBudgetEl = document.querySelector('#max-budget');

function applyFilters(){
    const searchValue = searchBarEl.value.toLowerCase().trim();
    const minValue = Number(minBudgetEl.value) || 0;
    const maxValue = Number(maxBudgetEl.value) || Infinity;

    const filteredProjects = projectsList.filter((element) => {
        const matchesName = element.name.toLowerCase().includes(searchValue);
        const matchesMin = element.budget >= minValue;
        const matchesMax = element.budget <= maxValue;

        return matchesName && matchesMin && matchesMax;
    });

    UI.renderTable(filteredProjects, tableBody)
}

[searchBarEl, minBudgetEl, maxBudgetEl].forEach(el => {
    el.addEventListener('input', applyFilters)
});

// Delete Project
tableBody.addEventListener('click', (e) => {
    if(e.target.tagName == 'A'){
        projectsList = Storage.load();
        const projectToRemove = Number(e.target.getAttribute('data-id'));
        const updatedProjects = projectsList.filter((el) => el.id !== projectToRemove);
        Storage.save(updatedProjects);
        const updatedList = Storage.load()
        UI.renderTable(updatedList, tableBody);
    }
});

// Sync Data
async function syncData(duration){
    return new Promise((resolve, reject) => {
        tableBody.innerHTML = '';
        loaderEl.classList.remove('hidden')
        setTimeout(() => {
            loaderEl.classList.add('hidden')
            UI.renderTable(projectsList, tableBody);
            // renderTable(projectsList);
            resolve('Data Synced');
        } ,duration);
    });
}
syncBtnEl.addEventListener('click', () => {
    syncData(2000)
});