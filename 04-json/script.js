document.addEventListener("DOMContentLoaded", async function() {
    // await is to tell a function
    // to pause at that line until that line
    // has completed, we can only await an asynchronous
    // operation (also known as a promise)
    const tasks =  await loadData();
    for (let t of tasks) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${t.name} due on ${t.date} (${t.urgency})`;
        
        const todoList = document.querySelector("#todoList");
        todoList.appendChild(listItem);
    }

});

// loadData will basically read in the JSON object
// in the `data.json` and return it
async function loadData() {
    const response = await axios.get("data/data.json");
    return response.data;
}