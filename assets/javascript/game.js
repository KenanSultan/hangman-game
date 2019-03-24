var wins = 0
var bands = ["BLONDIE", "GENESIS", "INXS", "JOURNEY", "MADONNA", "METALLICA", "POISON", "QUEEN", "RUSH", "TOTO", "U2"]

for (let i = 0; i < bands.length; i++) {
    console.log(bands[i])
}

// Yeni oyun baslatmak icin fonksiyon
function new_game() {
    band = bands[Math.floor(Math.random() * bands.length)]
    len = band.length
    chanses = 12
    letters = []
    guesses = []
    right_guesses = []
    letter_space = document.querySelector("#letters")
    letter_space.innerHTML = ""
    guess_space = document.querySelector("#guesses")
    guess_space.innerHTML = ""
    chanses_space = document.querySelector("#chanses")
    chanses_space.innerHTML = chanses
    for (let i = 0; i < len; i++) {
        letters.push(band[i])
        letter_space = document.createElement('span')
        letter_space.id = i
        letter_space.innerHTML = "_ "
        document.getElementById("letters").appendChild(letter_space)
    }
}

// Kazaninca cagirilir
function win_func() {
    message = document.querySelector("#msg")
    message.innerHTML = "YOU WIN"
    wins++
    let win_space = document.querySelector("#wins")
    win_space.innerHTML = wins
    new_game()
}

// Kaybedince cagirilir
function lose_func() {
    message = document.querySelector("#msg")
    message.innerHTML = "YOU LOSE"
    new_game()
}

// Herhangi tusa basildiginda devreye girecek fonksiyon
function key_click(event) {
    // girilen harfi guess olarak aldim
    var guess = String.fromCharCode(event.keyCode).toUpperCase()
    // yeni yanlish harf girildiginde
    if (guesses.indexOf(guess) === -1 && letters.indexOf(guess) === -1) {
        if (chanses > 1) {
            chanses--
            guesses.push(guess)
            guess_space = document.querySelector("#guesses")
            if (guesses.length > 1) {
                guess_space.innerHTML += ", " + guess
            } else {
                guess_space.innerHTML += guess
                message = document.querySelector("#msg")
                message.innerHTML = ""
            }
            chanses_space = document.querySelector("#chanses")
            chanses_space.innerHTML = chanses
        } else {
            lose_func()
        }
    // Dogru harf girildiginde
    } else if (right_guesses.indexOf(guess) === -1 && letters.indexOf(guess) !== -1) {
        message = document.querySelector("#msg")
        message.innerHTML = ""
        right_guesses.push(guess)
        if (len > 1) {
            var i = 0;
            while (letters.indexOf(guess, i) >= 0) {
                var a = letters.indexOf(guess, i)
                var span_space = document.getElementById(a)
                span_space.innerHTML = guess
                len--
                i = a + 1
            }
        } else {
            win_func()
        }
    }
}

// Ilk oyunu baslat
new_game()

// Herhangi tusha basildiginda
window.onkeypress = key_click