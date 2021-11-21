// Name: Raziel Alron 
// ID: 316061415
// Name: Omer David
// ID: 308483437

const g_state = {
    discVh: 5.34,
    discVw: 2.62,
    border: undefined,
    borderHeight: undefined,
    borderWidth: undefined,
    isGameStart: false,
    directions: {},
    discs: {},
    xDirection: 1,
    yDirection: 1,
    is_paused: false,
}

function getRandom() {
    return Number(Math.random().toFixed(2)) + 0.01;
}

function getNumFromStr(styleVal) {
    return parseFloat(styleVal.substr(0, styleVal.length - 2));
}

function resetDirections() {
    g_state.directions = {
        topLeft: { x: getRandom(), y: getRandom() },
        topRight: { x: getRandom(), y: getRandom() },
        bottomLeft: { x: getRandom(), y: getRandom() },
        bottomRight: { x: getRandom(), y: getRandom() }
    }
}

function setDiscs() {
    g_state.discs = {
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
    g_state.border = document.querySelector('#div');
    document.getElementById("div").removeAttribute("hidden");
    let para = document.getElementById("para");
    if (para) para.remove();
    let timeMassage = document.getElementById("timeMassage");
    if (timeMassage) timeMassage.remove();

    resume();
    setDiscs();
    resetDirections();

    g_state.border.style.height = '80vh';
    g_state.border.style.width = '100vw';
    g_state.borderHeight = getNumFromStr(g_state.border.style.height);
    g_state.borderWidth = getNumFromStr(g_state.border.style.width);

    g_state.discs.topLeft.style = `top: 0vh; left: 0vw;`;
    g_state.discs.topRight.style = `top: 0vh; left: ${100 - g_state.discVw}vw;`;
    g_state.discs.bottomLeft.style = `top: ${80 - g_state.discVh}vh; left: 0vw;`;
    g_state.discs.bottomRight.style = `top: ${80 - g_state.discVh}vh; left: ${100-g_state.discVw}vw;`;
}

function paused(){
    g_state.is_paused = true;
    document.getElementById("pause").innerText = "RESUME";
    document.getElementById("pause").onclick = resume;
}

function resume(){
    g_state.is_paused = false;
    document.getElementById("pause").innerText = "PAUSE";
    document.getElementById("pause").onclick = paused;
}

function updateDiscs(){

    if (g_state.is_paused)
        return;

    for (const [key, value] of Object.entries(g_state.discs)) {
        let newX = getNumFromStr(value.style.left) + g_state.directions[key].x;
        let newY = getNumFromStr(value.style.top) + g_state.directions[key].y;

        if (newX <= 0 || newX >= (g_state.borderWidth - g_state.discVw)){
            g_state.directions[key].x *= -1;
            newX = getNumFromStr(value.style.left) + g_state.directions[key].x;
        } 
        if (newY <= 0 || newY >= (g_state.borderHeight - g_state.discVh)){
            g_state.directions[key].y *= -1;
            newY = getNumFromStr(value.style.top) + g_state.directions[key].y;
        } 

        value.style.top = newY + 'vh';
        value.style.left = newX + 'vw';
        checkCollosion();
    
    }
    
}

function timeCounter(){
    let time_left = document.getElementById("gameTime").value;

    let download_timer = setInterval(function(){
        if(time_left <= 0){
            clearInterval(download_timer);
            let para = document.createElement("P");
            para.setAttribute("id", "timeMassage");
            para.innerText = "Reached time limit";
            para.classList.add("centered");
            document.body.appendChild(para);
            toggle();
        }

        if(!g_state.is_paused && g_state.isGameStart) time_left -= 1;
    }, 1000);
}


function toggle() {
    g_state.isGameStart = !g_state.isGameStart;

    if (g_state.isGameStart) {
        document.getElementById("start").setAttribute("hidden", "hidden");
        document.getElementById("reset").style.visibility = "visible";
        document.getElementById("pause").style.visibility = "visible";
        document.getElementById("time").style.visibility = "hidden";
        document.getElementById("gameTime").style.visibility = "hidden";
        reset();
        setInterval(updateDiscs, 10);
    } else {
        document.getElementById("start").removeAttribute("hidden");
        document.getElementById("div").setAttribute("hidden", "hidden");
        document.getElementById("reset").style.visibility = "hidden";
        document.getElementById("pause").style.visibility = "hidden"; 
        document.getElementById("time").style.visibility = "visible";
        document.getElementById("gameTime").style.visibility = "visible";
    }
}

function twoShits(disc1, disc2){
    let d1left = getNumFromStr(disc1.style.left);
    let d2left = getNumFromStr(disc2.style.left);
    let d1top = getNumFromStr(disc1.style.top);
    let d2top = getNumFromStr(disc2.style.top);
    
    return !(d1left + g_state.discVw < d2left || 
        d1left > d2left + g_state.discVw || 
        d1top + g_state.discVh < d2top || 
        d1top > d2top + g_state.discVh);
}

function dicToArrays(){
    let valueArr = [];
    let keyArr = [];

    for (const [key, value] of Object.entries(g_state.discs)){ 
        valueArr.push(value);
        keyArr.push(key);
    }

    return {keyArr, valueArr};
}   

function deleteDisc(key1){
    g_state.discs[key1].style.display='none';
    delete g_state.discs[key1];
}

function gameOver(){
    let dic_to_arr = Object.keys(g_state.discs);

    if (dic_to_arr.length === 1){
        console.log("Hi Razi")
        let para = document.createElement("P");
        para.setAttribute("id", "para");
        para.innerText = `The last disc is ${dic_to_arr[0]}`;
        para.classList.add("centered");
        deleteDisc(dic_to_arr[0]);
        document.body.appendChild(para);
        toggle();
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