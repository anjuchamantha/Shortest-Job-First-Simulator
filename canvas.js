var canvas = document.querySelector('canvas');
canvas.width = parseInt(window.innerWidth / 52) * 52 - 52 * 2;
canvas.height = parseInt(window.innerHeight / 124) * 124;
var c = canvas.getContext('2d');

var x;
var y;
var i;

function canvasInitiate() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    x = 0;
    y = 0
    i = 0;
    var color = random_bg_color();
}



function changeColor() {
    color = random_bg_color();
}

async function execute(speed, name, clr_) {


    if (canvas.width <= x) {
        y = y + 70;
        x = 0;
    }
    if (canvas.height <= y) {
        c.clearRect(0, 0, canvas.width, canvas.height);
        y = 0;
        x = 0;
    }
    draw(c, x, y, color, i, name, clr_, speed);
    x = x + 50 + 2;
    await timeout(speed);
    i++;
}

function random_bg_color() {
    var x = Math.floor(Math.random() * 220);
    var y = Math.floor(Math.random() * 220);
    var z = Math.floor(Math.random() * 220);
    var bgColor = "rgb(" + x + "," + y + "," + z + "," + 0.8 + ")";

    return bgColor;
}

async function draw(c, x, y, color, i, name, clr_, speed) {
    c.fillStyle = color;
    if (speed >= 500) {
        var itr = 0
        while (itr < 50) {
            itr++;
            c.fillRect(x+itr-0.1, y, 1.2, 50);
            await timeout(speed / 50 - 2);

        }
    } else {
        c.fillRect(x, y, 50, 50);
    }

    c.fillStyle = '#000080';
    c.font = "10px Comic Sans MS";
    c.fillText(i, x, y + 62);
    c.font = "15px Comic Sans MS";
    c.fillStyle = clr_;
    c.fillText(name, x + 15, y + 30);

}