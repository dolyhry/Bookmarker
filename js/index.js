var websiteNameInput = document.getElementById("websiteName");
var websiteUrlInput = document.getElementById("websiteURL");
var btnSubmit = document.getElementById("submitButton");
var btnVisit = document.getElementById("visitButton");
var btnDelete = document.getElementById("deleteButton");
var bookmarkList;

if (localStorage.getItem("bookmark") == null) {
  bookmarkList = [];
} else {
  bookmarkList = JSON.parse(localStorage.getItem("bookmark"));
  display(bookmarkList);
}

btnSubmit.addEventListener("click", function () {
  // console.log("yeeet");

  if (
    websiteNameInput.classList.contains("is-valid") &&
    websiteUrlInput.classList.contains("is-valid")
  ) {
    var bookmark = {
      name: websiteNameInput.value,
      site: websiteUrlInput.value,
    };
    bookmarkList.push(bookmark);
    localStorage.setItem("bookmark", JSON.stringify(bookmarkList));
    display(bookmarkList);

    clear();

    console.log(bookmarkList);
  } else {
    alert("no valid data, make sure of it!!");
  }
});

function clear() {
  websiteNameInput.value = null;
  websiteUrlInput.value = null;
}

function display(array) {
  var cartoona = "";
  for (var i = 0; i < array.length; i++) {
    cartoona += `<tr>
            <td>${i + 1}</td>
            <td>${array[i].name}</td>
            <td><a href="https://${
              array[i].site
            }" target="_blank"><button class="btn btn-success" id="visitButton"><i class="fa-solid fa-eye pe-2"></i> Visit</button></a></td>
            <td><button onclick="deleteBookmark(${i})" class="btn btn-danger" id="deleteButton"><i class="fa-solid fa-trash-can pe-2"></i> Delete</button></td>    
            </tr>`;
  }

  document.getElementById("tableContent").innerHTML = cartoona;
}

function validateInput(element) {
  // console.log(element.id,element.value);

  var regex = {
    websiteName: /^\w{3,}$/,
    websiteURL: /www\.\w{2,}/i,
  };

  if (regex[element.id].test(element.value) == true) {
    console.log("match");
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    console.log("not match!");
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}

function deleteBookmark(deletedBookmark) {
  bookmarkList.splice(deletedBookmark, 1);
  localStorage.setItem("bookmark", JSON.stringify(bookmarkList));
  display(bookmarkList);
  console.log(bookmarkList);
}
