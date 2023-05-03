import React from "react";
import "./Mixing.scss";
import plus from "./../../img/icons8-сложение-30.png";
import result from "./../../img/icons8-стрелка-50.png";

const Mixing = () => {
    return (
        <div>
            <h2 className="title">Стол исследований</h2>
            <div className="panel">
                <ul className="mixing-goods">
                    <li className="mix-item item-1"></li>
                    <li className="mix-item item-1"></li>
                    <li className="mix-item item-1"></li>
                    <li className="mix-item item-1"></li>
                    <li className="mix-item item-1"></li>
                    <li className="mix-item item-1"></li>
                    <li className="mix-item item-1"></li>
                    <li className="mix-item item-1"></li>
                    <li className="mix-item item-1"></li>
                    <li className="mix-item item-1"></li>
                    <li className="mix-item item-1"></li>
                    <li className="mix-item item-1"></li>
                    <li className="mix-item item-1"></li>
                    <li className="mix-item item-1"></li>
                    <li className="mix-item item-1"></li>
                    <li className="mix-item item-1"></li>
                    <li className="mix-item item-1"></li>
                    <li className="mix-item item-1"></li>
                    <li className="mix-item item-1"></li>
                    <li className="mix-item item-1"></li>
                    <li className="mix-item item-1"></li>
                    <li className="mix-item item-1"></li>
                    <li className="mix-item item-1"></li>
                    <li className="mix-item item-1"></li>
                </ul>
                <h2 className="title">Смешивание</h2>
                <div className="mixing-goods mix">
                    <li className="mix-item item-1"></li>
                    {/* <li className='mix-item total'></li> */}
                    <button className="button"></button>
                    <li className="mix-item item-2"></li>
                </div>
                <h2 className="title">Варочная стойка</h2>
                <div className="mixing-goods potions">
                    <li className="mix-item item-1"></li>
                    <img src={plus} alt="plus"/>
                    <li className="mix-item item-1"></li>
                    <img src={plus} alt="plus"/>
                    <li className="mix-item item-1"></li>
                    <img src={plus} alt="plus"/>
                    <li className="mix-item item-1"></li>
                    <img src={result} alt="result"/>
                    <li className="mix-item item-1"></li>
                </div>
            </div>
        </div>
    );
};

export default Mixing;
