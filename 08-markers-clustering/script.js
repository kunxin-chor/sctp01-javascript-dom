
function getRandomLatLng(map) {
    // get the boundaries of the map
    let bounds = map.getBounds();
    let southWest = bounds.getSouthWest();
    let northEast = bounds.getNorthEast();
    let lngSpan = northEast.lng - southWest.lng;
    let latSpan = northEast.lat - southWest.lat;

    let randomLng = Math.random() * lngSpan + southWest.lng;
    let randomLat = Math.random() * latSpan + southWest.lat;

    return [ randomLat, randomLng];
}

// L is an object representing `Leaflet`
// It's available when we include in `leafet.js`
// .map function creates a map object
// the first argument is the ID of the element to contain the map
const mapObject = L.map("mapContainer");

// set the center point of where the map is looking at

// first argument is the lat lng of the center pooint. lat,lng will be stored as array. index 0 is lat and index is lng (but sometimes its reversed)
// second arugment will be the zoom level
mapObject.setView([1.3521, 103.8198], 12);

// the tile layer influences how the map will look like
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mapObject);

// add a marker at Bedok 85 (1.3320° N, 103.9387° E)
const bedok85Marker = L.marker([1.3320, 103.9387]);
bedok85Marker.addTo(mapObject);
bedok85Marker.bindPopup(`<h1>Bedok 85</h1>`)

// add a circle to Bukit Timah (1.3294° N, 103.8021° E)
const greenCircle = L.circle([1.3294, 103.8021], {
    radius: 1000,
    color: "green",
    fillColor: "darkGreen",
    opacity: 0.5
})
greenCircle.addTo(mapObject);
greenCircle.addEventListener("click", function(){
    alert("Hello I am at Bukit Timah");
})

// A layer group is a group of layers
// It allows us to put layers into a group so that
// it is easier to manage. And some layer group has 
// special features like the marker cluster group
const markerClusterLayer = L.markerClusterGroup();
markerClusterLayer.addTo(mapObject);

for (let i = 0; i < 1000; i++) {
    const randomCoordinates = getRandomLatLng(mapObject);
    L.marker(randomCoordinates).addTo(markerClusterLayer);
}