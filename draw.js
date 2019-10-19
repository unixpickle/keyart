(function () {

    const WIDTH = 371;
    const HEIGHT = 95;
    const SCALE = 4;

    const THICKNESS = 5;
    const ALPHA = 0.75;

    const CORNER_CUTS = 5;
    const CORNER_SIZE = 0.25;

    const BACKGROUND = '#ffffff';

    class KeyDraw {
        constructor() {
            this.canvas = document.createElement('canvas');
            this.canvas.width = WIDTH * SCALE;
            this.canvas.height = HEIGHT * SCALE;

            this.paths = []
            this.colors = [];
        }

        addWord(keyboard, word, color) {
            let path = [];
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
                for (let i = 0; i < CORNER_CUTS; ++i) {
                    path = cornerCut(path);
                }
                this.paths.push(path);
                this.colors.push(color);
            }
        }

        draw() {
            const ctx = this.canvas.getContext('2d');
            ctx.clearRect(0, 0, WIDTH * SCALE, HEIGHT * SCALE);

            ctx.fillStyle = BACKGROUND;
            ctx.fillRect(0, 0, WIDTH * SCALE, HEIGHT * SCALE);

            this.paths.forEach((path, i) => {
                const color = this.colors[i];
                ctx.strokeStyle = color;
                ctx.globalAlpha = ALPHA;
                ctx.lineWidth = SCALE * THICKNESS;
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

    function cornerCut(path) {
        if (path.length <= 2) {
            return path;
        }
        const newPath = [path[0]];
        for (let i = 1; i < path.length - 1; ++i) {
            newPath.push(cutBetween(path[i - 1], path[i]));
            newPath.push(cutBetween(path[i + 1], path[i]));
        }
        newPath.push(path[path.length - 1]);
        return newPath;
    }

    function cutBetween(p1, p2) {
        return {
            x: p1.x * CORNER_SIZE + p2.x * (1 - CORNER_SIZE),
            y: p1.y * CORNER_SIZE + p2.y * (1 - CORNER_SIZE),
        };
    }

    window.KeyDraw = KeyDraw;

})();
