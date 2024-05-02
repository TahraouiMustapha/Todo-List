
const storage = (function() {
    
    function addInStorage(project) {
        localStorage.setItem(project.title, 
                            JSON.stringify(project.array));
    }

    function getTasksFormStorage(projectTitle) {
        const myProject = JSON.parse(localStorage.getItem(projectTitle));
        return myProject;
    }

    function getLengthProject(title) {
        let myArray = JSON.parse(localStorage.getItem(title));
        return myArray.length;
    }

    return {
        addInStorage,
        getTasksFormStorage,
        getLengthProject
    }
})();

export { storage };