import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/context";
import Button from "../components/UI/button/Button";
import Cities from "../components/Cities/Cities";
import CityStorage from "../components/CityStorage/CityStorage";
import Storage from "../components/Storage/Storage";
import Transportations from "../components/Transportations/Transportations";
import Stats from "../components/Stats/Stats";
import Bank from "../components/Bank/Bank";
import Mixing from "../components/Mixing/Mixing";
import { 
    defaultCityStoragesData,
    defaultDeposits, 
    defaultStoragesData, 
    goods,
    settings,
    gameStatuses,
    defaultResearchData,
    defaultMixData,
    hints
} from "../config";
import { BsInfoCircle } from "react-icons/bs";
import TextModal from "../components/UI/modal/TextModal";
import WinModal from "../components/UI/modal/WinModal";


const Game = () => {
    const { setIsAuth } = useContext(AuthContext);

    const logout = () => {
        let flag = prompt("Вы действительно хотите покинуть игру? Результат не сохранится!", 'Да');
        
        if (flag === 'Да') {
            setIsAuth(false);
            localStorage.removeItem("auth");
        }
    };

    const [modalShow, setModalShow] = useState(false);

    const [currentCity, setCurrentCity] = useState(1);

    const [selectedGood, setSelectedGood] = useState("");

    const [selectedResGood, setSelectedResGood] = useState("");

    const [selectedMixGood, setSelectedMixGood] = useState("");

    const [deposits, setDeposits] = useState(defaultDeposits);

    const [playerStorages, setPlayerStorages] = useState(defaultStoragesData);

    const [cityStorages, setCityStorages] = useState(defaultCityStoragesData);

    const [researchStorages, setResearchStorages] = useState(defaultResearchData);

    const [mixStorages, setMixStorages] = useState(defaultMixData);

    const [money, setMoney] = useState(settings.startMoney);
    const [days, setDays] = useState(1);

    const [transportOrders, setTransportOrders] = useState([]);
    const [orderId, setOrderId] = useState(1);

    const [gameStatus, setGameStatus] = useState(gameStatuses.new);
    const [winModal, setWinModal] = useState(false);

    const [tip, setTip] = useState('');


    function getCurrentStorage(storages) {
        const store = storages.find((storage) => {
            return storage.cityId === currentCity;
        });

        if (store) {
            return store.storage;
        } else {
            return [];
        }
    }

    function sellGoods(goodId, qty, totalPrice) {
        const storagesNew = [...playerStorages];
        let moneyNew = money;

        const index = storagesNew.findIndex((storage) => {
            return storage.cityId === currentCity;
        });

        if (index > -1) {
            const goodIndex = storagesNew[index].storage.findIndex((good) => {
                return good.id === goodId;
            });

            if (goodIndex > -1) {
                const currentCityStorage = getCurrentStorage(cityStorages);

                const cityGoodIndex = currentCityStorage.findIndex((good) => {
                    return good.id === goodId;
                });

                if (cityGoodIndex > -1) {
                    if (storagesNew[index].storage[goodIndex].qty >= qty) {
                        if (storagesNew[index].storage[goodIndex].qty === qty)
                            setSelectedGood(0);

                        storagesNew[index].storage[goodIndex].qty -= qty;
                        moneyNew += totalPrice;

                        if (storagesNew[index].storage[goodIndex].qty === 0) {
                            removeProduct(storagesNew[index].storage[goodIndex].id, playerStorages);
                        }

                        setMoney(moneyNew);
                    }
                }
            }
        }

        setPlayerStorages(storagesNew);
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    function updateCityStorages() {
        let newCityStorages = cityStorages;

        for (let cityIndex = 0; cityIndex < newCityStorages.length; cityIndex++) {
            const storage = newCityStorages[cityIndex].storage;

            for (let goodIndex = 0; goodIndex < storage.length; goodIndex++) {
                const goodData = storage[goodIndex];
                const priceChangeSign = getRandomInt(2) ? 1 : -1;
                const priceChangeValue = getRandomInt(goodData.maxStep + 1) * priceChangeSign; 

                let newPrice = goodData.priceStats.slice(-1).pop() + priceChangeValue;

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

    function updateTransportOrders() {
        setTransportOrders((oldTransportOrders) => {
            const newOrders = [...oldTransportOrders];

            newOrders.forEach((order) => {
                if (order.days >=1) {
                    order.days -= 1;
                } 
            })

            return newOrders;
        })
    }

    function updateDeposits() {
        setDeposits((oldDeposits) => {
            const newDeposits = [...oldDeposits];

            newDeposits.forEach((deposit, index) => {
                if (deposit.days >= 1) {
                    deposit.days -= 1;
                }

                if (deposit.days === 0) {
                    newDeposits.splice(index, 1);
                    
                    setMoney((oldMoney) => {
                        return oldMoney + parseInt(deposit.amount * 1.1);
                    })
                }
            })
            return newDeposits;
        })
    }

    function liveProcess() {
        setTimeout(() => {
            updateCityStorages();
            updateTransportOrders();
            updateDeposits();
            checkGameStatus();
            setDays((days) => days + 1);
        }, 10000);
    }

    function checkGameStatus() {
        const store = getCurrentStorage(playerStorages);

        const index = store.findIndex((item) => {
            return item.id === 57;
        })

        if (index > -1) {
            setGameStatus(gameStatuses.win);
            setWinModal(true);
        }
    }

    useEffect(() => {
        if (gameStatus === gameStatuses.new) {
            liveProcess();
        }
    // eslint-disable-next-line
    }, [days]);

    function createTransportOrder(targetCityId) {
        const newOrders = [...transportOrders];

        const storage = getCurrentStorage(playerStorages);

        const goodIndex = storage.findIndex(good => good.id === selectedGood)

        if (goodIndex > -1) {
            newOrders.push({
                id: orderId,
                fromCityId: currentCity,
                targetCityId,
                goodId: selectedGood,
                qty: storage[goodIndex].qty,
                days: 10
            });

            setOrderId(orderId + 1);
            removeProduct(selectedGood, playerStorages);
            setTransportOrders(newOrders);
            setSelectedGood(0);
        }
    }   

    function removeProduct(productId, storages) {
        const storagesNew = storages;

        const index = storagesNew.findIndex((storage) => {
            return storage.cityId === currentCity;
        });

        if (index > -1) {
            const productIndex = storagesNew[index].storage.findIndex((product) => {
                return product.id === productId;
            });

            if (productIndex > -1) {
                    storagesNew[index].storage.splice(productIndex, 1);
                }
            }

        setPlayerStorages(storagesNew);
    }

    function buyGoods(goodId, qty, price) {
        const totalPrice = qty * price;

        if (money >= totalPrice) {
            const storagesNew = playerStorages;

            const index = storagesNew.findIndex((storage) => {
                return storage.cityId === currentCity;
            });

            if (index > -1) {
                const goodIndex = storagesNew[index].storage.findIndex((good) => {
                        return good.id === goodId;
                    });

                if (goodIndex > -1) {
                    const newQty = parseInt(storagesNew[index].storage[goodIndex].qty) + parseInt(qty);
                    storagesNew[index].storage[goodIndex].qty = newQty;
                } else {
                    storagesNew[index].storage.push({
                        id: goodId,
                        qty: qty,
                    });
                }
            }

            setPlayerStorages(storagesNew);
            setMoney(money - totalPrice);
        }
    } 

    function getQty(id, storages) {
        const index = storages.findIndex((storage) => {
            return storage.cityId === currentCity;
        });

        if (index > -1) {
            const goodIndex = storages[index].storage.findIndex((good) => {
                return good.id === id;
            });

            if (goodIndex > -1) {
                const qty = parseInt(storages[index].storage[goodIndex].qty);
                return qty;
            }
        }
    }

    function moveGoods(goodId) {
        if (selectedGood === goodId) {
            const newResearchStorages = researchStorages;
            const qty = getQty(selectedGood, playerStorages);

            const index = newResearchStorages.findIndex((storage) => {
                return storage.cityId === currentCity;
            });

            if (index > -1) {
                const goodIndex = newResearchStorages[index].storage.findIndex((good) => {
                    return good.id === goodId;
                });
                
                if (goodIndex > -1) {
                    const newQty = parseInt(newResearchStorages[index].storage[goodIndex].qty) + parseInt(qty);
                    newResearchStorages[index].storage[goodIndex].qty = newQty;
                    removeProduct(selectedGood, playerStorages);
                    setResearchStorages(newResearchStorages);
                    setSelectedGood(0);
                }
            }

        } else {
            if (selectedGood && !goodId) {
                const newResearchStorages = researchStorages;
                const qty = getQty(selectedGood, playerStorages);
                
                const index = newResearchStorages.findIndex((storage) => {
                    return storage.cityId === currentCity;
                });

                if (index > -1) {
                    const goodIndex = newResearchStorages[index].storage.findIndex((good) => {
                        return good.id === selectedGood;
                    });

                    if (goodIndex < 0) {
                        newResearchStorages[index].storage.push({
                            id: selectedGood,
                            qty: qty,
                        })
                        removeProduct(selectedGood, playerStorages);    
                        setResearchStorages(newResearchStorages);
                        setSelectedGood(0);
                    }
                }
            }
        }
    }

    function moveGoodsBack(goodId) {
        if (selectedResGood === goodId) {
            const storagesNew = playerStorages;
            const qty = getQty(selectedResGood, researchStorages);

            const index = storagesNew.findIndex((storage) => {
                return storage.cityId === currentCity;
            });

            if (index > -1) {
                const goodIndex = storagesNew[index].storage.findIndex((good) => {
                    return good.id === goodId;
                });

                if (goodIndex > -1) {
                    const newQty = parseInt(storagesNew[index].storage[goodIndex].qty) + parseInt(qty);
                    storagesNew[index].storage[goodIndex].qty = newQty;
                    removeProduct(selectedResGood, researchStorages);
                    setPlayerStorages(storagesNew);
                    setSelectedResGood(0);
                }
            }
        } else {
            if (selectedResGood && !goodId) {
                const storagesNew = playerStorages;
                const qty = getQty(selectedResGood, researchStorages);

                const index = storagesNew.findIndex((storage) => {
                    return storage.cityId === currentCity;
                });

                if (index > -1) {
                    const goodIndex = storagesNew[index].storage.findIndex((good) => {
                        return good.id === selectedResGood;
                    });

                    if (goodIndex < 0) {
                        storagesNew[index].storage.push({
                            id: selectedResGood,
                            qty: qty,
                        })
                        removeProduct(selectedResGood, researchStorages);
                        setPlayerStorages(storagesNew);
                        setSelectedResGood(0);
                    }
                }
            }
        }
    }

    function moveToMix(goodId) {
        if (selectedGood === goodId) {
            const newMixStorages = mixStorages;
            const qty = getQty(selectedGood, playerStorages);

            const index = newMixStorages.findIndex((storage) => {
                return storage.cityId === currentCity;
            });

            if (index > -1) {
                const goodIndex = newMixStorages[index].storage.findIndex((good) => {
                    return good.id === goodId;
                });
                
                if (goodIndex > -1) {
                    const newQty = parseInt(newMixStorages[index].storage[goodIndex].qty) + parseInt(qty);
                    newMixStorages[index].storage[goodIndex].qty = newQty;
                    removeProduct(selectedGood, playerStorages);
                    setMixStorages(newMixStorages);
                    setSelectedGood(0);
                }
            }

        } else {
            if (selectedGood && !goodId) {
                const newMixStorages = mixStorages;
                const qty = getQty(selectedGood, playerStorages);
                
                const index = newMixStorages.findIndex((storage) => {
                    return storage.cityId === currentCity;
                });

                if (index > -1) {
                    const goodIndex = newMixStorages[index].storage.findIndex((good) => {
                        return good.id === selectedGood;
                    });

                    if (goodIndex < 0) {
                        newMixStorages[index].storage.push({
                            id: selectedGood,
                            qty: qty,
                        })
                        removeProduct(selectedGood, playerStorages);    
                        setMixStorages(newMixStorages);
                        setSelectedGood(0);
                    }
                }
            }
        }
    }

    function moveMixBack(goodId) {
        if (selectedMixGood === goodId) {
            const storagesNew = playerStorages;
            const qty = getQty(selectedMixGood, mixStorages);

            const index = storagesNew.findIndex((storage) => {
                return storage.cityId === currentCity;
            });

            if (index > -1) {
                const goodIndex = storagesNew[index].storage.findIndex((good) => {
                    return good.id === goodId;
                });

                if (goodIndex > -1) {
                    const newQty = parseInt(storagesNew[index].storage[goodIndex].qty) + parseInt(qty);
                    storagesNew[index].storage[goodIndex].qty = newQty;
                    removeProduct(selectedMixGood, mixStorages);
                    setPlayerStorages(storagesNew);
                    setSelectedMixGood(0);
                }
            }
        } else {
            if (selectedMixGood && !goodId) {
                const storagesNew = playerStorages;
                const qty = getQty(selectedMixGood, mixStorages);

                const index = storagesNew.findIndex((storage) => {
                    return storage.cityId === currentCity;
                });

                if (index > -1) {
                    const goodIndex = storagesNew[index].storage.findIndex((good) => {
                        return good.id === selectedResGood;
                    });

                    if (goodIndex < 0) {
                        storagesNew[index].storage.push({
                            id: selectedMixGood,
                            qty: qty,
                        })
                        removeProduct(selectedMixGood, mixStorages);
                        setPlayerStorages(storagesNew);
                        setSelectedMixGood(0);    
                    }
                }
            }
        }
    }

    function getMixingResult() {
        const mixStore = getCurrentStorage(mixStorages);

        if (!mixStore[0] || !mixStore[1]) return;

        let addId;

        if (mixStore[0].id === 2 && mixStore[1].id === 3 || mixStore[0].id === 3 && mixStore[1].id === 2) addId = 4;
        if (mixStore[0].id === 29 && mixStore[1].id === 10 || mixStore[0].id === 10 && mixStore[1].id === 29) addId = 5;
        if (mixStore[0].id === 10 && mixStore[1].id === 20 || mixStore[0].id === 20 && mixStore[1].id === 10) addId = 6;
        if (mixStore[0].id === 20 && mixStore[1].id === 21 || mixStore[0].id === 21 && mixStore[1].id === 20) addId = 7;
        if (mixStore[0].id === 20 && mixStore[1].id === 22 || mixStore[0].id === 22 && mixStore[1].id === 20) addId = 8;
        if (mixStore[0].id === 11 && mixStore[1].id === 31 || mixStore[0].id === 31 && mixStore[1].id === 11) addId = 9;
        if (mixStore[0].id === 10 && mixStore[1].id === 47 || mixStore[0].id === 47 && mixStore[1].id === 10) addId = 11;
        if (mixStore[0].id === 46 && mixStore[1].id === 20 || mixStore[0].id === 20 && mixStore[1].id === 46) addId = 12;
        if (mixStore[0].id === 28 && mixStore[1].id === 18 || mixStore[0].id === 28 && mixStore[1].id === 18) addId = 13;
        if (mixStore[0].id === 15 && mixStore[1].id === 31 || mixStore[0].id === 31 && mixStore[1].id === 15) addId = 14;
        if (mixStore[0].id === 1 && mixStore[1].id === 25 || mixStore[0].id === 25 && mixStore[1].id === 1) addId = 15;
        if (mixStore[0].id === 14 && mixStore[1].id === 25 || mixStore[0].id === 25 && mixStore[1].id === 14) addId = 16;
        if (mixStore[0].id === 25 && mixStore[1].id === 26 || mixStore[0].id === 26 && mixStore[1].id === 25) addId = 17;
        if (mixStore[0].id === 18 && mixStore[1].id === 23 || mixStore[0].id === 23 && mixStore[1].id === 18) addId = 19;
        if (mixStore[0].id === 21 && mixStore[1].id === 22 || mixStore[0].id === 22 && mixStore[1].id === 21) addId = 20;
        if (mixStore[0].id === 22 && mixStore[1].id === 23 || mixStore[0].id === 23 && mixStore[1].id === 22) addId = 21;
        if (mixStore[0].id === 10 && mixStore[1].id === 23 || mixStore[0].id === 23 && mixStore[1].id === 10) addId = 22;
        if (mixStore[0].id === 23 && mixStore[1].id === 10 || mixStore[0].id === 10 && mixStore[1].id === 22) addId = 24;
        if (mixStore[0].id === 24 && mixStore[1].id === 23 || mixStore[0].id === 23 && mixStore[1].id === 24) addId = 25;
        if (mixStore[0].id === 27 && mixStore[1].id === 24 || mixStore[0].id === 24 && mixStore[1].id === 27) addId = 26;
        if (mixStore[0].id === 1 && mixStore[1].id === 20 || mixStore[0].id === 20 && mixStore[1].id === 1) addId = 27;
        if (mixStore[0].id === 22 && mixStore[1].id === 27 || mixStore[0].id === 27 && mixStore[1].id === 22) addId = 28;
        if (mixStore[0].id === 28 && mixStore[1].id === 27 || mixStore[0].id === 27 && mixStore[1].id === 28) addId = 29;
        if (mixStore[0].id === 31 && mixStore[1].id === 22 || mixStore[0].id === 22 && mixStore[1].id === 31) addId = 30;
        if (mixStore[0].id === 20 && mixStore[1].id === 32 || mixStore[0].id === 32 && mixStore[1].id === 20) addId = 31;
        if (mixStore[0].id === 22 && mixStore[1].id === 19 || mixStore[0].id === 19 && mixStore[1].id === 22) addId = 32;
        if (mixStore[0].id === 18 && mixStore[1].id === 27 || mixStore[0].id === 27 && mixStore[1].id === 18) addId = 33;
        if (mixStore[0].id === 2 && mixStore[1].id === 22 || mixStore[0].id === 2 && mixStore[1].id === 22) addId = 34;
        if (mixStore[0].id === 1 && mixStore[1].id === 37 || mixStore[0].id === 37 && mixStore[1].id === 1) addId = 35;
        if (mixStore[0].id === 37 && mixStore[1].id === 44 || mixStore[0].id === 44 && mixStore[1].id === 37) addId = 36;
        if (mixStore[0].id === 38 && mixStore[1].id === 36 || mixStore[0].id === 36 && mixStore[1].id === 38) addId = 37;
        if (mixStore[0].id === 36 && mixStore[1].id === 37 || mixStore[0].id === 37 && mixStore[1].id === 36) addId = 38;
        if (mixStore[0].id === 37 && mixStore[1].id === 32 || mixStore[0].id === 32 && mixStore[1].id === 37) addId = 39;
        if (mixStore[0].id === 23 && mixStore[1].id === 21 || mixStore[0].id === 21 && mixStore[1].id === 23) addId = 40;
        if (mixStore[0].id === 21 && mixStore[1].id === 7 || mixStore[0].id === 7 && mixStore[1].id === 21) addId = 41;
        if (mixStore[0].id === 22 && mixStore[1].id === 25 || mixStore[0].id === 25 && mixStore[1].id === 22) addId = 42;
        if (mixStore[0].id === 10 && mixStore[1].id === 37 || mixStore[0].id === 37 && mixStore[1].id === 10) addId = 43;
        if (mixStore[0].id === 39 && mixStore[1].id === 10 || mixStore[0].id === 10 && mixStore[1].id === 39) addId = 44;
        if (mixStore[0].id === 22 && mixStore[1].id === 24 || mixStore[0].id === 24 && mixStore[1].id === 22) addId = 45;
        if (mixStore[0].id === 22 && mixStore[1].id === 40 || mixStore[0].id === 40 && mixStore[1].id === 22) addId = 46;
        if (mixStore[0].id === 23 && mixStore[1].id === 28 || mixStore[0].id === 28 && mixStore[1].id === 23) addId = 47;
        if (mixStore[0].id === 24 && mixStore[1].id === 28 || mixStore[0].id === 28 && mixStore[1].id === 24) addId = 48;
        if (mixStore[0].id === 10 && mixStore[1].id === 24 || mixStore[0].id === 24 && mixStore[1].id === 10) addId = 49;
        if (mixStore[0].id === 37 && mixStore[1].id === 38 || mixStore[0].id === 38 && mixStore[1].id === 37) addId = 50;
        if (mixStore[0].id === 30 && mixStore[1].id === 36 || mixStore[0].id === 36 && mixStore[1].id === 30) addId = 51;
        if (mixStore[0].id === 31 && mixStore[1].id === 50 || mixStore[0].id === 50 && mixStore[1].id === 31) addId = 52;
        if (mixStore[0].id === 22 && mixStore[1].id === 45 || mixStore[0].id === 45 && mixStore[1].id === 22) addId = 53;

        const storagesNew = playerStorages;
        const addGood = goods.find((obj) => {
            return obj.id === addId;
        })

        const index = storagesNew.findIndex((storage) => {
            return storage.cityId === currentCity;
        });

            if (index > -1) {
                const goodIndex = storagesNew[index].storage.findIndex((good) => {
                        return good.id === 3;
                    });

                if (goodIndex > -1) {
                    const newQty = parseInt(storagesNew[index].storage[goodIndex].qty) + parseInt(20);
                    storagesNew[index].storage[goodIndex].qty = newQty;
        
                } else {
                    storagesNew[index].storage.push({
                        id: addGood.id,
                        qty: 20,
                    });         
                }

                const newMixStorages = [...mixStorages];
                newMixStorages[index].storage.splice(0, 2);
                setMixStorages(newMixStorages);
                setPlayerStorages(storagesNew);
            
        }
    }

    function getResearchRes() {
        const researchStore = getCurrentStorage(researchStorages);

        for (let i = 0; i < 4; i++) {
            if (!researchStore[i]) return;
        }

        const requiredNums1 = new Set([1, 10, 18, 23]);
        const requiredNums2 = new Set([11, 15, 30, 45]);
        const requiredNums3 = new Set([47, 29, 25, 20]);
        const requiredNums4 = new Set([9, 5, 51, 52]);
        const requiredNums5 = new Set([54, 55, 56, 57]);

        const setArr = [
            requiredNums1,
            requiredNums2,
            requiredNums3,
            requiredNums4,
            requiredNums5
        ];

        const idArr = researchStore.map(obj => obj.id);

        for (let i = 0; i < 5; i++) {
            const set = new Set(idArr);
            const flag = (setArr[i].size === set.size && [...setArr[i]].every(num => set.has(num)));

            if (flag && i === 0) return 54;
            if (flag && i === 1) return 55;
            if (flag && i === 2) return 56;
            if (flag && i === 3) return 57;
            if (flag && i === 4) return 58;
        }
    }

    function moveResearchRes() {
        const id = getResearchRes();

        if (id) {
            const storagesNew = playerStorages;
            const addGood = goods.find((obj) => {
                return obj.id === id;
            })

            const index = storagesNew.findIndex((storage) => {
                return storage.cityId === currentCity;
            });

            if (index > -1) {
                const goodIndex = storagesNew[index].storage.findIndex((good) => {
                        return good.id === id;
                });

                if (goodIndex > -1) {
                    const newQty = parseInt(storagesNew[index].storage[goodIndex].qty) + parseInt(20);
                    storagesNew[index].storage[goodIndex].qty = newQty;
        
                } else {
                    storagesNew[index].storage.push({
                        id: addGood.id,
                        qty: 20,
                    });
                }

                const newResStorages = [...researchStorages];
                newResStorages[index].storage.splice(0, 4);
                setResearchStorages(newResStorages);
                setPlayerStorages(storagesNew);
            }
        }
    }

    function getTip() {
        if (money >= 100) {
            const index = hints.findIndex((tips) => {
                return tips.cityId === currentCity;
            })

            if (index > -1) {
                if (hints[index].tips.length === 1) {
                    const newtip = hints[index].tips[0];
                    if (newtip === tip) return;
                    else {
                        setTip(newtip);
                        setMoney(money - 100);     
                    }
                } else {
                    let tipIndex = Math.floor(Math.random() * hints[index].tips.length);
                    let newTip = hints[index].tips[tipIndex];

                    while (newTip === tip) {
                        tipIndex = Math.floor(Math.random() * hints[index].tips.length);
                        newTip = hints[index].tips[tipIndex];
                    }

                    setTip(newTip);
                    setMoney(money - 100);
                }
            }
        }
    }

    function acceptOrder(order) {
        setTransportOrders(orders => {
            const newOrders = [...orders];

            const index = newOrders.findIndex(o => {
                return o.id === order.id;
            });

            if (index > -1) {
                newOrders.splice(index, 1);
            }

            return newOrders;
        })

        //update product qty in target city
        const storagesNew = playerStorages;

        const index = storagesNew.findIndex((storage) => {
            return storage.cityId === order.targetCityId;
        });

        if (index > -1) {
            const goodIndex = storagesNew[index].storage.findIndex(
                (good) => {
                    return good.id === order.goodId;
                }
            );

            if (goodIndex > -1) {
                storagesNew[index].storage[goodIndex].qty += order.qty;
            } else {
                storagesNew[index].storage.push({
                    id: order.goodId,
                    qty: order.qty,
                });
            }
        }

        setPlayerStorages(storagesNew);
    }

    function getSelectedProductPrice() {
        const cityStorage = getCurrentStorage(cityStorages);

        const product = cityStorage.find(product => {
            return product.id === selectedGood;
        })

        if (product && product.priceStats) {
            return product.priceStats[product.priceStats.length - 1] 
        }

        return 0;
    }

    function openDeposit(amount) {
        if (amount > 0 && money >= amount) {
            setDeposits((oldDeposits) => {
                const newDeposits = [...oldDeposits];
    
                newDeposits.push({
                    days: 30,
                    amount
                });

                setMoney((oldMoney) => {
                    return parseInt(oldMoney - amount);
                })

                return newDeposits;
            })
        }
    }

    return (
        <div className="game" onClick={() => {setSelectedResGood(""); setSelectedMixGood("");}}>
            <BsInfoCircle
                size={30}
                onClick={() => {setModalShow(true); console.log("fmefnm");}}
                style={{float: "right", margin: 10, cursor: "pointer"}}
            />
            <TextModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <WinModal
                show={winModal}
                onHide={() => setWinModal(false)} 
            />
            <h1 className="game-name">Magnum opus</h1>
            <button className="btn" onClick={logout}>Закончить игру</button>

            {gameStatus === gameStatuses.win ? (
                <h2 className="game-status win">Вы справились!</h2>
            ) : ''}

            {gameStatus === gameStatuses.fail ? (
            <h2 className="game-status fail">Вы не справились!</h2>
            ) : ''} 
 

            <Cities
                currentCity={currentCity}
                onChange={(city) => {
                    setCurrentCity(city);
                    setSelectedGood(0);
                }}
            />

            <div className="content">
                <div className="column">
                    <div className="city-storage">
                        <CityStorage
                            storage={getCurrentStorage(cityStorages)}
                            onBuy={(goodId, number, price) =>
                                buyGoods(goodId, number, price)
                            }
                            money={money}
                            goods={goods}
                        />
                    </div>
                </div>
                <div className="column sec">
                    <div className="storage">
                        <Storage
                            currentCity={currentCity}
                            storage={getCurrentStorage(playerStorages)}
                            goods={goods}
                            selectedGood={selectedGood}
                            selectedProductPrice={getSelectedProductPrice()}
                            onSelectGood={(goodId) => setSelectedGood(goodId)}
                            onSell={(id, qty, price) => sellGoods(id, qty, price)}
                            onTransport={(targetCityId) => createTransportOrder(targetCityId)}
                            onMove={(goodId) => moveGoodsBack(goodId)}
                            onSelectResGood={(goodId) => setSelectedResGood(goodId)}
                            onMoveFromMix={(goodId) => moveMixBack(goodId)}
                            onSelectMixGood={(goodId) => setSelectedMixGood(goodId)}
                        />
                    </div>
                    <div className="transporations">
                        <Transportations orders={transportOrders} goods={goods} onAcceptOrder={acceptOrder}/>
                    </div>
                    <div className="stats">
                        <Stats days={days} money={money} />
                    </div>
                    <div className="deposits">
                        <Bank deposits={deposits} onOpenDeposit={openDeposit} money={money}/>
                    </div>
                </div>
                
                <div className="column">
                    <div className="mixing">
                        <Mixing
                            research={getCurrentStorage(researchStorages)}
                            selectedResGood={selectedResGood}
                            onSelectResGood={(goodId) => setSelectedResGood(goodId)}
                            onMove={(goodId) => moveGoods(goodId)}
                            mix={getCurrentStorage(mixStorages)}
                            selectedMixGood={selectedMixGood}
                            onSelectMixGood={(goodId) => setSelectedMixGood(goodId)}
                            onSelectGood={(goodId) => setSelectedGood(goodId)}
                            onMoveToMix={(goodId) => moveToMix(goodId)}
                            mixResult={() => getMixingResult()}
                            goods={goods}
                            researchResult={() => getResearchRes()}
                            moveResearchRes={() => moveResearchRes()}
                            getTip={() => getTip()}
                            tip={tip}
                            money={money}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Game;