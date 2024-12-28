import TopPart from './components/TopPart';
import ProductGrid from './components/ProductGrid';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetails from './components/ProductDetails';
import React, { useState } from "react";

function App() {
    const [filters, setFilters] = useState({
        brand: [],
        category: [],
        tag: [],
    });

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <Router>
            <TopPart filters={filters} onFilterChange={handleFilterChange} />
            <Routes>
                <Route path="/" element={<ProductGrid filters={filters} />} />
                <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
