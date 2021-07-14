
let diapo = document.getElementById('diapo');
let texte = document.getElementById('txt');
let number = 0;

let images = 
['images/incontournables_0.jpg', 'images/velotoulouse5-1024x682-854x569.jpg', 'images/capitole.jpg', 'images/image.jpg', 'images/5466-tls0509-2-759x500.jpg', 'images/Paulette-Location-de-vélos-Canalfriends-2.jpg', 'images/Place_Roger-Salengro_(Toulouse)_-_vue_depuis_la_rue_des_Puits-Clos.jpg']

// let textes = []

let arrow_right = document.getElementById('arrow_right');
let arrow_left = document.getElementById('arrow_left');

arrow_right.addEventListener('click', onClickright);
function onClickright ()

{
    if (number < 6)
    {
        number++ ;
        diapo.setAttribute('src', images[number]);
    }

    else if (number >= 6)
    {
        number = 0;
        diapo.setAttribute('src', images[number]);

    }

    clearInterval(timerSlider);   
}

let timerSlider = setInterval(onClickright, 5000); 


arrow_left.addEventListener('click', onClickleft);
function onClickleft ()

{
    if (number > 0)
    {
        number-- ;
        diapo.setAttribute('src', images[number]);
    }

    else if (number <= 0)
    {
        number = 6;
        diapo.setAttribute('src', images[number]);
    }

    // console.log(timerSlider);
    clearInterval(timerSlider);
}

setInterval(onClickright, 5000); 

document.addEventListener("keydown", event => {
    if (event.keyCode === 37) {
        onClickleft();
    }
    
    else if (event.keyCode === 39) {
        onClickright();
    }

    clearInterval(timerSlider);
});


arrow_right.addEventListener('click', changeTxt);
function changeTxt ()
{
    if (number === 0)
    {
        texte.innerHTML = '<p id="txt">Carte interactive des stations de location de vélos sur Toulouse</p>';
    }

    if (number === 1)
    {
        texte.innerHTML = '<p id="txt">Cette application affiche une carte de Toulouse comprenant les stations où vous pouvez trouver des vélos</p>';
    }

    if (number === 2)
    {
        texte.innerHTML = '<p id="txt">Chaque marqueur correspond à une station</p>';
    }

    if (number === 3)
    {
        texte.innerHTML = '<p id="txt">En cliquant dessus, les informations sur la station apparaissent à droite de la carte</p>';
    }

    if (number === 4)
    {
        texte.innerHTML = '<p id="txt">Vous pouvez également réserver dans la station de votre choix en remplissant un formulaire</p>';
    }

    if (number === 5)
    {
        texte.innerHTML = '<p id="txt">Les informations sur la carte interactive de Toulouse sont données en temps réel</p>';
    }

    if (number === 6)
    {
        texte.innerHTML = '<p id="txt">Une réservation expire automatiquement au bout de 20 minutes et également lorsque le navigateur web se referme</p>';
    }

}

let timerChange = setInterval(changeTxt, 5000); 

arrow_left.addEventListener('click', changeTxt);
function changeTxt ()
{
    if (number === 0)
    {
        texte.innerHTML = '<p id="txt">Carte interactive des stations de location de vélos sur Toulouse</p>';
    }

    if (number === 1)
    {
        texte.innerHTML = '<p id="txt">Cette application affiche une carte de Toulouse comprenant les stations où vous pouvez trouver des vélos</p>';
    }

    if (number === 2)
    {
        texte.innerHTML = '<p id="txt">Chaque marqueur correspond à une station</p>';
    }

    if (number === 3)
    {
        texte.innerHTML = '<p id="txt">En cliquant dessus, les informations sur la station apparaissent à droite de la carte</p>';
    }

    if (number === 4)
    {
        texte.innerHTML = '<p id="txt">Vous pouvez également réserver dans la station de votre choix en remplissant un formulaire</p>';
    }

    if (number === 5)
    {
        texte.innerHTML = '<p id="txt">Les informations sur la carte interactive de Toulouse sont données en temps réel</p>';
    }

    if (number === 6)
    {
        texte.innerHTML = '<p id="txt">Une réservation expire automatiquement après 20 minutes ou si le navigateur se referme</p>';
    }

}

