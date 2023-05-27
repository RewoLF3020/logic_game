import React from "react";
import "./Mixing.scss";
import plus from "./../../img/icons8-сложение-30.png";
import result from "./../../img/icons8-стрелка-50.png";

const Mixing = (props) => {
    function findGoodById(itemId) {
        return props.goods.find((item) => {
            return item.id === itemId;
        }).title;
    }

    const resOfResearch = props.researchResult();

    return (
        <div>
            <div className="tips">
                <h2 className="title">Подсказки</h2>
                <div className="panel">
                    <div className="tips-nav">
                        <div className="bt">
                            <button 
                                className="button" 
                                style={{height: 30}}
                                disabled={props.money < 100}
                                onClick={() => props.getTip()}
                            > Купить :
                            </button>
                        </div> 
                        <p style={{fontSize: 20, paddingRight: 10, paddingTop: 10}}>100</p>
                    </div>
                    <p className="text">
                        {props.tip}
                    </p>
                </div>    
            </div>

            <div className="mix">
                <h2 className="title">Смешивание</h2>
                <div className="panel">
                    <ul className="mixing-goods mix">
                        {Array(2).fill().map((i, index) => {
                            if (props.mix[index]) {
                                const item = props.mix[index];

                                if (index === 0) {
                                    return (
                                        <div>
                                            <li
                                                key={"mix-item-" + item.id}
                                                className={"mix-item item-" + item.id + (props.selectedMixGood === item.id ? " selected" : "")}
                                                onClick={(e) => {
                                                    props.onSelectMixGood(item.id);
                                                    e.stopPropagation();
                                                    props.onMoveToMix(item.id);
                                                    props.onSelectGood("")
                                                    props.onSelectResGood("");        
                                                }}
                                            >
                                                <span className="good-description"> {item.qty} шт.</span>
                                                <span className="good-name">{findGoodById(item.id)}</span>
                                            </li>
                                            <button className="button" onClick={() => props.mixResult()}>
                                                СМЕШАТЬ
                                            </button>
                                        </div>
                                    );
                                }
                                return (
                                    <li
                                        key={"mix-item-" + item.id}
                                        className={"mix-item item-" + item.id + (props.selectedMixGood === item.id ? " selected" : "")}
                                        onClick={(e) => {
                                            props.onSelectMixGood(item.id);
                                            e.stopPropagation();
                                            props.onMoveToMix(item.id);
                                            props.onSelectGood("")
                                            props.onSelectResGood("");        
                                        }}
                                    >
                                        <span className="good-description"> {item.qty} шт.</span>
                                        <span className="good-name">{findGoodById(item.id)}</span>
                                    </li>
                                );
                            } else {
                                if (index === 0) {
                                    return (
                                        <div>
                                            <li
                                                className="mix-item no-item"
                                                key={"empty-place" + index}
                                                onClick={() => {props.onMoveToMix()}}
                                            ></li>
                                            <button className="button">СМЕШАТЬ</button>
                                        </div>
                                    );
                                }
                                return (
                                    <li
                                        className="mix-item no-item"
                                        key={"empty-place" + index}
                                        onClick={() => {props.onMoveToMix()}}
                                    ></li> 
                                );
                            }
                        })}
                    </ul>
                </div>
            </div>
            
            <h2 className="title">Варочная стойка</h2>
            <div className="panel">
                <ul className="mixing-goods potions">
                    {Array(4).fill().map((i, index) => {
                        if (props.research[index]) {
                            const item = props.research[index];

                            if (index === 3) {
                                return (
                                    <li 
                                        key={"mix-item" + item.id}
                                        className={"mix-item item-" + item.id + (props.selectedResGood === item.id ? " selected" : "")}
                                        onClick={(e) => {
                                            props.onSelectResGood(item.id); 
                                            e.stopPropagation();
                                            props.onMove(item.id);
                                            props.onSelectGood("")
                                            props.onSelectMixGood("");
                                        }}
                                    >
                                        <span className="good-description"> {item.qty} шт.</span>
                                        <span className="good-name">{findGoodById(item.id)}</span>
                                    </li>
                                );
                            }

                            return (
                                <div>
                                    <li 
                                        key={"mix-item" + item.id}
                                        className={"mix-item item-" + item.id + (props.selectedResGood === item.id ? " selected" : "")}
                                        onClick={(e) => {
                                            props.onSelectResGood(item.id); 
                                            e.stopPropagation();
                                            props.onMove(item.id);
                                            props.onSelectGood("")
                                            props.onSelectMixGood("");
                                        }}
                                    >
                                        <span className="good-description"> {item.qty} шт.</span>
                                        <span className="good-name">{findGoodById(item.id)}</span>
                                    </li>
                                    <img src={plus} alt="plus"/>
                                </div>
                            );
                        } else {
                            if (index === 3) {
                                return (
                                    <li
                                        className="mix-item no-item"
                                        key={"empty-cell-" + index}
                                        onClick={() => {props.onMove()}}
                                    ></li>
                                );
                            }

                            return (
                                <div>
                                    <li
                                        className="mix-item no-item"
                                        key={"empty-cell-" + index}
                                        onClick={() => {props.onMove()}}
                                    ></li>
                                    <img src={plus} alt="plus"/>
                                </div>
                            );
                        }
                    })}

                    <img className="result" src={result} alt="result" onClick={() => props.moveResearchRes()} />
                    {resOfResearch ? (
                        <li 
                            key={result}
                            className={"mix-item item-" + resOfResearch}
                        >
                            <span className="good-description"> 20 шт.</span>
                            <span className="good-name">{findGoodById(resOfResearch)}</span>
                        </li>
                    )
                    : (
                        <li
                            key={"no-result"}
                            className="mix-item no-item"
                        ></li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Mixing;