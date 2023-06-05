class Lottie {
    constructor() {
        this.mouseposition = {};
        this.player = document.querySelector("#player");
        this.container = document.querySelector(".container");
        this.rect1 = { x_min: 50, y_min: 0, x_max: 100, y_max: 80 };
        this.rect2 = { x_min: 80, y_min: 80, x_max: 100, y_max: 100 };
        this.rect3 = { x_min: 80, y_min: 80, x_max: 100, y_max: 100 };
        if (this.is_touch_enabled()) {
            console.log("load mobile");
            this.Interactivity();
        } else {
            this.player.addEventListener("frame", this.#onFrame);
            this.player.addEventListener("mousemove", this.#mousemove);
            this.player.addEventListener("mouseleave", this.#mouseleave);
            this.player.addEventListener("click", this.#mouseclick);
            this.player.addEventListener("ready", this.#loadReady);
        }
    }

    Interactivity() {
        LottieInteractivity.create({
            player: "#player",
            mode: "chain",
            actions: [
                {
                    state: "none",
                    transition: "hold",
                    frames: [0, 40],
                },
                {
                    state: "none",
                    transition: "hold",
                    frames: [40, 80],
                },

                {
                    state: "autoplay",
                    transition: "click",
                    frames: [80, 200],
                },
                {
                    path: "https://assets1.lottiefiles.com/packages/lf20_ISbOsd.json",
                    state: "autoplay",
                    reset: true,
                    transition: "onComplete",
                },
            ],
        });
    }

    #onFrame = (e) => {
        console.log(this.stage);
        switch (this.stage) {
            case 0:
                if (e.detail.frame <= 0) {
                    this.player.pause();
                }
                break;
            case 1:
                if (e.detail.frame > 10 && e.detail.frame < 11) {
                    this.player.pause();
                }
                break;
            case 2:
                if (e.detail.frame >= this.player.getLottie().totalFrames - 1) {
                    this.stage = "finish";
                    this.player.pause();
                }
                break;
        }
    };

    #stage() {
        if (!this.stage) {
            if (this.mousePosInRect(this.rect1)) {
                this.stage = 0;
                this.stage++;
                this.setPlayer(1);
            }
        }
        if (this.stage === 1) {
            if (this.mousePosInRect(this.rect2)) {
                this.stage++;
                this.setPlayer(1);
            } else if (!this.mousePosInRect(this.rect1)) {
                this.stage--;
                this.setPlayer(-1);
            }
        }
        if (this.stage === 2) {
            if (!this.mousePosInRect(this.rect3)) {
                this.stage--;
                this.setPlayer(-1);
            }
        }
    }

    #mousemove = (e) => {
        if (this.#calc(e)) {
            this.#stage();
        }
    };

    #mouseclick = (e) => {
        if (this.stage === "finish") {
            this.player.load(
                "https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json"
            );
            this.player.play();
            setTimeout(() => {
                window.open("https://bexio.com", "_blank");
            }, 2000);
        }
    };

    #mouseleave = (e) => {
        if (this.stage === "finish") {
            this.stage = "reset";
            this.player.load("./test.json");
        } else {
            this.stage = 0;
            this.setPlayer(-1);
        }
    };

    #loadReady = (e) => {
        if (this.stage === "reset") {
            this.player.seek(this.player.getLottie().totalFrames);
            this.setPlayer(-1);
            this.stage = 0;
        }
    };

    #calc(e) {
        if (this.mouseposition.last) {
            if (
                Math.abs(this.mouseposition.last.x - e.clientX) > 5 ||
                Math.abs(this.mouseposition.last.y - e.clientY) > 5
            ) {
                this.mouseposition.last = { x: e.clientX, y: e.clientY };
                this.mouseposition.rect = e.target.getBoundingClientRect();
                this.mouseposition.x = e.clientX - this.mouseposition.rect.left;
                this.mouseposition.y = e.clientY - this.mouseposition.rect.top;
                this.mouseposition.y_ =
                    (100 / this.mouseposition.rect.height) *
                    this.mouseposition.y;
                this.mouseposition.x_ =
                    (100 / this.mouseposition.rect.width) *
                    this.mouseposition.x;
                return true;
            }
        } else {
            this.mouseposition.last = { x: e.clientX, y: e.clientY };
        }
        return false;
    }

    setPlayer(mode) {
        switch (mode) {
            case 1:
                this.player.setDirection(1);
                this.player.play();
                break;
            case -1:
                this.player.setDirection(-1);
                this.player.play();
                break;
        }
    }

    mousePosInRect(rect) {
        if (!rect) return true;
        if (
            this.mouseposition.x_ > rect.x_min &&
            this.mouseposition.y_ > rect.y_min &&
            this.mouseposition.x_ < rect.x_max &&
            this.mouseposition.y_ < rect.y_max
        ) {
            return true;
        }
        return false;
    }

    is_touch_enabled() {
        return (
            "ontouchstart" in window ||
            navigator.maxTouchPoints > 0 ||
            navigator.msMaxTouchPoints > 0
        );
    }
}

const lottie = new Lottie();
export default lottie;
