/**
 * @fileoverview Filters lip products by brand, category, and ingredients.
 * 
 * @author Brittney Oeur
 * @date January 3, 2025
 * 
 * @description
 * This React component Allows users to filter lip products based on specific 
 * criteria such as brand, category, and ingredients.
 * 
 * @dependencies
 * - React (for the building component)
 * - /src/filter.css (for styling)
 */

import '/src/filter.css';
import React, { useEffect, useState } from "react";

function FilterList({ text, onClick, isSelected }) {
    const filterStyle = {
        listStyle: "none",
        padding: "10px",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        backgroundColor: isSelected ? "#b17f85" : "white",
        color: isSelected ? "white" : "black",
        cursor: "pointer",
    };

    return (
        <li style={filterStyle} onClick={onClick}>
            <span>{text}</span>
        </li>
    );
}

async function FetchDataOptions() {
    try {
        const response = await fetch("https://makeup-api.herokuapp.com/api/v1/products.json?product_type=lipstick");
        if (!response.ok) {
            throw new Error("ERROR: Server error");
        }

        const data = await response.json();

        // Extract unique tags
        const brands = [];
        const categories = [];
        const tags = [];

        const brandSet = new Set();
        const categorySet = new Set();
        const tagSet = new Set();

        data.forEach((item) => {
            if (item.brand && !brandSet.has(item.brand)) {
                brands.push(item.brand);
                brandSet.add(item.brand);
            }
            if (item.category && !categorySet.has(item.category)) {
                categories.push(item.category);
                categorySet.add(item.category);
            }
            if (item.tag_list && Array.isArray(item.tag_list)) {
                item.tag_list.forEach((tag) => {
                    if (!tagSet.has(tag)) {
                        tags.push(tag);
                        tagSet.add(tag);
                    }
                });
            }
        });

        return { brands, categories, tags };
    } catch (error) {
        throw error;
    }
}

function Filter({ onFilterChange }) {
    const [currentPage, setCurrentPage] = useState("main");

    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    // Goes back to the main page
    const handleBack = () => {
        setCurrentPage("main");
    };

    // Includes all the possible options for each filter types 
    const handleSelection = (filterType, option) => {
        switch (filterType) {
            case "brand":
                setSelectedBrands((prevSelected) => 
                    prevSelected.includes(option) 
                    ? []  // Deselect if already selected
                    : [option]  // Select the new option
                );
                break;
            case "category":
                setSelectedCategories((prevSelected) => 
                    prevSelected.includes(option) 
                    ? []  // Deselect if already selected
                    : [option]  // Select the new option
                );
                break;
            case "tag":
                setSelectedTags((prevSelected) => 
                    prevSelected.includes(option) 
                    ? []  // Deselect if already selected
                    : [option]  // Select the new option
                );
                break;
            default:
                break;
        }
    };    

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const { brands, categories, tags } = await FetchDataOptions();
                setBrands(brands);
                setCategories(categories);
                setTags(tags);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading options...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="filter-container"
            style={{ color: "black" }}
        >
            {currentPage === "main" && (
                <div>
                    <h1>Filter Options</h1>
                    <sub style={{ color: "grey" }}>Can only select one option per filter</sub>
                    <div className="filter-options">
                        <div className="specific-filter">
                            <h2>BRAND</h2>
                            <h2 className="option-arrow" onClick={() => setCurrentPage("brand")}>
                                &gt;
                            </h2>
                        </div>

                        <div className="specific-filter">
                            <h2>CATEGORY</h2>
                            <h2 className="option-arrow" onClick={() => setCurrentPage("category")}>
                                &gt;
                            </h2>
                        </div>

                        <div className="specific-filter">
                            <h2>INGREDIENTS</h2>
                            <h2 className="option-arrow" onClick={() => setCurrentPage("ingredient")}>
                                &gt;
                            </h2>
                        </div>
                    </div>

                    {/* Button section */}
                    <div style={{ 
                        paddingTop: "200px", 
                        display: "flex", 
                        margin: "auto", 
                        justifyContent: "center", 
                        alignItems: "center", 
                        gap: "20px" }}
                    >
                        <button                  
                            onClick={() => onFilterChange({ brand: selectedBrands, category: selectedCategories, tag: selectedTags })}>
                            CONFIRM
                        </button>
                        <button onClick={() => {
                            setSelectedBrands([]);
                            setSelectedCategories([]);
                            setSelectedTags([]);
                            onFilterChange({ brand: [], category: [], tag: [] });
                        }}>
                            RESET
                        </button>
                    </div>

                </div>
            )}

            {/* Brand page */}
            {currentPage === "brand" && (
                <div>
                    <div style={{ display: "flex", fontWeight: "bolder" }}>
                        <p onClick={handleBack} style={{ cursor: "pointer", fontSize: "25px", color: "#d19da4" }}>
                            &lt;
                        </p>
                        <h1 style={{ margin: "auto", justifyContent: "center" }}>Choose Brand</h1>
                    </div>
                    
                    <ul style={{ padding: 0, margin: "auto" }}>
                        {brands.map((brand) => (
                            <FilterList
                                key={brand}
                                text={brand}
                                onClick={() => handleSelection("brand", brand)}
                                isSelected={selectedBrands.includes(brand)}
                            />
                        ))}
                    </ul>
                </div>
            )}

            {/* Category page */}
            {currentPage === "category" && (
                <div>
                    <div style={{ display: "flex" }}>
                        <p onClick={handleBack} style={{ cursor: "pointer", fontSize: "25px", color: "#d19da4"  }}>
                            &lt;
                        </p>
                        <h1 style={{ margin: "auto", justifyContent: "center" }}>Choose Category</h1>
                    </div>
                    
                    <ul style={{ padding: 0 }}>
                        {categories.map((category) => (
                            <FilterList
                                key={category}
                                text={category}
                                onClick={() => handleSelection("category", category)}
                                isSelected={selectedCategories.includes(category)}
                            />
                        ))}
                    </ul>
                </div>
            )}

            {/* Ingredient page */}
            {currentPage === "ingredient" && (
                <div>
                    <div style={{ display: "flex" }}>
                        <p onClick={handleBack} style={{ cursor: "pointer", fontSize: "25px", color: "#d19da4"  }}>
                            &lt;
                        </p>
                        <h1 style={{ margin: "auto", justifyContent: "center" }}>Choose Ingredient</h1>
                    </div>
                    
                    <ul style={{ padding: 0 }}>
                        {tags.map((tag) => (
                            <FilterList
                                key={tag}
                                text={tag}
                                onClick={() => handleSelection("tag", tag)}
                                isSelected={selectedTags.includes(tag)}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Filter;