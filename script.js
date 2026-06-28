// ===============================
// Family Information Management System
// Part 3A
// ===============================

// Local Storage Key
const STORAGE_KEY = "family_information_system";

// Current Selected Record
let currentIndex = -1;

// -------------------------------
// Helper Functions
// -------------------------------

function getData(){

    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

}

function saveStorage(data){

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

}

function getValue(id){

    const el = document.getElementById(id);

    if(!el) return "";

    return el.value.trim();

}

function setValue(id,value){

    const el=document.getElementById(id);

    if(el){

        el.value=value || "";

    }

}

// -------------------------------
// Collect Form Data
// -------------------------------

function collectFormData(){

    return{

        // Personal
        name:getValue("name"),
        dob:getValue("dob"),
        gender:getValue("gender"),
        mobile:getValue("mobile"),
        email:getValue("email"),
        aadhaar:getValue("aadhaar"),
        pan:getValue("pan"),
        occupation:getValue("occupation"),

        // Father
        fatherName:getValue("fatherName"),
        fatherMobile:getValue("fatherMobile"),
        fatherOccupation:getValue("fatherOccupation"),

        // Mother
        motherName:getValue("motherName"),
        motherMobile:getValue("motherMobile"),
        motherOccupation:getValue("motherOccupation"),

        // Family
        spouseName:getValue("spouseName"),
        childrenCount:getValue("childrenCount"),
        brothers:getValue("brothers"),
        sisters:getValue("sisters"),
        familyNotes:getValue("familyNotes"),

        // Education
        class10:getValue("class10"),
        class10Year:getValue("class10Year"),
        class12:getValue("class12"),
        class12Year:getValue("class12Year"),
        graduation:getValue("graduation"),
        graduationYear:getValue("graduationYear"),
        postGraduation:getValue("postGraduation"),
        postGraduationYear:getValue("postGraduationYear"),

        // Job
        company:getValue("company"),
        designation:getValue("designation"),
        salary:getValue("salary"),
        experience:getValue("experience"),

        // Address
        presentAddress:getValue("presentAddress"),
        permanentAddress:getValue("permanentAddress"),

        // Bank
        bankName:getValue("bankName"),
        accountNumber:getValue("accountNumber"),
        ifsc:getValue("ifsc"),
        branch:getValue("branch"),

        // Medical
        bloodGroup:getValue("bloodGroup"),
        disease:getValue("disease"),
        allergy:getValue("allergy"),
        doctor:getValue("doctor"),
        emergencyContact:getValue("emergencyContact")

    };

}

// -------------------------------
// Save Record
// -------------------------------

function saveData(){

    let allData=getData();

    let person=collectFormData();

    if(person.name===""){

        alert("Please Enter Name");

        return;

    }

    allData.push(person);

    saveStorage(allData);

    updateDashboard();

    alert("Record Saved Successfully");

    clearForm();

}

// -------------------------------
// Clear Form
// -------------------------------

function clearForm(){

const ids=[

"name","dob","gender","mobile","email",
"aadhaar","pan","occupation",

"fatherName","fatherMobile","fatherOccupation",

"motherName","motherMobile","motherOccupation",

"spouseName","childrenCount","brothers",
"sisters","familyNotes",

"class10","class10Year","class12",
"class12Year","graduation",
"graduationYear","postGraduation",
"postGraduationYear",

"company","designation","salary",
"experience",

"presentAddress","permanentAddress",

"bankName","accountNumber",
"ifsc","branch",

"bloodGroup","disease",
"allergy","doctor",
"emergencyContact"

];

ids.forEach(id=>setValue(id,""));

}

// -------------------------------
// Dashboard
// -------------------------------

function updateDashboard(){

let data=getData();

document.getElementById("memberCount").innerText=data.length;

document.getElementById("eduCount").innerText=data.length;

document.getElementById("docCount").innerText=data.length;

}

updateDashboard();
// ==========================================
// Part 3B
// Search, Update, Delete, Dark Mode
// ==========================================

// -------------------------------
// Search Record
// -------------------------------

