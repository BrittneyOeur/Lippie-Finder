/**
 * @fileoverview 
 * Displays the search bar and filter button on the webpage.
 * 
 * @author Brittney Oeur
 * @date January 3, 2025
 * 
 * @description
 * This React component allows user to search an lip product (based on the brand's name),
 * as well as, utilize the filter button to select specific products
 * they want to see
 * 
 * @dependencies
 * - React (for the building component)
 * - react-router-dom (for accessing URL parameters)
 * - Modal (for creating filter pop-up)
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Filter from "./Filter";

// Functional Component for reusable Button
function Button({ text, color, width, fontSize, onClick }) {
    const buttonStyle = {
        color: color,
        fontSize: fontSize + "px",
        width: width,
        padding: "10px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    };

    return (
        <button style={buttonStyle} onClick={onClick}>
            {text}
        </button>
    );
}

// Set app root for accessibility
Modal.setAppElement("#root");

function TopPart({ onFilterChange, onSearch, onResetProducts }) {
    const [showModal, setShowModal] = useState(false);
    const [searchInput, setSearchInput] = useState("");

    const navigate = useNavigate();

    const handleLogoClick = () => {
        setSearchInput("");
        onResetProducts();
        navigate("/");
    };

    const handleSearchClick = () => {
        onSearch(searchInput); // Pass the search input up to the parent
    };

    return (
        <div className="topContainer">
            <h1
                onClick={handleLogoClick}
                style={{
                    cursor: "pointer",
                    width: "17vw",
                    margin: "auto",
                    marginTop: "50px",
                    marginBottom: "20px",
                }}
            >
                Lippie Finder
            </h1>

            <div className="container">
                <input
                    className="searchBar"
                    type="text"
                    name="search"
                    placeholder="Search lip brand..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    style={{ marginRight: "10px", padding: "9px", width: "220px" }}
                />
                <Button
                    text="Search"
                    color="white"
                    width="70px"
                    fontSize={12}
                    onClick={handleSearchClick}
                />
            </div>

            <div
                className="filterSort"
                style={{ display: "flex", padding: "15px", gap: "15px" }}
            >
                <Button
                    text="Filter"
                    color="white"
                    width="100px"
                    fontSize={12}
                    onClick={() => setShowModal(true)}
                />
            </div>

            {/* Modal */}
            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                    },
                    content: {
                        width: "25%",
                        top: "0%",
                        bottom: "0%",
                        textAlign: "center",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        right: "0%",
                        left: "auto",
                    },
                }}
            >
                <Filter
                    onFilterChange={(newFilters) => {
                        setShowModal(false); // Close modal after confirming
                        onFilterChange(newFilters);
                    }}
                />
            </Modal>
        </div>
    );
}

export default TopPart;
