
const tasks = (function() {
    class Todos {
        constructor(title, desc, dueDate, priority) {
            this.title = title
            this.desc = desc
            this.dueDate = dueDate
            this.priority = priority
            this.completed = false
        }
    }

    class Project {
        constructor(title) {
            this.title = title
            this.array = [
                {
                    title: 'title',
                    content: 'leshommes'
                },
                {
                    title: 'title',
                    content: 'leshommes'
                },
                {
                    title: 'title',
                    content: 'leshommes'
                }
            ]
        }
    }

    function createTodos(title, desc, dueDate,priority) {
        return new Todos(title, desc, dueDate, priority);
    }

    function createProject(title){
        return new Project(title);
    }

    return {
        createTodos,
        createProject
    }
    
})();

export { tasks };