function searchData(){

    let keyword = prompt("Enter Name or Mobile");

    if(!keyword) return;

    let data = getData();

    let index = data.findIndex(person =>
        person.name.toLowerCase() === keyword.toLowerCase() ||
        person.mobile === keyword
    );

    if(index === -1){

        alert("Record Not Found");

        return;

    }

    currentIndex = index;

    loadRecord(data[index]);

    alert("Record Loaded");

}

// -------------------------------
// Load Record into Form
// -------------------------------

function loadRecord(person){

    for(const key in person){

        setValue(key, person[key]);

    }

}

// -------------------------------
// Update Record
// -------------------------------

function updateData(){

    if(currentIndex === -1){

        alert("Search a record first.");

        return;

    }

    let data = getData();

    data[currentIndex] = collectFormData();

    saveStorage(data);

    updateDashboard();

    alert("Record Updated Successfully");

}

// -------------------------------
// Delete Record
// -------------------------------

function deleteData(){

    if(currentIndex === -1){

        alert("Search a record first.");

        return;

    }

    if(!confirm("Delete this record?")){

        return;

    }

    let data = getData();

    data.splice(currentIndex,1);

    saveStorage(data);

    currentIndex = -1;

    clearForm();

    updateDashboard();

    alert("Record Deleted Successfully");

}

// -------------------------------
// Dark Mode
// -------------------------------

const darkBtn = document.getElementById("darkBtn");

if(darkBtn){

    darkBtn.addEventListener("click",()=>{

        document.body.classList.toggle("dark");

        localStorage.setItem(
            "darkMode",
            document.body.classList.contains("dark")
        );

    });

}

window.addEventListener("load",()=>{

    if(localStorage.getItem("darkMode")==="true"){

        document.body.classList.add("dark");

    }

});

// -------------------------------
// Photo Preview
// -------------------------------

const photo = document.getElementById("photo");

if(photo){

photo.addEventListener("change",function(){

    const file = this.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload=function(e){

        let img=document.getElementById("photoPreview");

        if(!img){

            img=document.createElement("img");

            img.id="photoPreview";

            img.style.width="140px";
            img.style.height="140px";
            img.style.marginTop="15px";
            img.style.borderRadius="10px";
            img.style.objectFit="cover";

            photo.parentNode.appendChild(img);

        }

        img.src=e.target.result;

    }

    reader.readAsDataURL(file);

});

}

// -------------------------------
// Auto Dashboard Load
// -------------------------------

window.onload=function(){

    updateDashboard();

}
// ===============================
// Show All Records
// ===============================

function displayRecords(){

    let data = getData();

    let body = document.getElementById("recordBody");

    if(!body) return;

    body.innerHTML = "";

    data.forEach((person,index)=>{

        body.innerHTML += `

        <tr>

        <td>${index+1}</td>

        <td>${person.name}</td>

        <td>${person.mobile}</td>

        <td>${person.occupation}</td>

        <td>

        <button onclick="editRecord(${index})">Edit</button>

        <button onclick="removeRecord(${index})">Delete</button>

        </td>

        </tr>

        `;

    });

}

// ===============================
// Edit Record
// ===============================

function editRecord(index){

    let data=getData();

    currentIndex=index;

    loadRecord(data[index]);

}

// ===============================
// Delete Record
// ===============================

function removeRecord(index){

    if(!confirm("Delete this record?")) return;

    let data=getData();

    data.splice(index,1);

    saveStorage(data);

    updateDashboard();

    displayRecords();

}

// ===============================
// Search Records
// ===============================

function filterRecords(){

    let value=document.getElementById("searchInput").value.toLowerCase();

    let rows=document.querySelectorAll("#recordBody tr");

    rows.forEach(row=>{

        let text=row.innerText.toLowerCase();

        row.style.display=text.includes(value) ? "" : "none";

    });

}

// ===============================
// Refresh Table After Save
// ===============================

const oldSave = saveData;

saveData = function(){

    oldSave();

    displayRecords();

}

// ===============================
// Load Table on Start
// ===============================

window.addEventListener("load",()=>{

    updateDashboard();

    displayRecords();

});