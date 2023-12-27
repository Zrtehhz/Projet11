import React, { useState } from 'react';
import './Dropdown.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from 'react';

function Dropdown({ detail }) {
    const [isOpen, setIsOpen] = useState(false);

    // États locaux pour les champs de texte éditables
    const [category, setCategory] = useState(detail.category);
    const [transactionType, setTransactionType] = useState(detail.transactionType);
    const [note, setNote] = useState(detail.note);

    // États locaux pour suivre si les champs de texte sont en mode édition
    const [isCategoryEditing, setIsCategoryEditing] = useState(false);
    const [isTransactionTypeEditing, setIsTransactionTypeEditing] = useState(false);
    const [isNoteEditing, setIsNoteEditing] = useState(false);

    // Gestionnaire d'événements pour mettre les champs de texte en mode édition
    const handleCategoryEdit = () => {
        setIsCategoryEditing(true);
    };

    const handleNoteEdit = () => {
        setIsNoteEditing(true);
    };

    // Gestionnaire d'événements pour sauvegarder les modifications en localStorage
    const handleSaveChanges = () => {
        // Sauvegarde des modifications dans localStorage
        localStorage.setItem("category", category);
        localStorage.setItem("transactionType", transactionType);
        localStorage.setItem("note", note);

        // Désactive le mode édition
        setIsCategoryEditing(false);
        setIsTransactionTypeEditing(false);
        setIsNoteEditing(false);
    };

    // Gestionnaire d'événements pour valider en appuyant sur "Entrée"
    const handleKeyPress = (e, field) => {
        if (e.key === "Enter") {
            // Valide les modifications
            handleSaveChanges();
        }
    };

    // Effet pour récupérer les valeurs depuis localStorage lors du chargement initial
    useEffect(() => {
        setCategory(localStorage.getItem("category") || detail.category);
        setTransactionType(localStorage.getItem("transactionType") || detail.transactionType);
        setNote(localStorage.getItem("note") || detail.note);
    }, [detail]);

    return (
        <div className="dropdown-container">
            <div className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
                <p className="dateT">{detail.date}</p>
                <p className="descT">{detail.description}</p>
                <p className="amountT">{detail.amount}</p>
                <p className="balanceT">{detail.balance}</p>
                <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} className={`chevron-icon ${isOpen ? "rotate" : ""}`} />
            </div>
            {isOpen && (
                <div className="dropdown-content">
                    <p>
                        Transaction type Electronic
                    </p>

                    <p>
                        Category{" "}
                        {isCategoryEditing ? (
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                onKeyPress={(e) => handleKeyPress(e, "category")}
                            />
                        ) : (
                            <>
                                {category} <FontAwesomeIcon icon={faPencilAlt} onClick={handleCategoryEdit} />
                            </>
                        )}
                    </p>
                    <p>
                        Note{" "}
                        {isNoteEditing ? (
                            <input
                                type="text"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                onKeyPress={(e) => handleKeyPress(e, "note")}
                            />
                        ) : (
                            <>
                                {note} <FontAwesomeIcon icon={faPencilAlt} onClick={handleNoteEdit} />
                            </>
                        )}
                    </p>
                </div>
            )}
        </div>
    );
}

export default Dropdown;
