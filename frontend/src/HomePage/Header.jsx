import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link ,useNavigate} from "react-router-dom";
import { FaAngleDoubleDown, FaAngleDoubleUp, FaBars, FaTimes } from "react-icons/fa";
import Profile from "./Profile";
import { GrLocation } from "react-icons/gr";
import { RiArrowDropDownLine } from "react-icons/ri";
import Location from "./Location";
import axios from "axios";
import { RiArrowDropUpLine } from "react-icons/ri";

const DOMAIN = import.meta.env.VITE_SOCKET_DOMAIN


const Navbar = () => {
  const navigate = useNavigate()
  
  const [area,setArea]=useState(null)
  const [city,setCity]=useState(null)
  const [state,setState]=useState(null)
  const [pincode,setPincode]=useState(null)
  const [isEmail,setEmail]=useState(!(localStorage.getItem("email")==null))
  
 
  useEffect(() => {
    console.log("Updated Area:", area);
  }, [area]); 
  
  useEffect(() => {
    console.log("Updated City:", city);
  }, [city]); 
  
  useEffect(() => {
    console.log("Updated State:", state);
  }, [state]); 
  
  useEffect(() => {
    console.log("Updated Pincode:", pincode);
  }, [pincode]); 
  
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
    });
    fetchedList();
  }, []);

  const fetchedList= async ()=>{
    const email = localStorage.getItem("email")
    try{
      const response = await axios.get(`${DOMAIN}/getLocation?email=${email}`)
      if(response.status===200){
        
        setArea(response.data[0].area)
        setCity(response.data[0].city)
        setState(response.data[0].state)
        setPincode(response.data[0].pincode)
        
      }
    }
    catch(e){
      console.log("something went wrong",e)
    }
  }

  const [shopOpen, setShopOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLocation,setLocation] = useState(false)

  const handleOutsideClick = (e) => {
    if (!e.target.closest(".dropdown-menu")) {
      setShopOpen(false);
      setFeaturesOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const getHandle =()=>{
    localStorage.clear()
    navigate('/login')


  }

  

  return (
    <nav className="sticky top-0 w-full bg-white shadow-lg z-50">
      <div className="flex items-center justify-between px-5 py-4 md:px-10">
        
        <Link to="/" className="flex items-center text-xl font-semibold text-gray-500 ">
          <p className="hover:text-gray-900  transition text-xl">Logo</p>
          <div className="hidden md:inline-flex ml-5 hover:text-gray " onClick={()=>setLocation(!isLocation)}>
              <GrLocation size={25} color="green " className="mt-1"/>
              {
                area!==null ? 
                <p className="text-[15px] text-green-700 mt-1">
                   {
                    area 
                   }
                   <span className="ml-1">{pincode}</span>
                </p>
                :
                <p className="text-[15px] text-green-700 mt-1">Add Location</p>
              }
              {
                isLocation ?
                <RiArrowDropUpLine size={35} color="green " />
                :
                <RiArrowDropDownLine size={35} className="green" />
              }
              
          </div>
          {
            isLocation && (
              <div className="absolute left-20 mt-40 w-fit bg-white border rounded-md shadow-lg">
                  <Location />
              </div>
            )
          }
        </Link>
        
        
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-600 focus:outline-none">
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          
        </div>

       
        <div className="hidden md:flex justift-start space-x-8">
  
          <div className="relative dropdown-menu" onMouseEnter={() => setShopOpen(true)} onMouseLeave={() => setShopOpen(false)}>
            <div className="flex items-center cursor-pointer">
              <Link to="/shop" className="text-gray-500 hover:text-gray-900 transition">Store</Link>
              {shopOpen ? <FaAngleDoubleDown size={15} className="ml-1" /> : <FaAngleDoubleUp size={15} className="ml-1" />}
            </div>

            {shopOpen && (
              <div className="pt-5 flex justify-between pl-4 pr-4 absolute -ml-64 w-[70vw] bg-green-50 bg-opacity-100 opacity-95 shadow-md rounded-lg py-2">
              <div className="flex flex-col">
                  <h1 className="text-green-900 font-semibold text-md hover:underline">Medicines</h1>

                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Antibiotics</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Painkillers</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Anti</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Diabetes</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Blood Pressure</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Diabetes</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Blood Pressure</p>
              </div>
              <div>
                 <h1 className="text-green-900 font-semibold text-md hover:underline">Vitamins</h1>

                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Antibiotics</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Painkillers</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Anti</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Diabetes</p>
              
                  
              </div>
              <div>
                <h1 className="text-green-900 font-semibold text-md hover:underline">First Aid</h1>

                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Antibiotics</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Painkillers</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Anti</p>
                  
                  
              </div>
              <div>
                  <h1 className="text-green-900 font-semibold text-md hover:underline">Personal Care </h1>

                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Antibiotics</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Painkillers</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Anti</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Diabetes</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Blood Pressure</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Diabetes</p>
                 
                 
                </div>
                <div>
                  <h1 className="text-green-900 font-semibold text-md hover:underline"> Baby</h1>

                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Antibiotics</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Painkillers</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Anti</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Diabetes</p>
                 
                  </div>
                  <div>
                    <h1 className="text-green-900 font-semibold text-md hover:underline">Medical Equipment</h1>

                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Antibiotics</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Painkillers</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Anti</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Diabetes</p>
                 
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Blood Pressure</p>
                 
                    </div>
                    <div>
                      <h1 className="text-green-900 font-semibold text-md hover:underline"> General Items</h1>

                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Antibiotics</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Painkillers</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Anti</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Diabetes</p>
                 
                  
                    </div>
            </div>

            )}
          </div>

         
          <div className="relative dropdown-menu" onMouseEnter={() => setFeaturesOpen(true)} onMouseLeave={() => setFeaturesOpen(false)}>
            <div className="flex items-center cursor-pointer">
              <span className="text-gray-500 hover:text-gray-900 transition">Features</span>
              {featuresOpen ? <FaAngleDoubleDown size={15} className="ml-1" /> : <FaAngleDoubleUp size={15} className="ml-1" />}
            </div>

            {featuresOpen && (
              <div className="pt-5 flex justify-between pl-4 pr-4 absolute left-0 -ml-60  w-[70vw] bg-green-50 bg-opacity-100 opacity-95 shadow-md rounded-lg py-2">
              <div className="flex flex-col">
                  <h1 className="text-green-900 font-semibold text-md hover:underline">Easy Online Ordering</h1>

                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Antibiotics</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Painkillers</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Anti</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Diabetes</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Blood Pressure</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Diabetes</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Blood Pressure</p>
              </div>
              <div>
                 <h1 className="text-green-900 font-semibold text-md hover:underline">Order & Delivery </h1>

                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Antibiotics</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Painkillers</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Anti</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Diabetes</p>
              
                  
              </div>
              <div>
                <h1 className="text-green-900 font-semibold text-md hover:underline"> Pharmacy Dashboard</h1>

                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Antibiotics</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Painkillers</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Anti</p>
                  
                  
              </div>
              <div>
                  <h1 className="text-green-900 font-semibold text-md hover:underline">Admin Panel</h1>

                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Antibiotics</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Painkillers</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Anti</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Diabetes</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Blood Pressure</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Diabetes</p>
                 
                 
                </div>
                <div>
                  <h1 className="text-green-900 font-semibold text-md hover:underline">Advanced Features </h1>

                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Antibiotics</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Painkillers</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Anti</p>
                  <p className="text-green-800 text-md mt-5 font-light hover:font-normal">Diabetes</p>
                 
                  </div>
                  
            </div>

            )}
          </div>

          <Link to="/chat" className="text-gray-500 hover:text-gray-900 transition">Chat</Link>
          <Link to="/store" className="text-gray-500 hover:text-gray-900 transition">Store</Link>
          <Link to="/order" className="text-gray-500 hover:text-gray-900 transition">Cart</Link>
        </div>

       
        {
          !isEmail ?
            <div className="hidden md:flex space-x-4">
            <Link to="/register" className="text-blue-600 hover:text-blue-500 transition">Sign up</Link>
            <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition">Login</Link>
          </div>
          :(
            <div className="hidden md:flex space-x-4">
                <Profile />
              </div> 
          )

        }
      </div>


      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full py-5 px-5">
          <Link to="/shop" className="block py-2 text-gray-600 hover:text-gray-900">Shop</Link>
          <Link to="/features" className="block py-2 text-gray-600 hover:text-gray-900">Features</Link>
          <Link to="/chat" className="block py-2 text-gray-600 hover:text-gray-900">Chat</Link>
          <Link to="/store" className="block py-2 text-gray-600 hover:text-gray-900">Store</Link>
          <Link to="/order" className="block py-2 text-gray-600 hover:text-gray-900">Cart</Link>
          <Link to="/profile" className="block py-2 text-gray-600 hover:text-gray-900">Profile</Link>
          <div className="mt-4 border-t pt-4 ">
            
            <Link to="/login" className="block bg-red-600 text-white text-center py-2 rounded-lg hover:bg-blue-500 transition" onClick={getHandle}>Logout</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
