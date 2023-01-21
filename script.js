let namedata = document.getElementById("item-name"); 
let date = document.getElementById("deadline");    
let priority = document.getElementById("priority");   
let btn = document.getElementById("addItem");         
let array = [];                                      
let completearray = [];                            
 
let objStr = localStorage.getItem("data");
if (objStr != null) {
  array = JSON.parse(objStr);
  console.log(array);
}
 
btn.onclick = () => {
 
  let nameVal = namedata.value;
  let dateVal = date.value;
  let priorityVal = priority.value;
 
  if (nameVal && dateVal && priorityVal) {
    document.getElementById("error").innerHTML = "";
    let todoData = {
      ItemName: nameVal,
      Deadline: dateVal,
      Priority: priorityVal,
    };
    array.push(todoData);
    saveData(array);
    console.log(array);
  } else {
    document.getElementById("error").innerHTML = "Please Fill All The Inputs";
  }
  namedata.value = "";
  date.value = "";
  priority.value = "";
};
function saveData(array) {
  let str = JSON.stringify(array);
  localStorage.setItem("data", str);
  showData();
}
 
function showData() {
  let tableData = "";
  document.getElementById("t-body").innerHTML = "";
  document.getElementById("t-future").innerHTML = "";
 
  array.forEach((e, i) => {
    tableData += `<tr>
            <td>${i + 1}. ${e.ItemName}</td>
            <td>${e.Deadline}</td>
            <td>${e.Priority}</td>
            <td><button onclick="completeToDo(${i})"><i class='fa fa-check-square-o' style='font-size:18px;color:white'></i></button>
            <button onclick="deleteData(${i})"><i class="fa fa-trash-o" style='font-size:18px;color:white'></i></button></td>
        </tr>`;
    document.getElementById("t-body").innerHTML = tableData;
  });
 
 
  let checkData = "";
  document.getElementById("t-complete").innerHTML = "";
  completearray.forEach((e, i) => {
    checkData += `<tr>
            <td>${i + 1}. ${e.ItemName}</td>
            <td>${e.Deadline}</td>
            <td>${e.Priority}</td>
            <td><button onclick="deleteCompleteData(${i})"><i class="fa fa-trash-o" style='font-size:18px;color:white'></i></button></td>
        </tr> `;
    document.getElementById("t-complete").innerHTML = checkData;
  });
}
showData();
 
function deleteData(id) {
  array.splice(id, 1);
  saveData(array);
}
 
function deleteCompleteData(id) {
  completearray.splice(id, 1);
  saveData(completearray);
}
 
function completeToDo(id) {
  const remove = array.splice(id, 1);
  completearray.push(remove[0]);
  showData();
}