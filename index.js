const discVh = 5.34;
const discVw = 2.62;
let border, borderHeight, borderWidth;
let isGameStart = false;
let directions = {};
let discs = {};
let xDirection = 1, yDirection = 1;
let is_paused = false;

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

function setDiscs() {
    discs = {
        topLeft: document.querySelector('#topLeft'),
        topRight: document.querySelector('#topRight'),
        bottomLeft: document.querySelector('#bottomLeft'),
        bottomRight: document.querySelector('#bottomRight')
    };

}

function setDirections(disc, isXDirectionChanged) {
    isXDirectionChanged ? disc.x *= -1 : disc.y *= -1;
}


function reset() {
    border = document.querySelector('#div');
    document.getElementById("div").removeAttribute("hidden");
    let para = document.getElementById("para");
    if (para) para.remove();


    setDiscs();
    resetDirections();

    border.style.height = '80vh';
    border.style.width = '100vw';
    borderHeight = getNumFromStr(border.style.height);
    borderWidth = getNumFromStr(border.style.width);

    discs.topLeft.style = `top: 0vh; left: 0vw;`;
    discs.topRight.style = `top: 0vh; left: ${100-discVw}vw;`;
    discs.bottomLeft.style = `top: ${80-discVh}vh; left: 0vw;`;
    discs.bottomRight.style = `top: ${80-discVh}vh; left: ${100-discVw}vw;`;
}

function paused(){
    is_paused = !is_paused;
    document.getElementById("pause").innerText = is_paused ? "RESUME" : "PAUSE";
}

function updateDiscs(){

    if (is_paused)
        return;

    for (const [key, value] of Object.entries(discs)) {
        let newX = getNumFromStr(value.style.left) + directions[key].x;
        let newY = getNumFromStr(value.style.top) + directions[key].y;

        if (newX <= 0 || newX >= (borderWidth - discVw)){
            directions[key].x *= -1;
            newX = getNumFromStr(value.style.left) + directions[key].x;
        } 
        if (newY <= 0 || newY >= (borderHeight - discVh)){
            directions[key].y *= -1;
            newY = getNumFromStr(value.style.top) + directions[key].y;
        } 

        value.style.top = newY + 'vh';
        value.style.left = newX + 'vw';
        checkCollosion();
    
    }
    
}


function toggle() {
    isGameStart = !isGameStart;

    if (isGameStart) {
        document.getElementById("start").setAttribute("hidden", "hidden");
        document.getElementById("reset").style.visibility = "visible";
        document.getElementById("pause").style.visibility = "visible";
        reset();
        setInterval(updateDiscs, 10);
    } else {

        document.getElementById("start").removeAttribute("hidden");
        document.getElementById("div").setAttribute("hidden", "hidden");
        document.getElementById("reset").style.visibility = "hidden";
        document.getElementById("pause").style.visibility = "hidden"; 
    }
}

function twoShits(disc1, disc2){
    
    let d1left = getNumFromStr(disc1.style.left);
    let d2left = getNumFromStr(disc2.style.left);
    let d1top = getNumFromStr(disc1.style.top);
    let d2top = getNumFromStr(disc2.style.top);
    
    return !(d1left + discVw < d2left || 
        d1left > d2left + discVw || 
        d1top + discVh < d2top || 
        d1top > d2top + discVh);
}


function dicToArrays(){
    let valueArr = [];
    let keyArr = [];
    for (const [key, value] of Object.entries(discs)){ 
        valueArr.push(value);
        keyArr.push(key);
    }
    return {keyArr, valueArr};
}   

function deleteDisc(key1){
    discs[key1].style.display='none';
    delete discs[key1];
}

function gameOver(){
    let dic_to_arr = Object.keys(discs);
    if (dic_to_arr.length === 1){
        console.log("Hi Razi")
        let para = document.createElement("P");
        para.setAttribute("id", "para");
        para.innerText = `The last disc is ${dic_to_arr[0]}`;
        para.classList.add("centered");
        deleteDisc(dic_to_arr[0]);
        document.getElementById("div").appendChild(para);
    }
}


function checkCollosion(){
    let {keyArr, valueArr} = dicToArrays();
    for (let i=0; i<valueArr.length; i++){
        for (let j=i+1; j<valueArr.length; j++){
            if (twoShits(valueArr[i], valueArr[j])){
                deleteDisc(keyArr[i]);
                gameOver();
            }
        }
    }
} 