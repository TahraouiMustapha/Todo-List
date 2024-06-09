import { tasks } from "./task.js";
import { storage } from "./storageHandler.js";
import { dialogFactory } from "./dialogModule.js";
import myDeleteImage from './img/delete.svg';
import myEditImage from './img/edit.svg';
import myInfoImage from './img/info.svg';
import myDoneImage from './img/done.svg';


const update = (function() {
    
    function mainUpdate() {
        let firstTitle;
        if(!storage.isEmpty()) {
            firstTitle = localStorage.key(0);
            handlerDom.showProject(firstTitle);
        }
    }

    function menuUpdate() {
        const projectContainer = document.querySelector('.bottom-side .projects-container');
        const arrayTitles = storage.getAllProjectTitles();

        arrayTitles.forEach((title) => {
            projectContainer.appendChild(handlerDom.createProjectBtn(title));
        })
    }


    function tasksContainerUpdate(dataTitle) {
        let tasksContainer = document.querySelector('.tasks');
        tasksContainer.remove();
        const projectTasks = document.querySelector('.project-tasks');
        const newTasksContainer = handlerDom.showTasks(dataTitle);

        newTasksContainer.classList.add('tasks');
        projectTasks.appendChild(newTasksContainer);

        const head = document.querySelector('.head p');
        head.textContent = `Tasks (${storage.getLengthProject(dataTitle)})`;
    }

    function toggleDoneImage(myDiv, isCompleted) {
        isCompleted ? myDiv.style.backgroundImage = `url(${myDoneImage})`: myDiv.style.backgroundImage = 'none'; 
    }

    function toggleTitleTask(myTitle, isCompleted) {
        isCompleted ? myTitle.style.textDecoration = 'line-through': myTitle.style.textDecoration = 'none';
    }

    function priorityColor(priority) {
        switch(priority) {
            case 'important':
                return 'red';
            case 'little':
                return 'orange';
            case 'not':
                return 'yellow';

        }
    }

    return {
        mainUpdate,
        menuUpdate,
        toggleDoneImage,
        toggleTitleTask,
        priorityColor,
        tasksContainerUpdate,
    };
})();

