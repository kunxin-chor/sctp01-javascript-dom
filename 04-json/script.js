document.addEventListener("DOMContentLoaded", async function() {
    const tasks = await loadData();
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