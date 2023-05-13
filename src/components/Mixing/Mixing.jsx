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
                    <p>    
                        1. Философия
                        <br/>2. Добро
                        <br/>3. Зло
                        <br/>4. Инь Янь - добро+зло
                        <br/>5. Миф - теория+бытие
                        <br/>6. Онтология - учение+бытие(можно сделать появление Платона или Аристотеля в позе мыслителя в рое фраз «Быть или не быть? Что существует? Что есть сущее? И т.д.)
                        <br/>7. Гносеология(белый)- учение+познание
                        <br/>8. Аксиология - учение+ценности
                        <br/>9. Карма - религия+сансара
                        <br/>10. Бытие 
                        <br/>11.  Сансара(белый) - бытие+гипотеза
                        <br/>12. Нирвана - учение+рефлексия
                        <br/>13. Утопизм - идея+небытие
                        <br/>14. Дао(белый) - конфуцианство+религия
                        <br/>15. Конфуцианство(белый) - государство+философия
                        <br/>16. Даосизм - Дао+государство
                        <br/>17. Легизм - закон+государство
                        <br/>18. Небытие
                        <br/>19. Незнание - небытие+разум
                        <br/>20. Учение - человек+познание
                        <br/>21. Познание - разум+бытие
                        <br/>22. Человек - бытие+ум/разум
                        <br/>23. Ум(разум)
                        <br/>24. Общество - человек+человек
                        <br/>25. Государство - общество+разум
                        <br/>26. Закон(белый) - логос+общество
                        <br/>27. Логос - философия + учение/разум
                        <br/>28. Идея - человек+логос
                        <br/>29. Теория - идея+логос
                        <br/>30. Бог(белый) - человек+религия
                        <br/>31. Религия - учение+сверхъестественное
                        <br/>32. Сверхъестественное - человек+незнание
                        <br/>33. Эсхатологизм - небытие+логос
                        <br/>34. Гуманизм - человек+ добро
                        <br/>35. Диалектика - философия+движение
                        <br/>36. Сущность - материя+модус
                        <br/>37. Материя - форма+сущность
                        <br/>38. Форма - сущность+движение
                        <br/>39. Субстанция - материя+сверхъестественное
                        <br/>40. Психоанализ(белый) - познание+разум
                        <br/>41. Феноменология-гносеология+познание
                        <br/>42. Патриотизм - государство+учение
                        <br/>43. Пространство - форма+материя
                        <br/>44. Модус(белый) - субстанция+бытие
                        <br/>45. Антропогенез(белый) - человек+общество
                        <br/>46. Рефлексия(белый) - человек+психоанализ
                        <br/>47. Гипотеза - ум/разум+теория
                        <br/>48. Идеология - идея+общество
                        <br/>49. Социодинамика - общество+бытие
                        <br/>50. Предмет - материя+форма
                        <br/>51. Пантеизм - Бог+сущность
                        <br/>52. Ритуал - религия+предмет
                        <br/>53. Сверхчеловек - человек+антропогенез
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