document.addEventListener("keydown", event => {
    if (event.keyCode === 37) {
        changeTxt();
    }
    
    else if (event.keyCode === 39) {
        changeTxt();
    }

    clearInterval(timerSlider);
});

class Station {
    constructor (address, available_bike_stands, available_bikes, banking, bike_stands, contract_name, last_update, name, number, position, status)
    {
        this.address = address;
        this.available_bike_stands = available_bike_stands;
        this.available_bikes = available_bikes;
        this.banking = banking;
        this.bike_stands = bike_stands;
        this.contract_name = contract_name;
        this.last_update = last_update;
        this.name = name;
        this.number = number;
        this.position = position;
        this.status = status;
    }
}




let button = document.getElementById('button');
let buttonClear = document.getElementById('button_clear');


buttonClear.addEventListener('click', function () {
    ctx.clearRect(0, 0, 240, 120);

    ctx.fillStyle = 'white';
    ctx.fillRect(1, 1, 210, 90);

})

let requierdN = document.getElementById("name");//.attributes["required"];
let requierdP = document.getElementById("prénom");//.attributes["required"];

let nameAtt = requierdN.validity;
let prenomAtt = requierdP.validity;


button.addEventListener('click', function () {
    
let M = 20;
let S = 0;
let delay;   
let refreshCompt = setInterval(compt, 1000);

function compt() {

    if(M == 0 && S == 0) {
        clearInterval(refreshCompt);
        console.log('fin');
        return;
    }


    if(S <= 60) {
        S--;
    } 

    if(S < 0) {
        S = 59;
        M--;

        if( M < 10 ){ M = '0' + M;  console.log(M)}
    }

    if(S > 60) {
        S = 59;
    }
    
    if(M > 20)
    {
        M = 20;
        S = 0
    }

   
    if( S < 10 ){ S = '0' + S;}
    // console.log(S);
    // console.log(delay);


    delay = M + 'min' + ' ' + S + 'sec';
    document.getElementById('compteur').innerText = delay;


   if(M == 20) {
        let date = new Date();
        let h = date.getHours();
        let m = date.getMinutes();
        let s = date.getSeconds();
        // if( h < 10 ){ h = '0' + h; }
        // if( m < 10 ){ m = '0' + m; }
        // if( s < 10 ){ s = '0' + s; }
        let time = h + '' + m + '' + s;

        console.log(time);
        console.log(m);

        let hEnd = date.getHours();
        let mEnd = date.getMinutes() + 20;
        let sEnd = date.getSeconds();
        let endTime = hEnd + '' + mEnd + '' + sEnd;

    }

    if(m != mEnd)
    {
      M == 0;
      S == 0;
    }

    if(s != sEnd)
    {
      M == 0;
      S == 0;
    }

    if(h != hEnd)
    {
      M == 0;
      S == 0;
    }


}

    let prenom = document.getElementById('prénom');
    let name = document.getElementById('name');
    sessionStorage.setItem('prénom',prenom.value);
    sessionStorage.setItem('nom',name.value);

    if (prenomAtt.patternMismatch && nameAtt.patternMismatch) {
            console.log('ok');
    }

    else
    {
        console.log('error');
    }
    
    let regex = /^(?!\s*$).*$/;
    console.log(regex.test(prenom));
    console.log(regex.test(name));

    
    /*function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}*/


  if(name.value == '' || prenom.value == '') {
        sessionStorage.clear();
        sessionStorage.removeItem('prénom');
        sessionStorage.removeItem('name');
        console.log('error');
    }

    else if(name.value.length < 2 || prenom.value.length < 2) {
        sessionStorage.clear();
        sessionStorage.removeItem('prénom');
        sessionStorage.removeItem('name');
        console.log('error');
    }

    else if(name.value == null || prenom.value == null) {
        sessionStorage.clear();
        sessionStorage.removeItem('prénom');
        sessionStorage.removeItem('name');
        console.log('error');
    }

    else if(name.value == undefined || prenom.value == undefined) {
        sessionStorage.clear();
        sessionStorage.removeItem('prénom');
        sessionStorage.removeItem('name');
        console.log('error');
    } 

    else if(validsign && stationOn) {
        let prenomData = sessionStorage.getItem('prénom');
        let nameData = sessionStorage.getItem('nom');
        console.log(nameData + ' ' + prenomData);
    }

    else
    {
        console.log('error');
    }

    if (sessionStorage.getItem('nom', 'autosave'))
    {
        name.value = sessionStorage.getItem('nom', 'autosave');
    }

    else if (sessionStorage.getItem('prénom', 'autosave'))
    {
        name.value = sessionStorage.getItem('prénom', 'autosave');
    }

});


