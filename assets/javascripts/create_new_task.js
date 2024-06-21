const url = "assets/data/employees_data.json";
const selectEmployee = document.getElementById("AssignMembersSelect");
const form = document.getElementById("add-task-form");
const selectedEmployeesSpan = document.getElementById("selected-employees");
const modal = document.getElementById("new-task-form");
let tasks = (localStorage.tasks && JSON.parse(localStorage.tasks)) || [];
let selectedEmployees = [];

selectEmployee.addEventListener("change", (event) => {
  // Add the employee to the task
  const employeeName = selectEmployee.value;
  selectedEmployees.push(employeeName);

  // Create a badge to display the selected employee
  let span = document.createElement("span");
  span.className = "badge text-bg-secondary pointer me-1";
  span.textContent = employeeName;
  span.id = employeeName;
  let icon = document.createElement("i");
  icon.className = "bi bi-x";
  span.appendChild(icon);
  selectedEmployeesSpan.appendChild(span);
  // Delete the span on click and remove employee from the list
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
async function getData() {
  const response = await fetch(url);
  const jsonData = await response.json();

  // Add the employee names as option to the select input
  function addEmployeeToTheSelect(employee) {
    const option = document.createElement("option");
    option.value = employee["Full Name"];
    option.textContent = employee["Full Name"];
    // Remove the option after selecting
    selectEmployee.appendChild(option);
    selectEmployee.addEventListener("change", (event) => {
      if (selectEmployee.value === option.value) console.log("test");;
    });
  }

  jsonData.forEach((employee) => {
    addEmployeeToTheSelect(employee);
  });
}
// Initialize the first dropdowns
getData();

function addTaskToLocalStorage(task) {
  tasks.push(task);
  localStorage.tasks = JSON.stringify(tasks);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  // Get the data from the form
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
  // Clear form data
  form.reset();

  // Reset selected employee list
  selectedEmployeesSpan.innerHTML = "";
  bootstrap.Modal.getInstance(modal).hide();
});

function createTaskCard(task) {
  let badgeMapper = {
    high: "danger",
    medium: "warning",
    low: "primary",
  };

  let taskDiv = document.createElement("div");
  taskDiv.className = "task";

  // Create the badge
  let badgeDiv = document.createElement("div");
  badgeDiv.className = "badge bg-" + badgeMapper[task.priority];
  badgeDiv.textContent = task.priority;

  // Create the task title
  let taskTitle = document.createElement("h6");
  taskTitle.className = "task-title";
  taskTitle.textContent = task.taskTitle;

  // Create the task content
  let taskContent = document.createElement("div");
  taskContent.className = "task contant";
  taskContent.textContent = task.description;

  // Create the due date
  let dueDateDiv = document.createElement("div");
  dueDateDiv.className = "due-date";

  // Create the due date
  let spanWrapper = document.createElement("span");
  spanWrapper.className = "text-muted";
  let icon = document.createElement("i");
  icon.className = "bi bi-calendar-event";
  let dueDateText = document.createElement("span");
  dueDateText.className = "badge text-bg-secondary mx-2";
  let date = new Date(task.dueDate).toString().split(" ");
  dueDateText.textContent = `Due date ${date[1]}, ${date[2]} ${date[3]}`;
  spanWrapper.appendChild(icon);
  spanWrapper.appendChild(dueDateText);
  dueDateDiv.appendChild(spanWrapper);

  // Append all elements to the task
  taskDiv.appendChild(badgeDiv);
  taskDiv.appendChild(taskTitle);
  taskDiv.appendChild(taskContent);
  taskDiv.appendChild(dueDateDiv);

  return taskDiv;
}

