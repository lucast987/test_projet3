
   let texte = document.getElementById('txt');

    class Slider {
        constructor(tabImages, tabTextes, sliderDelay)
        {
            this.tabImages = tabImages;
            this.tabTextes = tabTextes;
            this.sliderDelay = sliderDelay;
            this.number = 0;
            this.timerSlider = 0;

        }

       

        next() {
            if (this.number < this.tabImages.length-1)
            {
                this.number++ ;
                diapo.setAttribute('src', this.tabImages[this.number]);
                texte.innerHTML = this.tabTextes[this.number];
            }

            else if (this.number >= this.tabImages.length-1)
            {
                this.number = 0;
                diapo.setAttribute('src', this.tabImages[this.number]);
                texte.innerHTML = this.tabTextes[this.number];
            }

            clearInterval(this.timerSlider);
        }
    
        preview() {
            if (this.number > 0)
            {
                this.number-- ;
                diapo.setAttribute('src', this.tabImages[this.number]);
                texte.innerHTML = this.tabTextes[this.number];
            }

            else if (this.number <= 0)
            {
                this.number = this.tabImages.length-1;
                diapo.setAttribute('src', this.tabImages[this.number]);
                texte.innerHTML = this.tabTextes[this.number];
            }

            clearInterval(this.timerSlider);
        }
    }
    
   
   
  