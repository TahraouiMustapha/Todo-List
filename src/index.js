import './style.css';
import { handlerDom } from "./handlerDom.js";
import { dialogFactory } from './dialogModule.js';

handlerDom.updateDisplay();

const addProjectBtn = document.querySelector('#add-project-btn');
addProjectBtn.addEventListener('click', () => { dialogFactory.createProjectDialog() });





