import { compareAsc, format } from "date-fns";
import './style.css';
import { tasks } from './task.js';

let todo = tasks.createTodos('tit', 'sdfuh',
                format(new Date(2024, 4, 23), "yyyy-MM-dd"),
                'important');








