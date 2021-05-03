let addTaskInput = document.querySelector('#to-do-input');
let addTaskButton = document.querySelector('#to-do-button');
let taskList = document.querySelector('#task-list')

toDoList = [];

if(localStorage.toDoList) {
    toDoList = JSON.parse(localStorage.getItem('toDoList'));
    renderTaskList();
}

class ToDo {
    id;
    task;
    isChecked;
    constructor(task) {
        this.id = Date.now();
        this.task = task;
        this.isChecked = false;
    }
}

function renderTaskList() {
    if(toDoList.length > 0) {
        let classList = [
            "list-group-item",
            "d-flex",
            "justify-content-between",
            "align-items-center",        
        ];    
        taskList.innerHTML = '';    
        toDoList.forEach(toDo => {
            let newListItem = document.createElement('li'); 
            newListItem.classList.add(...classList);
            newListItem.setAttribute('id', toDo.id);        
            let checked = ''
            let textDecoration = '';
            if(toDo.isChecked) {
                checked = 'checked';
                textDecoration = 'line-through';
            }
            newListItem.innerHTML = `<span><input class="form-check-input" type="checkbox" ${checked} style='margin-right: 8px;'>
                                    <span style='text-decoration:${textDecoration};'>${toDo.task}</span></span> 
                                    <span><button class="btn btn-primary"><i class="bi bi-trash" style='margin-right: 4px;'></i>Remove</button>`;
            
            taskList.appendChild(newListItem);
        });
    }
    else {
        taskList.innerHTML = `<span class="d-flex justify-content-center" style="color: white;"><i class="bi bi-emoji-smile emoji"></i></span>
        <span class="d-flex justify-content-center " style="color: white; font-size: 30px ">No tasks yet</span>`;
    }
}

addTaskButton.addEventListener('click', (event) => {        
    addToDo();
});

addTaskInput.addEventListener('keypress', (event) => {
    if(event.charCode == 13) {
        addToDo();
    }
})

function addToDo() {
    if(addTaskInput.value) {        
        let newToDoItem = new ToDo(addTaskInput.value);       
        toDoList.push(newToDoItem);        
        saveToLocalStorage();
        renderTaskList();
    }
    addTaskInput.value = '';  
}

function saveToLocalStorage() {
    if(toDoList.length > 0) {
        localStorage.clear();
        let list = JSON.stringify(toDoList);
        localStorage.setItem('toDoList', list);
    }
    else {
        localStorage.clear();
    }
}

taskList.addEventListener('click', (event) => {    
    let id = event.target.parentNode.parentNode.id;    
    if(event.target.nodeName === 'BUTTON') {           
        toDoList = toDoList.filter(toDo => {            
            return toDo.id != id;
        });        
        renderTaskList();
        saveToLocalStorage();        
    }
    if(event.target.type === 'checkbox') {
        toDoList.forEach((toDO, index) => {            
            if(toDO.id == id) {
                toDoList[index].isChecked = !toDoList[index].isChecked;
            }
        });        
        renderTaskList();
        saveToLocalStorage();        
    }                
});

renderTaskList();