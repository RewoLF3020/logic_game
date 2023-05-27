import React, { useState } from "react";

const StorageItem = (props) => {
	let [number, setNumber] = useState('');

    function findGoodById(itemId) {
        return props.goods.find((item) => {
            return item.id === itemId;
        }).title;
    }

    return (
        <div className="good-item-description">
            <div className={"good-item item-" + props.good.id}>
                <span className="good-name">{findGoodById(props.good.id)}</span>
            </div>
            <input
                className="input-number"
                name={"count" + new Date()}
                autoComplete="new-password"
                value={number}
                maxLength={3}
                onChange={(e) => setNumber(parseInt(e.currentTarget.value, 10) || '')}
            />
            <button
                className="button"
                onClick={() => {
                    if (number) {
                        props.onBuy(
                            props.good.id,
                            number,
                            props.good.priceStats[props.good.priceStats.length - 1]
                        );
                    }
                    setNumber('');
                }}
                disabled={parseInt(number * props.good.priceStats[props.good.priceStats.length - 1], 10) > props.money}
            >
                Купить
            </button>
            <p className="price-description">
                {props.good.priceStats[props.good.priceStats.length - 1]} за шт.
            </p>
        </div>
    );
};

export default StorageItem;
