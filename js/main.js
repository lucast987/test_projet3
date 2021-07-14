window.onload = function() {
    let arrow_right = document.getElementById('arrow_right');
    let arrow_left = document.getElementById('arrow_left');

    let images = ['images/incontournables_0.jpg', 'images/velotoulouse5-1024x682-854x569.jpg', 'images/capitole.jpg', 'images/image.jpg', 'images/5466-tls0509-2-759x500.jpg', 'images/Paulette-Location-de-vélos-Canalfriends-2.jpg', 'images/Place_Roger-Salengro_(Toulouse)_-_vue_depuis_la_rue_des_Puits-Clos.jpg']  
    let textes =['<p id="txt">Carte interactive des stations de location de vélos sur Toulouse</p>', '<p id="txt">Cette application affiche une carte de Toulouse comprenant les stations où vous pouvez trouver des vélos</p>', '<p id="txt">Chaque marqueur correspond à une station</p>', '<p id="txt">En cliquant dessus, les informations sur la station apparaissent à droite de la carte</p>', '<p id="txt">Vous pouvez également réserver dans la station de votre choix en remplissant un formulaire</p>', '<p id="txt">Les informations sur la carte interactive de Toulouse sont données en temps réel</p>', '<p id="txt">Une réservation expire automatiquement au bout de 20 minutes et également lorsque le navigateur web se referme</p>']
    let slider = new Slider(images, textes, 5000);

    let timerSlider = setInterval(function (){
        slider.next()
    }, slider.sliderDelay);

    arrow_right.addEventListener('click', function(){
        clearInterval(timerSlider);
        slider.next();
        timerSlider = setInterval(function (){
            slider.next()
        }, slider.sliderDelay);
    });

    arrow_left.addEventListener('click', function(){
        slider.preview();
    });

    document.addEventListener("keydown", event => {
        if (event.keyCode === 37) {
                slider.preview();
        }
        
        else if (event.keyCode === 39) {
                slider.next();
        }

    });

    //objet slider et fonctions

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
    
    xhr.addEventListener("readystatechange", function(){
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
            localStorage.setItem('stationOn', stationOn);
            console.log(stationOn);

            localStorage.setItem('stationStatus',data.status);
            localStorage.setItem('stationName',data.name);
            localStorage.setItem('stationAddress',data.address);
            localStorage.setItem('stationBikeStands',data.bike_stands);
            localStorage.setItem('stationAvailableBikeStands',data.available_bike_stands);
            localStorage.setItem('stationAvailableBikes',data.available_bikes);
        

    }};

    console.log(stations);
    }});
    
    xhr.open("GET", "https://api.jcdecaux.com/vls/v1/stations?contract=toulouse&apiKey=a8a5bf9ac1da12352b18ad07ffbdbc5d11567281");
    
    xhr.send(data);

    stationStatus = document.getElementById('status');
    stationStatus.innerHTML = '<div><strong>Statut</strong> : ' + localStorage.getItem('stationStatus') + '</div>';

    stationName = document.getElementById('name_station');
    stationName.innerHTML = '<div><strong>Station</strong> : ' + localStorage.getItem('stationName') + '</div>';

    stationAddress = document.getElementById('address');
    stationAddress.innerHTML = '<div><strong>Adresse</strong> : ' + localStorage.getItem('stationAddress') + '</div>';

    stationBikeStands = document.getElementById('bike_stands');
    stationBikeStands.innerHTML = '<div><strong>Places au total</strong> : ' + localStorage.getItem('stationBikeStands') + '</div>';

    stationAvailableBikeStands = document.getElementById('available_bike_stands');
    stationAvailableBikeStands.innerHTML = '<div><strong>Places disponibles</strong> : ' + localStorage.getItem('stationAvailableBikeStands') + '</div>';

    stationStatus = document.getElementById('status');
    stationStatus.innerHTML = '<div><strong>Statut</strong> : ' + localStorage.getItem('stationStatus') + '</div>';

    stationAvailableBikes = document.getElementById('available_bikes');
    stationAvailableBikes.innerHTML = '<div><strong>Vélos disponibles</strong> : ' + localStorage.getItem('stationAvailableBikes') + '</div>';


    // carte interactive et objet station


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

    // canvas pour signature



    let button = document.getElementById('button');
    let buttonClear = document.getElementById('button_clear');


    buttonClear.addEventListener('click', function () {
        ctx.clearRect(0, 0, 240, 120);

        ctx.fillStyle = 'white';
        ctx.fillRect(1, 1, 210, 90);

        validsign = false;

    })

    // bouton clear pour effacer la signature

    let firstname = document.getElementById('prénom');
    let lastname = document.getElementById('name');
    let user = new User(lastname,firstname);

    firstname.innerText = localStorage.getItem('prénom');
    lastname.innerText = localStorage.getItem('name');

    let M;
    let S;
    let delay; 

    let date = new Date(Date.now());
    console.log(date);


    let refreshCompt = setInterval(compt, 1000);

    function compt() {

        if(M == 0 && S == 0) {
            clearInterval(refreshCompt);
            console.log('fin');
            document.getElementById('compteur').innerText = "Le temps est écoulé !";
            return;
        }


        if(S <= 60) {
            S--;
        } 

        if(S < 0) {
            S = 59;
            M--;

            if( M < 10 ){ M = '0' + M;}
        }

        if(S > 60) {
            S = 59;
        }
        
        if(M > 20)
        {
            M = 20;
            S = 0
        }

        if(M < 0)
        {
            M = 0;
            S = 1;
        }

    
        if( S < 10 ){ S = '0' + S;}


        delay = M + 'min' + ' ' + S + 'sec';
        document.getElementById('compteur').innerText = delay;


    }

    // compteur de 20 minutes

    let relance_compteur;
    let user_save;
    let valid_log;


    button.addEventListener('click', function(){
        let endTime = new Date(Date.now());
        endTime.setMinutes(endTime.getMinutes() + 20);

        console.log(endTime);
        localStorage.setItem('endTime', endTime);

 
        stationOn = localStorage.getItem('stationOn');

        if(lastname.value.trim())
        {
            user_save = true;
        }
        else{
            document.getElementById('compteur').innerText = "Erreur de réservation";
            user_save = false;
        }

        if(firstname.value.trim())
        {
            user_save = true;
        }
        else{
            document.getElementById('compteur').innerText = "Erreur de réservation";
            user_save = false;
        }


        if(lastname.value.length <= 2 || firstname.value.length <= 2) {
            document.getElementById('compteur').innerText = "Erreur de réservation";
            user_save = false;
        }

        else if(lastname.value == null || firstname.value == null) {
            document.getElementById('compteur').innerText = "Erreur de réservation";
            user_save = false;
        }

        else if(lastname.value == undefined || firstname.value == undefined) {
            document.getElementById('compteur').innerText = "Erreur de réservation";
            user_save = false;
        }

        else 
        {
            user.save();
            user_save = true;
        }

        if(validsign && stationOn && user_save) {

            M = 20;
            S = 0;

            relance_compteur = function (){
                onload.compt()};
            delay = M + 'min' + ' ' + S + 'sec';
            document.getElementById('compteur').innerText = delay;
            valid_log = true;
            localStorage.setItem('valid_log', valid_log);

        }

        else {
            clearInterval(refreshCompt);
            document.getElementById('compteur').innerText = "Erreur de réservation";
            valid_log = false;
            localStorage.setItem('valid_log', valid_log);

        }

    });

    // validation de la réservation


    if('endTime' in localStorage && date < new Date(localStorage.getItem('endTime')))
    {

        let x = new Date(new Date(localStorage.getItem('endTime')) - date);
                M = x.getMinutes();
                S = x.getSeconds();
            console.log(x);

            relance_compteur = function (){
                onload.compt()};
            delay = M + 'min' + ' ' + S + 'sec';
            localStorage.setItem('compteur', delay);
            document.getElementById('compteur').innerText = localStorage.getItem('compteur');
    }

    else if('endTime' in localStorage && date >= new Date(localStorage.getItem('endTime')))
    {
        M = 0;
        S = 0; 

        relance_compteur = function (){
            onload.compt()};
        delay = M + 'min' + ' ' + S + 'sec';
        localStorage.setItem('compteur', delay);
        document.getElementById('compteur').innerText = localStorage.getItem('compteur');
    }

   

    else
    {
        console.log('no endTime');
    }

    // test de la durée de déconnexion

};