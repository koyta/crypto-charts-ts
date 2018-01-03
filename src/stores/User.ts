import {observable, action} from 'mobx'

type Currencies = 'RUB'|'USD'|'EUR'|'AUD';
type Crypts = 'BTC'|'BCH'|'LTC'|'ETH';

interface UserPreferences {
  currency: Currencies;
  crypto: Crypts;
}

class User {
  @observable private preferences: UserPreferences = {
    currency: 'RUB',
    crypto: 'BTC'
  };

  //TODO https://github.com/jerairrest/react-chartjs-2#chartjs-defaults

  @action setCurrency(currency: Currencies) {
    this.preferences.currency = currency;
    console.log(`Предпочтительная валюта теперь ${this.preferences.currency}.`);
  }

  set Currency(currency: Currencies) {
    this.preferences.currency = currency;
    console.log(`Предпочтительная валюта теперь ${this.preferences.currency}.`);
  }

  get Currency() {
    return this.preferences.currency;
  }
}

export default new User();

