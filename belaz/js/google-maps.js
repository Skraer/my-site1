var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('googleMap'), {
        center: { lat: 64.544511, lng: 40.515571 },
        zoom: 17
    });
}