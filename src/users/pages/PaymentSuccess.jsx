import React from 'react'
import Header from '../../common/components/Header'
import Footer from '../../common/components/Footer'
import { Link } from 'react-router-dom'


function PaymentSuccess() {
  return (
    <>
      <Header />
      <div className='grid grid-cols-2 py-20 px-40 justify-center items-center'>
        <div>
            <h1 className='text-6xl text-blue-700'>Congratulations!!!</h1>
            <p className='mt-5 mb-10'>Thank you for shopping with BookStore.Hope you have a good time with us.</p>
            <Link to={"/all-books"} className='px-4 py-3 bg-blue-600 text-white hover:border hover:border-blue-600 hover:bg-white hover:text-blue-600'>Explore More Books...</Link>
            </div>
            <div>
                <img src="https://assets-v2.lottiefiles.com/a/ac84f4ca-116d-11ee-82b0-0781c06c26fa/LqHka7UUzf.png" className='w-3/4 ms-30'/>
            </div>
          </div>
      <Footer />
    </>
  )
}

export default PaymentSuccess
