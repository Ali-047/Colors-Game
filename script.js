// primitive variables
const colors = ["#ff006e" , "#003566" , "#0096c7" , "#e85d04"] ;

const items = document.querySelectorAll(".item") ;
const losePage = document.querySelector(".losePage") ;
const scoreShow = document.getElementById("score") ;
const losePgaeScore = document.getElementById("losePgaeScore") ;
const timeShow = document.getElementById("timeShow") ;
const restartBtn = document.getElementById("restartBtn") ;
const timeUp = document.getElementById("timeUp") ;
const youLose = document.getElementById("youLose") ;

// default timer options
const defaultTime = [0 , 9 , 99] ;
const minute = document.getElementById("min")
const seconde = document.getElementById("sec")
const milisec = document.getElementById("ms")
let flag = false ;
let timer ;

// primitive score
let score = 0 ;

// set the default color & renew the color
function colorChanger() {

    items.forEach(event => {
        event.removeEventListener("click" , nextLevel) ;
        event.removeEventListener("click" , loseGame) ;
    })

    var num = Math.floor(Math.random() * colors.length );

    items.forEach(item => {
        item.style.backgroundColor = colors[num] ;
    })

    var random = Math.floor(Math.random() * items.length );
    items[random].style.backgroundColor = colorSmoother(colors[num] , 50) ;

    items.forEach((value , index) => {

        if (index == random) {
            value.addEventListener("click" , nextLevel)
        }else {
            value.addEventListener("click" , loseGame)
        }
    })
}

// smoother the target block color
function colorSmoother(color , amount) {
    
    return '#' 
    + color.replace(/^#/, '')
    .replace(/../g, color => 
    ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount))
    .toString(16)).substr(-2));
}

// next level event
function nextLevel() {

    seconde.innerText = stopZero(defaultTime[1]) ;
    score++ ;
    scoreShow.innerText = `امتیاز = ${score}` ;
    colorChanger() ;

    // timer starting
    if (!flag) {

        flag = true ;

        timer = setInterval(function(){

            defaultTime[2]-- ;
        
            if (defaultTime[2] < 10) {
                milisec.innerText = stopZero(defaultTime[2]) ;
            }else
                milisec.innerText = defaultTime[2] ;
        
            if (defaultTime[2] == 0) {
                
                defaultTime[1]-- ;
        
                // if (defaultTime[1] == 60) {
        
                //     defaultTime[1] = 0 ;
                //     defaultTime[2] = 0 ;
                //     defaultTime[0]++ ;
                    
                //     if (defaultTime[0] < 10) {
                //         minute.innerText = stopZero(defaultTime[0]) ;
                //     }else
                //     minute.innerText = defaultTime[0] ;
                    
                // }
                
                if (defaultTime[1] < 10) {
                    seconde.innerText = stopZero(defaultTime[1]) ;
                }else
                seconde.innerText = defaultTime[1] ;
                
                defaultTime[2] = 99 ;
            }
            if (defaultTime[1] == 0) {
                if (defaultTime[2]) {
                    endGame() ;
                }
            }
        } , 10) ;
    }
}

// gameOver event
function loseGame() {

    timeUp.classList.add("hide") ;
    items.forEach(event => {
        event.removeEventListener("click" , colorChanger) ;
    })
    losePage.classList.remove("hide") ;
    scoreShow.classList.add("hide") ;
    losePgaeScore.innerText = `امتیاز = ${score}` ;
    // timeShow.innerText = `زمان = ${printZero(defaultTime[2])} : ${printZero(defaultTime[1])} : ${printZero(defaultTime[0])}`
    restartBtn.addEventListener("click" , ()=> location.reload()) ;

    // stop timer
    clearInterval(timer) ;
}
// end game event
function endGame() {

    youLose.classList.add("hide") ;
    items.forEach(event => {
        event.removeEventListener("click" , colorChanger) ;
    })
    losePage.classList.remove("hide") ;
    scoreShow.classList.add("hide") ;
    losePgaeScore.innerText = `امتیاز = ${score}` ;
    // timeShow.innerText = `زمان = ${printZero(defaultTime[2])} : ${printZero(defaultTime[1])} : ${printZero(defaultTime[0])}`
    restartBtn.addEventListener("click" , ()=> location.reload()) ;

    // stop timer
    clearInterval(timer) ;
}

// print 0 before < 10 nums
function stopZero(time) {
    return `0${time}`
}

// show gameOver time
function printZero(time) {
    if (time < 10) {
        return `0${time}`
    }
    else
        return time ;
}

// load main scene of game
colorChanger() ;