import axios from 'axios'
import {useEffect,useState} from 'react'
import { FiShoppingCart } from "react-icons/fi"
import {Link} from 'react-router-dom'
const DOMAIN = import.meta.env.VITE_DOMAIN

const Cart = () => {
    const [data,setData]=useState([])
    
    useEffect(()=>{
        
        fetchedList()
    })
    
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
  return (
        <>
            {
                data.length!==0 && (
                    <div className='flex justify-center sticky top-[90%] z-50' >
                        <div className='w-[900px] flex justify-between rounded-md bg-green-50 min-h-fit h-20 items-center rounded-t-2xl'> 
                            <div className='pl-10 flex'>
                            <FiShoppingCart size={30} className='mt-2'/>
                            <div className='flex flex-col ml-4'>
                                <div className='flex '>
                                    <h1>Items</h1>
                                    <h1 className='text-gray-600 font-bold ml-1'>{data.length}</h1>
                                </div>
                                <div className='text-gray-700 font-semibold text-xl'>
                                    {total.toFixed(2)}
                                </div>
                            </div>
                            </div>
                            <div>
                                <Link to="/order">
                                    <button className='mr-10 bg-green-500 p-3 rounded-lg text-white font-semibold hover:bg-green-600'
                                    >
                                        View Cart
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
  )
}

export default Cart
