let todoInput; //Miejsce w którym użytkownik wpisuje tresc zadania
let errorInfo; //Miejsce w którym wyswietlany jest komunikat o braku tresci
let addBtn; //Przycisk dodajacy zadanie
let ulList; //Lista zadan
let newTodo; // Nowe zadanie

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
};

const prepareDOMEvents = () => {
  //Dodanie eventow do elementow
  addBtn.addEventListener("click", addNewTask);
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



document.addEventListener("DOMContentLoaded", main);
