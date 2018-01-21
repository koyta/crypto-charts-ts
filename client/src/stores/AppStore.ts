import { action, computed, observable } from 'mobx';
import * as React from 'react';
import { RootStore } from '../interfaces';

interface AppStore {
  rootStore: RootStore;
}

class AppStore {
  @observable showChart: boolean;
  @observable showSidebar: boolean;
  @observable activeNav: string;

  constructor(rootStore: any) {
    this.showSidebar = true;
    this.showChart = false;
    this.activeNav = 'View';
    this.rootStore = rootStore;
  }

  /**
   * Переключает разделы навигации в боковом меню
   * @param {React.SyntheticEvent<HTMLElement>} event
   */
  @action toggleNavType(event: React.SyntheticEvent<HTMLElement>) {
    const target = event.currentTarget;
    this.activeNav = target.innerText;
  }

  /**
   * Возвращает активный раздел навигации в боковом меню
   * @returns {string}
   */
  @computed get getActiveNav() {
    return this.activeNav;
  }

  /**
   * Включает/выключает боковое меню
   */
  @action
  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
    const burger = document.querySelector('.hamburger');
    burger.classList.toggle('is-active');
    const aside = document.querySelector('aside.sidebar');
    aside.classList.toggle('sidebar--active');
  }
}

export default AppStore;