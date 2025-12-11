import commonAPI from "./commonAPI"
import SERVERURL from "./serverURL"


//register
export const registerAPI=async(reqBody)=>{
    return await commonAPI("POST",`${SERVERURL}/register`,reqBody)
}
//login
export const loginAPI=async(reqBody)=>{
    return await commonAPI("POST",`${SERVERURL}/login`,reqBody)
}
//google login
export const googleLoginAPI=async(reqBody)=>{
    return await commonAPI("POST",`${SERVERURL}/google-login`,reqBody)
}
//get home book
export const getHomeBookAPI=async()=>{
    return await commonAPI("GET",`${SERVERURL}/home-books`)
}
//-----------------User----------------
 
//addd book
export const addBookAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVERURL}/add-book`,reqBody,reqHeader)
}

//get all books
export const getAllBookAPI=async(searchKey,reqHeader)=>{
    return await commonAPI("GET",`${SERVERURL}/all-books?search=${searchKey}`,{},reqHeader)
}
//get a book
export const getABookAPI=async(bookid,reqHeader)=>{
    return await commonAPI("GET",`${SERVERURL}/view-books/${bookid}`,{},reqHeader)
}
//get user books
export const getUserBooksAPI=async(reqHeader)=>{
    return await commonAPI("GET",`${SERVERURL}/user-books`,{},reqHeader)
}
//delete a user added books
export const deleteAUserAddedBookAPI=async(id)=>{
    return await commonAPI("DELETE",`${SERVERURL}/delete-book/${id}`)
}
//get purchased books
export const getPurchasedBooksAPI=async(reqHeader)=>{
    return await commonAPI("GET",`${SERVERURL}/purchase-history`,{},reqHeader)

}
//update  user profile 
export const updateProfileAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVERURL}/update-user-profile`,reqBody,reqHeader)
}
//make payment called when huy btn clicked
export const makePaymentAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVERURL}/make-payment`,reqBody,reqHeader)
}
//----------------admin-------------------------
//get all books in admin
export const getAllBooksAdminAPI=async()=>{
    return await commonAPI("GET",`${SERVERURL}/get-allbooks`)
}
//approve book status
export const approveBookStatusAPI=async(id)=>{
    return await commonAPI("PUT",`${SERVERURL}/update-book/${id}`)
}
//get all users in admin
export const getAllUsersAPI=async(reqHeader)=>{
    return await commonAPI("GET",`${SERVERURL}/get-allusers`,{},reqHeader)
}
//update admin profile
export const updateAdminProfileAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVERURL}/update-admin-profile`,reqBody,reqHeader)
}
