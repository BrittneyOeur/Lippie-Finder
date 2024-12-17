import '/src/filter.css'
import React, { useEffect, useState } from "react";

function FilterList({ text, onClick }) {
    const filterStyle = {
        cursor: "pointer",
        listStyle: "none",
        width: 0,
    };

    return (
        <li style={filterStyle} onClick={onClick}>
            {text}
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
            // Extract brands
            if (item.brand && !brandSet.has(item.brand)) {
                brands.push(item.brand);
                brandSet.add(item.brand);
            }
            // Extract categories
            if (item.category && !categorySet.has(item.category)) {
                categories.push(item.category);
                categorySet.add(item.category);
            }
            // Extract product tags
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

    const handleBack = () => {
        setCurrentPage("main");
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
                    <div>
                        <h1>Filter Options</h1>
                    </div>
                    <div className="filter-options">
                        <div className="specific-filter" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h2 className="filter-section" style={{ display: "flex" }}>BRAND</h2>
                            <h2
                                style={{
                                    cursor: "pointer",
                                    color: "pink",
                                    fontWeight: "500",
                                    fontSize: "30px",
                                    textAlign: "right",
                                    margin: 0
                                }}
                                onClick={() => setCurrentPage("brand")}
                            >
                                &gt;
                            </h2>
                        </div>

                        <div className="specific-filter" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h2 className="filter-section">CATEGORY</h2>
                            <h2
                                style={{
                                    cursor: "pointer",
                                    color: "pink",
                                    fontWeight: "500",
                                    fontSize: "30px",
                                    textAlign: "right",
                                    margin: 0                             
                                }}
                                onClick={() => setCurrentPage("category")}
                            >
                                &gt;
                            </h2>
                        </div>

                        <div className="specific-filter" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h2>INGREDIENTS</h2>
                            <h2
                                style={{
                                    cursor: "pointer",
                                    color: "pink",
                                    fontWeight: "500",
                                    fontSize: "30px",
                                    textAlign: "right",
                                    margin: 0
                                }}
                                onClick={() => setCurrentPage("ingredient")}
                            >
                                &gt;
                            </h2>
                        </div>
                    </div>
                </div>
            )}

            {currentPage === "brand" && (
                <div>
                    <h1>Choose brand</h1>
                    <button onClick={handleBack} style={{ marginTop: "10px" }}>
                        Back
                    </button>
                    <ul style={{ padding: 0 }}>
                        {brands.map((brand) => (
                            <FilterList
                                key={brand}
                                text={brand}
                                onClick={() => onFilterChange("brand", brand)}
                            />
                        ))}
                    </ul>
                </div>
            )}

            {currentPage === "category" && (
                <div>
                    <h1>Choose category</h1>
                    <button onClick={handleBack} style={{ marginTop: "10px" }}>
                        Back
                    </button>
                    <ul style={{ backgroundColor: "red" }}>
                        {categories.map((category) => (
                            <FilterList
                                key={category}
                                text={category}
                                onClick={() => onFilterChange("category", category)}
                            />
                        ))}
                    </ul>
                </div>
            )}

            {currentPage === "ingredient" && (
                <div>
                    <h1>Choose ingredient</h1>
                    <button onClick={handleBack} style={{ marginTop: "10px" }}>
                        Back
                    </button>
                    <ul style={{ padding: 0 }}>
                    {tags.map((tag) => {
                            return (
                                <FilterList
                                    key={tag}
                                    text={tag}
                                    onClick={() => onFilterChange("tag", tag)}
                                />
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Filter;