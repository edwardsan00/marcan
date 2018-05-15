var all_markers = [];
var restaurantes = [
	['Bondi Resturante', -12.111837, -76.968842, 4],
	['Coogee Resturante', -12.152116 , -76.92215, 5],
	['Cronulla Resturante', -12.189704, -77.001801, 3],
	['Manly Resturante', -12.109152, -76.891937, 2],
	['Maroubra Resturante', -11.996338, -77.023773, 1]
];
var hoteles = [
	['Bondi Hotel', -12.122579, -76.636505, 4],
	['Coogee Hotel', -12.146746, -76.543121, 5],
	['Cronulla Hotel', -12.187019, -76.457977, 3],
	['Manly Hotel', -12.213865, -76.532135, 2],
	['Maroubra Hotel', -12.141376, -76.202545, 1]
];
var spa = [
	['Bondi spa', -11.775948, -76.930389, 2],
	['Coogee spa', -11.732924, -77.040253, 1]
];
var escuela = [
	['Bondi escuela', -12.307802, -76.735382, 3],
	['Coogee escuela', -12.361466, -76.716156, 2],
	['Cronulla escuela', -12.294385, -76.647491, 1]
];

var styles = [
	{
		"featureType": "water",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#e9e9e9"
			},
			{
				"lightness": 17
			}
		]
	},
	{
		"featureType": "landscape",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#f5f5f5"
			},
			{
				"lightness": 20
			}
		]
	},
	{
		"featureType": "road.highway",
		"elementType": "geometry.fill",
		"stylers": [
			{
				"color": "#ffffff"
			},
			{
				"lightness": 17
			}
		]
	},
	{
		"featureType": "road.highway",
		"elementType": "geometry.stroke",
		"stylers": [
			{
				"color": "#ffffff"
			},
			{
				"lightness": 29
			},
			{
				"weight": 0.2
			}
		]
	},
	{
		"featureType": "road.arterial",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#ffffff"
			},
			{
				"lightness": 18
			}
		]
	},
	{
		"featureType": "road.local",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#ffffff"
			},
			{
				"lightness": 16
			}
		]
	},
	{
		"featureType": "poi",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#f5f5f5"
			},
			{
				"lightness": 21
			}
		]
	},
	{
		"featureType": "poi.park",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#dedede"
			},
			{
				"lightness": 21
			}
		]
	},
	{
		"elementType": "labels.text.stroke",
		"stylers": [
			{
				"visibility": "on"
			},
			{
				"color": "#ffffff"
			},
			{
				"lightness": 16
			}
		]
	},
	{
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"saturation": 36
			},
			{
				"color": "#333333"
			},
			{
				"lightness": 40
			}
		]
	},
	{
		"elementType": "labels.icon",
		"stylers": [
			{
				"visibility": "off"
			}
		]
	},
	{
		"featureType": "transit",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#f2f2f2"
			},
			{
				"lightness": 19
			}
		]
	},
	{
		"featureType": "administrative",
		"elementType": "geometry.fill",
		"stylers": [
			{
				"color": "#fefefe"
			},
			{
				"lightness": 20
			}
		]
	},
	{
		"featureType": "administrative",
		"elementType": "geometry.stroke",
		"stylers": [
			{
				"color": "#fefefe"
			},
			{
				"lightness": 17
			},
			{
				"weight": 1.2
			}
		]
	}
]

var map = new google.maps.Map(document.getElementById('map'), {
	zoom: 10,
	center: new google.maps.LatLng(-12.063495, -76.971588),
	mapTypeId: google.maps.MapTypeId.ROADMAP,
	styles: styles
});
function buildMarkers(locations,tipo){
	var markers = [];
	var infowindow = new google.maps.InfoWindow();
	for (i = 0; i < locations.length; i++) {
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations[i][1], locations[i][2]),
			map: map,
			icon:"./assets/img/marke.png"
		});
		google.maps.event.addListener(marker, 'click', (function(marker, i) {
			return function() {
				infowindow.setContent(locations[i][0]);
				infowindow.open(map, marker);
			}
		})(marker, i));
		markers.push({
			nombre:locations[i][0],
			marker:marker,
			tipo:tipo
		});
		all_markers.push({tipo:tipo, marker:marker});
	}
	return markers
}
buildMarkers(restaurantes, "R")
buildMarkers(hoteles, "H")
buildMarkers(spa, "S")
buildMarkers(escuela, "E")
//- ELIMINAR MAPAS
function clearMaps(){
	for (i = 0; i < all_markers.length; i++) {
		all_markers[i].marker.setMap(null)
	}
}
//- OBTENIENDO EL MAPA ACTUAL
function markMap(markers, mapa){
	clearMaps()
	var bounds = new google.maps.LatLngBounds();
	for (i = 0; i < markers.length; i++) {
		bounds.extend(markers[i].marker.getPosition())
		markers[i].marker.setMap(mapa);
	}
	map.setCenter(bounds.getCenter());
}
function MarkersByType(tipo){
	return all_markers.filter(function(row){
		return row.tipo == tipo
	});
}
markMap(MarkersByType('R'),map);
$('.loca_img').eq(0).addClass('active');
$('.loca_img').click(function(e){
	e.preventDefault();
	var self = $(this)
	$('.loca_img').removeClass('active');
	self.addClass('active');
	var tipo = self.data('tipo');
	markMap(MarkersByType(tipo),map);
	
	$('.loca_map, .wrap_location').addClass('active');
});
$('.close_map').click(function(e){
	$('.loca_map, .wrap_location').removeClass('active');
});