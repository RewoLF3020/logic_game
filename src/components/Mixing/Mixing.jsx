import React from "react";
import "./Mixing.scss";
import plus from "./../../img/icons8-сложение-30.png";
import result from "./../../img/icons8-стрелка-50.png";

const Mixing = (props) => {
    return (
        <div>
            <h2 className="title">Стол исследований</h2>
            <div className="panel">
                <ul className="mixing-goods">
                    {Array(24).fill().map((o, index) => {
                        if (props.data[index]) {
                            const item = props.data[index];

                            return (
                                <li 
                                    key={item.id}
                                    className={"mix-item item-" + item.id + (props.selectedGood === item.id ? " selected" : "")}
                                    onClick={() => {}}
                                >
                                    <span className="good-description"> {item.qty} шт.</span>
                                </li>
                            );
                        } else {
                            return (
                                <li className="mix-item no-item"></li>
                            );
                        }
                    })}
                </ul>
            </div>    

                <h2 className="title">Смешивание</h2>
                <div className="panel">
                    <div className="mixing-goods mix">
                        <li className="mix-item item-1"></li>
                        <button className="button"></button>
                        <li className="mix-item item-2"></li>
                    </div>
                </div>
                
                <h2 className="title">Варочная стойка</h2>
                <div className="panel">
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
