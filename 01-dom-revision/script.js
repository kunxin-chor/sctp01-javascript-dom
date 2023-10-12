// the `document` object is available
// in all `.js` file that are included
// in a html file

// select one element that matches the query
// (the query is the first parameter and it's the same
// type of query selector for css )
// the result of querySelector returns DOM Node
// a DOM node is an object that represent the element
const h1Element = document.querySelector("#title");
h1Element.innerHTML = "Jing Yuan Seafood Soup";
h1Element.style.backgroundColor = "pink";

const listItems = document.querySelectorAll(".selling");
// we use a for loop because listItems is an array
// it will the array of all the `li.selling`
for (let item of listItems) {
    // the CSS property will be in camel case
    // if we are using JavaScript to change them
    // .selling { 
    //    font-size: 42px;
    // 
    // }
    item.style.fontSize = "42px";
}