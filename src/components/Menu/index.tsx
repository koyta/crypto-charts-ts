import * as React from 'react';
import { MenuContainer } from '../../interfaces';
import { observer } from 'mobx-react';
import TextInput from '../Common/TextInput';
import RadioButton from '../Common/RadioButton';
import Checkbox from '../Common/Checkbox';

const Menu = observer((props: MenuContainer) => {
  const { UserStore, AppStore } = props.store;

  return (
    <aside className="sidebar">
      <div className="container">
        <header>
          <h1>Crypto<strong>Charts</strong></h1>
        </header>
        <section className="sidebar__options">
          <nav className="options__nav">
            <div
              className={`options__nav_el${AppStore.getActiveNav === 'View' ? ' options__nav_el--active' : ''} `}
              onClick={(e) => AppStore.toggleNavType(e)}
            >View
            </div>
            <div
              className={`options__nav_el${AppStore.getActiveNav === 'Data' ? ' options__nav_el--active' : ''} `}
              onClick={(e) => AppStore.toggleNavType(e)}
            >Data
            </div>
          </nav>
        </section>

        {
          AppStore.getActiveNav === 'View' ?
            <form className="sidebar__form">
              <fieldset className="form__set">
                <legend className="set_title">Chart type</legend>
                <div className="set_content">
                  <RadioButton text={'Line'} name={'chartType'} value={'line'} onChangeHandle={props.onTypeChange}/>
                  <RadioButton text={'Bar'} name={'chartType'} value={'bar'} onChangeHandle={props.onTypeChange}/>
                  <RadioButton text={'Pie'} name={'chartType'} value={'pie'} onChangeHandle={props.onTypeChange}/>
                  <RadioButton text={'Doughnut'} name={'chartType'} value={'doughnut'} onChangeHandle={props.onTypeChange}/>
                </div>
              </fieldset>
            </form>
            :
            // AppStore.getActiveNav === 'Data'
            <form className="sidebar__form">
              <fieldset className="form__set">
                <legend className="set_title">Currencies<i>(max 2)</i></legend>
                <div className="set_content">
                  <Checkbox text={'BTC'} value={'BTC'}/>
                  <Checkbox text={'ETH'} value={'ETH'}/>
                  <Checkbox text={'LTC'} value={'LTC'}/>
                  <Checkbox text={'BCH'} value={'BCH'}/>
                </div>
              </fieldset>
              <fieldset className="form__set">
                <legend className="set_title">Preferences</legend>
                <div className="set_content">
                  <TextInput name={'# of results'} placeholder={'25'}/>
                  <RadioButton text={'RUB'} name={'currency'} value={'RUB'} onChangeHandle={props.onCurrencyChange}/>
                  <RadioButton text={'USD'} name={'currency'} value={'USD'} onChangeHandle={props.onCurrencyChange}/>
                </div>
              </fieldset>
            </form>
        }

      </div>
    </aside>
  );
});

export default Menu;