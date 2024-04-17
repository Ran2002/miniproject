const email = document.getElementById("email");
const pass = document.getElementById("password");
const submitForm = document.getElementById("submit");

function isEmail(eemail) {
  for (var i = 0; i < eemail.length; i++)
    if (eemail.charAt(i) === "@") return true;
  return false;
}

submitForm.addEventListener("click", (e) => {
  e.preventDefault();
  const userData = {
    email: email.value,
    password: pass.value,
  };

  if (!isEmail(email.value) || pass.value.length < 6) {
    alert(
      "! Reminder\n --> All Fields are mandatory\n--> Email should be valid\n--> Password length should not be less than 6"
    );
  } else {
    fetch("http://localhost:4000/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        const item = data.find((el) => el.email === email.value);
        if (item === undefined) {
          return fetch("http://localhost:4000/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          });
        } else {
          throw new Error("User Already Exist!");
        }
      })
      .then((res) => {
        if (res.ok) {
          alert("Registration Successful! Please proceed to login.");
          window.location.replace("./index.html");
        } else {
          throw new Error("Registration failed");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }
});
