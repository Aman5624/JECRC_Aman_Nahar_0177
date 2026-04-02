import React, {useState, useReducer} from 'react';
import './App.css';

function App() {
  // const [count, setCount] = useState(0);

  // return (
  //   <div style={Styles.container}>
  //     <h1>Counter App</h1>
  //     <h2>{count}</h2>
  //     <button style={Styles.btn} onClick={() => setCount(prevCount => prevCount + 1)}>
  //       Increment
  //       </button>
  //     <button style={Styles.btn} onClick={() => setCount(prevCount => prevCount - 1)}>
  //       Decrement
  //       </button>
  //   </div>
  // );

  // // Step 1: Basic State
  // const [count, setCount] = useState(0);

  // //step 2: Functional Update
  // const increment = () => {
  //   setCount(prevCount => prevCount + 1);
  // };

  // const incrementByTwo = () => {
  //   setCount(prevCount => prevCount + 2);
  // };

  // const resetCount = () => {
  //   setCount(0);
  // };

  // return (
  //   <div style={Styles.container}>
  //     <h1>Functional update Demo</h1>
  //     <h2>{count}</h2>
  //     <div>
  //       <button style={Styles.btn} onClick={increment}>
  //         +1
  //       </button>
  //       <button style={Styles.btn} onClick={incrementByTwo}>
  //         +2
  //       </button>
  //       <button style={Styles.btn} onClick={resetCount}>
  //         Reset
  //       </button>
  //     </div>
  //     <p style={Styles.info}>Using <b>prev state</b> ensures correct updates when multiple updates happen quickly.
  //     </p>
  //     </div>
  // );

  //Lazy initialization (runs only once)
  
  // const [data, setData] = useState(() => {
  //   console.log('Expensive computation running...');
    
  //   let result = 0 ;
  //   for (let i = 0; i < 10000000; i++) {
  //     result += i;
  //   }
  //   return result%1000;
  // });

  // //update without re-running expensive computation
  // const recalculateData = () => {
  //   setData(prevData => {
  //     console.log("Recalculating data...");
  //     return prevData+100;
  //   });
  // };

  // return (
  //   <div style={Styles.container}>
  //     <h1>Lazy Initialization Demo</h1>
  //     <h2>Computed Value: {data}</h2>
  //     <button style={Styles.btn} onClick={recalculateData}>
  //       Recalculate Data
  //     </button>
  //     <p style={Styles.info}>
  //       Open console to observe logs.</p>
  //   </div>
  // );

  // //Object State
  // const [user, setUser] = useState({
  //   name: '',
  //   age: '',
  //   email: '',
  // });

  // //update Functions
  // const updateUserName = (value) => {
  //   setUser(prevUser => ({
  //     ...prevUser,
  //     name: value,
  //   }));
  // };

  // const updateUserAge = (value) => {
  //   setUser(prevUser => ({
  //     ...prevUser,
  //     age: value,
  //   }));
  // };

  // const updateUserEmail = (value) => {
  //   setUser(prevUser => ({
  //     ...prevUser,
  //     email: value,
  //   }));
  // };

  // const resetUser = () => {
  //   setUser({
  //     name: '',
  //     age: '',
  //     email: '',
  //   });
  // };

  // return (
  //   <div>
  //     <div style={Styles.container}>
  //       <h1>Object State Demo</h1>

  //       {/*  Input Fields */}

  //       <input
  //       type='text'
  //       placeholder='Enter Name'
  //       onChange={(e) => updateUserName(e.target.value)}
  //       style={Styles.input}
  //       />
        
  //       <input 
  //       type='text'
  //       placeholder='Enter Age'
  //       onChange={(e) => updateUserAge(e.target.value)}
  //       style={Styles.input}
  //       />
  
  //       <input
  //       type='email'
  //       placeholder='Enter Email'
  //       onChange={(e) => updateUserEmail(e.target.value)}
  //       style={Styles.input}
  //       />

  //       {/* Display User Info */}
  //       <div style={Styles.userInfo}>
  //         <p><b>Name:</b> {user.name}</p>
  //         <p><b>Age:</b> {user.age}</p>
  //         <p><b>Email:</b> {user.email}</p>
  //       </div>

  //       {/* Reset Button */}
  //       <button style={Styles.btn} onClick={resetUser}>
  //         Reset User
  //       </button>
  //     </div>
  //   </div>
  // );

  //   // 🔹 Array State
  // const [items, setItems] = useState([]);

  // // 🔹 Add Single Item
  // const addItem = () => {
  //   const newItem = {
  //     id: Date.now(),
  //     name: "Item " + (items.length + 1),
  //     created: new Date().toLocaleTimeString()
  //   };

  //   setItems(prev => [...prev, newItem]);
  // };

  // // 🔹 Add Multiple Items
  // const addMultipleItems = () => {
  //   const newItems = [
  //     {
  //       id: Date.now(),
  //       name: "Batch Item 1",
  //       created: new Date().toLocaleTimeString()
  //     },
  //     {
  //       id: Date.now() + 1,
  //       name: "Batch Item 2",
  //       created: new Date().toLocaleTimeString()
  //     },
  //     {
  //       id: Date.now() + 2,
  //       name: "Batch Item 3",
  //       created: new Date().toLocaleTimeString()
  //     }
  //   ];

  //   setItems(prev => [...prev, ...newItems]);
  // };

  // // 🔹 Update Item
  // const updateItem = (id) => {
  //   setItems(prev =>
  //     prev.map(item =>
  //       item.id === id
  //         ? {
  //             ...item,
  //             name: "Updated Item",
  //             updated: new Date().toLocaleTimeString()
  //           }
  //         : item
  //     )
  //   );
  // };

  // // 🔹 Delete Item
  // const deleteItem = (id) => {
  //   setItems(prev => prev.filter(item => item.id !== id));
  // };

  // // 🔹 Delete All Items
  // const deleteAllItems = () => {
  //   setItems([]);
  // };

  // return (
  //   <div style={{ padding: "20px" }}>
  //     <h2>Items List</h2>

  //     <button onClick={addItem}>Add Item</button>
  //     <button onClick={addMultipleItems} style={{ marginLeft: "10px" }}>
  //       Add Multiple Items
  //     </button>
  //     <button onClick={deleteAllItems} style={{ marginLeft: "10px" }}>
  //       Delete All
  //     </button>

  //     <ul>
  //       {items.map(item => (
  //         <li key={item.id}>
  //           {item.name} - {item.created}

  //           <button
  //             onClick={() => updateItem(item.id)}
  //             style={{ marginLeft: "10px" }}
  //           >
  //             Update
  //           </button>

  //           <button
  //             onClick={() => deleteItem(item.id)}
  //             style={{ marginLeft: "5px" }}
  //           >
  //             Delete
  //           </button>

  //           {item.updated && (
  //             <span style={{ marginLeft: "10px", color: "green" }}>
  //               (Updated: {item.updated})
  //             </span>
  //           )}
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
  
  // 🔹 Initial State
  const initialCounterState = {
    count: 0,
    history: []
  };

  // 🔹 Reducer Function
  function counterReducer(state, action) {
    switch (action.type) {
      case "increment":
        return {
          count: state.count + 1,
          history: [
            ...state.history,
            { type: "increment", value: state.count + 1, time: new Date().toLocaleTimeString() }
          ]
        };

      case "decrement":
        return {
          count: state.count - 1,
          history: [
            ...state.history,
            { type: "decrement", value: state.count - 1, time: new Date().toLocaleTimeString() }
          ]
        };

      case "reset":
        return {
          count: 0,
          history: [
            ...state.history,
            { type: "reset", value: 0, time: new Date().toLocaleTimeString() }
          ]
        };

      case "set":
        return {
          count: action.payload,
          history: [
            ...state.history,
            { type: "set", value: action.payload, time: new Date().toLocaleTimeString() }
          ]
        };

      default:
        return state;
    }
  }

  // 🔹 useReducer Hook
  const [counterState, dispatch] = useReducer(counterReducer, initialCounterState);

  // 🔹 Input State for SET
  const [inputValue, setInputValue] = useState("");

  return (
    <div style={styles.container}>
      <h1>useReducer Counter (Advanced)</h1>

      <h2>Count: {counterState.count}</h2>

      {/* 🔹 Actions */}
      <div>
        <button style={styles.btn} onClick={() => dispatch({ type: "increment" })}>
          +1
        </button>

        <button style={styles.btn} onClick={() => dispatch({ type: "decrement" })}>
          -1
        </button>

        <button style={styles.resetBtn} onClick={() => dispatch({ type: "reset" })}>
          Reset
        </button>
      </div>

      {/* 🔹 Set Value */}
      <div style={{ marginTop: "20px" }}>
        <input
          type="number"
          placeholder="Enter value"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={styles.input}
        />

        <button
          style={styles.btn}
          onClick={() =>
            dispatch({ type: "set", payload: Number(inputValue) })
          }
        >
          Set Value
        </button>
      </div>

      {/* 🔹 History */}
      <h3 style={{ marginTop: "30px" }}>History</h3>

      <ul style={styles.list}>
        {counterState.history.map((item, index) => (
          <li key={index} style={styles.card}>
            <b>{item.type.toUpperCase()}</b> → {item.value}
            <br />
            <small>{item.time}</small>
          </li>
        ))}
      </ul>

      <p style={styles.info}>
        👉 useReducer is best for <b>complex state logic & history tracking</b>
      </p>
    </div>
  );
}

// 🎨 Styling
const styles = {
  container: {
    textAlign: "center",
    marginTop: "40px",
    fontFamily: "Arial"
  },
  btn: {
    margin: "10px",
    padding: "10px 15px",
    cursor: "pointer"
  },
  resetBtn: {
    margin: "10px",
    padding: "10px 15px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    cursor: "pointer"
  },
  input: {
    padding: "10px",
    marginRight: "10px"
  },
  list: {
    listStyle: "none",
    padding: 0
  },
  card: {
    border: "1px solid #ccc",
    margin: "10px auto",
    padding: "10px",
    width: "250px"
  },
  info: {
    marginTop: "20px",
    color: "green"
  }
}


export default App;
