const discRadiusVh = 2.67;
const discRadiusVw = 1.31;
let border, borderHeight, borderWidth;
let isGameStart = false;
let directions = {};
let discs = {};
let xDirection = 1, yDirection = 1;

function getRandom() {
    return Number(Math.random().toFixed(2)) + 0.01;
}

function getNumFromStr(styleVal) {
    return parseFloat(styleVal.substr(0, styleVal.length - 2));
}

function resetDirections() {
    directions = {
        topLeft: { x: getRandom(), y: getRandom() },
        topRight: { x: getRandom(), y: getRandom() },
        bottomLeft: { x: getRandom(), y: getRandom() },
        bottomRight: { x: getRandom(), y: getRandom() }
    }
}

function setDirections(disc, isXDirectionChanged) {
    isXDirectionChanged ? disc.x *= -1 : disc.y *= -1;
}

function setDiscs() {
    discs = {
        topLeft: document.querySelector('#topLeft'),
        topRight: document.querySelector('#topRight'),
        bottomLeft: document.querySelector('#bottomLeft'),
        bottomRight: document.querySelector('#bottomRight')
    };
    console.log(discs);
}

function reset() {
    border = document.querySelector('#div');
    document.getElementById("div").removeAttribute("hidden");

    setDiscs();
    resetDirections();

    border.style.height = '80vh';
    border.style.width = '100vw';
    borderHeight = getNumFromStr(border.style.height);
    borderWidth = getNumFromStr(border.style.width);
    console.log({ borderHeight, borderWidth })

    discs.topLeft.style = `top: 0vh; left: 0vw;`;
    discs.topRight.style = `top: 0vh; right: 0vw;`;
    discs.bottomLeft.style = `bottom: 0vw; left: 0vh;`;
    discs.bottomRight.style = `bottom: 0vw; right: 0vh;`;
}

function updateTopLeft() { //1
    let newX = getNumFromStr(discs.topLeft.style.left) + directions.topLeft.x;
    let newY = getNumFromStr(discs.topLeft.style.top) + directions.topLeft.y;
    console.log({ newX, newY })

    if (newX <= 0 || newX >= borderWidth - discRadiusVw) directions.topLeft.x *= -1;
    if (newY <= 0 || newY >= borderHeight - 2*discRadiusVh) directions.topLeft.y *= -1;

    discs.topLeft.style.top = newY + 'vh';
    discs.topLeft.style.left = newX + 'vw';
    console.log('1111111111111111111111111')
    console.log(discs.topLeft.style.top)
    console.log(discs.topLeft.style.left)
}

function updateTopRight() { //2
    let newX = getNumFromStr(discs.topRight.style.right) + directions.topRight.x;
    let newY = getNumFromStr(discs.topRight.style.top) + directions.topRight.y;

    if (newX <= 0 || newX >= borderWidth - discRadiusVw) directions.topRight.x *= -1;
    if (newY <= 0 || newY >= borderHeight - 2*discRadiusVh) directions.topRight.y *= -1;

    discs.topRight.style.top = newY + 'vh';
    discs.topRight.style.right = newX + 'vw';
    console.log('222222222222222222222222')
    console.log(discs.topLeft.style.top)
    console.log(discs.topLeft.style.left)
}

function updateBottomLeft() { //3
    let newX = getNumFromStr(discs.bottomLeft.style.left) + directions.bottomLeft.x;
    let newY = getNumFromStr(discs.bottomLeft.style.bottom) + directions.bottomLeft.y;

    if (newX <= 0 || newX >= borderWidth - discRadiusVw) directions.bottomLeft.x *= -1;
    if (newY <= 0 || newY >= borderHeight - 2*discRadiusVh) directions.bottomLeft.y *= -1;

    discs.bottomLeft.style.bottom = newY + 'vh';
    discs.bottomLeft.style.left = newX + 'vw';
    console.log('333333333333333333333')
    console.log(discs.topLeft.style.top)
    console.log(discs.topLeft.style.left)
}

function updateBottomRight() { //4
    let newX = getNumFromStr(discs.bottomRight.style.right) + directions.bottomRight.x;
    let newY = getNumFromStr(discs.bottomRight.style.bottom) + directions.bottomRight.y;

    if (newX <= 0 || newX >= borderWidth - discRadiusVw) directions.bottomRight.x *= -1;
    if (newY <= 0 || newY >= borderHeight - 2*discRadiusVh) directions.bottomRight.y *= -1;

    discs.bottomRight.style.bottom = newY + 'vh';
    discs.bottomRight.style.right = newX + 'vw';
    console.log('444444444444444444444')
    console.log(discs.topLeft.style.top)
    console.log(discs.topLeft.style.left)
}

let moveDiscs = () => {
    updateTopLeft();
    updateTopRight();
    updateBottomLeft();
    updateBottomRight();
    console.log('asd')
}

function toggle() {
    isGameStart = !isGameStart;

    if (isGameStart) {
        document.getElementById("start").setAttribute("hidden", "hidden");
        document.getElementById("reset").removeAttribute("hidden");
        document.getElementById("pause").removeAttribute("hidden");
        reset();
        setInterval(moveDiscs, 10);
        console.log({ directions })

    } else {

        document.getElementById("start").removeAttribute("hidden");
        document.getElementById("div").setAttribute("hidden", "hidden");
        document.getElementById("reset").setAttribute("hidden", "hidden");
        document.getElementById("pause").setAttribute("hidden", "hidden");
    }
}