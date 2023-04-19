import React from 'react';
import './Bank.scss';

const Bank = (props) => {
    return (
        <div>
            <h2 className='title'>Bank</h2>

            <div className='panel'>
                {props.deposits.map((deposit) => {
                    return (
                        <div className="good-item-wrapper">
                            <div className="good-item-description">
                                <div className={"good-item item-deposit"}></div>
                            </div>
                            <div className="good-item-deposit-info">
                                <div>
                                    <div className="header">
                                        Сумма: {deposit.amount}
                                    </div>
                                    <div className="days">
                                        Дней до получения процента: {deposit.days}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Bank;
