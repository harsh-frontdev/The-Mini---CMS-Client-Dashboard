export const Storage = {
    save(projectsList){
        localStorage.setItem('projectsList', JSON.stringify(projectsList))
    },
    load(){
        return JSON.parse(localStorage.getItem('projectsList'));
    }
}