function funR() {
	var loginR = document.getElementById('loginR');
	var pswR = document.getElementById('pswR');
	var pswRC = document.getElementById('pswRC');
			
	var email = loginR.value;
    var pswd1 = pswR.value;
	var pswd2 = pswRC.value;
	errorCode = "";

	if (pswd1 != pswd2) {
        alert('Hasła nie zgadzają się');
        return false;
    }

    firebase.auth().createUserWithEmailAndPassword(email, pswd1).catch(function (error) {
        errorCode = error.code;
        let errorMessage = error.message;
        alert("Error: " + errorMessage);
        return false;
    }). then(function(en) {
	if (errorCode == "") {
	var user = firebase.auth().currentUser;

	user.sendEmailVerification().then(function() {
	alert('Wysłano e-mail weryfikacyjny. Sprawdź swoją skrzynkę pocztową');
	}).catch(function(error) {
        let errorMessage = error.message;
        alert("Error: " + errorMessage);
	});
	}});
}

function resetH() {
	var loginL = document.getElementById('loginL');
	var email = loginL.value;
	
	firebase.auth().sendPasswordResetEmail(email).then(function() {
		alert("Wysłano maila umożliwiającego reset hasła");
	}).catch(function(error) {
        let errorMessage = error.message;
        alert("Error: " + errorMessage);
	});
}

function funL() {
	var loginL = document.getElementById('loginL');
	var pswL = document.getElementById('pswL');
	
	var email = loginL.value;
    var password = pswL.value;
	errorCode = "";

	firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        errorCode = error.code;
        var errorMessage = error.message;
        alert("Error: " + errorMessage);
    }). then(function(en) {
	if (errorCode == "") {
	alert('Zalogowałeś się');
	window.location.href = "#map";
	}});
}

function funLG() {
	alert("KK");
	var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
        var token = result.credential.accessToken;
        var user = result.user;
    }).catch(function (error) {
        notify('Rejestracja za pomocą konta społecznościowego niemożliwa.');
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        alert("Error: " + errorMessage);

    });
}

function logout() {
	errorCode = "";
	firebase.auth().signOut().catch(function (error) {
        errorCode = error.code;
        var errorMessage = error.message;
        alert("Error: " + errorMessage);
    }). then(function(en) {
	if (errorCode == "") {
	alert('Wylogowałeś się');
	window.location.href = "#main";
	}});
}