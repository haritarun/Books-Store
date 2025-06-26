import { useEffect ,useState} from "react"
import axios from "axios"
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import {Link} from 'react-router-dom'
import { motion } from "framer-motion";

const DOMAIN = import.meta.env.VITE_DOMAIN

const OrderSummery = () => {
    const [data,setData]=useState([])
    const [userData,setuserData]=useState({})
    const [firstName,setFirstName]=useState('tarunbommana')
    const [phoneNo,setPhoneno]=useState('9010144168')
    const [email,setEmail]=useState('tarunbommana798@gmail.com')
    const [area,setArea]=useState('boppadam')
    const [city,setCity]=useState('Viziyanagaram')
    const [state,setState]=useState('andraPradesh')
    const [zipCode,setZipcode]=useState('535218')
    const [saved, setSaved] = useState(false);
    

    
    useEffect(()=>{
        fetchedList()
        fetcheUserdata()

    },[])
    
    const total = data.reduce((sum,item)=>sum+item.price*item.quantity,0)

    const fetchedList=async()=>{
        const email=localStorage.getItem("email")
        
        try{
            const response=await axios.get(`${DOMAIN}/getDetailes?email=${email}`)
            setData(response.data)   
            
        }catch(e){
            console.log('something went wrong',e)
        }
    }

    const fetcheUserdata=async()=>{
        const email=localStorage.getItem("email")
        try{
            const response=await axios.get(`${DOMAIN}/getuserdetailes?email=${email}`)
            if (response.status==200){
                
                setuserData(response.data)

                
            }
        }catch(e){
            console.log('something went wrong',e)
        }
    }

    const getDecrement =async(title)=>{
        const email=localStorage.getItem('email')
        console.log('enter into getIncrement')
        try{
            const response=await axios.put(`${DOMAIN}/getDecrement`,{
                email,
                title
            })
    
            if (response.status==200){
                console.log('successfully incremented')
                fetchedList();
            }
    
    
        }catch(e){
            console.log('something went wrong',e)
        }
    }

    const getIncrement=async(title) => {
        const email=localStorage.getItem('email')
        try{
            const response=await axios.put(`${DOMAIN}/getIncrement `,{
                email,
                title
            })
            if (response.status===200){
                fetchedList()
            }
    
    
        }catch(e){
            alert('something went wrong',e)
        }
      }

    const getSave=async()=>{
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
        try{
            const response = await axios.post(`${DOMAIN}/addressPost`,{
                firstName,
                phoneNo,
                email,
                area,
                city,
                state,
                zipCode,
            })
            if(response.status==200){
                console.log('added successfully')
                
            }
        }catch(e){
            console.log("something went Wrong",e)
        }
    }

  return (
        <div className="py-5 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
            {
            saved && (
            <motion.div
                className="fixed top-20 right-5 bg-green-500 text-white text-center py-2 px-4 rounded-md shadow-lg flex items-center justify-center gap-2"
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }} 
                transition={{ duration: 0.5, ease: "easeOut" }} 
            >
                Address Saved Successfully 🎉
                <motion.div
                    className="h-2 bg-green-200 absolute bottom-0 left-0 w-full"
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />
            </motion.div>
                )}
        <div className="flex justify-start item-start space-y-2 flex-col">
            <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Order {data.length}</h1>
            <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">21st Mart 2021</p>
        </div> 
        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
            <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                    <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">Customer’s Cart</p>
                    {
                        data.map(eachItem=>(
                            <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                <div className="pb-4 md:pb-8 w-full md:w-40">
                                    <img className="w-full hidden md:block" src={eachItem.imageurl} alt="dress" />
                                    <img className="w-full md:hidden" src={eachItem.imageurl} alt="dress" />
                                </div>
                                <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                    <div className="w-full flex flex-col justify-start items-start space-y-8">
                                        <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">{eachItem.title}</h3>
                                        <div className="flex justify-start items-start flex-col space-y-2">
                                            <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Style: </span> Medicine From Inida</p>
                                            <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Size: </span> 100 mg</p>
                                            <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Color: </span> Light Blue</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between space-x-8 items-start w-full">
                                        <p className="text-base dark:text-white xl:text-lg leading-6">{(eachItem.price*eachItem.quantity).toFixed(2)} <span className="text-red-300 line-through"> {(eachItem.price+(eachItem.price*0.80)).toFixed(2)}</span></p>
                                        <div className="flex items-center justify-center">
                                            <button id="decrement-btn"
                                                className="flex justify-center items-center w-5 h-5 rounded-full text-white focus:outline-none bg-gray-400 hover:bg-gray-500"
                                                onClick={()=>{getDecrement(eachItem.title)}} 
                                                >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                                                </svg>
                                            </button>
                                            <span id="counter" className="text-2xl font-bold mx-2">
                                                {eachItem.quantity
                                                
                                                }
                                            </span>

                                            <button id="increment-btn"
                                                className="flex justify-center items-center w-5 h-5 rounded-full text-white focus:outline-none bg-green-500 hover:bg-green-600"
                                                onClick={()=>{getIncrement(eachItem.title)}}
                                                >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12M6 12h12"></path>
                                                </svg>
                                            </button>
                                        </div>
                                        <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">{(eachItem.price*eachItem.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                                            ))
                    }
                    
                </div>
                <div className="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                    <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                        <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Summary</h3>
                        <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                            <div className="flex justify-between w-full">
                                <p className="text-base dark:text-white leading-4 text-gray-800">Subtotal</p>
                                <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{total.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <p className="text-base dark:text-white leading-4 text-gray-800">Discount <span className="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800">STUDENT</span></p>
                                <p className="text-base dark:text-gray-300 leading-4 text-gray-600">-$28.00 (50%)</p>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <p className="text-base dark:text-white leading-4 text-gray-800">Shipping</p>
                                <p className="text-base dark:text-gray-300 leading-4 text-gray-600">$8.00</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center w-full">
                            <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
                            <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">{total.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                        <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Shipping</h3>
                        <div className="flex justify-between items-start w-full">
                            <div className="flex justify-center items-center space-x-4">
                                <div className="w-8 h-8">
                                    <img className="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
                                </div>
                                <div className="flex flex-col justify-start items-center">
                                    <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800">Fast Delivery<br /><span className="font-normal">Delivery with 3 Hours</span></p>
                                </div>
                            </div>
                            <p className="text-lg font-semibold leading-6 dark:text-white text-gray-800">$8.00</p>
                        </div>
                        <div className="w-full flex justify-center items-center">
                            <Link to="/finalorder" className="w-full flex justify-center items-center">
                                <button className="hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">
                                    Order Now   
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Customer</h3>
                <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                    <div className="flex flex-col justify-start items-start flex-shrink-0">
                        <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                            <img src="https://i.ibb.co/5TSg7f6/Rectangle-18.png" alt="avatar" />
                            <div className="flex justify-start items-start flex-col space-y-2">
                                <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">{userData.firstName+" "+userData.lastName}</p>
                                <p className="text-sm dark:text-gray-300 leading-5 text-gray-600">1 Previous Orders</p>
                            </div>
                        </div>

                        <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                            <img className="dark:hidden" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1.svg" alt="email" />
                            <img className="hidden dark:block" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1dark.svg" alt="email" />
                            <p className="cursor-pointer text-sm leading-5 ">{userData.email}</p>
                        </div>
                    </div>
                    <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                        <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                            <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                                <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address</p>
                                <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">180 Nuzvid Mangalavaram Road</p>
                            </div>
                            <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                                <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Billing Address</p>
                                <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">180 North King Street, Northhampton MA 1060</p>
                            </div>
                        </div>
                        <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                            
                            <Popup trigger={<button className="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base font-medium leading-4 text-gray-800"
                            >
                                Edit Details
                            </button>} 
                            modal
                            nested>
                                {(close) => (
                                <div className="md:flex items-center justify-center p-12 xs:p-6">
                                
                                    <div className="xs:max-w-lg mx-auto w-full max-w-[550px] bg-white">
                                        <form>
                                            <div className="mb-5">
                                                <label for="name" className="mb-3 block text-base font-medium text-[#07074D]">
                                                    Full Name
                                                </label>
                                                <input type="text" name="name" id="name" placeholder="Full Name" value={firstName}
                                                    className="sm:px  sm:py-2 w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                            </div>
                                            <div className="mb-5">
                                                <label for="phone" className="mb-3 block text-base font-medium text-[#07074D]">
                                                    Phone Number
                                                </label>
                                                <input type="text" name="phone" id="phone" placeholder="Enter your phone number" value={phoneNo}
                                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                            </div>
                                            <div className="mb-5">
                                                <label for="email" class="mb-3 block text-base font-medium text-[#07074D]">
                                                    Email Address
                                                </label>
                                                <input type="email" name="email" id="email" placeholder="Enter your email" value={email}
                                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                            </div>
                                            
                                
                                            <div className="mb-5 pt-3">
                                                <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                                                    Address Details
                                                </label>
                                                <div className="-mx-3 flex flex-wrap">
                                                    <div className="w-full px-3 sm:w-1/2">
                                                        <div className="mb-5">
                                                            <input type="text" name="area" id="area" placeholder="Enter area" value={area}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                                        </div>
                                                    </div>
                                                    <div className="w-full px-3 sm:w-1/2">
                                                        <div className="mb-5">
                                                            <input type="text" name="city" id="city" placeholder="Enter city" value={city}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                                        </div>
                                                    </div>
                                                    <div className="w-full px-3 sm:w-1/2">
                                                        <div className="mb-5">
                                                            <input type="text" name="state" id="state" placeholder="Enter state" value={state}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                                        </div>
                                                    </div>
                                                    <div className="w-full px-3 sm:w-1/2">
                                                        <div className="mb-5">
                                                            <input type="text" name="post-code" id="post-code" placeholder="Post Code" value={zipCode}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                
                                            <div className="flex justify-between">
                                                <button
                                                    className="hover:shadow-form w-[40%] rounded-md bg-gray-400 py-3 px-8 text-center text-base font-semibold text-white outline-none hover:bg-gray-500" onClick={close}>
                                                    Close
                                                </button>
                                                <button
                                                    className="hover:shadow-form w-[40%] rounded-md bg-green-400 py-3 px-8 text-center text-base font-semibold text-white outline-none hover:bg-green-600"  onClick={()=>{
                                                        getSave()
                                                        close()
                                                        }}>
                                                    Save
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                )}
                            </Popup>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
  )
}

export default OrderSummery
