MineSweeper = {
	SCOPE: "#minefield",
	PANEL: "#control-panel",
    LEVELS: {
        "EASY": {
            name: "Easy",
            width: 8,
            height: 8,
            bombs: 10
        },
        "INTERMEDIATE": {
            name: "Average",
            width: 16,
            height: 16,
            bombs: 40
        },
        "HARD": {
            name: "Hard",
            width: 40,
            height: 16,
            bombs: 99
        },
        "PRO": {
            name: "Pro",
            width: 40,
            height: 20,
            bombs: 150
        }
    },
	DEFAULT: "EASY"
};