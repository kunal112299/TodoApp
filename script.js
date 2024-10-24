let Input = document.getElementById('input');
let output = document.getElementById('output');
let submitBtn = document.getElementById('submitBtn');

function addTask(taskText){

    let card = document.createElement('div')
    card.classList.add('card-container') ;
    output.append(card);
    let task = document.createElement('p');
    task.classList.add('text');
    task.setAttribute("id","task");
    task.innerText = taskText;

    let btnContainer = document.createElement('div')
    btnContainer.classList.add('btn-container')

    let btn1 = document.createElement('input');
    btn1.type= "checkbox";
    btn1.classList.add('btn1');

    let btn2 = document.createElement('img');
    btn2.id='deleteBtn';
    btn2.src = "./delete.svg";
    btn2.classList.add('btn2');

    btn2.addEventListener('click', function(){
        deleteTask(card ,taskText);
    })
    btn1.addEventListener('click', function(){
        isChecked(card,btn1);
    })
    task.innerText = taskText;
    card.append(task);
    card.append(btnContainer);

    btnContainer.append(btn1);
    btnContainer.append(btn2);
}
function deleteTask(card, taskText){
    card.remove();
    deleteTaskFromLocal(taskText)
}
function isChecked(card,btn1){
    if (btn1.checked) {  // Use the correct boolean for checked
        card.classList.add("lineThrough");
    } else {
        card.classList.remove("lineThrough");
    }
}
function getTasks(){
    return JSON.parse(localStorage.getItem('tasks')) ||[];
}
function saveTaskLocal(tasks){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function addtaskToLocal(taskText){
    let tasks = getTasks();
    tasks.push(taskText);
    saveTaskLocal(tasks);
}
function deleteTaskFromLocal(taskText){
    let tasks = getTasks();
   tasks =  tasks.filter(task => task != taskText);
    saveTaskLocal(tasks);
}

function loadTasksFromLocal(){
    let tasks = getTasks();
    tasks.forEach(taskText => {
        addTask(taskText);
    });
}
function handleSubmit(e){
    e.preventDefault();
   console.log(Input.value); 
   let taskText = Input.value.trim()
   if(taskText){
    addTask(taskText);
    addtaskToLocal(taskText);
   Input.value = '';
   }
}

window.addEventListener('DOMContentLoaded', loadTasksFromLocal);
submitBtn.addEventListener('click', handleSubmit);