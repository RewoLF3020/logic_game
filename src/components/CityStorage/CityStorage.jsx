import React, { useState } from "react";
import "./CityStorage.scss";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const CityStorage = (props) => {
    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
        maintainAspectRatio: false,

        interaction: {
            mode: "index",
            intersect: false,
            caretSize: 3,

            backgroundColor: "#44200c",
            bodyFontColor: "#a68156",
            borderColor: "#877f72",
            borderWidth: 1,
            displayColors: false,

            callbacks: {
                title() {
                    return "";
                },
            },
        },

        scales: {
            y: {
                grid: {
                    drawOnChartArea: false,
                },
            },
            x: {
                display: false,
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    };

	let [number, setNumber] = useState(0);

    function getGoodData(priceStats) {
        return {
            labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
            datasets: [
                {
                    label: "Цена за шт.",
                    data: priceStats,
                    fill: false,
                    backgroundColor: "#a68156",
                    borderColor: "rgba(166, 129, 86, 0.2)",
                },
            ],
        };
    }

    return (
        <div>
            <h2 className="title">Городской склад</h2>

            <div className="panel">
                <div className="city-goods">
                    {props.storage.map((good) => {
                        return (
                            <div key={good.id} className="good-item-wrapper">
								<div className="good-item-description">
                                	<div className={"good-item item-" + good.id}></div>
									<input 
										className="input-number"
										name="count" 
										/* autoComplete={false} */
										value={number}
										maxLength={3} 
										onChange={(e) => setNumber(e.currentTarget.value)} 
									/>
									<button className="button" 
										onClick={() => {
											props.onBuy(good.id, number, good.priceStats[good.priceStats.length - 1])
											setNumber(0);
										}}>
										Купить
									</button>
									<p className="price-description">
										{good.priceStats[good.priceStats.length - 1]} за шт.
									</p>
								</div>
                                <div className="good-item-stats">
                                    <Line
                                        options={options}
                                        data={getGoodData(good.priceStats)}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CityStorage;
