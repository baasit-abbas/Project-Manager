"use client"
import React from 'react'
import { ToastContainer } from 'react-toastify'

const Wrapper = ({children}) => {
  return (
    <div>
      {children}
      <ToastContainer />
    </div>
  )
}

export default Wrapper
