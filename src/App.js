import React from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [hasTimerStarted, setHasTimerStarted] = React.useState(false);
    const [timeSpent, setTimeSpent] = React.useState(0)
    const [counter, setCounter] = React.useState(0)
    const timeIntervalRef = React.useRef(0)

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            clearInterval(timeIntervalRef.current);
            setHasTimerStarted(false);
            setTenzies(true)
        }
    }, [dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }

    function rollDice() {
        if (!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ?
                    die :
                    generateNewDie()
            }))
            hasTimerStarted && setCounter(prevRoll => prevRoll + 1)
        } else {
            setTenzies(false)
            setDice(allNewDice())
            setTimeSpent(0);
            setCounter(0)
        }
    }

    function holdDice(id) {
        if (!hasTimerStarted) {
            setHasTimerStarted(true);
            timer();
        }


        setDice(oldDice => oldDice.map(die => {
            return die.id === id ?
                { ...die, isHeld: !die.isHeld } :
                die
        }))
    }

    const diceElements = dice.map(die => (
        <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
        />
    ))

    function timer() {
        timeIntervalRef.current = setInterval(() => {
            setTimeSpent((prevTimeSpent) => prevTimeSpent + 1);
        }, 1000);
    }

    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzi</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.<br />
                The timer will start once a die has been held.
            </p>
            <p className="extra-info">
                <h3 className="timer">Time spent: {timeSpent}s</h3>
                <h3 className="counter">Roll counted: {counter} </h3>
            </p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button
                className="roll-dice"
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}