document.addEventListener("DOMContentLoaded", async function(){
    const response = await axios.get("https://api.data.gov.sg/v1/environment/air-temperature");
    console.log(response.data);
});