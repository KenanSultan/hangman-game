var wins = 0
var bands = ["BLONDIE","GENESIS","INXS","JOURNEY","MADONNA","METALLICA","POISON","QUEEN","RUSH","TOTO","U2"]

for(let i=0; i<bands.length; i++){
    console.log(bands[i])
}

function find_band() {
    band = bands[Math.floor(Math.random()*bands.length)]
    len = band.length
    chanses = 12
    letters = []
    guesses = []
    letter_space = document.querySelector("#letters")
    letter_space.innerHTML = ""
    for(let i=0; i<len; i++){
        letters.push(band[i])
        letter_space = document.createElement('span')
        letter_space.id = i
        letter_space.innerHTML = "_ "
        document.getElementById("letters").appendChild(letter_space)
    }
}

find_band()

// Herhangi tusha basildiginda
window.onkeypress = key_click

function key_click(event) {
    // girilen harfi guess olarak aldim
    var guess = String.fromCharCode(event.keyCode).toUpperCase()
    // yeni yanlish harf girildiginde
    if(guesses.indexOf(guess)===-1 && letters.indexOf(guess)===-1){
        if(chanses>1){   
            chanses--
            guesses.push(guess)
            guess_space = document.querySelector("#guesses")
            if(guesses.length>1){
                guess_space.innerHTML += ", " + guess
            }else{
                guess_space.innerHTML += guess
                message = document.querySelector("#msg")
                message.innerHTML = ""
            }
            chanses_space = document.querySelector("#chanses")
            chanses_space.innerHTML = chanses
        }else{
            find_band()
            message = document.querySelector("#msg")
            message.innerHTML = "YOU LOSE"
            guess_space.innerHTML = ""
            chanses_space.innerHTML = chanses     
        } 
    // Dogru harf girildiginde
    }else if(letters.indexOf(guess)!==-1){
        if(len>1){
            var i = 0;
            while(letters.indexOf(guess,i)>=0) {
                var a = letters.indexOf(guess,i)
                var span_space = document.getElementById(a)
                span_space.innerHTML = guess
                len--
                i = a+1
            }
        }else{
            message = document.querySelector("#msg")
            message.innerHTML = "YOU WIN"
            wins++
            let win_space = document.querySelector("#wins")
            win_space.innerHTML = wins  
            find_band()
            guess_space.innerHTML = ""
            chanses_space.innerHTML = chanses 
        }
    }
}

