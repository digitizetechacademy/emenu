import { CartProvider } from "./components/context/cart-context";
import AvailableMeals from "./components/content/AvailableMeals";
import { Navigate, Route, Routes } from "react-router-dom";
import LayoutWrapper from "./components/layouts/LayoutWrapper";
import "./App.css";
function App() {
  return (
    <CartProvider>
      <main>
        <Routes>
          <Route
            path="/:hotel"
            element={
              <LayoutWrapper>
                <AvailableMeals />
              </LayoutWrapper>
            }
          />
          <Route path="/" exact element={<Navigate to="/the-golden-spoon" />} />
        </Routes>
      </main>
    </CartProvider>
  );
}

export default App;
