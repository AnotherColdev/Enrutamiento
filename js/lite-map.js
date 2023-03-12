// Global variables
var finalizeBtn = document.getElementById('finalize-route');
var currentPosBtn = document.getElementById('current-pos');
var search = document.getElementById('search-routes');
var destinyBtn = document.getElementById('destiny');
var originBtn = document.getElementById('origin');
var isCurrentPos = false;
var isOrigin = false;
var isDestiny = false;
var userLat;
var userLng;
var map;

// Events
search.addEventListener('click', searchRoute);
originBtn.addEventListener('click', originActive);
destinyBtn.addEventListener('click', DestinyActive);
finalizeBtn.addEventListener('click', clearMap);
currentPosBtn.addEventListener('click', currentPosActive);

createMap();

// Add main marker - optional, is just a reference
var originMarker = L.marker([0, 0]);//4.650, -74.172
var destinyMarker = L.marker([0, 0]);

// Technical functions
function createMap() {
    map = L.map('map').setView([4.650, -74.172], 11);
    mapLink = "<a href='http://openstreetmap.org'>OpenStreetMap</a>";
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: 'Leaflet &copy; ' + mapLink + ', contribution', maxZoom: 18 }).addTo(map);
}
map.on('click',function (e) {
    if (isOrigin) {
        originMarker.remove();
        originMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
    }else if (isDestiny) {
        destinyMarker.remove();
        destinyMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
    }else {
        alert('Por favor seleccione qué tipo de punto está escogiendo (Origen o destino)');
    }
});

function currentPosActive() {
    isCurrentPos = true;
    isOrigin = false;
    isDestiny = false;
    originMarker.remove();
    originMarker = L.marker([userLat, userLng]).addTo(map);
} 
function originActive() {
    isOrigin = true;
    isCurrentPos = false;
    isDestiny = false;
  }
  function DestinyActive() {
    isDestiny = true;
    isCurrentPos = false;
    isOrigin = false;
  }

function searchRoute() {
    actualRoute = L.Routing.control({
        waypoints: [
            L.latLng(originMarker.getLatLng()),
            L.latLng(destinyMarker.getLatLng())
        ]
    }).addTo(map);
}

function restoreView() {
    map.setView([userLat, userLng], 16)
}
function clearMap() {
    map.remove();
    createMap();
    restoreView();
}

navigator.geolocation.getCurrentPosition((position) => {
    userLat = position.coords.latitude;
    userLng = position.coords.longitude;
    restoreView();
});
