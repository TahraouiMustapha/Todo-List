import { compareAsc, format } from "date-fns";
import './style.css';
import { tasks } from './task.js';
import { handlerDom } from "./handlerDom.js";
import myDeleteImage from './img/delete.svg';
import myEditImage from './img/edit.svg';
import myInfoImage from './img/info.svg';

const addTodosBtn = document.querySelector('#add-task-btn');

addTodosBtn.onclick = () => { handlerDom.addTodosHandler() }

const addProjectbtn = document.querySelector('#add-project-btn');
addProjectbtn.onclick = () => { handlerDom.addProjectHandler() }

handlerDom.showTasks('myProject');

const task = document.querySelector('.details-side');
const img1 = new Image();
img1.src = myDeleteImage;
task.appendChild(img1);

const img2 = new Image();
img2.src = myInfoImage;
task.appendChild(img2);

const img3 = new Image();
img3.src = myEditImage;
task.appendChild(img3);



