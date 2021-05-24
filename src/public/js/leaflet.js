var map = L.map('map-template');
var map2 = L.map('map2');
var map3 = L.map('map3');

const tileURL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const socket = io();
L.tileLayer(tileURL).addTo(map);
map.locate({ enableHighAccuracy: true });
map.on('locationfound', (e) => {
	coords = [e.latlng.lat, e.latlng.lng];
	L.marker(coords).bindPopup('You are here!').addTo(map);
	map.setView([e.latlng.lat, e.latlng.lng], 14);
	socket.emit('userCoordinates', e.latlng);
});

L.tileLayer(tileURL).addTo(map2);
map2.setView([20.6874157, -103.3578227], 11);

L.tileLayer(tileURL).addTo(map3);
map3.setView([20.6874157, -103.3578227], 11);

const geoJson = '/json/geojson.json';

fetch(geoJson)
	.then((res) => res.json())
	.then((data) => {
		L.geoJSON(data).addTo(map2);
	});

socket.on('newUserConnected', (coords) => {
	const marker = L.marker([coords.lat, coords.lng]);
	marker.bindPopup('New User!');
	map3.addLayer(marker);
});
