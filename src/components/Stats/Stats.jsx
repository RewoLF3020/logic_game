import React from 'react';
import { settings } from '../../config';
import './Stats.scss';

const Stats = (props) => {
    return (
        <div>
            <h2 className="title">Статистика</h2>
            <div className="panel stats-panel">
                <div className='money'>{props.money} / {settings.goalMoney}</div>
                <div className='days'>Дни: {props.days} / {settings.goalDays}</div>
            </div>
        </div>
    );
}

export default Stats;
