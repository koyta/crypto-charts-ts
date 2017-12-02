import * as React from 'react';

const Menu = () => {
  return (
    <aside>
      <div className="container">
        <header>
          <h1><strong>Crypto</strong>Charts</h1>
        </header>
        <nav>
          <ul>
            <li><a data-currency="BTC">Bitcoin</a></li>
            <li><a data-currency="BCH">Bitcoin Cash</a></li>
            <li><a data-currency="ETH">Etherium</a></li>
            <li><a data-currency="LTC">Litecoin</a></li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Menu;