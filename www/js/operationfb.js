function addIncident() {
	var lat = returnLat();
	var lng  = returnLng();
	var desc = document.getElementById('description').value;
	var type = document.getElementById('rodzaj');
	var selectedType = type.options[type.selectedIndex].text;
	var userId = firebase.auth().currentUser.uid;
	var dayD = document.getElementById('dayI').value;
	var timeD = document.getElementById('timeI').value;
	var date = dayD + " " + timeD;
	var contact = "";
	if(desc != "") {
		if(lat != "") {
			if(dayD != "" && timeD != "") {
			var k = prompt("Jeśli chcesz by inni kontaktowali się z Tobą w sprawie zgłoszonego incydentu \npodaj dane kontaktowe. W innym przypadku wciśnij anuluj.", "");
			if (k == null || k == "") {
			contact = "brak";
			} else {
			contact = k;
			} 
			var r = confirm("Na pewno chcesz dodać incydent do bazy?");
			if (r == true) {
			var newIncident = firebase.database().ref('app/incidents/').push();
			newIncident.set({
			latitude: lat,
			longitude: lng,
			description: desc,
			type: selectedType,
			date: date,
			user: userId,
			contact: contact
		})
		alert("Dodano incydent do bazy");	
		readFb();
		}
		}else {
			alert("Podaj czas zdarzenia");
		}
		}else {
			alert("Brak znacznika na mapie");
		}
	}
	else {
	alert("Podaj opis zdarzenia");
	}
}

var markers = [];
var incidents = new Array();

function readFb() {
	var i = 0;
	var map = returnMap();
	firebase.database().ref('app/incidents/').once('value').then(function(snapshot) {
    snapshot.forEach(function(incidentSnapshot) {
		incidents[i] = new Array();
        var inc = incidentSnapshot.val();
		incidents[i][0] = inc.description;
		incidents[i][1] = inc.latitude;
		incidents[i][2] = inc.longitude;
		incidents[i][3] = inc.type;
		incidents[i][4] = inc.date;
		incidents[i][5] = inc.user;
		incidents[i][6] = inc.contact;
		i+=1;
    });
	}). then(function(en) {
		
	for(j = 0; j < incidents.length; j++) {
		var position = {
		lat: incidents[j][1],
		lng: incidents[j][2]
		}
		var pinImage = "";
		switch(incidents[j][3]) {
		case "Wypadek":
			pinImage = pinImageW;
			break;
		case "Stłuczka":
			pinImage = pinImageS;
			break;
		case "Kradzież":
			pinImage = pinImageK;
			break;
		case "Napaść":
			pinImage = pinImageN;
			break;
		case "Zaginięcie":
			pinImage = pinImageZ;
			break;
		case "Morderstwo":
			pinImage = pinImageM;
			break;
		case "Zguba":
			pinImage = pinImageZg;
			break;
} 
		var marker = new google.maps.Marker({
        position: position,
		icon: pinImage,
        map: map,
    });
	markers.push(marker);
    var infowindow = new google.maps.InfoWindow({content:""});
    google.maps.event.addListener(marker, 'click', (function(marker, j) {
        return function() {
			var con = "";
			if(incidents[j][6] != null && incidents[j][6] != "brak"){
				con = "<br> Dane kontaktowe: " + incidents[j][6];
			}
            infowindow.setContent('<div style="width: 25em;">' + "Data zdarzenia: " + incidents[j][4] + "<br> Opis: " + incidents[j][0] + con + '</div>');
            infowindow.open(map, marker);
        }
    })(marker, j));
	}
	});
}

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
	}
}

var heatmap = "";
var heatV = false;

function heat() {
	if(heatV == false) {
	setMapOnAll(null);
	var map = returnMap();
    var heatmapData = [];
	var weight = "";

	for (var i = 0; i < incidents.length; i++) {
		switch(incidents[i][3]) {
		case "Wypadek":
			weight = 5;
			break;
		case "Stłuczka":
			weight = 1;
			break;
		case "Kradzież":
			weight = 2;
			break;
		case "Napaść":
			weight = 3;
			break;
		case "Zaginięcie":
			weight = 4;
			break;
		case "Morderstwo":
			weight = 6;
			break;
		case "Zguba":
			weight = 0.5;
			break;
		}
		heatmapData.push({location: new google.maps.LatLng(incidents[i][1], incidents[i][2]), weight: weight});
	}
	map.setZoom(13);
	map.setCenter({lat: 50.062105, lng: 19.938256});
	heatmap = new google.maps.visualization.HeatmapLayer({
	data: heatmapData, radius: 20
	});
	heatmap.setMap(map);
	heatV = true;
	}
}

function normal() {
	if(heatV == true) {
	var map = returnMap();
	map.setZoom(14);
	setMapOnAll(map);
	heatmap.setMap(null);
	heatV = false;
	}
}

function showTypes() {
	setMapOnAll(null);
	var wy = document.getElementById("wy");
	var st = document.getElementById("st"); 
	var kr = document.getElementById("kr");
	var na = document.getElementById("na");
	var za = document.getElementById("za"); 
	var mo = document.getElementById("mo");
	var zg = document.getElementById("zg");

	for(i = 0; i < incidents.length; i++){
		if(wy.checked) {
		if(incidents[i][3] == "Wypadek") {
			markers[i].setMap(map);
		}
	}
	if(st.checked) {
		if(incidents[i][3] == "Stłuczka") {
			markers[i].setMap(map);
		}
	}
	
	if(kr.checked) {
		if(incidents[i][3] == "Kradzież") {
			markers[i].setMap(map);
		}
	}
	if(na.checked) {
		if(incidents[i][3] == "Napaść") {
			markers[i].setMap(map);
		}
	}
	if(za.checked) {
		if(incidents[i][3] == "Zaginięcie") {
			markers[i].setMap(map);
		}
	}
	if(mo.checked) {
		if(incidents[i][3] == "Morderstwo") {
			markers[i].setMap(map);
		}
	}
	if(zg.checked) {
		if(incidents[i][3] == "Zguba") {
			markers[i].setMap(map);
		}
	}
}
}

var pinColorW = "4D2600"; //brazowy
var pinImageW = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColorW,
    new google.maps.Size(21, 34),
    new google.maps.Point(0,0),
    new google.maps.Point(10, 34));

var pinColorS = "FF6600"; //pomaranczowy
var pinImageS = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColorS,
    new google.maps.Size(21, 34),
    new google.maps.Point(0,0),
    new google.maps.Point(10, 34));
	
var pinColorK = "600080"; //fioletowy
var pinImageK = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColorK,
    new google.maps.Size(21, 34),
    new google.maps.Point(0,0),
    new google.maps.Point(10, 34));
	
var pinColorN = "B30000"; //czerwony
var pinImageN = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColorN,
    new google.maps.Size(21, 34),
    new google.maps.Point(0,0),
    new google.maps.Point(10, 34));
	
var pinColorZ = "7A7A52"; //szary
var pinImageZ = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColorZ,
    new google.maps.Size(21, 34),
    new google.maps.Point(0,0),
    new google.maps.Point(10, 34));
	
var pinColorM = "1A1A1A"; //czarny
var pinImageM = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColorM,
    new google.maps.Size(21, 34),
    new google.maps.Point(0,0),
    new google.maps.Point(10, 34));
	
var pinColorZg = "4F83C6"; //niebieski
var pinImageZg = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColorZg,
    new google.maps.Size(21, 34),
    new google.maps.Point(0,0),
    new google.maps.Point(10, 34));