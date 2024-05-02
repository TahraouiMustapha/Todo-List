import { tasks } from "./task.js";
import { storage } from "./storageHandler.js";
import myDeleteImage from './img/delete.svg';
import myEditImage from './img/edit.svg';
import myInfoImage from './img/info.svg';


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

    function createTaskDiv(taskObj) {
        const myTask = document.createElement('div');
        myTask.classList.add('task');
        
            const myDiv1 = document.createElement('div');
                const completed = document.createElement('div');
                completed.classList.add('completed');
                //rest the priority
                //rest the completed func

                const taskTitle = document.createElement('p');
                taskTitle.classList.add('title');
                taskTitle.textContent = taskObj.title;
            
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

    function addTodosHandler(){
        const dialog = document.createElement('dialog');
        const myForm = document.createElement('myform');

        const title = document.createElement('input'); 
        title.type = 'text';
        const desc = document.createElement('input');
        desc.type = 'text';
        const dueDate = document.createElement('input');
        dueDate.type = 'date' 

        const priority = document.createElement('select');
            const important = document.createElement('option');
            important.value = 'important';
            important.text = 'important';
            const normal = document.createElement('option');
            normal.value = 'normal';
            normal.text = 'normal';
            const not = document.createElement('option');
            not.value = 'not';    
            not.text = 'not really';

            priority.appendChild(important);
            priority.appendChild(normal);
            priority.appendChild(not);

        const btn = document.createElement('button');
        btn.textContent = 'add task';
        btn.type = 'submit';
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            const task = tasks.createTodos(title.value,
                            desc.value,
                        dueDate.value,
                        priority.value);
                        
        })

        myForm.appendChild(title);
        myForm.appendChild(desc);
        myForm.appendChild(dueDate);
        myForm.appendChild(priority);
        myForm.appendChild(btn);



        myForm.method = 'dialog';
        dialog.appendChild(myForm);
        document.body.appendChild(dialog); 
        dialog.show();
    }

    function addProjectHandler() {
        const projectContainer = document.querySelector('.bottom-side .projects-container');
        const myDialog = document.createElement('dialog');
        const myForm = document.createElement('form');

        const inputTitle = document.createElement('input');
        inputTitle.classList.add('new-project-title');
        inputTitle.required = true;
        
        const btn = document.createElement('button');
        btn.textContent = 'Add';
        btn.type = 'submit';
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            let newProject ;
            if(inputTitle.value != ''){
                newProject = tasks.createProject(inputTitle.value.toString());
                //2.create btn with data-title 
                projectContainer.appendChild(createProjectBtn(newProject.title));
                //3.add in local Storage
                storage.addInStorage(newProject);
            } 
            
        })


        myForm.appendChild(inputTitle);
        myForm.appendChild(btn);

        myDialog.appendChild(myForm);
        document.body.appendChild(myDialog);
        myDialog.show();
    }

    function showProject(dataTitle) {
        const main = document.querySelector('.main');

        const projectTitle = document.createElement('h2');
        projectTitle.classList.add('project-title');
        projectTitle.textContent = dataTitle;

        const projectTasks = document.createElement('div');
        projectTasks.classList.add('project-tasks');

            const head = document.createElement('div');
            head.classList.add('head');

                const headTitle = document.createElement('p');
                headTitle.textContent = `Tasks (0)`;//${storage.getLenght(dataTitle)}

                const headBtn = document.createElement('button');
                headBtn.textContent = '+';
                headBtn.id = 'add-task-btn';

                head.appendChild(headTitle);
                head.appendChild(headBtn);
            //show Tasks of project:
            const tasks = showTasks(dataTitle);
            tasks.classList.add('tasks');
                
            projectTasks.appendChild(head);
            projectTasks.appendChild(tasks);


        main.appendChild(projectTitle);
        main.appendChild(projectTasks);
    }

    function showTasks(dataTitle) {
        const myDiv = document.createElement('div');
        const myArray = storage.getTasksFormStorage(dataTitle);
        myArray.forEach((task) => {
            myDiv.appendChild(createTaskDiv(task));
        })

        return myDiv;
    }

    return {
        addTodosHandler,
        addProjectHandler,
        showProject,
        showTasks
    }
})()

export { handlerDom };