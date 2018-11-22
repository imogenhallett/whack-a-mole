//GLOBAL VARS//
var gameTime = 0
var gameTimer
var molesToRemove = []
var molesToPickFrom = [1,2,3,4,5,6,7,8,9]

/**
 * Function to decrease game timer and stop game timer.  Removes any remaining moles at end of game and displays play button
 */
function countdown() {
    if (gameTime == 0) {
        clearTimeout(gameTimer)
        removeAllMoles()
        document.getElementById("play-game").style.display="block";
    } else {
        gameTime--
        var elem = document.getElementById('timer')
        elem.innerHTML = gameTime
    }
}

/**
 * Function to display moles and remove them
 * @param moleToAction a random int value between 0 and the length of the molesToPickFrom array -1 so the last in the array can never be picked
 */
function showHideMole(moleToAction) {
    var img = document.createElement('img')
    img.src = 'img/moles/show.png'
    var src = document.querySelector('[data-mole="'+molesToPickFrom[moleToAction]+'"] .mole-img')
    src.innerHTML += '<img src="'+img.src+'" class="whack-mole" />'

    // //add the value of the currently picked mole to the array of moles to be removed - molesToRemove[]
    molesToRemove.push(molesToPickFrom[moleToAction]);
    // //remove the currently picked mole from the molesToPickFrom[] so it cannot be picked again until it has been re-added
    molesToPickFrom.splice(moleToAction, 1)

    if (gameTime >0) {
        setTimeout(function () {
            moleToAction = genArrayPos()
            showHideMole(moleToAction)
        }, 400)

        setTimeout(function(){
            removeMole()
        },1200)
    }
}

/**
 * Function to remove all moles from the game play area
 */
function removeAllMoles() {
    var moles = document.querySelectorAll('.mole-img')
    Array.prototype.forEach.call(moles, function(mole) {// forEach loop changed with Array.prototype.forEach.call due to compatibility issues in IE10
        mole.innerHTML = ''
    })
}

/**
 * Function to remove the first mole in the molesToRemove array from the game play area.  The mole is added to the last position in the molesToPickFrom array
 */
function removeMole() {
    var src = document.querySelector('[data-mole="'+molesToRemove[0]+'"] .mole-img')
    src.innerHTML=''
    //adds the first mole to remove to the end of the molesToPickFrom array
    molesToPickFrom.push(molesToRemove[0]);
    //removes the first item in the molestoRemove array as it has now been removed from the game area
    molesToRemove.shift()
}

/**
 * Function to generate a random number between 0 and the length of the molesToPickFrom array -1 so the last item in the array can never be picked
 * @returns int random number between 0 and the length of the molesToPickFrom array -1
 */
function genArrayPos() {
    var randomNum = Math.floor(Math.random() * (molesToPickFrom.length-1))
    //this is -1 to stop picking the last element in the array to avoid moles being hidden and shown immediately after each other
    return(randomNum)
}

/**
 * Function to increase or decrease score
 * @param direction indicates whether to increase or decrease the score
 */
function adjustScore(direction) {
    var currentScore = parseInt(document.querySelector('#score').textContent)
    if (direction=='increase') {
        currentScore++;
    } else {
        currentScore--;
    }
    document.querySelector('#score').textContent = currentScore
}

/**
 * Function to play a sound
 * @param noise the sound to make
 */
function makeNoise(noise) {
    var audioObj = {
        whack: 'audio/whack.mp3',
        hit: 'audio/hit-2.mp3',
    }
    var audio = new Audio(audioObj[noise])
    audio.play()
}

/**
 * Function to reset the score
 */
function resetScore() {
    document.querySelector('#score').textContent = '0'
}

document.addEventListener('keypress', function(e) {
    if (gameTime!==0) {
        var keys = {
            '1': 1,
            '2': 2,
            '3': 3,
            '4': 4,
            '5': 5,
            '6': 6,
            '7': 7,
            '8': 8,
            '9': 9
        }
        if (e.key in keys && molesToRemove.indexOf(keys[e.key]) !== -1) {
            // console.log(e.key + ' imogen is on the screen ' + molesToRemove.indexOf(keys[e.key]))
            // console.log(document.querySelector('[data-mole="'+e.key+'"] .mole-img img').src)
            document.querySelector('[data-mole="' + e.key + '"] .mole-img img').src = 'img/moles/hit.png'
            adjustScore('increase')
            makeNoise('hit');
        } else if (e.key in keys && molesToRemove.indexOf(keys[e.key]) === -1) {
            adjustScore('decrease')
            makeNoise('whack');
        }
    }
})

var gridItems = document.querySelectorAll('.grid-item');
Array.prototype.forEach.call(gridItems, function(gridItem) {
    gridItem.addEventListener('click', function(e) {
        if (gameTime!==0) {
            if (e.target.tagName == 'IMG') {
                if (e.target.src.indexOf('img/moles/show.png') !== -1) {
                    e.target.src = 'img/moles/hit.png'
                    adjustScore('increase')
                    makeNoise('hit');
                }
            } else {
                adjustScore('decrease')
                makeNoise('whack');
            }
        }
    })
})

document.querySelector('#play-game').addEventListener('click', function () {

    resetScore()

    gameTime = 10
    molesToRemove = []
    molesToPickFrom = [1,2,3,4,5,6,7,8,9]

    document.getElementById("play-game").style.display="none";
    gameTimer = setInterval(countdown, 1000)
    var moleToShow = genArrayPos()
    showHideMole(moleToShow)
})



