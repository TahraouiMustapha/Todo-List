import { remove } from "lodash";

const storage = (function() {
    
    function addInStorage(project) {
        localStorage.setItem(project.title, 
                            JSON.stringify(project.array));
    }

    function removeInStorage(project) {
        localStorage.removeItem(project);
    }

    function getTasksFormStorage(projectTitle) {
        const myProject = JSON.parse(localStorage.getItem(projectTitle));
        return myProject;
    }

    function getAllProjectTitles() {
        let arrayTitles = [];
        for (let i=0; i < localStorage.length; i++) {
            arrayTitles.push(localStorage.key(i));
        }

        return arrayTitles;
    }

    function getLengthProject(title) {
        let myArray = JSON.parse(localStorage.getItem(title));
        return myArray.length;
    }

    function getLocalStorageLength() {
        return localStorage.length;
    }

    function isEmpty() {
        return localStorage.length == 0 ? true : false ;
    }

    return {
        addInStorage,
        getTasksFormStorage,
        getLengthProject,
        getAllProjectTitles,
        removeInStorage,
        getLocalStorageLength,
        isEmpty 
    }
})();

export { storage };