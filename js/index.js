var siteName = document.getElementById("Name");
var siteUrl = document.getElementById("site");

var bookMarkContainer;

if (localStorage.getItem("bookmarks") == null) {
  bookMarkContainer = [];
} else {
  bookMarkContainer = JSON.parse(localStorage.getItem("bookmarks"));
  BookMarkView();
}
function addBookMak() {
  if (
    siteName.classList.contains("is-valid") &&
    siteUrl.classList.contains("is-valid")
  ) {
    var bookMark = {
      Name: siteName.value,
      Url: siteUrl.value,
    };

    bookMarkContainer.push(bookMark);

    clearBookMark();

    localStorage.setItem("bookmarks", JSON.stringify(bookMarkContainer));
    console.log(bookMarkContainer);
    BookMarkView();
  } else {
    document.getElementById("customModal").classList.remove("d-none");
  }
}

function clearBookMark() {
  siteName.value = "";
  siteUrl.value = "";
}

function deleteBookmark(index) {
  bookMarkContainer.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookMarkContainer));

  BookMarkView();
}

function validateBookmark(element) {
  var regex = {
    Name: /^[A-Za-z0-9][A-Za-z0-9]{2,19}$/,
    site: /^https?:\/\/www\.[a-zA-Z0-9\-]{2,}(\.[a-z]{2,})?$/,
  };

  if (regex[element.id].test(element.value) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.nextElementSibling.classList.add("d-none");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.nextElementSibling.classList.remove("d-none");
  }
}

function BookMarkView() {
  var bookmarks = "";

  for (var i = 0; i < bookMarkContainer.length; i++) {
    bookmarks += `
    <tr>
     <td>${i}</td>
     <td>${bookMarkContainer[i].Name}</td>
     <td><a href="${bookMarkContainer[i].Url}" target="_blank" class="btn btn-success">Visit</a></td>
     <td><button onclick="deleteBookmark(${i})" class="btn btn-outline-danger">Delete</button></td>



</tr>
     `;
  }
  document.getElementById("tableData").innerHTML = bookmarks;
}
function closeCustomModal() {
  document.getElementById("customModal").classList.add("d-none");
}
