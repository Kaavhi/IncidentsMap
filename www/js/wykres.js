function wykres() {
var incidents = getI();

var zag = 0;
var mor = 0;
var zgb = 0;
var wyp = 0;
var nap = 0;
var kra = 0;
var stl = 0;

for (var i = 0; i < incidents.length; i++) {
	switch(incidents[i][3]) {
		case "Wypadek":
			wyp++;
			break;
		case "Stłuczka":
			stl++;
			break;
		case "Kradzież":
			kra++;
			break;
		case "Napaść":
			nap++;
			break;
		case "Zaginięcie":
			zag++;
			break;
		case "Morderstwo":
			mor++;
			break;
		case "Zguba":
			zgb++;
			break;
}
}
var chart = bb.generate({
  data: {
    columns: [
	["Zgubienia", zgb],
	["Stłuczki", stl],
	["Kradzieże", kra],
	["Napaści", nap],
	["Zaginięcia", zag],
	["Wypadki", wyp],
	["Morderstwa", mor]
            ],
        "type": "bar",
        "selection": {
            "grouped": false,
            "enabled": false
        }
    },
    "size": {
        "width": 0
    },
    "transition": {
        "duration": 835
    },
    "legend": {
        "position": "inset",
	},
  bar: {
    width: {
      ratio: 0.5
    }
  },
  bindto: "#BarChart"
});

setTimeout(function() {
	chart.load({
	});
}, 1000);



}