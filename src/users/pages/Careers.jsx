import React, { useState } from 'react'
import Header from '../../common/components/Header'
import Footer from '../../common/components/Footer'
import { FaArrowUpRightFromSquare, FaLocationDot } from 'react-icons/fa6'

function Careers() {
  const [modalStatus, setModalStatus] = useState(false)
  return (
    <>
      <Header />
      <div className='md:px-40 p-5'>
        <div className='text-center my-5'>
          <h1 className='text-3xl font-bold mb-5'>Careers</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum et perspiciatis fugit provident quod tenetur nisi quisquam reiciendis ab eos molestias voluptates optio,
            corrupti nesciunt. Dolorem accusamus sed rem eligendi?</p>

        </div>
        <div className='my-10'>
          <h1 className='text-2xl font-bold'>Current Openings</h1>
          <div className='flex my-10 justify-center items-center'>
            <input type='text' className='p-2 border border-gray-200 text-black w-100 placeholder-gray-500' placeholder='Search by title' />
            <button className='bg-blue-900 text-white p-2 hover:bg-white hover:text-blue-900 hover:border hover:border-blue-800'>Search</button>
          </div>
        </div>

        {/* job listing */}

        <div className='border border-gray-200 p-5 shadow my-5'>
          <div className='flex mb-5'>
            <div className='w-full'>
              <h1>FrontEnd Developer</h1>
              <hr />
            </div>
            <button onClick={() => setModalStatus(true)} className='bg-blue-900 text-white p-3 ms-5 flex items-center'>Apply<FaArrowUpRightFromSquare className='ms-2' /></button>

          </div>
          <p className='flex'>
            <FaLocationDot className='me-2 mt-1' />Kochi
          </p>
          <p className='flex'>salary:20000-30000/month</p>
          <p className='text-lg my-2'>Job Type:Full Time</p>
          <p className='text-lg my-2'>Qualification:BSC.CS</p>
          <p className='text-lg my-2'>Experience:1-2 yr</p>
          <p className='text-lg my-2 text-justify'>Description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia aut nisi quidem atque nostrum ex dicta, corporis
            vero doloribus possimus dolore, a obcaecati vitae, inventore id reprehenderit cum harum quo.</p>

        </div>

      </div>
      {modalStatus &&
        <div className="fixed inset-0 z-10 flex justify-center items-center bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="bg-gray-800 text-white flex justify-between items-center px-5 py-3 rounded-t-2xl">
              <h3 className="text-lg font-semibold">Application Form</h3>
              <button onClick={() => setModalStatus(false)} className="text-gray-300 hover:text-white text-xl">✕</button>
            </div>
            <div className="p-6 space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" placeholder="Full Name" className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="text" placeholder="Qualification" className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="email" placeholder="Email Id" className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="tel" placeholder="Phone" className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <textarea placeholder="Cover Letter" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-28"></textarea>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Upload Resume:</label>
                <div className="border rounded-lg p-2 bg-white">
                  <input type="file" className="w-full cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-300 file:text-gray-800 hover:file:bg-gray-400" />
                </div>
              </div>
            </div>
            <div className="flex justify-end bg-gray-100 px-6 py-4">
              <button className="bg-amber-600 text-white rounded p-3 px-6 hover:border hover:border-amber-600 hover:text-amber-600 hover:bg-white transition-all">Reset</button>
              <button className="bg-green-600 text-white rounded p-3 px-6 hover:border hover:border-green-600 hover:text-green-600 hover:bg-white ms-3 transition-all">Submit</button>
            </div>
          </div>
        </div>


      }

      <Footer />
    </>
  )
}

export default Careers