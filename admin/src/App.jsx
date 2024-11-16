// Tắt cảnh báo của React Router về future flag
const originalWarn = console.warn;
console.warn = (...args) => {
  if (
    args[0] &&
    (args[0].includes("React Router Future Flag Warning") ||
      args[0].includes("Relative route resolution within Splat routes"))
  ) {
    return; 
  }
  originalWarn(...args);
};



import React from 'react'
import Login from './pages/Login'

const App = () => {
  return (
    <>
      <Login />
    </>
  )
}

export default App
