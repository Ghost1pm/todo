const taskInput = document.querySelector(".input_items input");
const todoList = document.querySelector(".todo_list");
const clearAll = document.querySelector(".clearall");
const filter = document.querySelectorAll(".nav ul li");

let editId;
let isEditTask = false;

let todos = JSON.parse(localStorage.getItem("todo-list"));

filter.forEach(btn =>{
  btn.addEventListener("click", ()=>{
    document.querySelector(".nav ul li.active").classList.remove("active");
     btn.classList.add("active")
     showTodo(btn.id)
  })
})

function showTodo(filter) {
  let li="";

  if (todos) {
    todos.forEach((todo, id) => {
      let isCompleted = todo.status == "completed"? "checked" : ""
      if (filter == todo.status || filter == 'all') {
      li += `<li>
                <label for="${id}">
                  <input  onClick="updateStatus(this)" id="${id}" type="checkbox" ${isCompleted}>
                  <p class="${isCompleted}">${todo.name}</p>
                </label>
                <div class="setting">
                  <img onClick="showMenu(this)" src="assets/img/menu.svg" alt="">
                  <ul>
                    <li onClick="editTask(${id}, '${todo.name}')"><a href="#"><img src="assets/img/edit.svg" alt=""> Edite</a></li>
                    <li onClick="deleteTask(${id})"><a href="#"><img  src="assets/img/delete.svg" alt=""> Delete</a></li>
                  </ul>
                </div>
              </li>`
            }
      });
  }
  todoList.innerHTML = li || `<span>You don't have any task here</span>`;
}
showTodo('all');

taskInput.addEventListener("keyup", (e)=>{
    let userTask = taskInput.value.trim();
    if (e.key == 'Enter' && userTask) {
      if (!isEditTask) {
        if (!todos) {
          todos = [];
        }
        let taskInfo = {name: userTask, status: 'pending'}
        todos.push(taskInfo);
      }
      else {
        isEditTask = false;
        todos[editId].name = userTask;

      }
      taskInput.value = '';
      localStorage.setItem("todo-list", JSON.stringify(todos))
      showTodo('all');

    }
})

function updateStatus(selectedTask) {
  let para = selectedTask.parentElement.lastElementChild;
  if (selectedTask.checked) {
    para.classList.add("checked")
    todos[selectedTask.id].status = "completed";
  }
  else {
    para.classList.remove("checked")
    todos[selectedTask.id].status = "pending";
  }
  localStorage.setItem("todo-list", JSON.stringify(todos))
}

function showMenu(selectedTask) {
  let menu = selectedTask.parentElement.lastElementChild;
  menu.classList.add("hover");
  document.addEventListener('click', e =>{
    if (e.target.tagName != "IMG" || e.target != selectedTask) {
      menu.classList.remove("hover");
    }
  })
}

function deleteTask(deleteId) {
  todos.splice(deleteId,1);
  localStorage.setItem("todo-list", JSON.stringify(todos))
  showTodo('all');
}

function editTask(taskId, taskName) {
  editId = taskId;
  isEditTask = true;
  taskInput.value = taskName;

}



clearAll.addEventListener('click', e=>{
  todos.splice(0, todos.length);
  localStorage.setItem("todo-list", JSON.stringify(todos))
  showTodo();
})
//
