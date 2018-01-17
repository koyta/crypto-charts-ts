import { observable, action, ObservableMap, computed } from 'mobx';

type Currencies = 'RUB'|'USD'|'EUR'|'AUD';
type Crypts = 'BTC'|'BCH'|'LTC'|'ETH';

class User {
  @observable _currency: Currencies;
  @observable _crypto: ObservableMap<boolean>;
  @observable _numResults: number;

  rootStore: any;
  constructor(rootStore: any) {
    this.rootStore = rootStore;
    this._numResults = 20;
    this._currency = 'USD';
    this._crypto = observable.shallowMap({'BTC': true});
  }

  // TODO https://github.com/jerairrest/react-chartjs-2#chartjs-defaults

  @computed get numberOfResults() {
    return this._numResults;
  }

  @action hasCrypto(key: string) {
    return this._crypto.has(key);
  }

  @action setCurrency(currency: Currencies) {
    this._currency = currency;
    console.log(`Предпочтительная валюта теперь ${this._currency}.`);
  }

  @action setCrypto(crypto: Crypts) {
      this._crypto.has(crypto) ? this._crypto.delete(crypto) : this._crypto.set(crypto, true);
      console.log(this._crypto.keys());
    }

  @action setNumResults(value: number) {
    this._numResults = value;
    console.log('Предпочтительное количество результатов теперь', this._numResults);
  }
}

export default User;
