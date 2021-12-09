mapboxgl.accessToken =
	'pk.eyJ1IjoiZHVjbGFtMjI3IiwiYSI6ImNrd3Z6OHhqZDA4a3cyb3M4czltcHAwZXMifQ.5bneNUlldaEBHRv9vr0vNA';

const map = new mapboxgl.Map({
	container : 'map',
	style     : 'mapbox://styles/mapbox/streets-v11',
});

const markers = [];
let navigate = false;
loadMap();

// Add zoom and rotation controls to the map.
const nav = new mapboxgl.NavigationControl();
map.addControl(nav);

//when successfully got user's location, zoom in on it on the map
function successLocation (position) {
	flyToPlace([ position.coords.longitude, position.coords.latitude ]);
}

//if cannot get user's location, zoom into the default coords
function errorLocation () {}

function flyToPlace (center) {
	map.flyTo({
		center    : center,
		essential : true,
	});

	if(!navigate){
		markers.forEach(function (item) {
			item.remove();
		});
		markers.length = 0;
	}	
	const marker = new mapboxgl.Marker().setLngLat(center).addTo(map);
	markers.push(marker);
}

function loadMap () {
	//get user's current location, if success, call function successLocation, otherwise call errorLocation
	navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
		enableHighAccuracy : true,
	});

	const searchbox = document.getElementById('searchbox');
	searchbox.addEventListener('keyup', function () {
		SearchForPlace('');
	});

	document.addEventListener('click', function (e) {
		if (
			e.target != document.getElementById('searchbox') ||
			e.target != document.getElementById('search-results')
		) {
			if (!document.getElementById('search-results').classList.contains('none')) {
				document.getElementById('search-results').classList.add('none');
			}
		};

		if (
			e.target != document.getElementById('second-searchbox') ||
			e.target != document.getElementById('second-search-results')
		) {
			if (!document.getElementById('second-search-results').classList.contains('none')) {
				document.getElementById('second-search-results').classList.add('none');
			}
		}
	});
}

async function SearchForPlace (id) {
	id = id.length > 0 ? id + '-' : id;
	const text = document.getElementById(id + 'searchbox').value;
	if (text.length > 0) {
		const url =
			'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
			text +
			'.json?fuzzyMatch=false&access_token=' +
			mapboxgl.accessToken;
		const response = await fetch(url, {
			method : 'GET',
		});
		const data = await response.json();
		loadResults(data.features, id);
	}
}

function loadResults (array, id) {
	//show results box
	const resultsBox = document.getElementById(id + 'search-results');
	resultsBox.innerHTML = '';

	if (resultsBox.classList.contains('none')) {
		resultsBox.classList.remove('none');
	}

	//add results into box
	array.forEach(function (item) {
		const name = document.createElement('div');
		name.classList.add('name');
		name.innerHTML = item.text;

		const address = document.createElement('div');
		address.classList.add('address');
		address.innerHTML = item.place_name;

		const searchitem = document.createElement('div');
		searchitem.classList.add('search-item');
		searchitem.appendChild(name);
		searchitem.appendChild(address);
		searchitem.addEventListener('click', function () {
			flyToPlace(item.center);
			if (!document.getElementById('search-results').classList.contains('none')) {
				document.getElementById('search-results').classList.add('none');
			}
			if (!document.getElementById('second-search-results').classList.contains('none')) {
				document.getElementById('second-search-results').classList.add('none');
			}
		});

		resultsBox.appendChild(searchitem);
	});
}

function GoToMyLocation () {
	navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
		enableHighAccuracy : true,
	});
}

function ToggleNavigator () {
	const secondSearchbox = document.getElementById('secondSearch');
	if (secondSearchbox.classList.contains('none')) {
		secondSearchbox.classList.remove('none');

		const searchbox = document.getElementById('second-searchbox');
		searchbox.addEventListener('keyup', function () {
			SearchForPlace('second');
		});
		navigate = true;
	}
	else {
		secondSearchbox.classList.add('none');
		navigate = false;
	}
}
