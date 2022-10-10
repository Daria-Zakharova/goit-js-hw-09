const bodySwitcher = {
    refs: {
        body: document.querySelector('body'),
        startBtn: document.querySelector('button[data-start]'),
        stopBtn: document.querySelector('button[data-stop]'),
    },
    vars: {
        isRecolored: false,
        timerId: null,
    },
    start() {
        if(this.vars.isRecolored) {
            return;
        }
        this.vars.timerId = setInterval(this.Switcher.bind(bodySwitcher), 1000);
        this.vars.isRecolored = true;
    },
    stop() {
        clearInterval(this.vars.timerId);
        this.vars.isRecolored = false;
    },
    Switcher() {
        this.refs.body.style.backgroundColor = this.getRandomHexColor();
    },
    getRandomHexColor() {
        const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        return color.length === 7 ? color : this.getRandomHexColor();
    },
    init() {
        this.refs.startBtn.addEventListener('click', bodySwitcher.start.bind(bodySwitcher));
        this.refs.stopBtn.addEventListener('click', bodySwitcher.stop.bind(bodySwitcher));
    },
}

bodySwitcher.init();