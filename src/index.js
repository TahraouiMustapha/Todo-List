import { compareAsc, format } from "date-fns";
import { Todos } from './todosClass.js';



let todos = new Todos('tt', 'desc', 
            format(new Date(2024, 4, 23), "yyyy-MM-dd"), 'important');




