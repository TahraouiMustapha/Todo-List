
const storage = (function() {
    
    function addInStorage(project) {
        localStorage.setItem(project.title, 
                            JSON.stringify(project.array));
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

    function isEmpty() {
        return localStorage.length == 0 ? true : false ;
    }

    return {
        addInStorage,
        getTasksFormStorage,
        getLengthProject,
        getAllProjectTitles,
        isEmpty 
    }
})();

export { storage };