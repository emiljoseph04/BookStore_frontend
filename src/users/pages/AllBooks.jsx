import React, { useEffect, useState } from 'react'
import Header from '../../common/components/Header'
import Footer from '../../common/components/Footer'
import { Link } from 'react-router-dom'
import { getAllBookAPI } from '../../services/allAPI'

function AllBooks() {
  const [token, setToken] = useState("")
    const [allBook, setAllBook] = useState([])

  const [allCategory,setAllCategory]=useState([])
  const [tempBooks,setTempBooks]=useState([])
  const [searchKey,setSearchKey]=useState("")
  console.log(searchKey);
  
  const getAllBooks = async (userToken) => {
    //reqHeader
    const reqHeader = {
      "Authorization": `Bearer ${userToken}`
    }
    try {
      const result = await getAllBookAPI(searchKey,reqHeader)
      console.log(result);
      setAllBook(result.data)
      setTempBooks(result.data)
      // setAllCategory(result.data.map(item=>item.category))
      const tempCategory=result.data.map(item=>item.category)
      setAllCategory([...new Set(tempCategory)])
    }
    catch (error) {
      console.log(error);

    }

  }
  console.log(allCategory);

  const categoryFilter=(category)=>{
    if(category=="No Filter"){
      setAllBook(tempBooks)
    }else{
      setAllBook(tempBooks.filter(item=>item.category.toLowerCase()==category.toLowerCase()))
    }
  }
  
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const userToken = (sessionStorage.getItem("token"))
      setToken(userToken)
      getAllBooks(userToken)
    }

  }, [searchKey])

  return (
    <>
      <Header />
      {token ?
        <>
          <div className='flex justify-center items-center flex-col my-5'>
            <h1 className='text-3xl font-bold my-5'>Collections</h1>
            <div className='flex my-5'>
              <input value={searchKey} onChange={(e)=>setSearchKey(e.target.value)} type='text' className='p-2 border border-gray-200 text-black w-100 placeholder-gray-500' placeholder='Search by title' />
              <button className='bg-blue-900 text-white p-2 hover:bg-white hover:text-blue-900 hover:border hover:border-blue-800'>Search</button>
            </div>
          </div>
          <div className='md:grid grid-cols-4 md:px-20 p-5 mb-10'>

            {/* filter */}

            <div className='col-span-1'>
              <h1>Filters</h1>
              <div>
                {allCategory.map((item,index)=>(
                  <div key={index} onClick={()=>categoryFilter(item)} className='mt-5'>
                  <input id={item}  type='radio' name='filter' />
                  <label htmlFor={item} className='ms-2'>{item}</label>
                </div>
                ))}
               
              </div>
             
              
              <div onClick={()=>categoryFilter("No Filter")} className='mt-5'>
                <input type='radio'id='nofilter' name='filter'/>
                <label htmlFor='nofilter' className='ms-2'>No Filter</label>
              </div>
            </div>
            <div className='col-span-3'>
              {allBook?.length > 0 ?
                <div className='md:grid grid-cols-4 mt-5 md:mt-0'>
                  {allBook.map((item, index) => (
                    <div key={index} className='shadow rounded p-3 mx-4 my-3'>
                      <img src={item.imageUrl} width={"100%"} height={"300px"} />
                      <div className='flex flex-col justify-center items-center mt-4'>
                        <p>{item.title}</p>
                        <p>{item.author}</p>
                        <Link to={`/view-books/${item?._id}`} className='bg-blue-900 text-white p-2 hover:bg-white hover:text-blue-900 hover:border hover:border-blue-800 w-full text-center '>View Book</Link>
                      </div>
                    </div>
                  ))}
                </div>
                :
                <p>Loading</p>
              }

            </div>
          </div>
        </>
        :
        <div className='my-10 flex justify-center items-center flex-col'>
          <img src='https://cdn-icons-gif.flaticon.com/11255/11255957.gif' alt='' width={"400px"} />
          <p className='font-semibold text-xl mt-5'>Please <Link to={"/login"} className='text-blue-700 font-bold'> Login </Link> to Explore More</p>
        </div>
      }



      <Footer />
    </>
  )
}

export default AllBooks