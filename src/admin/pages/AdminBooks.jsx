import React, { useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'

function AdminBooks() {
  const [bookListStatus, setBookListStatus] = useState(true)
  const [userListStatus, setUserListStatus] = useState(false)
  return (
    <>
      <AdminHeader />
      <div className='md:grid grid-cols-5 gap-2'>
        <div className='col-span-1'>
          <AdminSidebar />
        </div>
        <div className='col-span-4 p-10'>
          <h1 className='text-center text-3xl font-bold'>All Books</h1>
          {/* tabs */}
          <div className='flex justify-center items-center my-8 font-medium text-lg'>
            <p onClick={() => { setUserListStatus(false), setBookListStatus(true) }} className={bookListStatus ? 'text-blue-500 p-4 border-gray-200 border-t border-l border-r rounded cursor-pointer':'p-4 border-b border-gray-200 cursor-pointer'}>Book List</p>
            <p onClick={() => { setUserListStatus(true), setBookListStatus(false) }} className={userListStatus ? 'text-blue-500 p-4 border-gray-200 border-t border-l border-r rounded cursor-pointer':'p-4 border-b border-gray-200 cursor-pointer'}>Users</p>
          </div>
          {bookListStatus &&
            <div className='md:grid grid-cols-4 w-full my-5'>
              <div className='shadow rounded p-3 m-4'>
                <img width={"100%"} height={"300px"} src='https://m.media-amazon.com/images/I/81FummIc2eL.jpg' alt=''/>
                <div className='flex flex-col justify-center items-center mt-4'>
                  <p>Book Name</p>
                  <p>Author Name</p>
                  <p>Discount Price</p>
                  <button className='w-full mt-3 p-3 rounded border bg-green-700 text-white hover:border-green-600 hover-bg-white hover:text-green-700'>Approve</button>
                </div>
              </div>
              <div className='shadow rounded p-3 m-4'>
                <img width={"100%"} height={"300px"} src='https://m.media-amazon.com/images/I/81FummIc2eL.jpg' alt=''/>
                <div className='flex flex-col justify-center items-center mt-4'>
                  <p>Book Name</p>
                  <p>Author Name</p>
                  <p>Discount Price</p>
                  <button className='w-full mt-3 p-3 rounded border bg-green-700 text-white hover:border-green-600 hover-bg-white hover:text-green-700'>Approve</button>
                </div>
              </div>
            </div>
          }
          {userListStatus &&
            <div className='md:grid grid-cols-3 w-full my-5'>
              <div className='shadow rounded p-2 m-2 bg-gray-200'>
                <p className='text-red-700 font-bold'>ID : 67563532356</p>
                <div className='flex items-center mt-3'>
                  <img src='https://tse2.mm.bing.net/th/id/OIP.fqSvfYQB0rQ-6EG_oqvonQHaHa?pid=Api&P=0&h=180' width={"80px"} height={"80px"} style={{borderRadius:"50%"}} alt=''/>
                  <div className='flex flex-col ml-3 w-full'>
                    <p className='text-blue-800 text-lg font-bold'>Username</p>
                    <p>Email</p>
                  </div>
                </div>
              </div>
               <div className='shadow rounded p-2 m-2 bg-gray-200'>
                <p className='text-red-700 font-bold'>ID : 67563532356</p>
                <div className='flex items-center mt-3'>
                  <img src='https://tse2.mm.bing.net/th/id/OIP.fqSvfYQB0rQ-6EG_oqvonQHaHa?pid=Api&P=0&h=180' width={"80px"} height={"80px"} style={{borderRadius:"50%"}} alt=''/>
                  <div className='flex flex-col ml-3 w-full'>
                    <p className='text-blue-800 text-lg font-bold'>Username</p>
                    <p>Email</p>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default AdminBooks
