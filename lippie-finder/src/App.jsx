import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopPart from "./components/TopPart";
import ProductDetails from './components/ProductDetails';
import ProductGrid from "./components/ProductGrid";

function App() {
    const [filters, setFilters] = useState({
        brand: [],
        category: [],
        tag: [],
    });
    const [search, setSearch] = useState("");

    // Handle filter changes
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    // Handle search input changes
    const handleSearch = (searchInput) => {
        setSearch(searchInput);
    };

    // Reset the search and filters
    const handleResetProducts = () => {
        setSearch("");          // Clear the search input
        setFilters({           // Reset filters to initial state
            brand: [],
            category: [],
            tag: [],
        });
    };

    return (
        <Router>
            <TopPart
                filters={filters}
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
                onResetProducts={handleResetProducts}
            />
            <Routes>
                <Route
                    path="/"
                    element={<ProductGrid search={search} filters={filters} />}
                />
                <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
