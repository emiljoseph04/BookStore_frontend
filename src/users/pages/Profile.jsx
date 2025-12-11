import React, { useContext, useEffect, useState } from 'react'
import Header from '../../common/components/Header'
import Footer from '../../common/components/Footer'
import { MdVerified } from 'react-icons/md'
import { FaRegEdit } from 'react-icons/fa'
import { BiCloudUpload } from 'react-icons/bi'
import { toast } from 'react-toastify'
import { addBookAPI, deleteAUserAddedBookAPI, getPurchasedBooksAPI, getUserBooksAPI } from '../../services/allAPI'
import EditProfile from '../components/EditProfile'
import { userProfileUpdateContext } from '../../context/ContextShare'
import SERVERURL from '../../services/serverURL'


function Profile() {
  const [sellBooks, setSellbooks] = useState(true)
  const [bookstatus, setBookStatus] = useState(false)
  const [purchaseHistory, setPurchaseHistory] = useState(false)
  const [preview, setPreview] = useState("")
  const [token, setToken] = useState("")
  const [username, setUsername] = useState("")
  const [userAddedBooks, setUserAddedBooks] = useState([])
  const [deleteBookStatus, setDeleteBookStatus] = useState(false)
  const [allUploadImages, setAllUploadImages] = useState([])
  const [purchasedBooks, setPurchasedBooks] = useState([])
  const [userProfile, setUserProfile] = useState("")


  const { userProfileUpdateStatus } = useContext(userProfileUpdateContext)

  const [bookDetails, setBookDetails] = useState({
    title: "", author: "", noOfPages: "", imageUrl: "", price: "", dPrice: "", abstract: "", publisher: "", language: "", isbn: "", category: "", uploadImages: []
  })
  console.log(bookDetails);

  const reset = () => {
    setBookDetails({
      title: "", author: "", noOfPages: "", imageUrl: "", price: "", dPrice: "", abstract: "", publisher: "", language: "", isbn: "", category: "", uploadImages: []

    })
    setPreview("")
    setAllUploadImages([])
  }
  const handleFile = (e) => {
    console.log(e.target.files[0]);
    const fileArray = bookDetails.uploadImages
    fileArray.push(e.target.files[0])
    setBookDetails({ ...bookDetails, uploadImages: fileArray })

    //convert files to url
    const url = URL.createObjectURL(e.target.files[0])
    setPreview(url)
    let images = allUploadImages
    images.push(url)
    setAllUploadImages(images)

  }
  console.log(preview);

  const handleAddBook = async () => {
    const { title, author, noOfPages, imageUrl, price, dPrice, abstract, publisher, language, isbn, category, uploadImages } = bookDetails
    if (!title || !author || !noOfPages || !imageUrl || !price || !dPrice || !abstract || !publisher || !language || !isbn || !category || uploadImages.length == 0) {
      toast.info("Fill the form completely")
    } else {
      //reqHeader
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      //reqBody-formData() //append-reqBody.append(key,value)//
      // reqBody.append("title",title)
      const reqBody = new FormData()
      for (let key in bookDetails) {
        if (key != "uploadImages") {
          reqBody.append(key, bookDetails[key])
        } else {
          bookDetails.uploadImages.forEach(img => {
            reqBody.append("uploadImages", img)
          })
        }
      }
      try {
        const result = await addBookAPI(reqBody, reqHeader)
        console.log(result);
        if (result.status == 200) {
          toast.success("Book Added Successfully")
          reset()
        } else if (result.status == 401) {
          toast.warning(result.response.data)
        } else {
          toast.error("Something Went Wrong")
          reset()
        }

      } catch (error) {
        toast.error("Something went wrong")
      }
    }
  }
  //get user added books
  const getUserAddedBooks = async () => {
    try {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      const result = await getUserBooksAPI(reqHeader)
      console.log(result);
      setUserAddedBooks(result.data)


    }
    catch (error) {
      console.log(error);

    }
  }
  const handleDeleteBook = async (id) => {
    try {
      const result = await deleteAUserAddedBookAPI(id)
      console.log(result);
      if (result.status == 200) {
        setDeleteBookStatus(true)
        toast.success("Book deleted succesfully")
      }
      else {
        toast.error("something went error")
      }

    }
    catch (error) {
      console.log(error);

    }
  }
  const fetchPurchasedBooks = async () => {
    // const token=sessionStorage.getItem("token")
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    try {
      const result = await getPurchasedBooksAPI(reqHeader)
      if (result.status === 200) {
        setPurchasedBooks(result.data)
      }
    }
    catch (error) {
      console.log("Purchase history error:", error);

    }
  }
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
    if (sessionStorage.getItem("existingUser")) {
      const name = JSON.parse(sessionStorage.getItem("existingUser"))
      setUsername(name.username)
      const existingProfile = JSON.parse(sessionStorage.getItem("existingUser"))
      setUserProfile(existingProfile.profile)
    }
  }, [userProfileUpdateStatus])
  useEffect(() => {
    if (bookstatus == true) {
      getUserAddedBooks()
    }
  }, [bookstatus, deleteBookStatus])
  useEffect(() => {
    if (purchaseHistory) {
      fetchPurchasedBooks()
    }
  }, [purchaseHistory])
  return (
    <>
      <Header />
      <div style={{ height: "200px" }} className='bg-black'></div>
      <div className='bg-white p-3' style={{ width: "230px", height: "230px", borderRadius: "50%", marginLeft: "70px", marginTop: "-130px" }}>
        <img style={{ width: "200px", height: "200px", borderRadius: "50%" }} src={userProfile == "" ? 'https://tse2.mm.bing.net/th/id/OIP.fqSvfYQB0rQ-6EG_oqvonQHaHa?pid=Api&P=0&h=180' : userProfile.startsWith("https") ?
          userProfile : `${SERVERURL}/imgUploads/${userProfile}`} alt='' />
      </div>
      <div className='md:flex justify-between px-20 mt-5'>
        <div className='flex items-center'>
          <h1 className='font-bold md:text-3xl text-2xl'>{username}</h1>
          <MdVerified className='text-blue-500 ms-3 text-xl' />
        </div>
        <div className=''>
          <EditProfile />
        </div>
      </div>
      <p className='md:px-20 px-5 my-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit et similique dolorum quis eius neque eos ratione, recusandae animi. Pariatur?</p>
      <div className='flex justify-center items-center my-8 font-medium text-lg'>

        <p onClick={() => { setSellbooks(true), setBookStatus(false), setPurchaseHistory(false) }} className={sellBooks ? 'text-blue-500 p-4 border-gray-200 border-t border-l border-r rounded cursor-pointer' : 'p-4 border-b border-gray-200 cursor-pointer'}>Sell Books</p>
        <p onClick={() => { setSellbooks(false), setBookStatus(true), setPurchaseHistory(false) }} className={bookstatus ? 'text-blue-500 p-4 border-gray-200 border-t border-l border-r rounded cursor-pointer' : 'p-4 border-b border-gray-200 cursor-pointer'}>Book Status</p>
        <p onClick={() => { setSellbooks(false), setBookStatus(false), setPurchaseHistory(true), fetchPurchasedBooks() }} className={purchaseHistory ? 'text-blue-500 p-4 border-gray-200 border-t border-l border-r rounded cursor-pointer' : 'p-4 border-b border-gray-200 cursor-pointer'}>Purchase History</p>
      </div>
      {
        sellBooks &&
        <div className='min-h-screen flex flex-col items-center md:p-20 p-5 text-center'>
          <div className='bg-gray-200 text-black rounded-lg md:p-10 p-5 my-5 shadow-lg'>
            <h1 className='text-center text-3xl font-medium mt-0 my-5'>Book Details</h1>
            <div className='md:grid grid-cols-2 gap-6'>
              <div className='col-span-1'>
                <input value={bookDetails.title} onChange={(e) => setBookDetails({ ...bookDetails, title: e.target.value })} type="text" placeholder='Title' className="bg-white rounded w-full p-2" />
                <input value={bookDetails.author} onChange={(e) => setBookDetails({ ...bookDetails, author: e.target.value })} type="text" placeholder='Author' className="bg-white rounded w-full p-2 mt-3" />
                <input value={bookDetails.noOfPages} onChange={(e) => setBookDetails({ ...bookDetails, noOfPages: e.target.value })} type="text" placeholder='No of Pages' className="bg-white rounded w-full p-2 mt-3" />
                <input value={bookDetails.imageUrl} onChange={(e) => setBookDetails({ ...bookDetails, imageUrl: e.target.value })} type="text" placeholder='Image Url' className="bg-white rounded w-full p-2 mt-3" />
                <input value={bookDetails.price} onChange={(e) => setBookDetails({ ...bookDetails, price: e.target.value })} type="text" placeholder='Price' className="bg-white rounded w-full p-2 mt-3" />
                <input value={bookDetails.dPrice} onChange={(e) => setBookDetails({ ...bookDetails, dPrice: e.target.value })} type="text" placeholder='Discount Price' className="bg-white rounded w-full p-2 mt-3" />
                <textarea value={bookDetails.abstract} onChange={(e) => setBookDetails({ ...bookDetails, abstract: e.target.value })} placeholder='Abstract' className='bg-white rounded  w-full mt-3 p-6'></textarea>

              </div>
              <div className='col-span1'>
                <input value={bookDetails.publisher} onChange={(e) => setBookDetails({ ...bookDetails, publisher: e.target.value })} type="text" placeholder='Publisher' className="bg-white rounded w-full p-2" />
                <input value={bookDetails.language} onChange={(e) => setBookDetails({ ...bookDetails, language: e.target.value })} type="text" placeholder='Language' className="bg-white rounded w-full p-2 mt-3" />
                <input value={bookDetails.isbn} onChange={(e) => setBookDetails({ ...bookDetails, isbn: e.target.value })} type="text" placeholder='ISBN' className="bg-white rounded w-full p-2 mt-3" />
                <input value={bookDetails.category} onChange={(e) => setBookDetails({ ...bookDetails, category: e.target.value })} type="text" placeholder='Category' className="bg-white rounded w-full p-2 mt-3" />
                <div className="flex flex-col items-center justify-center text-center ms-15 mt-10">
                  {preview ? <img src={preview} style={{ width: "200px", height: "200px" }} />
                    :
                    <label htmlFor="uploadfile">
                      <input onChange={(e) => handleFile(e)} type="file" name="" id="uploadfile" style={{ display: "none" }} />
                      <img src='https://cdn-icons-png.flaticon.com/512/2716/2716054.png' style={{ width: "200px", height: "200px" }} />
                    </label>
                  }
                  {preview &&
                    <div className='mt-10 flex items-center gap-5'>
                      {
                        allUploadImages.map((item) => (
                          <img src={item} style={{ width: "50px", height: "50px" }} />
                        ))
                      }
                      {
                        allUploadImages.length < 3 &&
                        <label htmlFor="uploadfile">
                          <input onChange={(e) => handleFile(e)} type="file" name="" id="uploadfile" style={{ display: "none" }} />
                          <img src='https://cdn-icons-png.flaticon.com/512/2716/2716054.png' style={{ width: "50px", height: "50px" }} />
                        </label>
                      }
                    </div>
                  }

                </div>
                <div className='flex md:justify-end justify-center mt-5 gap-5'>
                  <button onClick={reset} className='bg-amber-700 text-white px-5 py-3 rounded hover:border hover:border-amber-700 hover:text-amber-700 hover:bg-white'>Reset</button>
                  <button type='button' onClick={handleAddBook} className='bg-green-700 text-white px-5 py-3 rounded hover:border hover:border-green-700 hover:text-green-700 hover:bg-white'>Submit</button>

                </div>
              </div>
            </div>

          </div>
        </div>
      }
      {bookstatus &&
        <div className='p-10 my-20 shadow rounded'>
          {userAddedBooks?.length > 0 ?
            userAddedBooks?.map((book) => (
              <div className='bg-gray-200 p-5 rounded mt-4'>
                <div className='md:grid grid grid-cols-[3fr_1fr]'>
                  <div className='px-4'>
                    <h1 className='text-2xl'>{book?.title}</h1>
                    <h2>{book?.author}</h2>
                    <h3 className='text-blue-600'>₹ {book?.price}</h3>
                    <p>{book?.abstract}.</p>
                    <div className='flex mt-5'>
                      {
                        book?.status == "pending" ?
                          <img src='https://www.psdstamps.com/wp-content/uploads/2022/04/round-pending-stamp-png.png' alt='' style={{ width: "70px", height: "70px" }} />
                          : book?.status == "approved" ?
                            <img src='https://juststickers.in/wp-content/uploads/2017/08/seal-of-approval.png' alt='' style={{ width: "70px", height: "70px" }} />
                            :
                            <img src='https://cdn-icons-png.flaticon.com/512/6188/6188726.png' alt='' style={{ width: "70px", height: "70px" }} />
                      }
                    </div>
                  </div>
                  <div className='px-4 mt-4 md:mt-4'>
                    <img src={book?.imageUrl} alt='no image' className='w-full' style={{ height: "250px" }} />
                    <div className='flex justify-end mt-4'>
                      <button onClick={() => handleDeleteBook(book?._id)} type='button' className='p-2 rounded bg-red-600 text-white hover:bg-gray-200 hover:text-red-600 hover:border hover:border-red-600'>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
            :
            <div className='flex justify-center items-center flex-col'>
              <img src='https://i.pinimg.com/originals/b4/13/34/b41334a036d6796c281a6e5cbb36e4b5.gif' alt='no image' style={{ width: "200px", height: "200px" }} />
              <p className='text-red-600 text-2xl'>No Book Added Yet</p>
            </div>
          }
        </div>
      }

      {purchaseHistory && (
        <div className='p-5'>
          <h2 className='text-xl font-bold mb-4 text-center'>Your Purchase History</h2>

          {purchasedBooks.length === 0 ? (
            <p>No purchased books found.</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {purchasedBooks.map((book) => (
                <div key={book._id} className='p-4 shadow-lg rounded bg-white text-center'>
                  <img
                    className='mx-auto'
                    src={book.imageUrl}
                    alt={book.title}
                    style={{ width: "200px", height: "200px" }}
                  />
                  <h3 className="text-lg font-semibold mt-3">{book.title}</h3>
                  <p className="">
                    <span className="text-gray-700 " >{book.author}</span>
                  </p>
                  <p className="text-blue-700 mt-2 font-medium"> ₹{book.price}</p>
                  <p className="mt-2 text-gray-700 font-small ">
                    {book.abstract}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <Footer />
    </>
  )
}

export default Profile
