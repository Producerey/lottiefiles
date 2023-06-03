const lottie = LottieInteractivity.create({
    player: "#player",
    mode: "chain",

    actions: [
        {
            state: "none",
            position: { x: [0, 1], y: [-1, 2] },
            transition: "seek",
            frames: [0, 300],
            // },
            // {
            //     state: "autoplay",
            //     path: "https://assets6.lottiefiles.com/packages/lf20_opn6z1qt.json",
            //     position: { x: [0, 1], y: [-1, 2] },
            //     transition: "seek",
            //     frames: [30, 160],
        },
    ],
});

// lottie.player.playSegments(2);
