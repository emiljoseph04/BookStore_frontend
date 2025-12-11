import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { approveBookStatusAPI, getAllBooksAdminAPI, getAllUsersAPI } from '../../services/allAPI'

function AdminBooks() {
  const [bookListStatus, setBookListStatus] = useState(true)
  const [userListStatus, setUserListStatus] = useState(false)

  const [allBooks, setAllBooks] = useState([])

  const [token, setToken] = useState("")
  const [allUsers, setAllUsers] = useState([])
  const getAllBooks = async () => {
    try {
      const result = await getAllBooksAdminAPI()
      console.log(result);
      if (result.status == 200) {
        setAllBooks(result.data)
      }

    }
    catch (error) {
      console.log(error);

    }
  }
  const approveBook = async (id) => {
    console.log(id);
    try {
      const result = await approveBookStatusAPI(id)
      console.log(result);
      getAllBooks()

    }
    catch (error) {
      console.log(error);

    }

  }
  const getAllUsers = async () => {
    try {
      //reqHeader
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      const result = await getAllUsersAPI(reqHeader)
      console.log(result);
      if (result.status == 200) {
        setAllUsers(result.data)
      }

    }
    catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    // getAllUsers()
    getAllBooks()
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
  }, [])

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
            <p onClick={() => { setUserListStatus(false), setBookListStatus(true) }} className={bookListStatus ? 'text-blue-500 p-4 border-gray-200 border-t border-l border-r rounded cursor-pointer' : 'p-4 border-b border-gray-200 cursor-pointer'}>Book List</p>
            <p onClick={() => { setUserListStatus(true), setBookListStatus(false),getAllUsers() }} className={userListStatus ? 'text-blue-500 p-4 border-gray-200 border-t border-l border-r rounded cursor-pointer' : 'p-4 border-b border-gray-200 cursor-pointer'}>Users</p>
          </div>
          {bookListStatus &&
            <div className='grid md:grid grid-cols-4 w-full my-5'>
              {allBooks?.length > 0 ?
                allBooks?.map((book, index) => (
                  <div key={index} className='shadow rounded p-3 m-4'>
                    <img width={"100%"} height={"300px"} src={book?.imageUrl} alt='' />
                    <div className='flex flex-col justify-center items-center mt-4'>
                      <p>{book?.title}</p>
                      <p>{book?.author}</p>
                      <p>{book?.dPrice}</p>
                      {book?.status == 'pending' &&
                        <button onClick={() => approveBook(book?._id)} className='w-full mt-3 p-3 rounded border bg-green-700 text-white hover:border-green-600 hover-bg-white hover:text-green-700'>Approve</button>
                      }
                      {book?.status == 'approved' &&
                        <div className='w-full flex justify-end'>
                          <img src='https://static.vecteezy.com/system/resources/previews/024/382/913/non_2x/green-check-mark-icon-symbol-logo-in-a-circle-tick-symbol-green-checkmark-approve-transparent-free-png.png' style={{ width: "50px", borderRadius: "50%" }} />
                        </div>
                      }
                    </div>
                  </div>
                ))
                :
                <p className='text-red-700 font-semibold text-center mt-10 text-xl'>No Books Available..............</p>
              }
            </div>
          }
          {userListStatus &&

            <>

              <div className='md:grid grid-cols-3 w-full my-5'>
                {allUsers?.length > 0 ?
                  allUsers?.map((user, index) => (
                    <div key={index} className='shadow rounded p-2 m-2 bg-gray-200'>
                      <p className='text-red-700 font-bold'>ID : {user?._id}</p>
                      <div className='flex items-center mt-3'>
                        <img src={user?.profile || "https://tse2.mm.bing.net/th/id/OIP.fqSvfYQB0rQ-6EG_oqvonQHaHa?pid=Api&P=0&h=180"} width={"80px"} height={"80px"} style={{ borderRadius: "50%" }} alt='' />
                        <div className='flex flex-col ml-3 w-full'>
                          <p className='text-blue-800 text-lg font-bold'>{user?.username}</p>
                          <p>{user?.email}</p>
                        </div>
                      </div>
                    </div>
                  ))
                  :
                  <p className='text-red-600 font-semibold text-center mt-0'>No Users Available</p>
                }
              </div>
            </>
          }
        </div>
      </div>
    </>
  )
}

export default AdminBooks
