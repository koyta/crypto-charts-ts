import { observable, action, ObservableMap, computed, toJS } from 'mobx';

type Currencies = 'RUB'|'USD'|'EUR'|'AUD';
type Crypts = 'BTC'|'BCH'|'LTC'|'ETH';

class User {
  @observable private _currency: Currencies;
  @observable private _numResults: number;
  @observable _crypto: Set<string>;

  rootStore: any;
  constructor(rootStore: any) {
    this.rootStore = rootStore;
    this._numResults = 20;
    this._currency = 'USD';
    this._crypto = new Set();
    this._crypto.add('BTC');
  }

  // TODO https://github.com/jerairrest/react-chartjs-2#chartjs-defaults

  @action setNumResults(value: number) {
    this._numResults = value;
    console.log('Предпочтительное количество результатов теперь', this._numResults);
  }

  @computed get getNumResults(): number {
    return this._numResults;
  }

  @action setCurrency(currency: Currencies) {
    this._currency = currency;
    console.log(`Предпочтительная валюта теперь ${this._currency}.`);
  }

  @computed get getCurrency() {
    return this._currency;
  }

  @action setCrypto(crypto: Crypts) {
      this._crypto.has(crypto) ? this._crypto.delete(crypto) : this._crypto.add(crypto);
      console.log(toJS(this._crypto.keys()));
  }

  @computed get getCrypto() {
    return toJS(this._crypto);
  }

  @action hasCrypto(key: string) {
    return this._crypto.has(key);
  }
}

export default User;
