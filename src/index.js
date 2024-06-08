import './style.css';
import { handlerDom } from "./handlerDom.js";
import { eventHandlers } from './handlerDom.js';

handlerDom.updateDisplay();

const addProjectBtn = document.querySelector('#add-project-btn');
addProjectBtn.addEventListener('click', () => { handlerDom.addProject() });





