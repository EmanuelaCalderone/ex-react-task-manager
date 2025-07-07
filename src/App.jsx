import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState } from 'react'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/addtask" element={<AddTask />} />
        </Routes>
      </BrowserRouter >
    </>
  )
}

export default App;