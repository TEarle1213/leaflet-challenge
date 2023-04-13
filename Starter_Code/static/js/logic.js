//Set URL for getting quake data
const quakesURL="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

//make a map with baseMap, overlayMap and layer controls -reused a lot of code from week 15 citibike activity
function createMap(quakeLocations) {

    // Create the tile layer that will be the background of our map.
    var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
  
  
    // Create a baseMaps object to hold the streetmap layer.
    var baseMaps = {
      "Street Map": streetmap
    };
  
    // Create an overlayMaps object to hold the quakeLocations layer.
    var overlayMaps = {
      "Earthquakes": quakeLocations
    };
  
    // Create the map object with options.
    var map = L.map("map", {
      center: [40.73, -74.0059],
      zoom: 12,
      layers: [streetmap, quakeLocations]
    });
  
    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
  };
//create markers and affect size of marker with earthquake magnitude
//add a legend showing earthquake depth with corresponding colors
//hover tooltips with magnitude, location and depth
 
d3.json(quakesURL).then(function(data) {

    // Pull the features property from data.
    var earthquakes = data.features;
  
    // Loop through the  array.
    for (var i = 0; i < earthquakes.length; i++) {
        //
        var quakeLat = earthquakes[i].geometry.coordinates[1]
        var quakeLon = earthquakes[i].geometry.coordinates[0]
        var quakeMagnitude = earthquakes[i].properties.mag 
        var quakeDepth = earthquakes[i].geometry.coordinates[2]
        
        //determine fillColor and magSize to give circles on map color and size
        var fillColor =[];
        //made fillColor a list because we need to determine several colors
        if (quakeDepth >= 90) {
            fillColor = 'red';
        }
        else if (quakeDepth >=70) {
            fillColor ='orange';
        }
        else if (quakeDepth >=50) {
            fillColor ='gold';
        }
        else if (quakeDepth >=30) {
            fillColor ='yellow';
        }
        else if (quakeDepth >=10) {
            fillColor ='greenyellow';
        }
        else {fillColor='deepskyblue';
        };
        //then determine size based on magnitude
        var magSize = 300 * quakeMagnitude
        //Come back to this, are the circles big enough?
        //make circlemarkers
        let circles = L.circle([quakeLat,quakeLon], {
            color: fillColor,
            radius: magSize
        }).addTo(map)
        }
    
    
    //hovering popups - using bind and showing magnitude, depth and location
        circles=L.bindPopup("Magnitude: " + quakeMagnitude + "Location Coordinates: " + quakeLat + "," + quakeLat + "Depth of Quake: " + quakeDepth );
    });


// create a legend
let legend = L.control({position: "bottomright"});
legend.onAdd=function(map){
        var div = L.DomUtil.create("div", "legend");
        div.innerHTML
}


