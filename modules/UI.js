import {Project} from './Project.js'

export const UI = {
    renderTable(data, container){
        container.innerHTML = '';
        if(data.length === 0){
            container.innerHTML = `<tr><td colspan="5" style="text-align: center;">No Client Found</td></tr>`;
        }

        data.forEach(element => {
            const proj = new Project(element.id, element.name, element.platform, element.budget);
            const row =  `
                <tr id="${proj.id}">
                    <td>${proj.name}</td>
                    <td>${proj.platform}</td>
                    <td>${proj.formatBudget()}</td>
                    <td>Active</td>
                    <td><a data-id="${proj.id}" class="del-btn" id="del-btn">Delete</a></td>
                </tr>`;
            container.innerHTML += row;
        });
    }
}