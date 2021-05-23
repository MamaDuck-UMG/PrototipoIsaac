const map = L.map('map-template');
const tileURL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const socket = io();
L.tileLayer(tileURL).addTo(map);
map.locate({ enableHighAccuracy: true });
map.on('locationfound', (e) => {
	coords = [e.latlng.lat, e.latlng.lng];
	const marker = L.marker(coords);
	marker.bindPopup('You are here!');
	map.addLayer(marker);
	map.setView([e.latlng.lat, e.latlng.lng], 13);
	socket.emit('userCoordinates', e.latlng);
});

const geoJson = '/json/geojson.json';

fetch(geoJson)
	.then((res) => res.json())
	.then((data) => {
		L.geoJSON(data).addTo(map);
	});

socket.on('newUserConnected', (coords) => {
	const marker = L.marker([coords.lat, coords.lng]);
	marker.bindPopup('New User!');
	map.addLayer(marker);
});

longit = document.getElementsByTagName('p');
latit = document.getElementsByTagName('h1');
coordiLat = [];
coordiLng = [];
Array.from(latit).forEach((item, i) => (coordiLat[i] = item.innerHTML));
Array.from(longit).forEach((item, i) => (coordiLng[i] = item.innerHTML));

const feature = {
	type: 'Feature',
	geometry: {
		type: 'Point',
		coordinates: [parseFloat(coordiLng[0]), parseFloat(coordiLat[0])],
	},
	properties: {
		prop0: 'value0',
	},
};
console.log(feature);
featureJ = JSON.stringify(feature);

function geoFindMe() {
	const lat = document.querySelector('#lat');
	const lng = document.querySelector('#lng');

	function success(position) {
		const latitude = position.coords.latitude;
		const longitude = position.coords.longitude;

		lat.textContent = `${latitude}`;
		lng.textContent = `${longitude}`;
	}

	function error() {
		alert('Unable to retrieve your location');
	}

	if (!navigator.geolocation) {
		alert('Geolocation is not supported by your browser');
	} else {
		navigator.geolocation.getCurrentPosition(success, error);
	}
}

document.querySelector('#find-me').addEventListener('click', geoFindMe);
