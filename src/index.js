import { compareAsc, format } from "date-fns";
import './style.css';
import { tasks } from './task.js';
import { handlerDom } from "./handlerDom.js";
import { storage } from "./storageHandler.js";

handlerDom.updateDisplay();

const addProjectBtn = document.querySelector('#add-project-btn');
addProjectBtn.addEventListener('click', () => { handlerDom.addProjectHandler() });

let newTask = tasks.createTodos('title','desc', '2009-11-02', 'important');




