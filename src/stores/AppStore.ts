import {observable, action} from 'mobx'

class AppStore {
  @observable showChart = false;
  @observable showSidebar = true;

  @action toggleSidebar() {
    this.showSidebar = !this.showSidebar
  }
}

export default new AppStore()