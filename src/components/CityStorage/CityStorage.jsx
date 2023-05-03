import React from "react";
import StorageItem from "./components/StorageItem";
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

            backgroundColor: "#8d6048",
            bodyFontColor: "#d6ba7a",
            borderColor: "#8d6048",
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
                ticks: {
                    stepSize: 1,
                    color: "#d6ba7a",
                    fontSize: 10
                },                
                grid: {
                    drawOnChartArea: false,
                },
            },
            x: {
                display: true,
                ticks: {
                    color: "#d6ba7a"
                },
                grid: {
                    drawOnChartArea: true,
                },
            },
        },
    };

    function getGoodData(priceStats) {
        return {
            labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
            datasets: [
                {
                    label: "Цена за шт.",
                    data: priceStats,
                    fill: false,
                    backgroundColor: "#8d6048",
                    borderColor: "#8d604844",
                },
            ],
        };
    }

    return (
        <div>
            <h2 className="title">Городской склад</h2>

            <div className="panel">
                <div className="city-goods" style={{width: 464, height: 659, overflow: "auto"}}>
                    {props.storage.map((good) => {
                        return (
                            <div key={"storage-item-" + good.id} className="good-item-wrapper">
                                <div className="good-item-stats">
                                    <Line options={options} data={getGoodData(good.priceStats)}/>
                                </div>
								<StorageItem good={good} onBuy={props.onBuy} />

                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CityStorage;
