(function () {

    const KEY_HEIGHT = 20;
    const KEY_INFO = [
        ["`", 3, 3, 22],
        ["1", 28, 3, 22],
        ["2", 53, 3, 22],
        ["3", 78, 3, 22],
        ["4", 103, 3, 22],
        ["5", 128, 3, 22],
        ["6", 153, 3, 22],
        ["7", 178, 3, 22],
        ["8", 203, 3, 22],
        ["9", 228, 3, 22],
        ["0", 253, 3, 22],
        ["-", 278, 3, 22],
        ["=", 303, 3, 22],
        ["delete", 328, 3, 40],
        ["tab", 3, 26, 40],
        ["q", 46, 26, 22],
        ["w", 71, 26, 22],
        ["e", 96, 26, 22],
        ["r", 121, 26, 22],
        ["t", 146, 26, 22],
        ["y", 171, 26, 22],
        ["u", 196, 26, 22],
        ["i", 221, 26, 22],
        ["o", 246, 26, 22],
        ["p", 271, 26, 22],
        ["[", 296, 26, 22],
        ["],", 321, 26, 22],
        ["\\", 346, 26, 22],
        [" ", 3, 49, 43.5],
        ["a", 49.5, 49, 22],
        ["s", 74.5, 49, 22],
        ["d", 99.5, 49, 22],
        ["f", 124.5, 49, 22],
        ["g", 149.5, 49, 22],
        ["h", 174.5, 49, 22],
        ["j", 199.5, 49, 22],
        ["k", 224.5, 49, 22],
        ["l", 249.5, 49, 22],
        [";", 274.5, 49, 22],
        ["'", 299.5, 49, 22],
        ["return", 324.5, 49, 43.5],
        ["shift", 3, 72, 56],
        ["z", 62, 72, 22],
        ["x", 87, 72, 22],
        ["c", 112, 72, 22],
        ["v", 137, 72, 22],
        ["b", 162, 72, 22],
        ["n", 187, 72, 22],
        ["m", 212, 72, 22],
        [",", 237, 72, 22],
        [".", 262, 72, 22],
        ["/", 287, 72, 22],
        ["shift", 312, 72, 56],
        [" ", 112, 95, 122],
    ];

    class KeyboardKey {
        constructor(letter, x, y, width) {
            this.letter = letter;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = KEY_HEIGHT;
        }

        center() {
            return {
                x: this.x + this.width / 2,
                y: this.y + this.height / 2,
            };
        }
    }

    class Keyboard {
        constructor() {
            this.keys = [];
            '1234567890pyfgcrlaoeuidhtnsqjkxbmwvz'.split('').forEach((letter) => {
                let info = null;
                KEY_INFO.forEach((x) => {
                    if (x[0] == letter) {
                        info = x;
                    }
                });
                this.keys.push(new KeyboardKey(letter, info[1], info[2], info[3]));
            });
        }

        keyForLetter(letter) {
            return this.keys.filter((k) => {
                return k.letter === letter.toLowerCase();
            })[0] || null;
        }
    }

    window.Keyboard = Keyboard;

})();
