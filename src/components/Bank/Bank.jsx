import React, { useState } from 'react';
import './Bank.scss';

const Bank = ({ deposits, onOpenDeposit, money }) => {
    const [amount, setAmount] = useState('');
    return (
        <div>
            <h2 className='title'>Bank</h2>

            <div className='panel'>
                <div className="sell-panel">
                    <div className="sell-panel-content">
                        <div>Сумма:</div>
                        <div className="controls">
                            <input
                                type="text"
                                className="input"
                                maxLength={4}
                                value={amount}
                                onChange={(e) => setAmount(parseInt(e.target.value, 10) || "")
                                }
                            />
                            <button
                                className="button"
                                onClick={() => onOpenDeposit(amount)}
                                disabled={!amount || amount > money}
                            >
                                Открыть
                            </button>
                        </div>
                    </div>
                </div>
                {deposits.map((deposit, index) => {
                    return (
                        <div className="good-item-wrapper" key={'deposit-' + index}>
                            <div className="good-item-description">
                                <div className={"good-item item-deposit"}></div>
                            </div>
                            <div className="good-item-deposit-info">
                                <div>
                                    <div className="header">
                                        Сумма: {deposit.amount}
                                    </div>
                                    <div className="days">
                                        Дней до закрытия: {deposit.days}
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
