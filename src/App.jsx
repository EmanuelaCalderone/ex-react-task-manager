import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState } from 'react'
import './App.css'
import { GlobalContext } from "./context/GlobalContext";
import GlobalProvider from "./context/GlobalContext";

import TaskDetail from "./pages/TaskDetail";


function App() {

  return (
    <GlobalProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/addtask" element={<AddTask />} />
          <Route path="/task/:id" element={<TaskDetail />} /> {/* :id = parametro dinamico */}
        </Routes>
      </BrowserRouter >
    </GlobalProvider>
  )
}

export default App;