import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Modal.css";

const Modal = ({ onClose }) => {
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/") {
            setShowModal(true);
        }
    }, []);

    if (!showModal) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="close-btn" onClick={() => {
                    setShowModal(false);
                    onClose();
                }}>&times;</span>
                <h2>Welcome to <span className="highlight">EvaluAIte</span></h2>
                <h3>HackBlitz - <span className="highlight">IMMERSE'25 HACKTHON</span></h3>
                <p><b>TEAM NAME</b><span className="highlight"><b> :- INFINITY</b></span></p>
                <p><b>Team Member Name :-</b></p>
                <p>Vishal Kumar - CSE</p>
                <p>Shashwat Srivastava - CSE</p>
                <p>Tarkeshvar Mani Yadav - CSE</p>
                <button className="cta" onClick={() => {
                    setShowModal(false);
                    onClose();
                }}>OK</button>
            </div>
        </div>
    );
};

export default Modal;
