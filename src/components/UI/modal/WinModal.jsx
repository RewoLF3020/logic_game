import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

export default function WinModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton style={{ background: "#251002" }}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Magnum opus
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ background: "#251002" }}>
                <p>
                    Подобным образом философы хотели бы, чтобы четырехугольник
                    превратился в треугольник, то есть в тело, Дух и Душу,
                    которые три действительно проявляются в трех предыдущих
                    цветах перед покраснением, например, тело или земля в
                    черноте Сатурна, Дух в лунной белизне, как вода, Душа или
                    воздух в солнечном цитрусовом цвете: тогда треугольник будет
                    совершенным, но это также должно быть изменено на круг, то
                    есть в неизменный красный цвет: посредством этой операции
                    женщина превращается в мужчину и становится единым с ним.
                    он, и сенарий, первый номер совершенного, завершенный на
                    раз, два, снова вернувшись к единице, в которой вечный покой
                    и умиротворение.— Майкл Майер, "Аталанта Фугьенс", Эмблема
                    XXI(1617)
                </p>
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