const handlerDom = (function (){

    function createProjectBtn(dataTitle) {
        const btn = document.createElement('div');
        btn.classList.add('menu-btn');
        btn.dataset.title = dataTitle;
        btn.textContent = dataTitle;
        btn.addEventListener('click', (e) => {
            handlerDom.showProject(e.target.dataset.title);
        });

        return btn;
    }

    function createTaskDiv(taskObj, projectTitle) {
        const myTask = document.createElement('div');
        myTask.classList.add('task');
        
            const myDiv1 = document.createElement('div');
            myDiv1.classList.add('myDiv1');
            myDiv1.dataset.index = taskObj.index;
                const completed = document.createElement('div');
                completed.classList.add('circle');
                completed.style.backgroundColor = update.priorityColor(taskObj.priority);

                const taskTitle = document.createElement('p');
                taskTitle.classList.add('title');
                taskTitle.textContent = taskObj.title;
                

                myDiv1.addEventListener('click', (e) => {
                    let index = Number(e.currentTarget.dataset.index);
                    let myCompletedVar = handleTaskClick(index, projectTitle);

                    // update Task Dom
                    update.toggleTitleTask(taskTitle, myCompletedVar);
                    update.toggleDoneImage(completed, myCompletedVar);
                })
            
                myDiv1.appendChild(completed);
                myDiv1.appendChild(taskTitle);

            const myDiv2 = document.createElement('div');
            myDiv2.classList.add('details-side');
                const myDate = document.createElement('div');
                myDate.classList.add('date');
                myDate.textContent = taskObj.dueDate;

                const img1 = new Image();
                img1.src = myEditImage;

                const img2 = new Image();
                img2.src = myInfoImage;

                const img3 = new Image();
                img3.src = myDeleteImage; 

                myDiv2.appendChild(myDate);
                myDiv2.appendChild(img1);
                myDiv2.appendChild(img2);
                myDiv2.appendChild(img3);

            myTask.appendChild(myDiv1);
            myTask.appendChild(myDiv2);

        return myTask;
    }

    function showProject(dataTitle) {
        const main = document.querySelector('.main');
        main.innerHTML = '';

        const projectTitle = document.createElement('h2');
        projectTitle.classList.add('project-title');
        projectTitle.textContent = dataTitle;

        const projectTasks = document.createElement('div');
        projectTasks.classList.add('project-tasks');

            const head = document.createElement('div');
            head.classList.add('head');

                const headTitle = document.createElement('p');
                headTitle.textContent = `Tasks (${storage.getLengthProject(dataTitle)})`;

                const headBtn = document.createElement('button');
                headBtn.textContent = '+';
                headBtn.id = 'add-task-btn';
                headBtn.addEventListener('click',() => {
                    dialogFactory.addTask(dataTitle);
                })

                head.appendChild(headTitle);
                head.appendChild(headBtn);
            //show Tasks of project:
            const tasksContainer = showTasks(dataTitle);
            tasksContainer.classList.add('tasks');
                
            projectTasks.appendChild(head);
            projectTasks.appendChild(tasksContainer);


        main.appendChild(projectTitle);
        main.appendChild(projectTasks);
    }

    function showTasks(dataTitle) {
        let i = 0;
        const myDiv = document.createElement('div');
        const myArray = storage.getTasksFormStorage(dataTitle);
        myArray.forEach((task) => {
            task.index = i++;
            //add project title to get the task from localStorage
            myDiv.appendChild(createTaskDiv(task, dataTitle));
        })

        return myDiv;
    }

    function updateDisplay() {
        update.menuUpdate();
        update.mainUpdate();
    }

    //to handle task click
    function handleTaskClick(index, projectTitle) {
        //to toggle or setting todos as complete
        let tasksStorage = storage.getTasksFormStorage(projectTitle);
        tasksStorage[index].completed = !tasksStorage[index].completed;

        const myTask = tasksStorage[index].completed;
        //push the actaul project in localStorage
        let project = tasks.createProject(projectTitle, tasksStorage);
        storage.addInStorage(project);

        return myTask;
    }

    return {
        showProject,
        showTasks,
        createProjectBtn,
        createTaskDiv,
        updateDisplay
    }
})()

const eventHandlers = (function() {
    function handleAddNewTask(dataTitle) {
        let title = document.querySelector('dialog[open] #title').value;
        let desc = document.querySelector('dialog[open] #desc').value;
        let dueDate = document.querySelector('dialog[open] #dueDate').value;
        let priority = document.querySelector('dialog[open] #priority').value;
    
    
        if(title != '' && dueDate != '') {
            let newTodos = tasks.createTodos(title, desc, dueDate, priority);
            //get Project Array;
            let myArray = storage.getTasksFormStorage(dataTitle);
            //push the task
            myArray.push(newTodos);
            //push project in localStorage
            let newProject = tasks.createProject(dataTitle, myArray);
            storage.addInStorage(newProject);
            
            update.tasksContainerUpdate(dataTitle);
            closeDialog();
        }
    }

    function handleAddNewProject() {
        const projectContainer = document.querySelector('.bottom-side .projects-container');
        const titleValue = document.querySelector('dialog[open] #title').value;

        if(titleValue != '') {
            let newProject = tasks.createProject(titleValue, []);
            projectContainer.appendChild( handlerDom.createProjectBtn(newProject.title));
            storage.addInStorage(newProject);
            closeDialog();
        } 
    }

    function closeDialog() {
        const dialog = document.querySelector('dialog[open]');
        dialog.close();
    }

    return {
        handleAddNewTask,
        handleAddNewProject,
        closeDialog
    }

})()

export { handlerDom, eventHandlers };