var wins = 0
var bands = ["ELTON_JOHN", "OPUS", "STING", "MICHAEL_JACKSON", "FRANK_SINATRA", "METALLICA"]
var song_names = ["Sorry Seems To Be The Hardest Word", "Life Is Life", "Englishman In New York", "They Don't Care About Us", "Killing Me Softly", "Nothing Else Matters"]

for (let i = 0; i < bands.length; i++) {
    console.log(bands[i])
}

band_image = document.createElement("img")
band_image.src = "./assets/images/hangman-boardgame.jpg"
left_side = document.querySelector(".band_pic")
left_side.appendChild(band_image)

band_song = document.createElement("audio")
band_song.autoplay = true
band_song.style = "margin-top: 30px; height: 30px;"
band_song.position = "bottom"

left_side = document.querySelector(".song")
left_side.appendChild(band_song)

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
    if(letters.indexOf('_') !== -1){
        var a = letters.indexOf('_')
        var span_space = document.getElementById(a)
        span_space.innerHTML = "/ "
        span_space.style.color = "#000"
        len--
    }
}

// Kazaninca cagirilir
function win_func() {
    band_image.src = "./assets/images/" + band.toLowerCase() + ".jpg"
    band_song.src = "./assets/audio/" + band + ".mp3"
    band_song.controls = true
    let message = document.querySelector("#msg")
    message.innerHTML = band.replace('_',' ')
    let song_name_space = document.querySelector("#song_name")
    let ind = bands.indexOf(band)
    song_name_space.innerHTML = "'" + song_names[ind] + "'"
    wins++
    let win_space = document.querySelector("#wins")
    win_space.innerHTML = wins

    new_game()
}

// Kaybedince cagirilir
function lose_func() {
    let message = document.querySelector("#msg")
    message.innerHTML = "YOU LOSE"
    band_image.src = "./assets/images/lose.jpg"

    let song_name_space = document.querySelector("#song_name")
    song_name_space.innerHTML = ""
    band_song.src = ""
    band_song.controls = false
    
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
            let guess_space = document.querySelector("#guesses")
            if (guesses.length > 1) {
                guess_space.innerHTML += ", " + guess
            } else {
                guess_space.innerHTML += guess
            }
            chanses_space = document.querySelector("#chanses")
            chanses_space.innerHTML = chanses
        } else lose_func()

    // Dogru harf girildiginde
    } else if (right_guesses.indexOf(guess) === -1 && letters.indexOf(guess) !== -1) {
        right_guesses.push(guess)
        var i = 0;
        while (letters.indexOf(guess, i) >= 0) {
            var a = letters.indexOf(guess, i)
            var span_space = document.getElementById(a)
            span_space.innerHTML = guess
            len--
            i = a + 1
        }
        if(len === 0) win_func()
    }
}

// Ilk oyunu baslat
new_game()

// Herhangi tusha basildiginda
window.onkeypress = key_click