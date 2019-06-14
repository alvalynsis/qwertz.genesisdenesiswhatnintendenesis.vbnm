var inputArray = document.getElementsByTagName("input");


document.getElementById("sendeButton").addEventListener("click", function(){SendeAnfrage(ErhalteSendeRequestParameter(), )});
document.getElementById("anzeigeButton").addEventListener("click", function(){SendeAnfrage(ErhalteAnzeigeRequestParameter(), )});



function ErhalteSendeRequestParameter(){
return "mode=profilEintragen&name=" + inputArray[0].value + 
"&geburtstag=" + inputArray[1].value + 
"&ort=" + inputArray[2].value + 
"&rolle=" + inputArray[3].value + 
"&bild=" + inputArray[4].value;
}
function ErhalteAnzeigeRequestParameter(){
    return "mode=profilAnzeigen&name=" + inputArray[0].value + 
    "&geburtstag=" + inputArray[1].value + 
    "&ort=" + inputArray[2].value + 
    "&rolle=" + inputArray[3].value + 
    "&bild=" + inputArray[4].value;
}


function SendeAnfrage(parameter, callback){
	var xhr = new XMLHttpRequest()
	xhr.onreadystatechange = Rückruf(xhr, callback)
	xhr.open("POST", "http://localhost/datenbank.php")
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.send(parameter)
}

function Rückruf(xhr, callback){
	return function() {
		if(xhr.readyState != 4) return
		if(xhr.status == 200) {
			callback(JSON.parse(xhr.responseText))
		} else {
			console.log('HTTP error', xhr.status, xhr.statusText)
		}
	}
}

function ZeigeProfileAn(response){
    var responseObject = JSON.parse(response);
    for (i in responseObject){
        ErstelleCard(responseObject[i][0], responseObject[i][1], responseObject[i][2], responseObject[i][3], responseObject[i][4])
    }
}

function ErstelleCard(name, geburtstag, ort, rolle, bild){
    var card = document.createElement("DIV");
    card.className = "card";
    var cardHeader = document.createElement("DIV");
    cardHeader.className = "card-header";
    var cardHeaderName = document.createElement("DIV");
    cardHeaderName.className = "";
    cardHeaderName.innerHTML = name;
    var cardHeaderImage = document.createElement("IMG");
    cardHeaderImage.className = "card-image-right";
    cardHeaderImage.src = bild;
    var cardBody = document.createElement("DIV");
    cardBody.className = "card-body";
    cardBody.innerHTML = "Geburtstag am " + geburtstag + ", Ort: " + ort;
    var cardFooter = document.createElement("DIV");
    cardFooter.className = "card-footer";
    cardFooter.innerHTML = "Rolle: " + rolle;

    card.appendChild(cardHeader);
    cardHeader.appendChild(cardHeaderImage);
    cardHeader.appendChild(cardHeaderName);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);

    document.getElementById("cardContainer").appendChild(card);
}