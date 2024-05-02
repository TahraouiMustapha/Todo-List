import { format } from "date-fns";

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
                new Todos('one','hihi ji',format(new Date(2024, 2, 11), "yyyy-MM-dd"), 'first'),
                new Todos('two','hihi ji',format(new Date(2024, 2, 11), "yyyy-MM-dd"), 'first'),
                new Todos('three','hihi ji',format(new Date(2024, 2, 11), "yyyy-MM-dd"), 'first'),
                new Todos('four','hihi ji',format(new Date(2024, 2, 11), "yyyy-MM-dd"), 'first'),
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
