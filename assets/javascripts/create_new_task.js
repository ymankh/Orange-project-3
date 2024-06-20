const url = "assets/data/employees_data.json";
const selectEmployee = document.getElementById("AssignMembersSelect");
const form = document.getElementById("add-task-form");
const selectedEmployeesSpan = document.getElementById("selected-employees");
const modal = document.getElementById("new-task-form");
let tasks = (localStorage.tasks && JSON.parse(localStorage.tasks)) || [];
let selectedEmployees = [];

selectEmployee.addEventListener("change", (event) => {
  // add the employee to the task
  const employeeName = selectEmployee.value;
  selectedEmployees.push(employeeName);

  // create a badge to display the selected employee
  let span = document.createElement("span");
  span.className = "badge text-bg-secondary pointer me-1";
  span.textContent = "Secondary ";
  span.id = employeeName;
  let icon = document.createElement("i");
  icon.className = "bi bi-x";
  span.appendChild(icon);
  selectedEmployeesSpan.appendChild(span);
  // delete the span on click and remove employee from the list
  span.addEventListener("click", (event) => {
    selectedEmployees = selectedEmployees.filter((val) => val !== employeeName);
    span.remove();
    if (selectedEmployees.length === 0) {
      selectEmployee.required = true;
    }
  });
  selectEmployee.required = false;
  selectEmployee.value = "";
});

// Get the employee data from the Json file
async function getData(selectElement) {
  const response = await fetch(url);
  const jsonData = await response.json();

  // add the employee names as option to the select input
  jsonData.forEach((employee) => {
    const option = document.createElement("option");
    option.value = employee["Full Name"];
    option.textContent = employee["Full Name"];
    selectElement.appendChild(option);
  });
}

function styleDropdown(selectElement) {
  selectElement.style.backgroundColor = "#93c9de";
  selectElement.style.color = "black";
  selectElement.style.border = "none";
  selectElement.style.borderRadius = "20px";
  selectElement.style.margin = "5px";
}

// Initialize the first dropdowns
getData(document.getElementById("AssignMembersSelect"));

function addTaskToLocalStorage(task) {
  tasks.push(task);
  localStorage.tasks = JSON.stringify(tasks);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let taskData = {
    taskTitle: document.getElementById("TaskTitle").value,
    status: document.getElementById("Status").value,
    priority: document.querySelector('input[name="Priority"]:checked').value,
    startDate: document.getElementById("StartDate").value,
    dueDate: document.getElementById("DueDate").value,
    description: document.getElementById("Description").value,
    assignMembersSelect: selectedEmployees,
  };
  addTaskToLocalStorage(taskData);
  form.reset();
  bootstrap.Modal.getInstance(modal).hide();
});
