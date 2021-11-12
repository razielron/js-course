
let isGameStart = false; 


function toggle() {


    isGameStart = !isGameStart;

    if (isGameStart) {
        document.getElementById("start").setAttribute("hidden", "hidden");
        document.getElementById("div").removeAttribute("hidden");
        document.getElementById("reset").removeAttribute("hidden");
        document.getElementById("pause").removeAttribute("hidden");
    } else {
       
        document.getElementById("start").removeAttribute("hidden");
        document.getElementById("div").setAttribute("hidden", "hidden");
        document.getElementById("reset").setAttribute("hidden", "hidden");
        document.getElementById("pause").setAttribute("hidden", "hidden");
    }

} 

