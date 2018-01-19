import { action, computed, observable, toJS } from 'mobx';
import { RootStore } from '../interfaces';

type Currencies = 'RUB' | 'USD' | 'EUR' | 'AUD';
type Crypts = 'BTC' | 'BCH' | 'LTC' | 'ETH';

class User {
  @observable private _currency: Currencies;
  @observable private _numResults: number;
  @observable _crypto: Array<string>;

  rootStore: RootStore;

  constructor(rootStore: any) {
    this.rootStore = rootStore;
    this._numResults = 20;
    this._currency = 'USD';
    this._crypto = ['BTC'];
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
    const index = this._crypto.findIndex((value) => {
      return crypto === value;
    });
    index !== -1 ?
      this._crypto.splice(index, 1)
      :
      this._crypto.push(crypto);
  }

  @computed get getCrypto() {
    return toJS(this._crypto);
  }

  @action hasCrypto(key: string) {
    return (this._crypto.find(value => {
      return key === value;
    })) !== undefined;
  }
}

export default User;
