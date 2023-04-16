import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/context";
import Button from "../components/UI/button/Button";
import Cities from "../components/Cities/Cities";
import CityStorage from "../components/CityStorage/CityStorage";
import Storage from "../components/Storage/Storage";
import Transporations from "../components/Transporations/Transporations";
import Stats from "../components/Stats/Stats";

const Game = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext);

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem("auth");
    };

    const [currentCity, setCurrentCity] = useState(1);

    const [selectedGood, setSelectedGood] = useState(1);

    const [storages, setStorages] = useState([
        {
            cityId: 1,
            storage: [
                {
                    id: 1,
                    qty: 10,
                },
                {
                    id: 2,
                    qty: 20,
                },
                {
                    id: 3,
                    qty: 204,
                },
                {
                    id: 4,
                    qty: 200,
                },
                {
                    id: 5,
                    qty: 120,
                },
                {
                    id: 6,
                    qty: 10,
                },
                {
                    id: 7,
                    qty: 20,
                },
            ],
        },
        {
            cityId: 2,
            storage: [
                {
                    id: 1,
                    qty: 5,
                },
            ],
        },
    ]);

    const [cityStorages, setCityStorages] = useState([
        {
            cityId: 1,
            storage: [
                {
                    id: 1,
                    priceStats: [10, 15, 18, 13, 15, 18, 10],
                    maxStep: 5,
                    minPrice: 10,
                    maxPrice: 40,
                },
                {
                    id: 2,
                    priceStats: [12, 13, 14, 15, 16, 11, 18],
                    maxStep: 7,
                    minPrice: 5,
                    maxPrice: 70,
                },
                {
                    id: 3,
                    priceStats: [25, 28, 31, 27, 23, 20, 25],
                    maxStep: 8,
                    minPrice: 15,
                    maxPrice: 50,
                },
            ],
        },
    ]);

    const [money, setMoney] = useState(1000);
    const [days, setDays] = useState(1);

    const goods = [
        {
            id: 1,
            title: "Пиво",
        },
        {
            id: 2,
            title: "Молоко",
        },
        {
            id: 3,
            title: "Пшеница",
        },
        {
            id: 4,
            title: "Грибы",
        },
        {
            id: 5,
            title: "Клевер",
        },
        {
            id: 6,
            title: "Лук",
        },
        {
            id: 7,
            title: "Виноград",
        },
        {
            id: 8,
            title: "Орехи",
        },
        {
            id: 9,
            title: "Вилы",
        },
        {
            id: 10,
            title: "Доски",
        },
        {
            id: 11,
            title: "Коса",
        },
        {
            id: 12,
            title: "Лопата",
        },
        {
            id: 13,
            title: "Топор",
        },
        {
            id: 14,
            title: "Кирка",
        },
    ];

    function getStorageByCity() {
        const store = storages.find((storage) => {
            return storage.cityId === currentCity;
        });

        if (store) {
            return store.storage;
        } else {
            return [];
        }
    }

    function getCityStorageByCity() {
        const store = cityStorages.find((storage) => {
            return storage.cityId === currentCity;
        });

        if (store) {
            return store.storage;
        } else {
            return [];
        }
    }

    function sellGoods(goodId, qty) {
        const storagesNew = storages;
        let moneyNew = money;

        const index = storagesNew.findIndex((storage) => {
            return storage.cityId === currentCity;
        });

        if (index > -1) {
            const goodIndex = storagesNew[index].storage.findIndex((good) => {
                return good.id === goodId;
            });

            if (goodIndex > -1) {
                const currentCityStorage = getCityStorageByCity();

                const goodIndex = currentCityStorage.findIndex((good) => {
                    return good.id === goodId;
                });

                if (goodIndex > -1) {
                    const price = currentCityStorage[goodIndex].priceStats[currentCityStorage[goodIndex].priceStats.length - 1];

                    if (storagesNew[index].storage[goodIndex].qty >= qty) {
                        storagesNew[index].storage[goodIndex].qty -= qty;
                        moneyNew += qty * price;
                        setMoney(moneyNew);    
                    }
                }
            }
        }

        setStorages(storagesNew);
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    function updateCityStorages() {
        let newCityStorages = cityStorages;

        for (
            let cityIndex = 0;
            cityIndex < newCityStorages.length;
            cityIndex++
        ) {
            const storage = newCityStorages[cityIndex].storage;

            for (let goodIndex = 0; goodIndex < storage.length; goodIndex++) {
                const goodData = storage[goodIndex];
                const priceChangeSign = getRandomInt(2) ? 1 : -1;
                const priceChangeValue =
                    getRandomInt(goodData.maxStep) * priceChangeSign;

                let newPrice =
                    goodData.priceStats.slice(-1).pop() + priceChangeValue;

                if (newPrice > goodData.maxPrice) {
                    newPrice = goodData.maxPrice;
                }

                if (newPrice < goodData.minPrice) {
                    newPrice = goodData.minPrice;
                }

                for (let i = 0; i < goodData.priceStats.length - 1; i++) {
                    goodData.priceStats[i] = goodData.priceStats[i + 1];
                }

                goodData.priceStats[goodData.priceStats.length - 1] = newPrice;

                newCityStorages[cityIndex][goodIndex] = goodData;
            }
        }
        setCityStorages(newCityStorages);
    }

    function liveProcess() {
        setInterval(() => {
            updateCityStorages();
            setDays((days) => days + 1);
        }, 5000);
    }

    useEffect(() => liveProcess(), []);

    function getCityStorage() {
        const store = cityStorages.find((storage) => {
            return storage.cityId === currentCity;
        });

        if (store) {
            return store.storage;
        } else {
            return [];
        }
    }

    function buyGoods(goodId, qty, price) {
        const totalPrice = qty * price;

        if (money >= totalPrice) {
            const storagesNew = storages;

            const index = storagesNew.findIndex((storage) => {
                return storage.cityId === currentCity;
            });

            if (index > -1) {
                const goodIndex = storagesNew[index].storage.findIndex(
                    (good) => {
                        return good.id === goodId;
                    }
                );

                if (goodIndex > -1) {
                    const newQty =
                        parseInt(storagesNew[index].storage[goodIndex].qty) +
                        parseInt(qty);
                    storagesNew[index].storage[goodIndex].qty = newQty;
                } else {
                    storagesNew[index].storage.push({
                        id: goodId,
                        qty: qty,
                    });
                }
            }

            setStorages(storagesNew);
            setMoney(money - totalPrice);
        }
    }

    return (
        <div className="game">
            {/* <Button onClick={logout}>Закончить игру</Button> */}
            <h1 className="game-name">Название игры</h1>

            <Cities
                currentCity={currentCity}
                onChange={(city) => setCurrentCity(city)}
            />

            <div className="content">
                <div className="column">
                    <div className="storage">
                        <Storage
                            currentCity={currentCity}
                            storage={getStorageByCity()}
                            goods={goods}
                            selectedGood={selectedGood}
                            onSelectGood={(goodId) => setSelectedGood(goodId)}
                            onSell={(id, qty) => {
                                sellGoods(id, qty);
                            }}
                        />
                    </div>
                    <div className="transporations">
                        <Transporations />
                    </div>
                    <div className="stats">
                        <Stats days={days} money={money} />
                    </div>
                </div>
                <div className="column">
                    <div className="city-storage">
                        <CityStorage
                            storage={getCityStorage()}
                            onBuy={(goodId, number, price) =>
                                buyGoods(goodId, number, price)
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Game;
