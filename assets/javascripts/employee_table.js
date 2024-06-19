let table_body = document.querySelector("#employee-table tbody");
let table_head = document.querySelector("#employee-table thead");
let filter;
let sortOption;
let data;
let table_heading = [
  ["id", "Employee ID"],
  ["name", "Full Name"],
  ["department", "Department"],
  ["job title", "Job Title"],
  ["Hire Date", "Hire Date"],
];
// make the heading for the table
{
  let tr = document.createElement("tr");
  tr.appendChild(createTh("#"));
  table_heading
    .map((heading) => createTh(heading, true))
    .forEach((th) => {
      tr.appendChild(th);
    });
  table_head.appendChild(tr);
}

async function getData() {
  if (!data) {
    let response = await fetch("assets/data/employees_data.json");
    data = await response.json();
  }
}

await getData();

function populateEmployeeData() {
  let i = 1;
  ("");
  let table_data = data;
  if (filter)
    table_data = data.filter((employee) =>
      employee["Full Name"].toLowerCase().includes(filter)
    );
  if (sortOption)
    table_data.sort((a, b) => {
      if (sortOption === "Hire Date")
        return new Date(b["Hire Date"]) - new Date(a["Hire Date"]);
      if (a[sortOption] < b[sortOption]) return -1;
      if (a[sortOption] > b[sortOption]) return 1;
    });

  table_body.innerHTML = "";
  table_data.forEach((element) => {
    let tr = document.createElement("tr");
    let row = [
      createTd(i),
      ...table_heading.map((heading) => createTd(element[heading[1]])),
    ];
    row.forEach((element) => tr.appendChild(element));
    table_body.appendChild(tr);
    i++;
  });
}

function createTd(value) {
  let td = document.createElement("td");
  td.innerText = value;
  return td;
}

function createTh(value, sortable) {
  let th = document.createElement("th");
  th.innerText = value[0];
  th.id = value[0];
  th.value = 0;
  if (sortable)
    th.addEventListener("click", (event) => {
      sortOption = value[1];
      populateEmployeeData();
    });
  return th;
}
let filterInput = document.getElementById("filter");
filterInput.addEventListener("input", (e) => {
  console.log(e);
  filter = filterInput.value.toLowerCase();
  populateEmployeeData();
});
populateEmployeeData();
