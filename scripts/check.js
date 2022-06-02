const { default: axios } = require("axios");

let bookID;

function checkoutFn(id) {
  bookID = id;
  axios
    .post("/dashboard/checkoutreq", {
      bookID: bookID,
    })
    .then((res) => {
      window.location.href = "https://localhost:5000/dashboard";
    });
}

function checkinFn(id) {
  bookID = id;
  axios
    .post("/dashboard/checkinreq", {
      bookID: bookID,
    })
    .then((res) => {
      window.location.href = "https://localhost:5000/dashboard";
    });
}
