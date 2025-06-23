import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { CgProfile } from "react-icons/cg";


const Profile = () => {
    const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false);
    const handleLogout=()=>{
        localStorage.clear()
        navigate('/login')
    }
  return (
    <div className="relative">
        
        <CgProfile 
        className="rounded-full cursor-pointer"
        onClick={() => setShowMenu(!showMenu)}
        size={30}
        color="gray"/>
      

      
      {showMenu && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg">
            <Link to="/profile" className="block w-full px-4 py-2 text-left text-gray-700" >Profile</Link>
          <button
            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-red-500 hover:text-white"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default Profile