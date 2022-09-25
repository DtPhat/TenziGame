import React from "react"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#3399ff" : "white"
    }
    return (
        <div 
            className="h-14 w-14 shadow-die rounded-xl flex justify-center items-center cursor-pointer" 
            style={styles}
            onClick={props.holdDice}
        >
            <h2 className="text-3xl font-semibold">{props.value}</h2>
        </div>
    )
}