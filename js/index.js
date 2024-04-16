
document.addEventListener('DOMContentLoaded', () => {
// fetch tasks
fetch('http://localhost:3000/Tasks')
.then((data) => data.json())
.then(data => console.log( data))

const input = document.getElementById('inputItem')
const addButton = document.getElementById('addbtn')
const listContainer = document.getElementById('list-container')

//make the add button work
function button() {
addButton.addEventListener('click', () => {
    if(input.value !== "") {
        //create li element
        const list = input.value
        const li = document.createElement('li')
        li.innerHTML = `
          ${list}
        <button class="delete">Delete</button>
        `
       
        //append the li 
        listContainer.appendChild(li)
        input.value = ""
        saveTasks()
        
        
    }
})
}
button()
//anabling the delete button to delete tasks
function tasklist() {
    document.addEventListener('click', (e) => {
        if(e.target.classList.contains('delete')) {
            const del = e.target.parentElement
            listContainer.removeChild(del)
            saveTasks()
        }

    })
}
tasklist()
//save task to the storagw
function saveTasks() {
    localStorage.setItem('data',listContainer.innerHTML)
}
//upload in the storage
function uploadTasks() {
    listContainer.innerHTML = localStorage.getItem('data')
}
uploadTasks()

})
