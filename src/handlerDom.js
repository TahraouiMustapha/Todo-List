import { tasks } from "./task.js";


const handlerDom = (function (){
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
        btn.addEventListener('click', (e) => {
            e.target.preventDefault;
            const task = tasks.createTodos(title.value,
                            desc.value,
                        dueDate.value,
                        priority.value);
                        
            console.log(task);                        
        })

        myForm.appendChild(title);
        myForm.appendChild(desc);
        myForm.appendChild(dueDate);
        myForm.appendChild(priority);
        myForm.appendChild(btn);



        myForm.method = 'dialog';
        dialog.appendChild(myForm);
        document.body.appendChild(dialog); 
        dialog.showModal();
    }

    function addProjectHandler() {

    }



    return {
        addTodosHandler,
        addProjectHandler
    }
})()

export { handlerDom };