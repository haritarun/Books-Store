import axios from 'axios';
import  { useState, useEffect, useRef } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from 'react-router-dom'
const DOMAIN = import.meta.env.VITE_DOMAIN


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
      image: `https://loremflickr.com/300/200/${encodeURIComponent('grape')}`,
      title: 'Cocktail',
      description: 'Tropical mix of flavors, perfect for parties.',
      price: 8.99,
      link: 'https://lqrs.com',
    },
    {
      id: 2,
      image: `https://loremflickr.com/300/200/${encodeURIComponent('apple')}`,
      title: 'Smoothie',
      description: 'Refreshing blend of fruits and yogurt,perfect for parties',
      price: 5.49,
      link: 'https://lqrs.com',
    },
    {
      id: 3,
      image: `https://loremflickr.com/300/200/${encodeURIComponent('banana')}`,
      title: 'Iced Coffee',
      description: 'Cold brewed coffee with a hint of vanilla.',
      price: 4.99,
      link: 'https://lqrs.com',
    },
    {
      id: 4,
      image: `https://loremflickr.com/300/200/${encodeURIComponent('berry')}`,
      title: 'Mojito',
      description: 'Classic Cuban cocktail with mint and lime.',
      price: 7.99,
      link: 'https://lqrs.com',
    },
    {
      id: 5,
      image: `https://loremflickr.com/300/200/${encodeURIComponent('orange')}`,
      title: 'Matcha Latte',
      description: 'Creamy green tea latte, rich in antioxidants.',
      price: 6.49,
      link: 'https://lqrs.com',
    },
    {
      id: 6,
      image: `https://loremflickr.com/300/200/${encodeURIComponent('peach')}`,
      title: 'Fruit Punch',
      description: 'Sweet and tangy punch, bursting with fruity flavors.',
      price: 3.99,
      link: 'https://lqrs.com',
    },
    {
      id: 7,
      image: `https://loremflickr.com/300/200/${encodeURIComponent('cherry')}`,
      title: 'Bubble Tea',
      description: 'Chewy tapioca pearls in a sweet milk tea base.',
      price: 4.99,
      link: 'https://lqrs.com',
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
