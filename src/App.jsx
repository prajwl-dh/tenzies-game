import React from "react"
import Die from "./Die.jsx"
import Confetti from "react-confetti"

export default function App(){
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: i + 1
            })
        }
        return newDice
    }
    
    function rollDice(){
        if(tenzies){
            setTenzies(false)
            setDice(allNewDice)
        }else
        {
            setDice((prevState) => prevState.map((x) => {
                if(x.isHeld)
                {
                    return{...x}
                }else
                {
                    return{
                        ...x,
                        value: Math.ceil(Math.random() * 6)
                    }
                }
            }))
        }
    }
    
    function holdDice(id){
        setDice((prevDice) => prevDice.map((x) => {
            if(id == x.id){
                return{
                    ...x,
                    isHeld : !x.isHeld
                }
            }
            else{
                return{
                    ...x
                }
            }
        }))
    }
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld === true)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue) 
        if(allHeld && allSameValue){
            setTenzies(true)
            console.log("You Won")
        }
        else{
            setTenzies(false)
        }
    },[dice])
    
    const die = dice.map((x) => {
        return(<Die key = {x.id} id={x.id} value = {x.value} isHeld = {x.isHeld} whenClicked={holdDice}/>)
    })
     
    return(
        <main className="main">
            <h1 className="main-heading">Tenzies</h1>
            <p className="main-description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="die-container">
            <div className="die">
                {die}
            </div>
            <button className="roll" onClick={rollDice}>{tenzies? "New Game": "Roll"}</button>
            {tenzies? <Confetti />: null}
        </div>
        </main>
    )
}