function getRandomLatLng(map) {
    // get the boundaries of the map
    let bounds = map.getBounds();
    let southWest = bounds.getSouthWest();
    let northEast = bounds.getNorthEast();
    let lngSpan = northEast.lng - southWest.lng;
    let latSpan = northEast.lat - southWest.lat;

    let randomLng = Math.random() * lngSpan + southWest.lng;
    let randomLat = Math.random() * latSpan + southWest.lat;

    return [ randomLat, randomLng,];
}

const map = L.map('map');

// Set the center point at Zoo
// 1.4047, 103.7949
map.setView([1.4047, 103.7949], 15);

// Need a tile layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);

const randomGreenGroup = L.layerGroup();
randomGreenGroup.addTo(map);
for (let i = 0; i < 10; i++) {
    const circle = L.circle(getRandomLatLng(map), {
        color: "green",
        fillColor:"green",
        fillOpacity:0.5,
        radius:250
    });
    circle.addTo(randomGreenGroup);
}

// A LAYER - is one marker, one circle (aka one overlay on top of the map)
// A LAYER GROUP CAN ORGANISE LAYERS
const randomLayerGroup = L.layerGroup();
randomLayerGroup.addTo(map);
for (let i = 0; i < 10; i++) {
    const marker = L.marker(getRandomLatLng(map));
    marker.addTo(randomLayerGroup);
}

const randomCircleGroup = L.layerGroup();
randomCircleGroup.addTo(map);
for (let i = 0; i < 10; i++) {
    const circle = L.circle(getRandomLatLng(map), {
        color: "red",
        fillColor:"orange",
        fillOpacity:0.5,
        radius:500
    });
    circle.addTo(randomCircleGroup);
}

document.querySelector("#hide-btn")
    .addEventListener("click", function(){
        // hide the random layer group
        // (so all the markers inside it will disappear)
        map.removeLayer(randomLayerGroup);
    });

document.querySelector("#show-btn")
    .addEventListener("click", function(){
        // show markers
        map.addLayer(randomLayerGroup);
    });

document.querySelector("#toggle-btn")
    .addEventListener("click", function(){
        // if the random layer group already exists then remove
        if (map.hasLayer(randomLayerGroup)) {
            map.removeLayer(randomLayerGroup);
        } else {
            map.addLayer(randomLayerGroup);
        }
    })

// BASE LAYERS: you can only show one at a time
const baseLayers = {
    "Markers": randomLayerGroup,
    "Orange Circles": randomCircleGroup
}

// OVERALYS: can show as many as you want
const overlays = {
    "Green Circle": randomGreenGroup
}

L.control.layers(baseLayers, overlays).addTo(map);