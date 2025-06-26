import axios from 'axios';
import  { useState, useEffect, useRef } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from 'react-router-dom'
const DOMAIN = import.meta.env.VITE_DOMAIN
import Books21 from "../assets/img/Books21.jpg";
import Books22 from "../assets/img/Books22.jpg";
import Books23 from "../assets/img/Books23.jpg";
import Books24 from "../assets/img/Books24.jpg";
import Books25 from "../assets/img/Books25.jpg";
import Books26 from "../assets/img/Books26.jpg";
import Books27 from "../assets/img/Books27.jpg";



const SwiperCard = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const [cards, setCards] = useState([
  {
    id: 1,
    image: Books21,
    title: 'The Midnight Library',
    description: 'A novel about a library between life and death where each book represents a different life path.',
    price: 12.99,
    link: 'https://bookstore.com/midnight-library',
  },
  {
    id: 2,
    image: Books22,
    title: 'Project Hail Mary',
    description: 'A lone astronaut must save the earth from disaster in this science fiction adventure.',
    price: 14.99,
    link: 'https://bookstore.com/project-hail-mary',
  },
  {
    id: 3,
    image:Books23,
    title: 'The Silent Patient',
    description: 'A psychological thriller about a woman who shoots her husband and then stops speaking.',
    price: 10.49,
    link: 'https://bookstore.com/silent-patient',
  },
  {
    id: 4,
    image: Books24,
    title: 'Educated',
    description: 'A memoir about a woman who leaves her survivalist family and goes on to earn a PhD.',
    price: 13.99,
    link: 'https://bookstore.com/educated',
  },
  {
    id: 5,
    image: Books25,
    title: 'Atomic Habits',
    description: 'A guide to building good habits and breaking bad ones with proven strategies.',
    price: 11.99,
    link: 'https://bookstore.com/atomic-habits',
  },
  {
    id: 6,
    image:Books26,
    title: 'The Book Thief',
    description: 'A story set in Nazi Germany about a girl who steals books and shares them with others.',
    price: 9.99,
    link: 'https://bookstore.com/book-thief',
  },
  {
    id: 7,
    image:Books27,
    title: 'The Love Hypothesis',
    description: 'A fake dating romance between a PhD candidate and a young professor.',
    price: 8.99,
    link: 'https://bookstore.com/love-hypothesis',
  },
]);
  const [cartList,setCartList]=useState([])
  const navigate = useNavigate()

  


  const containerRef = useRef(null);

  

  useEffect(() => {

    const container = containerRef.current;
    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
    };

    const handleMouseUp = () => {
      isDown = false;
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1; 
      container.scrollLeft = scrollLeft - walk;
    };

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mousemove', handleMouseMove);

    fetchedList();
    console.log(cartList)
    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mousemove', handleMouseMove);
    };

    
    
  }, []);


  const fetchedList = async()=>{
    
    const email=localStorage.getItem('email')

    try{
        const response = await axios.get(`${DOMAIN}/getcartdetailes?email=${email}`)
        if (response.status===200){
            const fetchedList = response.data.data
            setCartList([...fetchedList])
            
        }

    }catch(e){
        console.log('something went wrong',e)
    }
  }

  const getBooked=async(title,price,image)=>{
    console.log('enter into getBooked')
    const email=localStorage.getItem('email')
    try{
       const response= await axios.post(`${DOMAIN}/addtocart`,{
        email,
        title,
        price,
        image
       })
       if(response.status===200){
        toast.success(`Successfully booked ${title} for $${price.toFixed(2)}!`)
       }
    }catch(e){
        console.log("something went wrong ",e)
    }
    fetchedList()
  }

  const getIncrement=async(title) => {
    const email=localStorage.getItem('email')
    
    try{
        const response=await axios.put(`${DOMAIN}/getIncrement`,{
            email,
            title
        })
        if (response.status===200){
            fetchedList()
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
            
            fetchedList();
        }


    }catch(e){
        console.log('something went wrong',e)
    }
  }
  
  return (
    <div className="pr-6 pl-6 md:pr-16 md:pl-16">
        <div className='flex w-full justify-between mt-5 mb-8 items-center'>
            <h1 className='font-semibold text-xl '>Daily Usage</h1>
            <p className='font-normal text-blue-600'>See More</p>
        </div>
    <div
      ref={containerRef}
      className="overflow-x-scroll  scrollbar-hide mb-4 relative"
      style={{overflowY: 'hidden',
        scrollbarWidth:"none",
      }}
    >
        
      <div className="flex snap-x snap-mandatory gap-6" style={{ width: 'max-content'}} 
      >
        
        {cards.map((card) => (
          <div key={card.id} className="flex-none w-64 snap-center">
            <div className="bg-white border-1 border border-gray-200 rounded-lg overflow-hidden mb-4">
              <img src={card.image} alt={card.title} className="w-full h-40 object-cover" onClick={()=>{navigate('/product')}}/>
              <div className="p-4">
                <h3 className="text-lg leading-6 font-bold text-gray-900">{card.title}</h3>
                <p className="text-gray-600 mt-2 text-sm">{card.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-2xl font-extrabold text-gray-900">${card.price.toFixed(2)}</span>
                  {
                    cartList.some(eachItem => eachItem.title === card.title)  ? 
                    (
                    <div className="flex items-center justify-center">
                        <button id="decrement-btn"
                            className="flex justify-center items-center w-7 h-7 rounded-full text-white focus:outline-none bg-gray-400 hover:bg-gray-500"
                            onClick={()=>{getDecrement(card.title)}}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                            </svg>
                        </button>
                        <span id="counter" className="text-2xl font-bold mx-2">
                            {cartList.find(eachItem => eachItem.title === card.title)?.quantity || 0}
                        </span>

                        <button id="increment-btn"
                            className="flex justify-center items-center w-8 h-8 rounded-full text-white focus:outline-none bg-green-500 hover:bg-green-600"
                            onClick={()=>{getIncrement(card.title)}}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12M6 12h12"></path>
                            </svg>
                        </button>
                    </div>
                    )
                    :
                    (
                    <button
                        className="text-white bg-fuchsia-950 hover:bg-fuchsia-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            onClick={()=>{getBooked(card.title,card.price,card.image)}}>
                        Buy Now
                  </button>
                    )
                    
                  }
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default SwiperCard;
