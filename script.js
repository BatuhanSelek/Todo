/* TODO ELEMAN EKLEME */

//1-Eleman Seçimi

const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnAddNewTask = document.querySelector("#btnAddNewTask");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list")
// const items = ["Todo 1", "Todo 2", "Todo 3", "Todo 4"];

let todos;


//LOAD İTEMS

eventListeners();
function eventListeners() {
    //--submit evenet--
    form.addEventListener("submit", addNewItem)
    //--delete an item--
    taskList.addEventListener("click", deleteAnItem);
    //-delete all item--
    btnDeleteAll.addEventListener("click", deleteAllItems);
    //console.log("submit")
}

function loadItems() {
    todos = getItemsFromLS();
    todos.forEach(function (item) {
        creatItem(item);
    })
}

//--get items from local storage--
function getItemsFromLS(){
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    return todos;

}
//--set item to local storage--
function setItemToLS(text){
    todos = getItemsFromLS();
    todos.push(text);
    localStorage.setItem("todos",JSON.stringify(todos));

}

function creatItem(text) {
    //-- li Oluşturma --

    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-secondary";
    li.appendChild(document.createTextNode(text));

    //-- a Oluşturma --

    const a = document.createElement("a");
    a.classList = "delete-item float-right";
    a.setAttribute("href", "#");
    a.innerHTML = `<i class="fas fa-times"></i>`;

    li.appendChild(a);
    taskList.appendChild(li);

}


function addNewItem(e) {
    if (input.value === '') {
        alert("add new item")
        // console.log("submit");
    }

    //--create Item--
    creatItem(input.value);
    setItemToLS(input.value);


    input.value = " ";


    e.preventDefault();
}

/*2-Eleman Silme*/
function deleteAnItem(e) {

    if (e.target.className === "fas fa-times") {
        if (confirm("Silmek İstediğinize emin misiniz ?")) {
            //console.log(e.target);
            e.target.parentElement.parentElement.remove();
            deleteTodoFromStorage(e.target.parentElement.parentElement.textContent)
        }
    }
    e.preventDefault();
}

function deleteTodoFromStorage(deletetodo){
    let todos=getItemFromLS();
    todos.forEach(function(todo,index){
        if(todo === deletetodo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));

}

/*3-Tüm Elemanları Silme*/

function deleteAllItems(e) {
    if (confirm("Tüm ELemanlar Gidecek Emin Misiniz?")) {
        taskList.childNodes.forEach(function (item) {
            // console.log(item);
            if (item.nodeType === 1) {
                item.remove();
            }
        })
    }
}
