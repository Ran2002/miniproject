const email = document.getElementById("email");
const pass = document.getElementById("password");
const button = document.getElementById("login");

button.addEventListener("click", () => {
  console.log(email.value);
  const userEmail = email.value.trim();
  const userPassword = pass.value.trim();

  if (userEmail === "" || userPassword === "") {
    alert("Please enter both email and password");
    return;
  }

  // Assuming the server endpoint for authentication is '/login'
  fetch('http://localhost:4000/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Network response was not ok');
      }
    })

    .then((data) => {
      const comp = data.find(
        (el)=>el.email === userEmail && el.password == userPassword
      );

      if (comp !== undefined) {
        alert("Logged in!!");

        window.location.replace("./index.html");
      } else {
        alert("User does not exist!!");
        window.location.replace("./register.html");
      }
    })
    
    
    .catch((error) => console.error("Error fetching data:", error));
});
