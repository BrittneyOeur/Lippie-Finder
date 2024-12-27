import '/src/filter.css';
import React, { useEffect, useState } from "react";

function FilterList({ text, onClick, isSelected }) {
    const filterStyle = {
        listStyle: "none",
        padding: "10px",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        backgroundColor: isSelected ? "pink" : "white",
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

function Filter({ filters, onFilterChange }) {
    const [currentPage, setCurrentPage] = useState("main");

    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    const handleBack = () => {
        setCurrentPage("main");
    };

    const handleSelection = (filterType, option) => {

        switch (filterType) {
            case "brand":
                setSelectedBrands((prev) =>
                    prev.includes(option)
                        ? prev.filter((item) => item !== option)
                        : [...prev, option]
                );
                break;
            case "category":
                setSelectedCategories((prev) =>
                    prev.includes(option)
                        ? prev.filter((item) => item !== option)
                        : [...prev, option]
                );
                break;
            case "tag":
                setSelectedTags((prev) =>
                    prev.includes(option)
                        ? prev.filter((item) => item !== option)
                        : [...prev, option]
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
        <div className="filter-container">
            {currentPage === "main" && (
                <div>
                    <h1>Filter Options</h1>
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

                    <div>
                        <h2>Selected Options:</h2>
                        <div>
                            <h3>Brands:</h3>
                            <p>{selectedBrands.join(", ") || "None"}</p>
                        </div>
                        <div>
                            <h3>Categories:</h3>
                            <p>{selectedCategories.join(", ") || "None"}</p>
                        </div>
                        <div>
                            <h3>Ingredients:</h3>
                            <p>{selectedTags.join(", ") || "None"}</p>
                        </div>
                    </div>

                    <div>
                        <button onClick={() => onFilterChange({ brand: selectedBrands, category: selectedCategories, tag: selectedTags })}>
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

            {currentPage === "brand" && (
                <div>
                    <p onClick={handleBack} style={{ cursor: "pointer" }}>
                        &lt; Back
                    </p>
                    <h1>Choose Brand</h1>
                    <ul style={{ padding: 0 }}>
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

            {currentPage === "category" && (
                <div>
                    <p onClick={handleBack} style={{ cursor: "pointer" }}>
                        &lt; Back
                    </p>
                    <h1>Choose Category</h1>
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

            {currentPage === "ingredient" && (
                <div>
                    <p onClick={handleBack} style={{ cursor: "pointer" }}>
                        &lt; Back
                    </p>
                    <h1>Choose Ingredient</h1>
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
