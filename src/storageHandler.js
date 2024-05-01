const storage = (function() {
    
    function addInStorage(project) {
        localStorage.setItem(project.title, 
                            JSON.stringify(project.array));
    }

    function getTasksFormStorage(projectTitle) {
        const myProject = JSON.parse(localStorage.getItem(projectTitle));
        return myProject;
    }

    return {
        addInStorage,
        getTasksFormStorage
    }
})();

export { storage };