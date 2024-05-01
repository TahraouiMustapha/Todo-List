const storage = (function() {
    
    function addInStorage(project) {
        localStorage.setItem(project.title, 
                            JSON.stringify(project.array));
    }

    return {
        addInStorage
    }
})();

export { storage };