let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.fillStyle = 'white';
ctx.fillRect(1, 1, 210, 90);

let painting = false;

canvas.addEventListener('mousemove', function(event) {

    const x = event.offsetX;
    const y = event.offsetY;
    draw(canvas, x, y);

});

canvas.addEventListener("mousedown", down);

canvas.addEventListener("mouseup", stopDraw);

function down () {
    painting = true;
    ctx.beginPath();
};

function stopDraw () {
    painting = false;
    canvas.style.cursor = "default";
};

let validsign;

function draw(canvas, x, y){
    if(painting){
        ctx.fillRect(x, y, 1, 1);
        ctx.lineTo(x, y);
        canvas.style.cursor = "pointer";
        ctx.stroke();
        validsign = true;
    }
};


let stationOn;


var map = L.map('map',{    
    center : [43.608951960496405, 1.441003598726198], 
    zoom : 10
    });

    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
    minZoom: 1,
    maxZoom: 20
}).addTo(map);

var fes = L.marker([43.608951960496405, 1.441003598726198]).addTo(map);
fes.bindPopup('Bienvenue à Toulouse');
fes.addTo(map);



var data = "";

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
    let datas = [];
    if(this.readyState === 4) {
    datas = JSON.parse(this.responseText);
    

    let stations = [];
    for (let data of datas) {
        stations.push( new Station(data.address, data.available_bike_stands, data.available_bikes, data.banking, data.bike_stands, data.contract_name, data.last_update, data.name, data.number, data.position, data.status));
        var fes = L.marker([data.position.lat, data.position.lng]).addTo(map);
        fes.addTo(map); 

    fes.addEventListener('click', onClick);
    function onClick() {

        let stationStatus = document.getElementById('status');
        stationStatus.innerHTML = '<div><strong>Statut</strong> : ' + data.status + '</div>';

        let stationName = document.getElementById('name_station');
        stationName.innerHTML = '<div><strong>Station</strong> : ' + data.name + '</div>';

        let stationAddress = document.getElementById('address');
        stationAddress.innerHTML = '<div><strong>Adresse</strong> : ' + data.address + '</div>';

        let stationBikeStands = document.getElementById('bike_stands');
        stationBikeStands.innerHTML = '<div><strong>Places au total</strong> : ' + data.bike_stands + '</div>';

        let stationAvailableBikeStands = document.getElementById('available_bike_stands');
        stationAvailableBikeStands.innerHTML = '<div><strong>Places disponibles</strong> : ' + data.available_bike_stands + '</div>';

        let stationAvailableBikes = document.getElementById('available_bikes');
        stationAvailableBikes.innerHTML = '<div><strong>Vélos disponibles</strong> : ' + data.available_bikes + '</div>';

        stationOn = true;

    }}

    console.log(stations);
}});

xhr.open("GET", "https://api.jcdecaux.com/vls/v1/stations?contract=toulouse&apiKey=a8a5bf9ac1da12352b18ad07ffbdbc5d11567281");

xhr.send(data);
