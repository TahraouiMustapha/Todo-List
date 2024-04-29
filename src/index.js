import { compareAsc, format } from "date-fns";
import './style.css';
import { tasks } from './task.js';
import { handlerDom } from "./handlerDom.js";

const addTodosBtn = document.querySelector('#add-task-btn');

addTodosBtn.onclick = () => { handlerDom.addTodosHandler() }






