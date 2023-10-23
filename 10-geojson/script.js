// L is an object representing `Leaflet`
// It's available when we include in `leafet.js`
// .map function creates a map object
// the first argument is the ID of the element to contain the map
const mapObject = L.map("mapContainer");

// set the center point of where the map is looking at

// first argument is the lat lng of the center pooint. lat,lng will be stored as array. index 0 is lat and index is lng (but sometimes its reversed)
// second arugment will be the zoom level
mapObject.setView([1.3521, 103.8198], 13);

// the tile layer influences how the map will look like
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mapObject);

async function loadData() {
    const response = await axios.get("cycling.geojson");
    return response.data;
}

document.addEventListener("DOMContentLoaded", async function(){
    const paths = await loadData();
    
    function renderCyclingPaths() {
        // GeoJSON layer
        const cyclingPathLayer = L.geoJSON(paths);
        cyclingPathLayer.addTo(mapObject);
        // mapObject.add(cyclingPathLayer);
    }

    renderCyclingPaths();


    const hawkerCenters = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {
                    "name": "Maxwell Food Centre",
                    "address": "1 Kadayanallur St, Singapore 069184"
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [103.844482, 1.280014]
                }
            },
            {
                "type": "Feature",
                "properties": {
                    "name": "Lau Pa Sat",
                    "address": "18 Raffles Quay, Singapore 048582"
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [103.850267, 1.280811]
                }
            },
            {
                "type": "Feature",
                "properties": {
                    "name": "Tiong Bahru Market",
                    "address": "30 Seng Poh Rd, Singapore 168898"
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [103.831417, 1.284407]
                }
            },
            {
                "type": "Feature",
                "properties": {
                    "name": "Chomp Chomp Food Centre",
                    "address": "20 Kensington Park Rd, Singapore 557269"
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [103.867853, 1.365029]
                }
            }
        ]
    }
    

    const hawkerCenterLayer = L.geoJSON(hawkerCenters);
    hawkerCenterLayer.addTo(mapObject);

})