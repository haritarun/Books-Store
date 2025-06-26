import {useEffect,useState} from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const DOMAIN = import.meta.env.VITE_DOMAIN || "http://localhost:5000";


const Feedback = () => {
  const [firstName,setFirstName]=useState("")
  const [lastName,setLastName]=useState("")
  const [email,setEmail]=useState("")
  const [phone,setPhone]=useState("")
  const [message,setMessage]=useState("")
  const [messageType,setMessageType]=useState("Suggestion")

  
  useEffect(()=>{
        AOS.init({          
        duration:1500,
        once:true
      })
  })

   
  const getSubmit = async (e) => {
  e.preventDefault();
  if (firstName && lastName && email && phone && message && messageType) {
    try {
      const response = await axios.post(`${DOMAIN}/feedback`, {
        firstName, lastName, email, phone, message, messageType
      });
      
      
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setMessageType("");

      if (response.data.isDuplicate) {
        toast.info("You've already submitted feedback. Thank you!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        try {
          await axios.post(`${DOMAIN}/sendFeedbackMail`, {
            firstName,
            lastName,
            email,
          });
          toast.success("Thank you for your feedback! Confirmation email sent.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } catch (mailError) {
          console.error("Failed to send mail:", mailError);
          toast.success("Thank you for your feedback!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  } else {
    toast.error("Please fill in all fields", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
};
  return (
    <div className="bg-white px-6 py-12 sm:py-24 lg:px-8">
      <ToastContainer />
  <div className="mx-auto max-w-xl flex flex-col items-center justify-center text-center" data-aos="fade-up">
    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">Let's Talk</h1>
    <p className="mt-3 text-lg text-gray-600">Feature request? Suggestion? or maybe you'd like to be our critic! Here's a form just for that.</p>
  </div>
  <form className="mx-auto mt-16 max-w-xl sm:mt-20">
    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
      <div data-aos="fade-right">
        <label for="first-name" className="block text-sm font-semibold leading-6 text-gray-900">First name</label>
        <div className="mt-2.5">
          <input required type="text"  name="first-name" id="first-name" autocomplete="given-name" placeholder="Your First Name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" 
          value = {firstName} onChange={(e)=>{setFirstName(e.target.value)}} />
        </div>
      </div>
      <div data-aos="fade-left">
        <label for="last-name" className="block text-sm font-semibold leading-6 text-gray-900">Last name</label>
        <div className="mt-2.5">
          <input required="" type="text" name="last-name" id="last-name" autocomplete="family-name" placeholder="Your Last Name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" 
          value = {lastName} onChange={(e)=>{setLastName(e.target.value)}}/>
        </div>
      </div>
      
      <div className="sm:col-span-2" data-aos="fade-left">
        <label for="email" className="block text-sm font-semibold leading-6 text-gray-900">Email</label>
        <div className="mt-2.5">
          <input required="" type="email" name="email" id="email" autocomplete="email" placeholder="Your Email Address" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" 
          value = {email}  onChange={(e)=>{setEmail(e.target.value)}}/>
        </div>
      </div>
      <div className="sm:col-span-2" data-aos="fade-right">
        <label for="phone" className="block text-sm font-semibold leading-6 text-gray-900">Phone number</label>
        <div className="mt-2.5">
          <input required="" type="tel" name="phone" id="phone" autocomplete="tel" placeholder="Your Phone Number" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" 
          value = {phone} onChange={(e)=>{setPhone(e.target.value)}}/>
        </div>
      </div>
      <div className="sm:col-span-2" data-aos="fade-left">
        <label for="message" className="block text-sm font-semibold leading-6 text-gray-900">FeedBack</label>
        <div className="mt-2.5">
          <select className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6' name="feedback-type" id="feedback-type" value={messageType} onChange={(e)=>{setMessageType(e.target.value)}}>
            <option value="Suggestion">Suggestion</option>
            <option value="Compliment">Compliment</option>
            <option value="BugReport">BugReport</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      <div className="sm:col-span-2" data-aos="fade-right">
        <label for="message" className="block text-sm font-semibold leading-6 text-gray-900">FeedBack</label>
        <div className="mt-2.5">
          <textarea name="message" id="message" rows="4" placeholder="Share your thoughts..." className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          value={message} onChange={(e)=>{setMessage(e.target.value)}}></textarea>
        </div>
      </div>
    </div>
    <div className="mt-10" data-aos="fade-up">
      <button type="submit" className="bg-blue-600 text-white rounded-sm py-2 w-full block" onClick={getSubmit}>Submit →</button>
    </div>
  </form>
</div>

  )
}

export default Feedback