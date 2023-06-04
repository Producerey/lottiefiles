LottieInteractivity.create({
    player: "#player",
    mode: "cursor",
    actions: [
        {
            position: { x: [0, 1], y: [-1, 2] },
            type: "seek",
            frames: [0, 30],
        },
        {
            position: { x: -1, y: -1 },
            type: "stop",
            frames: [0],
        },
    ],
});
