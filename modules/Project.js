// Project Class
export class Project {
    constructor(id, name, platform, budget){
        this.id = id,
        this.name = name,
        this.platform = platform,
        this.budget = Number(budget)
    }

    formatBudget(){
        return `$${this.budget.toLocaleString()}`;
    }
}