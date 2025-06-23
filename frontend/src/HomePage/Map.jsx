import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";


const defaultCenter = [20.5937, 78.9629];

const Map = () => {
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [location1, setLocation1] = useState(null);
  const [location2, setLocation2] = useState(null);
  const [distance, setDistance] = useState(null);
  const [defaultLocation, setDefaultLocation] = useState(null);

  // Get user's real-time location
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setDefaultLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true }
      );

      return () => navigator.geolocation.clearWatch(watchId); // Stop tracking when component unmounts
    }
  }, []);

  // Function to convert address to coordinates
  const getCoordinates = async (address) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: { q: address, format: "json", limit: 1 },
      });
      const data = response.data.map(eachItem=>({
        displayName:eachItem.display_name
      }))
      console.log(data)
      if (response.data.length > 0) {
        return {
          lat: parseFloat(response.data[0].lat),
          lon: parseFloat(response.data[0].lon),
          
        };
      }
      return null;
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  };

  const getAddress =async(lat,lon)=>{
    try{
      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
        params: {
          lat: lat,
          lon: lon,
          format: "json",
        },})

      setAddress1(response.data.display_name)

    }
    catch(e){
      console.log("something went wrong",e)
    }

  }

  const getCurrentLocation =()=>{
    
    if(navigator.geolocation){
      navigator.geolocation.watchPosition(
        (position)=>{
          const newLocation = {
            lat:position.coords.latitude,
            lon:position.coords.longitude
          }
          console.log(newLocation.lat,newLocation.lon)
          getAddress(newLocation.lat,newLocation.lon)
        }
      )
      
    }
  }


  const showLocations = async () => {
    const loc1 = await getCoordinates(address1);
    const loc2 = await getCoordinates(address2);

    if (loc1 && loc2) {
      setLocation1(loc1);
      setLocation2(loc2);
      calculateDistance(loc1, loc2);
    } else {
      alert("Could not find one or both locations. Please enter valid addresses.");
    }
  };

  // Function to calculate distance using Haversine formula
  const calculateDistance = (loc1, loc2) => {
    const R = 6371; // Earth's radius in km
    const dLat = ((loc2.lat - loc1.lat) * Math.PI) / 180;
    const dLon = ((loc2.lon - loc1.lon) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((loc1.lat * Math.PI) / 180) *
        Math.cos((loc2.lat * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    setDistance((R * c).toFixed(2)); // Distance in km (rounded to 2 decimal places)
  };

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>

      <div style={{ position: "absolute", zIndex: 1000, top: 10, left: 10, background: "white", padding: "10px", borderRadius: "5px" }}>
        <h3>Enter Addresses</h3>
        <input type="text" placeholder="Enter first address" value={address1} onChange={(e) => setAddress1(e.target.value)} />
        <button onClick={getCurrentLocation}>use current location</button>
        <br />
        <input type="text" placeholder="Enter second address" value={address2} onChange={(e) => setAddress2(e.target.value)} />
        <br />
        <button onClick={showLocations} style={{ marginTop: "10px" }}>Show</button>
      </div>

      { 
        <div style={{ position: "absolute", top: "100px", left: "10px", background: "white", padding: "5px", borderRadius: "5px" }}>
          Distance: {distance} km
        </div>
      }

     
      <MapContainer 
        center={defaultLocation ? [defaultLocation.lat, defaultLocation.lon] : defaultCenter} 
        zoom={5} 
        style={{ height: "100vh", width: "100vw" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        
        {defaultLocation && (
          <Marker position={[defaultLocation.lat, defaultLocation.lon]}>
            <Popup>Your Current Location</Popup>
          </Marker>
        )}

        {/* Display Markers for Entered Addresses */}
        {location1 && (
          <Marker position={[location1.lat, location1.lon]}>
            <Popup>Location 1: {address1}</Popup>
          </Marker>
        )}
        {location2 && (
          <Marker position={[location2.lat, location2.lon]}>
            <Popup>Location 2: {address2}</Popup>
          </Marker>
        )}

        {/* Draw Route Between Locations */}
        {location1 && location2 && <Polyline positions={[[location1.lat, location1.lon], [location2.lat, location2.lon]]} color="red" />}
      </MapContainer>
    </div>
  );
};

export default Map;
