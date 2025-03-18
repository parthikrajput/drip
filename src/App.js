import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Shop from "./pages/Shop/Shop";
import Login from "./pages/Accounts/Login/Login";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MyAccount from "./pages/Accounts/MyAccount/MyAccount";
import SignUp from "./pages/Accounts/SignUp/SignUp";
import ForgotPassword from "./pages/Accounts/ForgetPassword/ForgetPassword";
import ResetPassword from "./pages/Accounts/RePasswoed/RePasswoed";
import Contact from "./pages/Contact/Contact";
import Science from "./pages/Science/Science";
import CheckOut from "./pages/CheckOut/CheckOut";
import NotFound from "./pages/NotFound/NotFound";

function Layout({ cartItems, setCartItems }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const hideFooterPages = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/checkout",
  ];

  const hideHeaderPages = ["/checkout"];
  return (
    <div>
      {!hideHeaderPages.includes(location.pathname) && (
        <Header cartItems={cartItems} setCartItems={setCartItems} />
      )}
      <main>
        <Outlet />
      </main>
      {!hideFooterPages.includes(location.pathname) && <Footer />}
    </div>
  );
}

function App() {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  // Function to add items to cart and store in localStorage
  const addToCart = (product) => {
    const updatedCart = [...cartItems, product];
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Load cart items from localStorage when app starts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Layout cartItems={cartItems} setCartItems={setCartItems} />}
        >
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/science" element={<Science />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shop addToCart={addToCart} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route
            path="/my"
            element={
              <MyAccount cartItems={cartItems} setCartItems={setCartItems} />
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/checkout"
            element={
              <CheckOut cartItems={cartItems} setCartItems={setCartItems} />
            }
          />{" "}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
