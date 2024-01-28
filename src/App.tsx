
import './App.css';
import './scss/app.scss';
import React from 'react';
import {createBrowserRouter, RouterProvider, Route, Link, Routes, BrowserRouter} from "react-router-dom";

import Header from './components/Header';
import Home from './pages/Home.tsx'
import NotFound from './pages/NotFound.tsx';
import Cart from './pages/Cart.tsx'
import NotFoundBlock from './components/NotFoundBlock/NotFoundBlock';
import Search from './components/Search/Search';
import FullPizza from './pages/FullPizza.tsx';
import MainLayout from './layouts/MainLayout.tsx';

// export const SearchContext = React.createContext('');

// import pizzas from './assets/img/pizzas.json';

function App() {



  return (
        
            <Routes>
              <Route path="/" element={<MainLayout/>} >
                <Route path="" element={<Home />}/>
                <Route path="cart" element={<Cart/>}/>
                <Route path="pizza/:id" element={<FullPizza/>}/>
                <Route path="*" element={<NotFound/>}/>
              </Route>
            </Routes>
          );


}

export default App;

