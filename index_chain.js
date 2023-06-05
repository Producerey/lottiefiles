const player = document.querySelector("#player");

const lottie = LottieInteractivity.create({
    player: "#player",
    mode: "chain",

    actions: [
        {
            state: "none",
            position: { x: [0, 1], y: [-1, 2] },
            transition: "seek",
            frames: [0, 80],
        },
        {
            path: "https://assets1.lottiefiles.com/packages/lf20_ISbOsd.json",
            state: "autoplay",
            reset: true,
            transition: "onComplete",
        },
    ],
});

player.addEventListener("transition", (e) => {
    // if (e.detail.newIndex == e.detail.oldIndex) {
    //     console.log("tras", e.detail);
    //     window.open("https://bexio.com", "_blank");
    // }

    if (e.detail.newIndex == 0 && e.detail.oldIndex == 3) {
        console.log("tras", e.detail);
        window.open("https://bexio.com", "_blank");
    }
});
