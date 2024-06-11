import { format } from "date-fns";
import { eventHandlers } from "./handlerDom.js";


const dialogFactory = (function() {
    function createHeadTitle(dialogKind) {
        const dialogHead = document.createElement('div');
        dialogHead.classList.add('dialogHead');
            const headTitle = document.createElement('h2');
            headTitle.classList.add('headTitle');
            headTitle.textContent = dialogKind;

            const closeX = document.createElement('div');
            closeX.classList.add('closeX');
            closeX.textContent = 'x';
            closeX.addEventListener('click', eventHandlers.closeDialog );

            dialogHead.appendChild(headTitle);
            dialogHead.appendChild(closeX);

        return dialogHead;
    }

    function createTitleInput(title) {
        const myDiv = document.createElement('div');
            const myLabel = document.createElement('label');
            myLabel.setAttribute('for', 'title');
            myLabel.textContent = 'Title';

            const myInput = document.createElement('input');
            myInput.type = 'text';
            //to fill the input 
            myInput.value = title;
            myInput.required = true;
            myInput.setAttribute('id', 'title');
            
            myDiv.appendChild(myLabel);
            myDiv.appendChild(myInput);

        return myDiv;              
    }

    function createTextArea(desc) {
        const myDiv = document.createElement('div');
            const myLabel = document.createElement('label');
            myLabel.setAttribute('for', 'desc');
            myLabel.textContent = 'Description';

            const myTextArea = document.createElement('textarea');
            myTextArea.rows = '4';
            //to fill the textarea 
            myTextArea.value = desc;
            myTextArea.setAttribute('id', 'desc');
            
            myDiv.appendChild(myLabel);
            myDiv.appendChild(myTextArea);

        return myDiv;
    }

    function createDateInput(date) {
        const myDiv = document.createElement('div');
            const myLabel = document.createElement('label');
            myLabel.setAttribute('for', 'dueDate');
            myLabel.textContent = 'Due Date';

            const myInput = document.createElement('input');
            myInput.type = 'date';
            //to fill the input 
            myInput.value = date;
            myInput.setAttribute('id', 'dueDate');

            let currentDay = format(new Date(), "yyyy-MM-dd");
            myInput.setAttribute('min', currentDay);
            
            myDiv.appendChild(myLabel);
            myDiv.appendChild(myInput);

        return myDiv; 
    }

    function createPrioritySelect(priority) {
        const myDiv = document.createElement('div');
            const myLabel = document.createElement('label');
            myLabel.setAttribute('for', 'priority');
            myLabel.textContent = 'Priority';

            const mySelect = document.createElement('select');
            mySelect.name = 'priority';
            mySelect.id = 'priority';
                //create the 3 options:
                const option1 = document.createElement('option');
                option1.value = 'important';
                option1.textContent = 'important';
                const option2 = document.createElement('option');
                option2.value = 'little';
                option2.textContent = 'little bit';
                const option3 = document.createElement('option');
                option3.value = 'not';
                option3.textContent = 'not important';

                mySelect.appendChild(option1);
                mySelect.appendChild(option2);
                mySelect.appendChild(option3);

            myDiv.appendChild(myLabel);
            myDiv.appendChild(mySelect);

        return myDiv; 
    }

    //function to create textfield for information task
    function createTextField(title, content) {
        const myDiv = document.createElement('div');
        myDiv.classList.add('textField');
            const infoName = document.createElement('p');
            infoName.classList.add('infoName');
            infoName.textContent = title;

            const p = document.createElement('p');
            p.textContent = content;

            myDiv.appendChild(infoName);
            myDiv.appendChild(p);
        return myDiv;
    }

    function addTask(dataTitle) {
        const myDialog = document.createElement('dialog');
        const myForm = document.createElement('form');

        //create inputs div:
        const inputsDiv = document.createElement('div');
        inputsDiv.classList.add('inputs');
        //create input title, desc ..inside myD inputs div
            inputsDiv.appendChild(createTitleInput(''));
            inputsDiv.appendChild(createTextArea(''));
            inputsDiv.appendChild(createDateInput(''));
            inputsDiv.appendChild(createPrioritySelect(''));

        //create div for btns
        const dialogBtns = document.createElement('div');
        dialogBtns.classList.add('dialogBtns');
            const btn = document.createElement('button');
            btn.textContent = 'Add';
            btn.type = 'submit';
            btn.addEventListener('click', (event) => {
                event.preventDefault();
                eventHandlers.handleAddNewTask(dataTitle);
            })

            const cancelBtn = document.createElement('button');
            cancelBtn.textContent = 'Cancel';
            cancelBtn.type = 'button';

            cancelBtn.addEventListener('click', eventHandlers.closeDialog );
               
            dialogBtns.appendChild(cancelBtn);
            dialogBtns.appendChild(btn);


        myForm.appendChild(createHeadTitle('Add New Task'));
        myForm.appendChild(inputsDiv);
        myForm.appendChild(dialogBtns);

        myDialog.appendChild(myForm);
        document.body.appendChild(myDialog);
        myDialog.showModal();

    }

    function createProjectDialog() {
        const myDialog = document.createElement('dialog');
        const myForm = document.createElement('form');

           //create inputs div:
            const inputsDiv = document.createElement('div');
            inputsDiv.classList.add('inputs');
                inputsDiv.appendChild(createTitleInput(''));
            //create div for btns
            const dialogBtns = document.createElement('div');
            dialogBtns.classList.add('dialogBtns');
                const addBtn = document.createElement('button');
                addBtn.textContent = 'Add';
                addBtn.type = 'submit';
                addBtn.addEventListener('click', (event) => {
                    event.preventDefault();
                    eventHandlers.handleAddNewProject();
                })

                const cancelBtn = document.createElement('button');
                cancelBtn.textContent = 'Cancel';
                cancelBtn.type = 'button';

                cancelBtn.addEventListener('click', eventHandlers.closeDialog );

            dialogBtns.appendChild(cancelBtn);
            dialogBtns.appendChild(addBtn);


        myForm.appendChild(createHeadTitle('Add New Project'));
        myForm.appendChild(inputsDiv);
        myForm.appendChild(dialogBtns);

        myDialog.appendChild(myForm);
        document.body.appendChild(myDialog);
        myDialog.showModal();
    }

    function createInfoDialog(taskObj) {
        const myDialog = document.createElement('dialog');

            const textFieldsDiv = document.createElement('div');
            textFieldsDiv.classList.add('textfields-div');
                textFieldsDiv.appendChild(createTextField('Title :', taskObj.title));
                textFieldsDiv.appendChild(createTextField('Description :', taskObj.desc));
                textFieldsDiv.appendChild(createTextField('Due Date :', taskObj.dueDate));
                textFieldsDiv.appendChild(createTextField('Priority :', taskObj.priority));


            const dialogBtns = document.createElement('div');
            dialogBtns.classList.add('dialogBtns');
            const cancelBtn = document.createElement('button');
                cancelBtn.textContent = 'Cancel';
                cancelBtn.type = 'button';

                cancelBtn.addEventListener('click', eventHandlers.closeDialog );

                dialogBtns.appendChild(cancelBtn);


            myDialog.appendChild(createHeadTitle('Task info'));
            myDialog.appendChild(textFieldsDiv);
            myDialog.appendChild(dialogBtns);

        document.body.appendChild(myDialog);
        myDialog.showModal();
    }

    function createEditDialog(taskObj, projectTitle) {
        const myDialog = document.createElement('dialog');
        const myForm = document.createElement('form');

        //create inputs div:
        const inputsDiv = document.createElement('div');
        inputsDiv.classList.add('inputs');
        //create input title, desc ..inside myD inputs div
            inputsDiv.appendChild(createTitleInput(taskObj.title));
            inputsDiv.appendChild(createTextArea(taskObj.desc));
            inputsDiv.appendChild(createDateInput(taskObj.dueDate));
            inputsDiv.appendChild(createPrioritySelect(taskObj.priority));

        //create div for btns
        const dialogBtns = document.createElement('div');
        dialogBtns.classList.add('dialogBtns');
            const btn = document.createElement('button');
            btn.textContent = 'Edit';
            btn.type = 'submit';
            btn.addEventListener('click', (event) => {
                event.preventDefault();
                eventHandlers.editTask(taskObj.index, projectTitle);
            })

            const cancelBtn = document.createElement('button');
            cancelBtn.textContent = 'Cancel';
            cancelBtn.type = 'button';

            cancelBtn.addEventListener('click', eventHandlers.closeDialog );
               
            dialogBtns.appendChild(cancelBtn);
            dialogBtns.appendChild(btn);


        myForm.appendChild(createHeadTitle('Edit Task'));
        myForm.appendChild(inputsDiv);
        myForm.appendChild(dialogBtns);

        myDialog.appendChild(myForm);
        document.body.appendChild(myDialog);
        myDialog.showModal();
    }

    return {
        addTask,
        createProjectDialog,
        createInfoDialog,
        createEditDialog
    }

})(); 

export { dialogFactory };