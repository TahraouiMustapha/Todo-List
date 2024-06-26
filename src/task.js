
const tasks = (function() {
    class Todos {
        constructor(title, desc, dueDate, priority) {
            this.index = 0
            this.title = title
            this.desc = desc
            this.dueDate = dueDate
            this.priority = priority
            this.completed = false
        }

    }

    class Project {
        constructor(title, array) {
            this.title = title
            this.array = array
        }
    }

    function createTodos(title, desc, dueDate,priority) {
        return new Todos(title, desc, dueDate, priority);
    }

    function createProject(title, array){
        return new Project(title, array);
    }

    return {
        Todos,
        createTodos,
        createProject,
    }
    
})();

export { tasks };
