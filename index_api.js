let mouseposition = {};
let stage = 0;

const rect1 = { x_min: 0, y_min: 0, x_max: 80, y_max: 80 };
const rect2 = { x_min: 80, y_min: 80, x_max: 100, y_max: 100 };
const rect3 = { x_min: 80, y_min: 80, x_max: 100, y_max: 100 };

const lottie = document.querySelector("#player");

/*helper*/

const container = document.querySelector(".container");

container.insertAdjacentHTML(
    "beforeend",
    `<div style='position:absolute;top:80%;left:80%;width:20px;height:20px;background-color:red;'></div>`
);

/*helper*/

lottie.load("https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json");

lottie.addEventListener("frame", (e) => {
    switch (stage) {
        case 0:
            if (e.detail.frame <= 0) {
                lottie.pause();
            }
            break;
        case 1:
            if (e.detail.frame > 10 && e.detail.frame < 11) {
                lottie.pause();
            }
            break;
        case 2:
            if (e.detail.frame >= lottie.getLottie().totalFrames - 1) {
                stage = "finish";
                lottie.pause();
            }
            break;
    }
});

lottie.addEventListener("mousemove", (e) => {
    mouseposition.rect = e.target.getBoundingClientRect();
    mouseposition.x = e.clientX - mouseposition.rect.left;
    mouseposition.y = e.clientY - mouseposition.rect.top;
    mouseposition.y_ = (100 / mouseposition.rect.height) * mouseposition.y;
    mouseposition.x_ = (100 / mouseposition.rect.width) * mouseposition.x;

    if (stage === 0) {
        if (mousePosInRect(rect1)) {
            stage = 1;
            lottie.setDirection(1);
            lottie.play();
        }
    }
    if (stage === 1) {
        if (mousePosInRect(rect2)) {
            lottie.setDirection(1);
            stage = 2;
            lottie.play();
        }
    }
    if (stage === 2) {
        if (!mousePosInRect(rect2)) {
            stage = 1;
            lottie.setDirection(-1);
            lottie.play();
        }
    }
});

lottie.addEventListener("mouseleave", (e) => {
    if (stage === "finish") {
        stage = "reset";
        lottie.load(
            "https://assets9.lottiefiles.com/datafiles/gUENLc1262ccKIO/data.json"
        );
    } else {
        stage = 0;
        lottie.setDirection(-1);
        lottie.play();
    }
});

lottie.addEventListener("click", (e) => {
    if (stage === "finish") {
        lottie.load(
            "https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json"
        );
        lottie.play();
        setTimeout(() => {
            window.open("https://bexio.com", "_blank");
        }, 2000);
    }
});

lottie.addEventListener("ready", () => {
    if (stage === "reset") {
        lottie.seek(lottie.getLottie().totalFrames);
        lottie.setDirection(-1);
        lottie.play();
        stage = 0;
    }
});

function mousePosInRect(rect) {
    if (!rect) return true;
    if (
        mouseposition.x_ > rect.x_min &&
        mouseposition.y_ > rect.y_min &&
        mouseposition.x_ < rect.x_max &&
        mouseposition.y_ < rect.y_max
    ) {
        return true;
    }
    return false;
}
