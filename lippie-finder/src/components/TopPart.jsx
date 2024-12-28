import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Filter from "./Filter"
import ProductGrid from "./ProductGrid";

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

function TopPart({ filters, onFilterChange }) {
    const [showModal, setShowModal] = useState(false);
    const [searchInput, setSearchInput] = useState("");

    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/");
    };

    const handleFilterChange = (filterType, value) => {
        setFilters((prev) => ({...prev, [filterType]: value}));
    };

    // Handles search click
    const handleSearchClick = (userInput) => {
        <ProductGrid
            search={userInput}
        />
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
                    placeholder="Search lip product..."
                    style={{ marginRight: "10px", padding: "6px", width: "220px" }}
                />
                <Button 
                    text="Search" 
                    color="white" 
                    width="70px" 
                    fontSize={12}
                    onClick={() => handleSearchClick(userText)} 
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

                <Button text="Sort" color="white" width="100px" fontSize={12} />
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
                        left: "auto"
                    },
                }}
            >
                <Filter filters={filters} onFilterChange={(newFilters) => {
                    setShowModal(false); // Close modal after confirming
                    onFilterChange(newFilters);
                }} />

                
            </Modal>
        </div>
    );
}

export default TopPart;
