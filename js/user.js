

class User {
    constructor(nom, prenom)
    {
            this.nom = nom;
            this.prenom = prenom;
    }


    save(){
        
        localStorage.setItem('prénom',this.prenom.value);
        localStorage.setItem('name',this.nom.value);

        console.log(this.prenom.value);
        console.log(this.nom.value);
    }

}

