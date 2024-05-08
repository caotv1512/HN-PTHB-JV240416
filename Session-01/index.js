const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const numberPhone = document.getElementById("numberPhone");
const address = document.getElementById("address");
const male = document.getElementById("male");
const female = document.getElementById("female");

var maleRadio = document.getElementById("male");
var femaleRadio = document.getElementById("female");
var selectedGenderValue;

let gender = document.getElementsByName("gender");
console.log(gender[0]);
let tbody = document.getElementById("tbody");
let students = JSON.parse(localStorage.getItem("students")) || [];

function displayData() {
    let html = "";
    for (let i in students) {
        html += `
        <tr>
        <td>${students[i].id}</td>
        <td>${students[i].fullName}</td>
        <td>${students[i].email}</td>
        <td>${students[i].numberPhone}</td>
        <td>${students[i].address}</td>
        <td>${students[i].gender}</td>
          <td> <button onclick="editStudent('${students[i].id}')">Edit</button> <button onclick="deleteStudent('${students[i].id}')">Delete</button></td>
        </tr>`;
    }
    tbody.innerHTML = html;
    fullName.value = "";
    email.value = "";
    numberPhone.value = "";
    address.value = "";
    gender[0].checked = true;
}
displayData();

function addStudent() {
    let gender = document.getElementsByName("gender");
    for (let i in gender) {
        if (gender[i].checked) genderValue = gender[i].value;
    }
    const newStudent = {
        id: Math.floor(Math.random() * 1000),
        fullName: fullName.value,
        email: email.value,
        numberPhone: numberPhone.value,
        address: address.value,
        gender: genderValue,
    };
    students.push(newStudent);
    //   Lưu dữ liệu vào localStorage
    localStorage.setItem("students", JSON.stringify(students));
    displayData();
    alert("Added new sttudent successfully !!!!");
}

function editStudent(studentId) {
    console.log(studentId, "ID");
    localStorage.setItem("studentId", studentId);
    document.getElementById("button").style.display = "none";
    document.getElementById("save").style.display = "block";
    let index = students.findIndex((student) => student.id == studentId);
    console.log(students[index].gender);
    for (let i in gender) {
        if (gender[i].value == students[index].gender) gender[i].checked = true;
    }
    fullName.value = students[index].fullName;
    email.value = students[index].email;
    numberPhone.value = students[index].numberPhone;
    address.value = students[index].address;
    // gender.value = students[index].gender;
}

function saveStudent() {
    document.getElementById("button").style.display = "block";
    document.getElementById("save").style.display = "none";
    let index = students.findIndex(
        (student) => student.id == localStorage.getItem("studentId")
    );
    const gender = document.querySelector('input[name="gender"]:checked').value;
    console.log(index, "index");
    students[index] = {
        id: students[index].id,
        fullName: fullName.value,
        email: email.value,
        numberPhone: numberPhone.value,
        address: address.value,
        gender: gender,
    };

    localStorage.setItem("students", JSON.stringify(students));
    displayData();
    alert("Edited information sucessfully!!!");
}

// Delete student:
function deleteStudent(studentId) {
    console.log(studentId);

    const index = students.findIndex((student) => student.id == studentId);
    students.splice(index, 1);

    localStorage.setItem("students", JSON.stringify(students));
    displayData();
    alert("Student has been successfully deleted!");
    console.log(index);
}

function sortByName() {
    students.sort((a, b) => {
        if (a.fullName < b.fullName) return -1;
        if (a.fullName > b.fullName) return 1;
        return 0; // Hai chuỗi bằng nhau
    });
    displayData();
}

// Tìm kiếm sinh viên theo tên:
let filterStudent = document.getElementById("filterStudent");

function searchStudents() {
    let searchQuery = filterStudent.value.trim().toLowerCase();
    let filteredStudents = students.filter((student) =>
        student.fullName.toLowerCase().includes(searchQuery)
    );

    let html = "";
    for (let i = 0; i < filteredStudents.length; i++) {
        let student = filteredStudents[i];
        html += `
      <tr>
        <td>${student.id}</td>
        <td>${student.fullName}</td>
        <td>${student.email}</td>
        <td>${student.numberPhone}</td>
        <td>${student.address}</td>
    <td></td>
        <td><button onclick="editStudent('${student.id}')">Edit</button>
        <button onclick="deleteStudent('${student.id}')">Delete</button></td>
      </tr>
    `;
    }

    // Hiển thị kết quả lọc trực tiếp trong tbody
    document.getElementById("tbody").innerHTML = html;
    filterStudent.value = "";
}

function handleInput() {
    if (fullName.value === "") {
        errorName.innerHTML = "Username can not empty";
        errorName.style.color = "red";
    } else {
        errorName.innerHTML = "";
    }
}

function handleInputEmail() {
    var emailFormat = /@/;

    if (!emailFormat.test(email.value)) {
        errorEmail.innerHTML = "Invalid email format";
        errorEmail.style.color = "red";
    } else {
        errorEmail.innerHTML = "";
    }
}

function handleInputNumberPhone() {
    if (numberPhone.value === "") {
        errorNumber.innerHTML = "NumberPhone can not empty";
        errorNumber.style.color = "red";
    } else {
        errorNumber.innerHTML = "";
    }
}

function handleInputAddress() {
    if (address.value === "") {
        errorAddress.innerHTML = "Address can not empty";
        errorAddress.style.color = "red";
    } else {
        errorAddress.innerHTML = "";
    }
}