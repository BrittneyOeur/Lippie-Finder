/**
 * @fileoverview 
 * Displays the search bar and filter button on the webpage.
 * 
 * @author Brittney Oeur
 * @date January 3, 2025
 * 
 * @description
 * A React component that allows users to search for lip products by brand name 
 * and use the filter button to select specific products they want to view. 
 * The filter button opens a modal pop-up for additional filtering options.
 * 
 * @dependencies
 * - React (for building the component)
 * - react-router-dom (for handling navigation and URL parameters)
 * - Modal (for creating the filter pop-up)
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
        padding: "7px",
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
        onSearch(searchInput);
    };

    return (
        <div className="topContainer">
            <h1
                onClick={handleLogoClick}
                style={{
                    color: "white",
                    cursor: "pointer",
                    minWidth: "10vw",
                    maxWidth: "15vw",
                    margin: "auto",
                    marginTop: "50px",
                    marginBottom: "20px"
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
                    style={{ 
                        marginRight: "10px", 
                        padding: "9px", 
                        width: "220px" 
                    }}
                />
                <Button
                    text="Search"
                    color="white"
                    width="100px"
                    fontSize={12}
                    onClick={handleSearchClick}
                />
            </div>

            <div
                className="filterSort"
                style={{ 
                    display: "flex",
                    padding: "15px"
                }}
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
