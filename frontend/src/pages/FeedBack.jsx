import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import chroma from "chroma-js";
import axios from "axios";
import FeedBackData from "./FeedBackData";

const DOMAIN = import.meta.env.VITE_DOMAIN || "http://localhost:5000";

const Feedback = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  
  const [suggestions,setSuggestions] = useState(0)
  const [compliments,setCompliments] = useState(0)
  const [query,setQuery] = useState(0)
  const [others ,setOthers ]=  useState(0)
  const lengthArray = [suggestions,compliments,query,others]

  useEffect(() => {
    fetchedList()
  },[])

  const fetchedList = async () => {
    try { 
      const response = await axios.get(`${DOMAIN}/getFeedbackLength`)
      console.log("Feedback Length Data:", response.data);
      setSuggestions(response.data.Suggestion)
      setCompliments(response.data.Compliment)
      setQuery(response.data.BugReport)
      setOthers(response.data.Other)

    } catch (error) {
      console.error("Error fetching data:",error); 
    }
  };
  
  const labels = ["Suggestions","Compliments","Query","Others"];
  const values =  lengthArray; 
  const colorScale = chroma
    .scale(["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"])
    .mode("lch")
    .colors(labels.length);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Feedback Data Overview",
        data: values,
        backgroundColor: colorScale,
        borderColor: "#ffffff",
        borderWidth: 0.5,
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
      <div className="flex-1 flex flex-col md:mx-40 bg-gray-100 min-h-screen">
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-4xl space-y-8">
            {/* Chart Section */}
            <div>
                <h2 className="text-2xl font-bold mb-6">FeedBacks Data</h2>
                <div className="bg-white p-4 rounded-lg shadow">
                <div className="h-96"> {/* Fixed height for chart container */}
                    <Bar data={data} options={options} />
                </div>
                </div>
            </div>

            {/* Table Section */}
            <div>
                <h2 className="text-2xl font-bold mb-6">FeedBacks</h2>
                <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
                <FeedBackData />
                </div>
            </div>
            </div>
        </main>
    </div>
    
    </div>
  );
};

export default Feedback;