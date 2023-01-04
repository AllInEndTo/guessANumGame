const gameNumberElement = document.querySelector('.game-number')
const gameFeedbackElement = document.querySelector('.game-feedback')
const gameGuessElement = document.querySelector('.game-guess')
const gameHealthNumberElement = document.querySelector('.game-health-number')
const gameHealtheElement = document.querySelector('.game-health-bar')
const gamePlayBtn = document.querySelector('.game-button-play')
const gameResetBtn = document.querySelector('.game-button-reset')

let gameHealth, gameOver, randomGuessNumber
const updateData = (element, message) => {
    element.textContent = message
}

const init = () => {
    gameHealth = 100
    gameOver = false
    randomGuessNumber = Math.trunc(Math.random() * 10) + 1
    updateData(gameHealthNumberElement, '100%')
    updateData(gameFeedbackElement, 'What is your guess?')
    updateData(gameNumberElement, '?')
    gameGuessElement.value = ''
    gameHealtheElement.style.background = 'green'
    gameHealtheElement.style.width = `${gameHealth}%`
}

init()

const playGame = () => {
    const guess = Number(gameGuessElement.value)
    if (!gameOver) {
        if (guess <= 0) {
            updateData(gameFeedbackElement, 'Enter a valid number!')
        } else if (guess === randomGuessNumber) {
            gameNumberElement.textContent = randomGuessNumber
            updateData(gameFeedbackElement, 'You Win!')
        } else if (guess !== randomGuessNumber) {
            if (gameHealth > 20) {
                updateData(gameFeedbackElement, guess > randomGuessNumber ? 'Try a lower number!' : 'Try a higher number')
                gameHealth -= 20
                gameHealtheElement.style.width = `${gameHealth}%`
                updateData(gameHealthNumberElement, `${gameHealth}%`)
                if (gameHealth < 50) {
                    gameHealtheElement.style.background = 'red'
                }
            } else {
                updateData(gameFeedbackElement, 'Game Over!')
                gameHealth = 0
                gameHealtheElement.style.width = `${gameHealth}%`
                updateData(gameHealthNumberElement, '0%')
                gameOver = true
            }
        }
    } else {
        updateData(gameFeedbackElement, 'Reset to play again!')
    }
}

gamePlayBtn.addEventListener('click', playGame)
gameResetBtn.addEventListener('click', init)