"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const AddUser = () => {
    const router = useRouter()
  return (
    <div>
      <button onClick={() => router.push('/admin/register')} className='fixed top-3 right-19 rounded-xl bg-linear-to-br from-blue-500 to-blue-300 px-3 py-2 cursor-pointer text-white hover:from-blue-300 hover:to-blue-500'>Add User</button>
    </div>
  )
}

export default AddUser
