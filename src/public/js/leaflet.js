const map = L.map('map-template');

const tileURL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

L.tileLayer(tileURL).addTo(map);
map.locate({ enableHighAccuracy: true });
map.on('locationfound', (e) => {
	const coords = [e.latlng.lat, e.latlng.lng];
	const marker = L.marker(coords);
	marker.bindPopup('You are here!');
	map.addLayer(marker);
	map.setView([e.latlng.lat, e.latlng.lng], 13);
});
