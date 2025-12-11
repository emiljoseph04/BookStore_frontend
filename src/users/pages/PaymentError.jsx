import React from 'react'
import Header from '../../common/components/Header'
import Footer from '../../common/components/Footer'
import { Link } from 'react-router-dom'


function PaymentError() {
  return (
    <>
      <Header />
      <div className='grid grid-cols-2 py-20 px-40 justify-center items-center'>
        <div>
            <h1 className='text-6xl text-blue-700'>Sorry! Your Payment is Unsuccessfull</h1>
            <p className='mt-5 mb-10'>We appologize for the inconvience caused and appreciate your visit to BookStore.</p>
            <Link to={"/all-books"} className='px-4 py-3 bg-blue-600 text-white hover:border hover:border-blue-600 hover:bg-white hover:text-blue-600'>Explore More Books...</Link>
            </div>
            <div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGdInC8dtCXlu1KYugRsp5s14JthSqE7FhkQ&s" className='w-3/4 ms-30'/>
            </div>
          </div>
      <Footer />
    </>
  )
}

export default PaymentError