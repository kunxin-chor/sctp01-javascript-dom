const button = document.querySelector("#submit-btn");
button.addEventListener("click", function(){
    // do whatever we want to do when the click is detected
 
    let firstName;
    let firstNameElement = document.querySelector("#first-name");
    firstName = firstNameElement.value;
    console.log("firstName =", firstName);

    let lastName = document.querySelector("#last-name").value;

    console.log("first name =", firstName);
    console.log("last name =", lastName);



})