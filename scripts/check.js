const { default: axios } = require("axios");

let bookID;

function checkoutFn(id) {
  bookID = id;
  axios
    .post("/dashboard/checkoutreq", {
      bookID: bookID,
    })
    .then((res) => {
      window.location.href = "http://localhost:5000/dashboard";
    });
}

function checkinFn(id) {
  bookID = id;
  axios
    .post("/dashboard/checkinreq", {
      bookID: bookID,
    })
    .then((res) => {
      window.location.href = "http://localhost:5000/dashboard";
    });
}

function removeFn(id) {
  bookID = id;
  axios
    .post("/admin/admin-dashboard/removeBooks", {
      bookID: bookID,
    })
    .then((res) => {
      window.location.href = "http://localhost5000/admin/admin-dashboard";
    });
}
