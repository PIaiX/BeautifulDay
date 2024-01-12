import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Error from "../components/Error";
import AppLayout from "../layouts/AppLayout";
import Article from "../pages/Article";
import Activate from "../pages/auth/Activate";
import ActivateEditEmail from "../pages/auth/ActivateEditEmail";
import Recovery from "../pages/auth/Recovery";
import Registration from "../pages/auth/Registration";
import Blog from "../pages/Blog";
import Cart from "../pages/Cart";
import Categories from "../pages/Categories";
import Category from "../pages/Category";
import Checkout from "../pages/Checkout";
import Contact from "../pages/Contact";
import Delivery from "../pages/Delivery";
import Home from "../pages/Home";
import MobileContacts from "../pages/MobileContacts";
import NotFound from "../pages/NotFound";
import OfferPage from "../pages/OfferPage";
import Policy from "../pages/Policy";
import Product from "../pages/Product";
import Promo from "../pages/Promo";
import SearchResults from "../pages/SearchResults";
import AccountRouter from "./AccountRouter";
import AuthRoute from "./AuthRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Home />} errorElement={<Error />} />
      <Route path="categories" element={<Categories />} />
      <Route path="category/:categoryId" element={<Category />} />
      <Route path="menu/product" element={<Product />} />
      <Route path="product/:productId" element={<Product />} />
      <Route path="cart" element={<Cart />} errorElement={<Error />} />
      <Route path="checkout" element={<Checkout />} errorElement={<Error />} />
      <Route path="promo" element={<Promo />} />
      <Route path="promo/:saleId" element={<OfferPage />} />
      <Route path="contacts" element={<Contact />} />
      <Route path="delivery" element={<Delivery />} />
      <Route path="mobile" element={<MobileContacts />} />
      <Route path="policy" element={<Policy />} />

      <Route path="search" element={<SearchResults />} />

      <Route path="*" element={<NotFound />} />
      <Route
        path="account/*"
        element={
          <AuthRoute activate>
            <AccountRouter />
          </AuthRoute>
        }
      />

      <Route
        path="activate-email/:key"
        element={
          <AuthRoute>
            <ActivateEditEmail />
          </AuthRoute>
        }
      />
      <Route
        path="activate"
        element={
          <AuthRoute>
            <Activate />
          </AuthRoute>
        }
      />

      <Route path="recovery" element={<Recovery />} />
      <Route path="login" element={<Registration />} />
      <Route path="articles" element={<Blog />} />
      <Route path="articles/:id" element={<Article />} />
    </Route>
  )
);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
