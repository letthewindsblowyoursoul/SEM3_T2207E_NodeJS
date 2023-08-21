
$(document).ready(function () {
    $("#submit").click(function () {
       $.post("/adduser",
          {
             username: "cuongnx",
             age: 30
          },
          function (data, status) {
             console.log(data);
          });
    });
 });

 $(document).ready(function () {
    $("#addUser").click(function () {
       $.post("/adduser",
          {
             username: $("#username").val(),
             age: $("#age").val()
          },
          function (data, status) {
             console.log(data);
          });
    });
 });