import React, {useState} from "react";

function DisplayCard({title, value, onChange, style}) {
    const [internalCount, setInternalCount] = useState(0);

    return (
        <div style={{...style, border: "1px solid black", 
        borderRadius: "5px", padding: "10px", margin: "10px", width: "200px"}}>
            <h3>{title}</h3>
            <p>Value: {value}</p>
            <button onClick={() => setInternalCount(internalCount + 1)}>
                Internal Count: {internalCount}</button>
            <button onClick={() => onChange(value + 1)}>
                Update Parent Count</button>
        </div>
    );
}

function StateVsPropsDemo() {
    const [parentCount, setParentCount] = useState(0);
    const [parentstep, setParentStep] = useState(1);
    const [displaycolor, setDisplayColor] = useState("lightblue");

    const handleParentCountChange = (newValue) => {
        setParentCount(newValue);
        setDisplayColor(newValue % 2 === 0 ? "lightblue" : "lightcoral");
    };

    return (
        <div style={{display: 'flex', justifyContent: 'center', padding: '20px'}}>
      <p>Parent Count: {parentCount}</p>
      <button onClick={() => setParentStep(parentstep + 1)} 
      style={{marginLeft: '20px'}}>
        Increase Step (Current: {parentstep})</button>
      <button onClick={() => setDisplayColor
        (displaycolor === 'lightblue' ? 'lightcoral' : 'lightblue')} 
        style={{marginLeft: '20px'}}>
        Toggle Display Color</button>
      <DisplayCard
        title="Child Component 1 Counter Card" 
        value={parentCount} 
        onChange={handleParentCountChange} 
        style={{backgroundColor: displaycolor}}
      />
      <DisplayCard
        title="Child Component 2 Counter Card" 
        value={parentCount} 
        onChange={handleParentCountChange} 
        style={{backgroundColor: displaycolor}}
      />
    </div>
    );
}

export default StateVsPropsDemo;