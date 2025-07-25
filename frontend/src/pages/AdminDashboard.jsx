import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import chroma from "chroma-js";
import axios from "axios";


const DOMAIN = import.meta.env.VITE_DOMAIN || "http://localhost:5000";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  
  const [userLength, setUserLength] = useState(0);
  const [orderLength, setOrderLength] = useState(0);
  const [productLength, setProductLength] = useState(0);
  const [feedbackLength, setFeedbackLength] = useState(0);
  const lengthArray = [userLength, orderLength, productLength, feedbackLength];

  useEffect(() => {
    fetchedList()
  },[])

  const fetchedList = async () => {
    try { 
      const response = await axios.get(`${DOMAIN}/getLength`)
      
      setUserLength(response.data[0].cartCount);
      setOrderLength(response.data[0].userCount);
      setProductLength(response.data[0].orderCount);
      setFeedbackLength(response.data[0].feedbackCount);
      


    } catch (error) {

      console.error("Error fetching data:", error); 
    }
  };
  
  const labels = ["Users","Orders", "Products","Feedback"];
  const values =  lengthArray; 
  const colorScale = chroma
    .scale(["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"])
    .mode("lch")
    .colors(labels.length);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Data Overview",
        data: values,
        backgroundColor: colorScale,
        borderColor: "#ffffff",
        borderWidth: 1,
        hoverBackgroundColor: chroma.scale(["#FF0000"]).colors(labels.length),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          display: false,
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 relative">

      <button
        className="md:hidden fixed top-6 right-5 p-1  bg-gray-800 text-white rounded w-10"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        ☰
      </button>


      <aside
        className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 fixed md:static inset-y-0 left-0 z-40 w-64 
          bg-gray-800 text-white flex flex-col transition-transform duration-300
          ease-in-out`}
      >
        <div className="p-4 text-center font-bold text-xl border-b border-gray-700 flex justify-between items-center">
          <span>Admin Dashboard</span>
          <button
            aria-label="Close Sidebar"
            className="block md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            ✕
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
          <Link to="/admindashboard" className="block py-2 px-4 rounded hover:bg-gray-700 transition">
            Dashboard
          </Link>
          <Link to="/adminchatpage" className="block py-2 px-4 rounded hover:bg-gray-700 transition">
            Chats
          </Link>
          <Link to="/admincategory" className="block py-2 px-4 rounded hover:bg-gray-700 transition">
            Store
          </Link>
          <Link to="/feedbacks" className="block py-2 px-4 rounded hover:bg-gray-700 transition">
            FeedBacks
          </Link>
        </nav>
        
        {/* Logout Button - Fixed at bottom */}
        <div className="mt-auto p-4 border-t border-gray-700">
          <Link to="/login">
            <button className="w-full py-2 px-4 bg-red-600 rounded hover:bg-red-700 transition">
              Logout
            </button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Custom Colored Bar Chart</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="h-80">
              <Bar data={data} options={options} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;