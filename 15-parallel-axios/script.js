async function loadJSON(filePath) {
    const response = await axios.get(filePath);
    return response.data;
}

document.addEventListener("DOMContentLoaded", async function () {
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

    // EASY METHOD: LIST THE JSON FILES MANUALLY
    // load in the cycling tracks
    // keep in mind: if we call an async function AND DIDN'T AWAIT, it will return a promise
    // const cyclingPromise = loadJSON("data/cycling.geojson");
    // const nparkPromise =  loadJSON("data/nparks.geojson");

    // const cycling = await cyclingPromise;
    // const nparks = await nparkPromise;

    // ADVANCED METHOD: USING axios.all
    const geoJSONRequests = [
        loadJSON("data/cycling.geojson"), 
        loadJSON("data/nparks.geojson")
    ];

    // axios.all takes in an array of PROMISES
    const responses = await axios.all(geoJSONRequests);
   console.log(responses);
    const cycling = responses[0];
    const nparks = responses[1];

    // L.geoJson takes two paramters
    // 1. the GeoJSON object
    // 2. an object that provide configuration options
    const cyclingLayer = L.geoJson(cycling,{
       // this function is called for each feature in the GeoJSON object
       // first arg: the feature data
       // second arg: the layer (i.e the path,marker etc.) created for the feature
        onEachFeature:function(feature, layer) {
           
            // create a temp element to store the HTML
            const tempElement = document.createElement('div');
            tempElement.innerHTML = feature.properties.Description;
            
            // use querySelectorAll to extract from the tempElement the data I am interested in
            const allTDs = tempElement.querySelectorAll('td');
            const region = allTDs[0].innerHTML;
            const agency = allTDs[1].innerHTML;
            layer.bindPopup(`<h1>${region}</h1>
                <h2>${agency}</h2>
            `);
       } 
    });
    // set the color of the lines to red
    cyclingLayer.setStyle({
        color:'red'
    })
    // customize the geoJson layer
    cyclingLayer.addTo(mapObject);

   
    const nparkLayer = L.geoJSON(nparks, {
        onEachFeature:function(feature, layer) {
            const html = feature.properties.Description;
            const tempElement = document.createElement("div");
            tempElement.innerHTML = html;
            const allTDs = tempElement.querySelectorAll('td');
            const region = allTDs[0].innerHTML;
            const agency = allTDs[0].innerHTML;
            layer.bindPopup(`<h1>${region}</h1><h2>${agency}</h2>`);
        }
    })
    nparkLayer.setStyle({
        color:"green"
    })
    nparkLayer.addTo(mapObject);

    // the first parameter is for the base layers (only one can be active and there always be one active)
    // the second parameter for the overlay (optional - can none active or more than one active)
    L.control.layers({}, {
        "LTA": cyclingLayer,
        "NParks": nparkLayer
    }).addTo(mapObject);

})

