let SupervisorSelect = document.getElementById("SupervisorSelect");

async function getData() {
  const response = await fetch("assets/data/employees_data.json");
  const employees = await response.json();
  for (const employee of employees) {
    let NameOption = document.createElement("option");
    NameOption.innerText = employee["Full Name"];
    NameOption.value = employee["Employee ID"];
    SupervisorSelect.appendChild(NameOption);
  }
}
getData();
