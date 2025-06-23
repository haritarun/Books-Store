import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useState,useRef} from 'react'


const ProductPage = () => {
    const [activeIndex,setIndex]=useState(0)
    const sliderRef = useRef(null)
    var settings = {
        dots: false,
        infinite: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, 
        autoplaySpeed: 3000, 
        beforeChange:(oldIndex,newIndex)=>setIndex(newIndex)
    };

    const data = [
        {
            id: 1,
            imageUrl: "https://i.guim.co.uk/img/media/20491572b80293361199ca2fc95e49dfd85e1f42/0_236_5157_3094/master/5157.jpg?width=1200&quality=85&auto=format&fit=max&s=6c20695f8d0e980ee80d47265efee6c5",
        },
        {
            id: 2,
            imageUrl: "https://www.shutterstock.com/image-photo/bluewhite-antibiotic-capsule-pills-spread-600nw-2317028543.jpg",
        },
        {
            id: 3,
            imageUrl: "https://i.guim.co.uk/img/media/20491572b80293361199ca2fc95e49dfd85e1f42/0_236_5157_3094/master/5157.jpg?width=1200&quality=85&auto=format&fit=max&s=6c20695f8d0e980ee80d47265efee6c5",
        },
    ];

    return (
        <div className="py-8">
            <div className="max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row -mx-4">
                    
                    <div className="md:flex-1 px-4 w-[500px]">
                        
                            <Slider ref={sliderRef} {...settings}>
                                {data.map(eachItem => (
                                    <div className="h-[500px] w-[400px] bg-gray-300 dark:bg-gray-700 mb-4 rounded-3xl">
                                            <img
                                                key={eachItem.id}
                                                className="w-full h-full object-cover rounded-3xl"
                                                src={eachItem.imageUrl}
                                                alt="Product Image"
                                            />
                                    </div>
                                    
                                ))}
                            </Slider>
                        <div className="flex ">
                            {
                                data.map((eachItem,index)=>(
                                    <img src={eachItem.imageUrl} className={`w-[80px] h-[80px] mr-5 rounded-xl ${activeIndex===index ? 'opacity-100':'opacity-40'}`} onClick={()=>{
                                        sliderRef.current.slickGoTo(index)
                                        setIndex(index)
                                    }}/>
                                ))
                            }
                        </div>
                    </div>

                    
                    <div className="md:flex-1 px-4">
                        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
                            Citrozen 10 Tablets (10 mg)
                        </h2>

                        <div>
                            <h1 className="text-2xl font-semibold mt-5">Manufacturer</h1>
                            <p className="text-green-800 text-xl mt-1">ABC Products</p>

                            <h1 className="text-2xl font-semibold mt-5">Type</h1>
                            <p className="text-green-800 text-xl mt-1">Tablet (Oral)</p>

                            <h1 className="text-2xl font-semibold mt-5">Composition</h1>
                            <p className="text-green-800 text-xl mt-1">Paracetamol + Excipients</p>

                            <h1 className="text-2xl font-semibold mt-5">Strength</h1>
                            <p className="text-green-800 text-xl mt-1">500mg</p>

                            <h1 className="text-2xl font-semibold mt-5">Expires on</h1>
                            <p className="text-green-800 text-xl mt-1">12/2/2025</p>

                            
                            <div className="flex mt-10">
                                <button className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition duration-300 mr-5">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                    </svg>
                                    Add to Cart
                                </button>

                                <button className="bg-gray-200 flex gap-2 items-center text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                    </svg>
                                    Wishlist
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
