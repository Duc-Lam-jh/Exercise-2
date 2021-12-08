// import { MapboxStyleSwitcherControl } from "mapbox-gl-style-switcher";
// import "mapbox-gl-style-switcher/styles.css";

mapboxgl.accessToken =
	'pk.eyJ1IjoiZHVjbGFtMjI3IiwiYSI6ImNrd3Z6OHhqZDA4a3cyb3M4czltcHAwZXMifQ.5bneNUlldaEBHRv9vr0vNA';

//get user's current location, if success, call function successLocation, otherwise call errorLocation
navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
	enableHighAccuracy : true,
});

//when successfully got user's location, zoom in on it on the map
function successLocation (position) {
	//console.log(position);
	setUpMap([ position.coords.longitude, position.coords.latitude ]);
}

//if cannot get user's location, zoom into the default coords
function errorLocation () {
	setUpMap([ 0, 0 ]);
}

function setUpMap (center) {
	const map = new mapboxgl.Map({
		container : 'map',
		style     : 'mapbox://styles/mapbox/streets-v11',
		center    : center,
		zoom      : 17,
	});

	// Add zoom and rotation controls to the map.
	const nav = new mapboxgl.NavigationControl();
	map.addControl(nav);

	const geocoder = new MapboxGeocoder({
		accessToken : mapboxgl.accessToken,
		mapboxgl    : mapboxgl
	});
  map.addControl(geocoder, 'top-left');

  const styleswitcher = new MapboxStyleSwitcherControl();
  map.addControl(styleswitcher);

  // const language = new MapboxLanguage();
	// map.addControl(language);
}