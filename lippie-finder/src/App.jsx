import TopPart from './components/TopPart';
import ProductGrid from './components/ProductGrid';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <TopPart />
      <Routes>
        <Route path="/" element={<ProductGrid/>} />
      </Routes>
    </Router>
  );
}

export default App;
