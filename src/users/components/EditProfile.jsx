import React, { useContext, useEffect, useState } from 'react'
import { FaRegEdit } from 'react-icons/fa'
import SERVERURL from '../../services/serverURL'
import { updateProfileAPI } from '../../services/allAPI'
import { toast } from 'react-toastify'
import { userProfileUpdateContext } from '../../context/ContextShare'

function EditProfile() {
    const [offCanvas, setOffCanvas] = useState(false)
    const [userDetails, setUserDetails] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        bio: "",
        role: "",
        profile: ""
    })
    const [token, setToken] = useState("")
    const [existingProfile, setExistingProfile] = useState("")
    const [preview, setPreview] = useState("")

    const { setUserProfileUpdateStatus } = useContext(userProfileUpdateContext)

    console.log(userDetails);
    console.log(existingProfile);

    const handleImageUpload = (e) => {
        setUserDetails({ ...userDetails, profile: e.target.files[0] })
        const url = URL.createObjectURL(e.target.files[0])
        setPreview(url)
    }
    const handleUpdate = async () => {
        const { username, password, confirmPassword, bio, role, profile } = userDetails
        if (!username || !password || !confirmPassword || !bio) {
            toast.info(`Fill the form completely`)
        }
        else {
            if (password != confirmPassword) {
                toast.warning(`Invalid Credentials`)
            } else {
                const reqHeader = {
                    "Authorization": `Bearer ${token}`
                }
                const reqBody = new FormData()
                if (preview) {
                    for (let key in userDetails) {
                        reqBody.append(key, userDetails[key])
                    }
                    console.log(`inside preview`);

                    const result = await updateProfileAPI(reqBody, reqHeader)
                    console.log(result);
                    if (result.status === 200) {
                        toast.success("Profile Updated Successfully")
                        sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                        setUserProfileUpdateStatus(result)
                        setOffCanvas(false)
                    }
                    else {
                        toast.error("Something went wrong!!")

                    }


                }
                else {
                    console.log(`inside preview`);
                    const result = await updateProfileAPI({ username, password, bio, role, profile: existingProfile }, reqHeader)
                    console.log(result);
                    if (result.status === 200) {
                        toast.success("Profile Updated Successfully")
                        sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                        setUserProfileUpdateStatus(result)
                        setOffCanvas(false)
                    }
                    else {
                        toast.error("Something went wrong!!")

                    }

                }
            }
        }
    }
    // const handleUpdate = async () => {
    //     const formData = new FormData()
    //     formData.append("username", userDetails.username)
    //     formData.append("password", userDetails.password)
    //     formData.append("confirmPassword", userDetails.confirmPassword)
    //     formData.append("bio", userDetails.bio)
    //     formData.append("role", userDetails.role)

    //     if (userDetails.profile) {
    //         formData.append("profile", userDetails.profile)
    //     } else {
    //         formData.append("profile", existingProfile)
    //     }
    //     const reqHeader = {
    //         "Authorization": `Bearer ${token}`
    //     }
    //     try {
    //         const result = await updateProfileAPI(formData, reqHeader)
    //         if (result.status === 200) {
    //             toast.success("Profile Updated Successfully")
    //             sessionStorage.setItem("existingUser", JSON.stringify(result.data))
    //         }
    //         else {
    //             toast.error("Error in updating profile")

    //         }
    //     }
    //     catch (error) {
    //         console.log(error);
    //         toast.error("Something Went Wrong")
    //     }

    // }
    const handleReset = () => {
        const user = JSON.parse(sessionStorage.getItem("existingUser"))
        setUserDetails({
            username: user.username,
            password: user.password,
            confirmPassword: user.password,
            bio: user.bio,
            role: user.role,
            profile: ""
        })
        setExistingProfile(user.profile)
        setPreview("")
    }
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
            const user = JSON.parse(sessionStorage.getItem("existingUser"))
            setUserDetails({ username: user.username, password: user.password, confirmPassword: user.password, bio: user.bio, role: user.role })
            setExistingProfile(user.profile)
        }
    }, [])


    return (
        <>
            <button onClick={() => setOffCanvas(true)} className='flex px-4 py-3 font-bold border border-blue-200 text-blue-600'>Edit<FaRegEdit className='mt-1 me-2' /></button>
            {
                offCanvas &&
                <div>
                    <div className='fixed inset-0 bg-gray-500/75 w-full h-full'></div>
                    <div className='bg-white h-full w-90 z-50 fixed top-0 left-0 overflow-y-auto'>
                        <div className='bg-gray-900 px-3 py-4 flex justify-between text-white text-2xl'>
                            <h1>Edit User Profile</h1>
                            <button onClick={() => setOffCanvas(false)}>X</button>
                        </div>
                        <div className='flex justify-center items-center flex-col my-5'>
                            <label htmlFor='profilePic'>
                                <input onChange={(e) => handleImageUpload(e)} type='file' style={{ display: "none" }} id='profilePic' />
                                {
                                    existingProfile == "" ?
                                        <img src={preview ? preview : 'https://tse2.mm.bing.net/th/id/OIP.fqSvfYQB0rQ-6EG_oqvonQHaHa?pid=Api&P=0&h=180'} style={{ height: "150px", width: "150px", borderRadius: "50%" }} alt='' />
                                        :
                                        <img src={preview ? preview : `${SERVERURL}/imgUploads/${existingProfile}`} style={{ height: "150px", width: "150px", borderRadius: "50%" }} alt='' />

                                }


                            </label>
                        </div>
                        <div className='mt-10 mb-3 w-full px-5'>
                            <input type='text' onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} value={userDetails.username} placeholder='Username' className='w-full border border-gray-300 placeholder-gray-900 p-2 rounded' />
                        </div>
                        <div className='mt-10 mb-3 w-full px-5'>
                            <input type='text' onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} value={userDetails.password} placeholder='Password' className='w-full border border-gray-300 placeholder-gray-900 p-2 rounded' />
                        </div>
                        <div className='mt-10 mb-3 w-full px-5'>
                            <input type='text' onChange={(e) => setUserDetails({ ...userDetails, confirmPassword: e.target.value })} value={userDetails.confirmPassword} placeholder='Confirm Password' className='w-full border border-gray-300 placeholder-gray-900 p-2 rounded' />
                        </div>
                        <div className='mt-10 mb-3 w-full px-5'>
                            <textarea type='text' onChange={(e) => setUserDetails({ ...userDetails, bio: e.target.value })} value={userDetails.bio} placeholder='Bio' className='w-full border border-gray-300 placeholder-gray-900 p-2 rounded' />
                        </div>
                        <div className=' flex justify-end w-full px-5'>
                            <button onClick={handleReset} type='button' className='bg-amber-600 text-white rounded border py-3 px-4 hover:text-amber-600 hover:border-amber-600 hover:bg-white'>Reset</button>
                            <button onClick={handleUpdate} type='button' className='bg-green-600 text-white rounded border py-3 px-4 hover:text-green-600 hover:border-green-600 hover:bg-white ms-3'>Update</button>

                        </div>

                    </div>
                </div>
            }
        </>
    )
}

export default EditProfile
