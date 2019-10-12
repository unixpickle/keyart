(function () {

    const WIDTH = 371;
    const HEIGHT = 95;
    const SCALE = 3;

    class KeyDraw {
        constructor() {
            this.canvas = document.createElement('canvas');
            this.canvas.width = WIDTH * SCALE;
            this.canvas.height = HEIGHT * SCALE;

            this.paths = []
            this.colors = [];
        }

        addWord(keyboard, word, color) {
            const path = [];
            word.split('').forEach((letter) => {
                const key = keyboard.keyForLetter(letter);
                if (!key) {
                    return;
                }
                const point = key.center();
                point.x += Math.random() * 10 - 5;
                point.y += Math.random() * 6 - 3;
                path.push(point);
            });
            if (path.length === 1) {
                path.push(path[0]);
            }
            if (path.length > 0) {
                this.paths.push(path);
                this.colors.push(color);
            }
        }

        draw() {
            const ctx = this.canvas.getContext('2d');
            ctx.clearRect(0, 0, WIDTH * SCALE, HEIGHT * SCALE);

            this.paths.forEach((path, i) => {
                const color = this.colors[i];
                ctx.strokeStyle = color;
                ctx.lineWidth = SCALE * 3;
                ctx.lineJoin = 'round';
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(path[0].x * SCALE, path[0].y * SCALE);
                path.slice(1).forEach((p) => {
                    ctx.lineTo(p.x * SCALE, p.y * SCALE);
                });
                ctx.stroke();
            });
        }
    }

    window.KeyDraw = KeyDraw;

})();