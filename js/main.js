let input = document.getElementById('input');
let add = document.getElementById('add');
let tasksDiv = document.getElementById('tasks');

// Arr of Tasks
let arrOfTasks = [];

// check if there is tasks in localstorage
if(localStorage.getItem("tasks"))
{
        arrOfTasks = JSON.parse(localStorage.getItem('tasks'));
}




getDataFromLocalStorage();



// add task
add.onclick = function() 
{
        if(input.value !== '')
        {
                addTaskToArr(input.value);
                input.value = '';
        }
};


// actions
tasksDiv.addEventListener('click', (e) => {
        // delete btn
        if(e.target.classList.contains('delete'))
        {
                // remove from localStorage
                deleteTaskWith(e.target.parentElement.getAttribute('data-id'));

                // remove from page
                e.target.parentElement.remove();
        }

        // 
        if(e.target.classList.contains('task'))
        {
                // toggle done for task
                toggleStatusWith(e.target.getAttribute('data-id'));
                // toggle done class
                e.target.classList.toggle('done');
        }
});

function addTaskToArr(inputValue)
{
        // create new task
        const task = 
        {
                id : Date.now(),
                title : inputValue,
                completed : false,
        };

        // push to arr
        arrOfTasks.push(task);

        // Add tasks to page
        addTasksToPage(arrOfTasks);

        // Add to localStorage
        addTasksToLocalStorage(arrOfTasks);
}

function addTasksToPage(arrOfTasks)
{
        // empty tasks div
        tasksDiv.innerHTML = '';

        // looping over the array
        arrOfTasks.forEach((task) =>
        {
                // creating main div
                let taskDiv = document.createElement("div");
                taskDiv.className = 'task';

                //  check if task is done
                if(task.completed === true) 
                {
                        taskDiv.className = 'task done';
                }

                taskDiv.setAttribute( "data-id" , task.id );
                taskDiv.appendChild(document.createTextNode(task.title));

                // creating the delete button
                let span = document.createElement('span');
                span.className = 'delete';
                span.appendChild(document.createTextNode("Delete"));

                // append span to the taskDiv
                taskDiv.appendChild(span);

                // adding the taskDiv to the tasksDiv container in page
                tasksDiv.appendChild(taskDiv);
        });

        let deleteAll = document.getElementById('deleteAll');
        if(arrOfTasks.length > 0 )
        {
                deleteAll.innerHTML= ` <button onclick='dltAll()'> Delete All </button> `;
        }
        else 
        {
                deleteAll.innerHTML= '';
        }
}


function addTasksToLocalStorage(arrOfTasks)
{
        window.localStorage.setItem("tasks", JSON.stringify(arrOfTasks));
}


function getDataFromLocalStorage()
{
        let data = window.localStorage.getItem("tasks");
        if(data)
        {
                let tasks = JSON.parse(data);
                addTasksToPage(tasks);
        }
}


function deleteTaskWith(taskId)
{
        arrOfTasks = arrOfTasks.filter((task) => task.id  != taskId);
        addTasksToLocalStorage(arrOfTasks);
}

function toggleStatusWith(taskId)
{
        for(let i=0; i<arrOfTasks.length; i++)
        {
                if(arrOfTasks[i].id == taskId)
                {
                        if(arrOfTasks[i].completed == false)
                        {
                                arrOfTasks[i].completed = true;
                        }
                        else
                        {
                                arrOfTasks[i].completed = false;
                        }
                }
        }
        addTasksToLocalStorage(arrOfTasks);
}



function dltAll()
{
        tasksDiv.innerHTML="";
        window.localStorage.removeItem("tasks");
        deleteAll.innerHTML="";
}
