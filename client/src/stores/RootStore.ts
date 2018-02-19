import AppStore from './AppStore';
import ChartStore from './ChartStore';
import User from './User';

interface RootStore {
  AppStore: any;
  ChartStore: any;
  UserStore: any;
}

class RootStore implements RootStore {
  constructor() {
    this.AppStore = new AppStore(this);
    this.ChartStore = new ChartStore(this);
    this.UserStore = new User(this);
  }
}

export default RootStore;