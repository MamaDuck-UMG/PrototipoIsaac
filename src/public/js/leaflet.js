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

socket.on('newUserConnected', (coords) => {
	const marker = L.marker([coords.lat, coords.lng]);
	marker.bindPopup('New User!');
	map.addLayer(marker);
});

function geoFindMe() {
	const lat = document.querySelector('#lat');
	const lng = document.querySelector('#lng');

	mapLink.href = '';

	function success(position) {
		const latitude = position.coords.latitude;
		const longitude = position.coords.longitude;

		lat.textContent = `${latitude}`;
		lng.textContent = `${longitude}`;
	}

	function error() {
		lat.textContent = 'Unable to retrieve your location';
	}

	if (!navigator.geolocation) {
		lat.textContent = 'Geolocation is not supported by your browser';
	} else {
		lat.textContent = 'Locating…';
		navigator.geolocation.getCurrentPosition(success, error);
	}
}

document.querySelector('#find-me').addEventListener('click', geoFindMe);
