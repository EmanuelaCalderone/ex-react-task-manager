import React from "react";
import ReactDOM from "react-dom";

import "./Modal.css";

const Modal = ({ title, content, show, onClose, onConfirm, confirmText = "Conferma" }) => {
    if (!show) return null; //non renderizzo niente

    return ReactDOM.createPortal(
        <>
            <div className="modal-overlay">
                <div className="modal-container">
                    <h3>{title}</h3>
                    <div className="modal-content">{content}</div> {/* contenuto modale */}
                    <div className="modal-buttons"> {/* pulsanti */}
                        <button onClick={onClose}>Annulla</button>
                        <button onClick={onConfirm}>{confirmText}</button> {/* conferma eliminazione */}
                    </div>
                </div>
            </div>
        </>,
        document.body
    )

}

export default Modal;