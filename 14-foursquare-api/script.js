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
            const results = await find(searchTerms, centerOfMap.lat, centerOfMap.lng, 10000);
            displaySearchResults(results);
        });

        // select the toggle search button
        document.querySelector("#toggle-search-btn").addEventListener("click", function(){
            let currentDisplayStatus = document.querySelector("#search-container").style.display;
            console.log(currentDisplayStatus);
            if (! currentDisplayStatus  ||currentDisplayStatus == "none") {
                document.querySelector("#search-container").style.display = "block";
            } else {
                document.querySelector("#search-container").style.display = "none";
            }
        });

        
    }

    function displaySearchResults(results) {
        
        for (let r of results.results) {
            const marker = addMarkerToMap(map, r);
            addToSearchResults(r, marker);
        }
    }

    function addMarkerToMap(map, r) {
        const lat = r.geocodes.main.latitude;
        const lng = r.geocodes.main.longitude;
        const coordinate = [lat, lng];
        const marker = L.marker(coordinate);
        marker.addTo(searchResultLayer);
        marker.bindPopup(function(){
            console.log(r);
            const element = document.createElement('div');
            element.innerHTML = `<h1>${r.name}</h1>`;
            async function getPicture() {
                const photos = await fetchVenuePhotos(r.fsq_id);
           
                const firstPhotoImage = photos[0];
                console.log(firstPhotoImage.suffix)
                element.innerHTML += `<img src="${firstPhotoImage.prefix}200x200${firstPhotoImage.suffix}">`
            }
            getPicture();
           
            return element;
        });
        marker.addEventListener("click", function(){
            map.flyTo(coordinate, 16);
        });
        return marker;
    }

    function addToSearchResults(r, marker) {
        const searchResultDiv = document.querySelector("#search-results");
        const resultElement = document.createElement('div');
        resultElement.innerHTML = r.name;
        searchResultDiv.appendChild(resultElement);
        // add the search-item as a class to resultElement
        resultElement.classList.add("result-item");
        resultElement.addEventListener("click", function(){
            // this is an example of closure
            map.flyTo([r.geocodes.main.latitude, r.geocodes.main.longitude], 16);
            marker.openPopup();
        })
    }


});