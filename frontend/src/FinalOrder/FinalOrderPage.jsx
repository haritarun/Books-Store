    import { RiArrowDropDownLine } from "react-icons/ri";
    import { RiArrowDropUpLine } from "react-icons/ri";
    import { useEffect,useState } from "react";
    import axios from "axios";
    import Popup from "reactjs-popup";
    import "reactjs-popup/dist/index.css";
    import { useNavigate } from "react-router-dom";
    import { motion } from "framer-motion";
    import { toast } from "react-toastify";
    import "react-toastify/dist/ReactToastify.css";

    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
    const DOMAIN = import.meta.env.VITE_DOMAIN


    const FinalOrderPage = () => {
        const [address,setAddress]=useState([])
        const [isShow,setShow]=useState([])
        const [data,setData]=useState([])
        const [fullName,setFirstName]=useState('')
        const [phoneNo,setPhoneno]=useState('') 
        const [area,setArea]=useState('')
        const [city,setCity]=useState('')
        const [state,setState]=useState('')
        const [zipCode,setZipcode]=useState('')
        const [refresh,setRefresh] = useState(true)
        const navigate = useNavigate()
        const [saved, setSaved] = useState(false);
        const [loading, setLoading] = useState(false);
    


        useEffect(()=>{
            fetchedList();
            fetchedData();
            
        },[refresh])

        const fetchedData=async()=>{
            const email=localStorage.getItem("email")
            try{
                const response=await axios.get(`${DOMAIN}/getDetailes?email=${email}`)
                setData(response.data) 
                    
            }catch(e){
                console.log('something went wrong',e)
            }
        }

        
            let amount = data.reduce((sum, item) => sum + item.price * item.quantity, 0);
       
            const loadRazorpayScript = () => {
                return new Promise((resolve) => {
                const script = document.createElement('script');
                script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                script.onload = () => resolve(true);
                script.onerror = () => resolve(false);
                document.body.appendChild(script);
                });
            };

            const handlePayment = async () => {
                try {
                setLoading(true);
                    
                const total = amount
                
                if (total < 1) {
                    toast.error('Minimum order amount is ₹1.00');
                    return;
                }

                
                const scriptLoaded = await loadRazorpayScript();
                if (!scriptLoaded) throw new Error('Failed to load Razorpay');

                
                const { data } = await axios.post(`${DOMAIN}/create-order`, {
                    amount: total,
                    currency: 'INR'
                });

                if (!data.success) throw new Error(data.message);

                
                const options = {
                    key: razorpayKey,
                    amount: data.order.amount,
                    currency: data.order.currency,
                    order_id: data.order.id,
                    name: fullName || 'user',
                    description: 'Order Payment',
                    handler: async (response) => {
                    try {
                        await axios.post(`${DOMAIN}/verify-payment`, response);
                        toast.success('Payment Successful!');
                        // Redirect or update state here
                    } catch (error) {
                        toast.error('Payment verification failed');
                    }
                    },
                    theme: {
                    color: '#3399cc'
                    }
                };

                const rzp = new window.Razorpay(options);
                rzp.open();

                } catch (error) {
                toast.error(error.response?.data?.message || error.message);
                console.error('Payment Error:', error);
                } finally {
                setLoading(false);
                }
            };

        
        

        const fetchedList=async()=>{
            const email = localStorage.getItem("email")
        
            try{
                const response = await axios.get(`${DOMAIN}/getAddress?email=${email}`)
                if (response.status===200){
                    setAddress(response.data)                
                }
            }
            catch(e){
                console.log("something went wrong ",e)
            }
        }

        const getSave=async()=>{
            const email = localStorage.getItem('email')
            try{
                const response = await axios.post(`${DOMAIN}/addressPost`,{
                    fullName,
                    phoneNo,
                    email,
                    area,
                    city,
                    state,
                    zipCode,
                })
                if(response.status === 200 ||response.status === 204){                        
                    setSaved(true);             
                    setTimeout(() => setSaved(false), 2000);       
                    fetchedList()      
                }
            }catch(e){
                console.log("something went Wrong",e)
            }
        }

        const getRemoved = async (title) => {
            const email= localStorage.getItem('email')
            try{
                const response= await axios.post(`${DOMAIN}/deleteItem`,{
                    email,
                    title
                })
                if(response.status==200){
                    console.log('successfully removed')
                    fetchedData()
                }
            }catch(e){
                console.log("something went wrong",e)
            }
        }


        const getChangeName=(event)=>{
            setFirstName(event.target.value)
        }

        const getChangeNo=(event)=>{
            setPhoneno(event.target.value)
        }

        const getChangearea=(event)=>{
            setArea(event.target.value)
        }

        const getChangeCity=(event)=>{
            setCity(event.target.value)
        }

        const getChangeState=(event)=>{
            setState(event.target.vaue)
        }

        const getChangezopcode=(event)=>{
            setZipcode(event.target.value)
        }

        const getShowChange=(id)=>{
            setShow([...isShow,id])
        }

        const getShowDelete=(name)=>{
            const filterData = isShow.filter(eachItem=>eachItem!==name)
            setShow(filterData)
        }

        const total = data.reduce((sum,item)=>sum+item.price*item.quantity,0)

        

    return (
        
        <div className="flex flex-col md:flex-row justify-between min-h-screen px-4 sm:px-8 md:px-20 pt-10 md:pt-20">
            {saved && (
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
            
                <div className="bg-gray-100 rounded-lg p-6 w-full md:w-[45%] h-fit">
                    <h1 className="text-2xl font-bold mb-6">Address</h1>
                    

                    {
                        address.map((eachItem, index) => (
                        <div key={eachItem.id} className="flex flex-col mb-4">
                            
                            <div className="flex justify-between w-full">
                                <h1>Address {index + 1}</h1>
                                {
                                isShow.find(item=>item===eachItem.fullName) ? 
                                    <RiArrowDropUpLine size={30} onClick={() => getShowDelete(eachItem.fullName)} /> :
                                    <RiArrowDropDownLine size={30} onClick={() => getShowChange(eachItem.fullName)} />
                                }
                            </div>
                            {isShow.find(item=>item===eachItem.fullName) && (
                                <div>
                                
                                    <p>{eachItem.fullName}</p>
                                    <p>{eachItem.phoneNo}</p>
                                    <div className="flex">
                                        <p>{eachItem.area},</p>
                                        <p className="ml-1">{eachItem.city},</p>
                                        <p className="ml-1">{eachItem.state},</p>
                                        <p className="ml-1">{eachItem.zipCode}</p>
                                    </div>
                                    
                                </div>
                                
                            )}
                        </div>
                    ))}
                
                    <div>
                                    <Popup trigger={
                                        <button className="bg-blue-600 p-3 rounded-lg text-white w-full mt-5 hover:bg-blue-800">
                                        Add Address
                                        </button>}
                                        modal
                                        
                                    >
                                    {
                                        (close)=>(
                                            <div className="flex items-center justify-center p-6 sm:p-12">   
                                                <div className="mx-auto w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
                                                
                                                        <div className="mb-5">
                                                            <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Full Name
                                                            </label>
                                                            <input type="text" className="name" id="name" placeholder="Full Name" value={fullName} 
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" onChange={getChangeName}/>
                                                        </div>
                                                        <div className="mb-5">
                                                            <label htmlFor="phone" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Phone Number
                                                            </label>
                                                            <input type="text" className="phone" id="phone" placeholder="Enter your phone number" value={phoneNo}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" onChange={getChangeNo}/>
                                                        </div>
                                                        
                                                    
                                                        <div className="mb-5 pt-3">
                                                            <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                                                                Address Details
                                                            </label>
                                                            <div className="-mx-3 flex flex-wrap">
                                                                <div className="w-full px-3 sm:w-1/2">
                                                                    <div className="mb-5"> 
                                                                        <input type="text" className="area" id="area" placeholder="Enter area" value={area}
                                                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" onChange={getChangearea}/>
                                                                    </div>
                                                                </div>
                                                                <div className="w-full px-3 sm:w-1/2">
                                                                    <div className="mb-5"> 
                                                                        <input type="text" className="city" id="city" placeholder="Enter city" value={city}
                                                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" onChange={getChangeCity}/>
                                                                    </div>
                                                                </div>
                                                                <div className="w-full px-3 sm:w-1/2">
                                                                    <div className="mb-5">
                                                                        <input type="text" name="state" id="state" placeholder="Enter state" value={state}
                                                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" onChange={getChangeState}/>
                                                                    </div>
                                                                </div>
                                                                <div className="w-full px-3 sm:w-1/2">
                                                                    <div className="mb-5">
                                                                        <input type="text" className="post-code" id="post-code" placeholder="Post Code" value={zipCode} 
                                                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" onChange={getChangezopcode}/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="flex justify-between">
                                                                <button
                                                                    className="hover:shadow-htmlForm w-[40%] rounded-md bg-gray-400 py-3 px-8 text-center text-base font-semibold text-white outline-none hover:bg-gray-500" onClick={close}>
                                                                    Close
                                                                </button>
                                                                <button
                                                                    className="hover:shadow-htmlForm w-[40%] rounded-md bg-green-400 py-3 px-8 text-center text-base font-semibold text-white outline-none hover:bg-green-600" onClick={()=>
                                                                        {
                                                                        getSave()
                                                                        close()
                                                                        }
                                                                    } >
                                                                    Save
                                                                </button>
                                                            </div>
                                                                
                                                            </div>
                                                        </div>
                                        )
                                    }
                                    </Popup>
                    </div>

                </div>
                    
                <div className="w-full md:w-[40%] mx-auto mt-10 md:mt-0 ">
                    
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 bg-gray-200">
                            <h1 className="text-lg font-bold">Shopping Cart</h1>
                            <span className="text-gray-600">{data.length} items</span>
                        </div>
                        {
                            data.map(eachItem=>(
                                <div className="p-4">
                                    <div className="flex items-center mb-4">
                                        <img className="h-16 w-16 object-contain rounded-lg mr-4" src="https://picsum.photos/200/200"
                                            alt="Product" />
                                        <div className="flex-1">
                                            <h2 className="text-lg font-bold">{eachItem.title}</h2>
                                            <span className="text-gray-600">{eachItem.price}</span>
                                        </div>
                                        <button className="text-gray-600 hover:text-red-500">
                                                <button className="relative w-full p-4 text-blue-500 font-bold rounded-lg overflow-hidden group hover:text-white">
                                                    <span className="absolute inset-0 bg-blue-500  text-white scale-0 group-hover:scale-100 transition-transform duration-00 ease-in-out rounded-lg "></span>
                                                    <Popup trigger={<span className="relative" >Remove</span>}
                                                    modal>
                                                        {
                                                            (close)=>(
                                                                <div class="p-6 pt-0 text-center">
                                                                <svg class="w-20 h-20 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                                    xmlns="http://www.w3.org/2000/svg">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                                </svg>
                                                                <h3 class="text-xl font-normal text-gray-500 mt-5 mb-6">Are you sure you want to delete this user?</h3>
                                                                <button onClick={()=>{
                                                                    getRemoved(eachItem.title)
                                                                    close()}}
                                                                    class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                                                                    Yes, I'm sure
                                                                </button>
                                                                <button
                                                                    class="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
                                                                    data-modal-toggle="delete-user-modal" 
                                                                    onClick={close}>
                                                                    No, cancel
                                                                </button>
                                                            </div>
                                                            )
                                                        }
                                                    </Popup>
                                                </button>
                                        </button>
                                    </div>
                                    
                                </div>
                            ))
                        }
                        <div className="px-4 py-3 bg-gray-200">
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-lg">Total:</span>
                                <span className="font-bold text-lg">{total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mt-4"> 
                                <button className="relative w-1/2 text-white font-bold rounded-lg overflow-hidden group" onClick={()=>{navigate('/order')}}>
                                    <span className="absolute inset-0 bg-slate-500 scale-0 group-hover:scale-100 transition-transform duration-00 ease-in-out rounded-lg"></span>
                                    <span className="relative ">Check out</span>
                                </button>
                                <button 
                                onClick={()=>{handlePayment()}}
                                className="block w-[40%]  bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                    Order Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        
    )
    }

    export default FinalOrderPage