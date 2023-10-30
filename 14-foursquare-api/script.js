const singapore = [1.29, 103.85];

document.addEventListener("DOMContentLoaded", async function(){
   
    const map = initMap(); // create the map

    // all the markers for the search will be inside here
    const searchResultLayer = L.layerGroup();
    searchResultLayer.addTo(map);

    setupEventHandlers();

     function setupEventHandlers() {
        // setup the event handlers and create the map
        document.querySelector("#search-btn").addEventListener('click', async function(){
            const searchTerms = document.querySelector("#search-terms").value;
            const centerOfMap = map.getBounds().getCenter();
            const results = await find(searchTerms, centerOfMap.lat, centerOfMap.lng);
            displaySearchResults(results);
        })
        
    }

    function displaySearchResults(results) {
        for (let r of results.results) {
            const lat = r.geocodes.main.latitude;
            const lng = r.geocodes.main.longitude;
            const coordinate = [lat, lng];
            const marker = L.marker(coordinate);
            marker.addTo(searchResultLayer);
            marker.bindPopup(`<h1>${r.name}</h1>`);
            marker.addEventListener("click", function(){
                map.flyTo(coordinate, 16);
            })
        }
    }

});