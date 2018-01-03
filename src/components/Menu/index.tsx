import * as React from 'react';
import {IMenuInterface} from "../../interfaces";

const Menu = (props: IMenuInterface) => {
  const {User} = props;
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
            <li>
              <select name="defaultCurrency">
                <option value="USD" onClick={(e) => {
                  console.log(e.currentTarget.value);
                  User.Currency(e.currentTarget.value);
                }}>USD
                </option>
                <option value="RUB" onClick={(e) => {
                  User.Currency(e.currentTarget.value);
                }}>RUB
                </option>
              </select>
              <div onClick={
                e => {
                  const value = e.currentTarget.innerText.toUpperCase();
                  User.Currency(value);
                }}>usd
              </div>
              <div onClick={e => {
                const value = e.currentTarget.innerText.toUpperCase();
                User.Currency(value);
              }}>rub
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Menu;