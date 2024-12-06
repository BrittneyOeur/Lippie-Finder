import TopPart from './components/TopPart';
import ProductGrid from './components/ProductGrid';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductDetails from './components/ProductDetails';

function App() {
  return (
    <Router>
      <TopPart />
      <Routes>
        <Route path="/" element={<ProductGrid />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
