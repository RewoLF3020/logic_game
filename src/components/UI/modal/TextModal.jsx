import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TextModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton style={{ background: "#251002" }}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Информация об игре
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ background: "#251002" }}>
                <h4>Magnum opus</h4>
                <p>
                    Цель игры: открыть секрет Великого делания, состоящий из
                    четырех главных составляющих, представленных в игре
                    городами. Каждый город наполнен философскими понятиями,
                    которые при смешивании дают игроку новые понятия. Однако для
                    прохождения игры из угаданных понятий игроку потребуется
                    собрать название каждого города за варочной стойкой. Они, в
                    свою очередь, состоят из четырех понятий, собрать которые он
                    сможет только из тех единиц, что относятся к его городу. В
                    скобках каждого понятия указана буква его города.
                </p>
                P.S. При смешивании нового понятия тратятся все единицы двух
                смешиваемых ингридиентов. В каждом городе можно купить подсказки
                для компонентов именно того города, в котором вы находитесь. Не
                выходите из игрового окна, иначе вам придется начать сначала!
                Желаем удачи!
            </Modal.Body>
            <Modal.Footer style={{ background: "#251002" }}>
                <Button
                    style={{ background: "#4a2511", border: "none" }}
                    onClick={props.onHide}
                >
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
