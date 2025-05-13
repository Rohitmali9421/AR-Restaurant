import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home/Home';
import ProductDetail from './components/Product/Productdetail';
import Support from './components/Support/Support';
import About from './components/About/About';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import Dashboard from './components/AdminDashboard/Dashboard';
import Products from './components/AdminDashboard/Products';
import AddProduct from './components/AdminDashboard/AddProduct';
import EditProduct from './components/AdminDashboard/EditProducts';
import Category from './components/AdminDashboard/Category';
import Orders from './components/AdminDashboard/Orders';
import Cart from './components/Cart/Cart';
import Productlist from './components/Product/ProductList';
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Layout />} >
        <Route path='' element={<Home />} />
        <Route path='products' element={<Productlist />} />
        <Route path='products/:id' element={<ProductDetail />} />
        <Route path='support' element={<Support />} />
        <Route path='about' element={<About />} />
        <Route path='cart' element={<Cart />} />
      </Route>
      <Route path="/admin" element={<AdminDashboard />}>
        <Route path="" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
        <Route path="category" element={<Category />} />
        <Route path="orders" element={<Orders />} />
      </Route>
    </>
  )
);
export default router
