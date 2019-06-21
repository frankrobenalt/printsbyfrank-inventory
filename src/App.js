import React from 'react';
import InventoryContainer from './InventoryContainer/InventoryContainer.js';
import logo from './printsbyfrank-inventory-manager.jpg';

function App() {
  return (
    <div>
      <img src={logo} alt="prints by frank inventory manager" className="logo" />
      <InventoryContainer />
      <footer>
        Copyright Frank Robenalt 2019
      </footer>
    </div>
  );
}

export default App;