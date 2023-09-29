import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Home from '../components/Home/Index';
import Layout from '../components/Layout/Index';
import './App.scss'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" activeclassname="active" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App
