
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

    function createTodos(title, desc, dueDate,priority) {
        return new Todos(title, desc, dueDate, priority);
    }

    return {
        createTodos
    }
    
})();

export { tasks };
