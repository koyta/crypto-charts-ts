import * as React from 'react';
import Main from '../../components/Main/';
import {inject, observer} from 'mobx-react';
import {IMainContainerProps} from '../../interfaces';

@inject('ChartStore') @observer
class MainContainer extends React.Component <IMainContainerProps, {}> {

    onButtonClick = () => {
        this.props.ChartStore.fetch();
    };
    onHistoricalBtnClick = () => {
        this.props.ChartStore.historicalFetch();
    };

    render() {
        return (
            <Main pageHeading="Bitcoin"
                  onButtonClick={this.onButtonClick}
                  onHistoricalBtnClick={this.onHistoricalBtnClick}
            />
        );
    }
}

export default MainContainer;