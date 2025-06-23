import {useEffect} from 'react'
import AOS from "aos";
import "aos/dist/aos.css";


const ProductImage = () => { 
    
     useEffect(()=>{
                AOS.init({
                    duration:1500,
                    once:true
                })
        })
  return (
        
    <div className="relative overflow-hidden bg-white">
        <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg" data-aos="fade-up">
            <h1 className="font text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Unveiling Pharmaceuticals:</h1>
            <p className="mt-4 text-xl text-gray-500">Book your tablets online effortlessly and get them delivered to your doorstep with ease!</p>
            </div>
            <div>
            <div className="mt-10">
                
                <div aria-hidden="true" className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl" data-aos="fade-up">
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIV_vSZrDmtJsCTHUPO6WLdwS-XAlazPPAPblQ9XInn5RlwyLUSAj4NTPm7zKJRdkLD_0&usqp=CAU" className="h-full w-full object-cover object-center" />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img src="https://thumbs.dreamstime.com/b/pharmacy-background-dark-table-levitation-pills-tablets-dark-background-which-falling-down-pills-medicine-health-67120929.jpg" alt="" className="h-full w-full object-cover object-center" />
                        </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuQy-1-E-rneosUP_BvMzvalaIBljSY-QsA2ArHSB6UqGyOqaU8Odx-y1rlDlRxE5jdCQ&usqp=CAU" alt="" className="h-full w-full object-cover object-center" />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img src="https://t3.ftcdn.net/jpg/11/56/87/74/360_F_1156877412_w6xQxfoD9oMcgRiAblD3qwYsoZVrpvaQ.jpg" alt="" className="h-full w-full object-cover object-center" />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img src="https://images.unsplash.com/photo-1628771065518-0d82f1938462?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGlsbHN8ZW58MHx8MHx8fDA%3D" alt="" className="h-full w-full object-cover object-center" />
                        </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img src="https://img.freepik.com/premium-photo/capsules-with-medicine-empty-bottle-white-background_160672-10453.jpg" alt="" className="h-full w-full object-cover object-center" />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img src="https://www.verywellhealth.com/thmb/HXweuW5iQ5_fd0d6Jzoixs_wJAo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/medicine-pills-463594335-ba46b2f34a764be6a9c0e56a308cb938.jpg" alt="" className="h-full w-full object-cover object-center" />
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                <a href="/shop" className="inline-block rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-center font-medium text-white hover:bg-indigo-700" data-aos="fade-up" >Order Now</a>
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default ProductImage
