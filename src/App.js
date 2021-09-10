import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Wallet from './container/Wallet';
import AddMoney from './container/AddMoney';
function App() {
  return (
    <BrowserRouter >
    <Switch>
      <Route exact path="/" component={Wallet} />    
      <Route exact path="/AddMoney/:id" component={AddMoney} />                  
              
    </Switch>
  </BrowserRouter>
  );
}

export default App;
