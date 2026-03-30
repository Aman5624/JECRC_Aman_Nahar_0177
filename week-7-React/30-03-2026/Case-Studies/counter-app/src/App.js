import './App.css';
import Counter from './Components/counter';
import StateVsPropsDemo from './Components/StateVsPropsDemo';
import TempratureConverter from './Components/TempratureConverter';

function App() {
  return ( 
    <div className="App">
      <Counter />
      <StateVsPropsDemo />
      <TempratureConverter />
    </div>
  );
}

export default App;
