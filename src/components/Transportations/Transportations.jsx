import React from "react";
import { cities } from "../../cities";
import "./Transportations.scss";

const Transporations = (props) => {
    function findGoodById(itemId) {
        return props.goods.find((item) => {
            return item.id === itemId;
        }).title;
    }

    function getCityNameById(cityId) {
        return cities.find((city) => {
            return city.id === cityId;
        }).title;
    }

    return (
        <div className="transportations" style={{marginBottom: 10}}>
            <h2 className="title">Активные перевозки</h2>
            {props.orders.length ?
                <div className="panel">
                {props.orders.map((order) => {
                    return (
                        <div className="good-item-wrapper" key={order.id}>
                            <div className="good-item-description">
                                <div className={"good-item item-" + order.goodId}></div>
                            </div>
                            <div className="good-item-transport-info">
                                <div>
                                    <div className="header">{findGoodById(order.goodId)}, {order.qty} шт.</div>
                                    <div className="path">
                                        {getCityNameById(order.fromCityId)} - {getCityNameById(order.targetCityId)}
                                    </div>
                                </div>
                                <div>
                                    <div className="days">Дни: {order.days}</div>
                                    <button 
                                        className="button" 
                                        disabled={order.days ? true : false}
                                        onClick={() => props.onAcceptOrder(order)}
                                    >
                                        Получить
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            : ""
            }
        </div>
    );
};

export default Transporations;
