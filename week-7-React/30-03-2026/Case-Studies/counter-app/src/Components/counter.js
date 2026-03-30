import React, {useState} from "react";

function Counter() {
    const [count, setCount] = useState(0);
    const [step,setstep] = useState(1);

    const [lastAction, setLastAction] = useState("None");

    const increment = () => {
        setCount(count + step);
        setLastAction("incremented by " + step);
    };

    const decrement = () => {
        setCount(count - step);
        setLastAction("decremented by " + step);
    };
    const reset = () => {  
        setCount(0);
        setLastAction("reset to 0");
    }

    return (
        <div style={{padding: '20px', textAlign: 'center'}}>
            {/* Display current state */}
            <div style={{fontSize: '48px', margin: '20px'}}>
            <h1>Counter: {count}</h1>
            </div>
            {/* Step input */}
            <div style={{margin: '20px'}}>
                <label>Step:
                <input
                    type="number"
                    id={step}
                    value={step}
                    onChange={(e) => setstep(Number(e.target.value))}
                    style={{marginLeft: '10px', width: '60px'}}
                />
                </label>
            </div>

            {/* Action buttons */}
            <div>
                <button onClick={increment} style={buttonstyle}>Increment</button>
                <button onClick={decrement} style={buttonstyle}>Decrement</button>
                <button onClick={reset} style={buttonstyle}>Reset</button>
            </div>
            {/* Last action display */}
            <div style={{marginTop: '20px', fontStyle: 'italic'}}>
                Last action: {lastAction}
            </div>
        </div>
    );
}
const buttonstyle = {
    margin: '0 10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    borderradius: '5px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
}

export default Counter;