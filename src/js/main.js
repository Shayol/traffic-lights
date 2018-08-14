import "../scss/main.scss";

window.addEventListener('load', function () {

    function MainLights(p_lights) {
        this.red = document.querySelector(".lights--main .light--red");
        this.green = document.querySelector(".lights--main .light--green");
        this.yellow = document.querySelector(".lights--main .light--yellow");
        this.colors = ['red', 'green', 'yellow'];


        this.setColor = function (color) {
            this.colors.forEach(c => this[c].style.filter = "brightness(20%)");
            this[color].style.filter = "brightness(200%)";
            if(color == "red" || color == "green") {
                p_lights.switchColor(color);
            }
        }

        this.allowCrossing = function (button) {
            let self = this;
            return new Promise(resolve => setTimeout(() => resolve(self.setColor("yellow")), 5000))
            .then(() => new Promise(resolve => setTimeout(() => resolve(self.setColor("red")), 5000)))
            .then(() => new Promise(resolve => setTimeout(() => (button.events.pop(),resolve(self.setColor("green"))) , 15000)))
            .then(() => new Promise(resolve => setTimeout(() => resolve(), 60000)))
        }
    }

    function PedestrianLights() {
        this.red = document.querySelector(".lights--pedestrian .light--red");
        this.green = document.querySelector(".lights--pedestrian .light--green");
        this.colors = {red: "green", green: "red"};

        this.switchColor = function (color) {

            this[color].style.filter = "brightness(20%)";
            this[this.colors[color]].style.filter = "brightness(200%)";
            
        }
    }

    function Button(mainLights) {
        this.element = document.querySelector(".button");
        this.events = [];
        this.mainLights = mainLights;
        this.crossing = new Promise(resolve => setTimeout(() => resolve(), 60000));

        this.waitForClick = function () {
            this.element.addEventListener('click', (e) => {
                if (!this.events.length) {
                    this.events.push(e);

                    this.crossing = this.crossing.then(() => this.mainLights.allowCrossing(this));

                } else {
                    return;
                }
            })
        }
    }

    var p_lights = new PedestrianLights();
    var m_lights = new MainLights(p_lights);
    var button = new Button(m_lights);
    button.waitForClick();


});