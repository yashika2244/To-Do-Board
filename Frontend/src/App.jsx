import React from 'react'
import Layout from './layout/Layout'
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <div>
      <Layout/>
        <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default App
