import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./ScreenComponents/Navbar";
import { BestSellerScreen } from "./ScreenComponents/BestSellerScreen";
import { ProductDetail } from "./ScreenComponents/ProductDetail";
import { SearchResults } from "./ScreenComponents/SearchResult";
import { CartScreen } from "./ScreenComponents/CartScreen"; // ✅ use default import
import { HomeScreen } from "./ScreenComponents/HomeScreen";
import CategoryScreen from "./ScreenComponents/CategoryScreen/CategoryScreen";
import { LoginScreen } from "./ScreenComponents/LoginScreen";
import { AuthProvider } from "./context/AuthContext";
import { AboutSection } from "./ScreenComponents/AboutScreen";

function App() {
  return (
    <AuthProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<HomeScreen />} />
          <Route path="/" element={<LoginScreen />} />
        {/* <Route path="/" element={<DashboardScreen />} /> */}
        <Route path="seller" element={<BestSellerScreen />} />
        <Route path="/product/:id" element={<ProductDetail />} />{" "}
        <Route path="/category/:id" element={<CategoryScreen />} />{" "}
        <Route path="/search" element={<SearchResults />} />
        <Route path="/cart" element={<CartScreen />} /> {/* NEW */}
        <Route path="/about" element={<AboutSection/>}/>
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
