import "../scss/main.scss";

window.addEventListener('load', function () {

    function MainLights(p_lights) {
        this.red = document.querySelector(".lights--main .light--red");
        this.green = document.querySelector(".lights--main .light--green");
        this.yellow = document.querySelector(".lights--main .light--yellow");
        this.colors = ['red', 'green', 'yellow'];
        this.times = {
            red: 15,
            yellow: 5,
            green: 0
        };
        this.timer;

        this.setColor = function (color) {
            this.colors.forEach(c => this[c].style.filter = "brightness(20%)");
            this[color].style.filter = "brightness(200%)";

            this.timer.start(this.times[color], color);

            if (color == "red" || color == "green") {
                p_lights.switchColor(color);
            }
        }

        this.allowCrossing = function (button) {
            let self = this;
            return new Promise(resolve => setTimeout(() => resolve(self.setColor("yellow")), TIMEWATCH.beforeYellow*1000))
                .then(() => new Promise(resolve => setTimeout(() => resolve(self.setColor("red")), 5000)))
                .then(() => new Promise(resolve => setTimeout(() => (button.events.pop(), resolve(self.setColor("green"))), 15000)))
                .then(() => new Promise(resolve => {

                    TIMEWATCH.countdown = 60;
                    let id = setInterval(() => {

                        --TIMEWATCH.countdown;
                        if (TIMEWATCH.countdown == 0) {
                            resolve(clearInterval(id));
                        }

                    }, 1000);

                }))
        }
    }

    function PedestrianLights() {
        this.red = document.querySelector(".lights--pedestrian .light--red");
        this.green = document.querySelector(".lights--pedestrian .light--green");
        this.colors = {
            red: "green",
            green: "red"
        };
        this.timer;
        this.times = {
            green: 15,
            red: 0
        };

        this.switchColor = function (color) {

            this.timer.start(this.times[this.colors[color]], this.colors[color]);
            this[color].style.filter = "brightness(20%)";
            this[this.colors[color]].style.filter = "brightness(200%)";

        }
    }

    function Button(mainLights,p_lights) {
        this.element = document.querySelector(".button__img");
        this.events = [];
        this.mainLights = mainLights;
        this.p_lights = p_lights;
        this.timer;
        this.crossing = new Promise(resolve => resolve());

        this.waitForClick = function () {
            this.element.addEventListener('click', (e) => {
                if (!this.events.length) {
                    this.events.push(e);

                    TIMEWATCH.setTime();
                    this.timer.start(TIMEWATCH.buttonTime,"purple");
                    this.mainLights.timer.start(TIMEWATCH.greenLeft, "green");
                    this.p_lights.timer.start(TIMEWATCH.buttonTime,"red");

                    this.crossing = this.crossing.then(() => this.mainLights.allowCrossing(this));

                } else {
                    return;
                }
            })
        }
    }

    function Timer(element) {
        this.element = element;

        this.start = function (time, color) {
            this.element.style.color = color;
            setTimeout(() => {

                if (time == 0) {
                    this.element.innerHTML = '';
                    return;
                }
                this.element.innerHTML = time;

                let id = setInterval(() => {

                    this.element.innerHTML = --time;
                    if (time == 0) {
                        this.element.innerHTML = '';
                        clearInterval(id);
                    }

                }, 1000);
            }, 0)
        }
    }

    var p_lights = new PedestrianLights();
    var m_lights = new MainLights(p_lights);
    var button = new Button(m_lights,p_lights);

    var p_timer = new Timer(document.querySelector(".timer__pedestrian"));
    var m_timer = new Timer(document.querySelector(".timer__main"));
    var b_timer = new Timer(document.querySelector(".timer__button"));

    var TIMEWATCH = {
        countdown: 0,
        pushTime: 0,
        beforeYellow: 5,
        buttonTime: 0,
        greenLeft: 0,
        setTime: function() {
            this.pushTime = this.countdown;
            this.beforeYellow = this.pushTime >= 5 ? 0 : 5 - this.pushTime; 
            this.greenLeft = this.pushTime + this.beforeYellow;
            this.buttonTime = this.pushTime + this.beforeYellow + 5;
        }
    };

    m_lights.timer = m_timer;
    p_lights.timer = p_timer;
    button.timer = b_timer;



    button.waitForClick();


});