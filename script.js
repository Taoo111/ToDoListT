let todoInput; //Miejsce w którym użytkownik wpisuje tresc zadania
let errorInfo; //Miejsce w którym wyswietlany jest komunikat o braku tresci
let addBtn; //Przycisk dodajacy zadanie
let ulList; //Lista zadan
let newTodo; // Nowe zadanie
let popup;
let popupInfo; // info w popupie o pustym teksie
let todoToEdit; // aktualnie edytowany todos
let popupInput; //input w popupie
let popupAddBtn; // 'zatwierdz'
let popupCloseBtn; // 'anuluj'

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
};

const prepareDOMElements = () => {
  //Pobranie wszystkich elementow z DOM
  todoInput = document.querySelector(".todo-input");
  errorInfo = document.querySelector(".error-info");
  addBtn = document.querySelector(".btn-add");
  ulList = document.querySelector(".todolist ul");

  popup = document.querySelector(".popup");
  popupInfo = document.querySelector(".popup-info");
  popupInput = document.querySelector(".popup-input");
  popupAddBtn = document.querySelector(".accept");
  popupCloseBtn = document.querySelector(".cancel");
};

const prepareDOMEvents = () => {
  //Dodanie eventow do elementow
  addBtn.addEventListener("click", addNewTask);
  ulList.addEventListener("click", checkClick);
  popupCloseBtn.addEventListener("click", closePopup);
  popupAddBtn.addEventListener("click", changeTodoText);
  todoInput.addEventListener("keyup", enterKeyCheck);
};

const addNewTask = () => {
  if (todoInput.value !== "") {
    //Dodanie nowego elementu do listy
    newTodo = document.createElement("li");
    newTodo.textContent = todoInput.value;
    createToolsArea(); // Dodanie przyciskow delete edit complete
    ulList.append(newTodo);
    todoInput.value = "";
    errorInfo.textContent = "";
  } else {
    errorInfo.textContent = "Wpisz treść zadania!";
  }
};

const createToolsArea = () => {
  const toolsPanel = document.createElement("div");
  toolsPanel.classList.add("tools");
  newTodo.append(toolsPanel);

  const completeBtn = document.createElement("button");
  completeBtn.classList.add("complete");
  completeBtn.innerHTML = '<i class="fas fa-check"></i>';

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit");
  editBtn.textContent = "Edytuj";

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete");
  deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

  toolsPanel.append(completeBtn, editBtn, deleteBtn);
};

const checkClick = (e) => {
  if (e.target.matches(".complete")) {
    e.target.closest("li").classList.toggle("completed");
    e.target.classList.toggle("completed");
  } else if (e.target.matches(".edit")) {
    editTodo(e);
  } else if (e.target.matches(".delete")) {
    deleteTodo(e);
  }
};

const editTodo = (e) => {
  todoToEdit = e.target.closest("li");
  popupInput.value = todoToEdit.firstChild.textContent;
  popup.style.display = "flex";
};

const closePopup = () => {
  popup.style.display = "none";
  popupInfo.textContent = "";
};

const changeTodoText = () => {
  if (popupInput.value !== "") {
    todoToEdit.firstChild.textContent = popupInput.value;
    popup.style.display = "none";
    popupInfo.textContent = "";
  } else {
    popupInfo.textContent = "Wpisz treść zadania!";
  }
};

const deleteTodo = (e) => {
  e.target.closest('li').remove();
  const allTodos = document.querySelectorAll('li');

  if(allTodos.length === 0){
    errorInfo.textContent = "Brak zadań na liście!";
  }
}

const enterKeyCheck = (e) => {
  if(e.key === "Enter"){
    addNewTask();
  }
}

document.addEventListener("DOMContentLoaded", main);
