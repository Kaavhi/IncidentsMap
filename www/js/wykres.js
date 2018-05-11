function wykres() {
var ctx = document.getElementById("myChart").getContext('2d');
var incidents = getI();

var zag = 0;
var mor = 0;
var zgb = 0;
var wyp = 0;
var nap = 0;
var kra = 0;
var stl = 0;
alert(incidents.length);

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
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Zgub", "Stłuczek", "Kradzieży", "Napaści", "Zaginięć", "Wypadków", "Morderstw"],
        datasets: [{
            label: 'ilość zgłoszeń',
            data: [zgb, stl, kra, nap, zag, wyp, mor],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',
				'rgba(115, 115, 115, 0.5)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
				'rgba(0, 0, 0, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },
		defaultFontColor: 'white',
		legend: {
            labels: {
                fontColor: 'white',
				fontSize: 14,
				strokeStyle: 'white'
				}
        },
		title: {
			display: true,
			text: "Ilość zgłoszonych incydentów",
			fontColor: 'white',
			fontSize: 14
		}
    }
});
}