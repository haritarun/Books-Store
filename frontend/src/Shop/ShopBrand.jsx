import React, { useRef, useState } from "react";


const SwipeCards = () => {
  const [cards] = useState([
    {
      id: 1,
      image: `https://loremflickr.com/300/200/grape`,
      title:'Dettol'
     
    },
    {
      id: 2,
      image: `https://loremflickr.com/300/200/apple`,
      title:'Savlon'
      
    },
    {
      id: 3,
      image: `https://loremflickr.com/300/200/banana`,
      title:"Lifebuoy"
    },
    {
      id: 4,
      image: `https://loremflickr.com/300/200/berry`,
      title: "Himalaya",
      
    },
    {
      id: 5,
      image: `https://loremflickr.com/300/200/orange`,
      title: "Nivea",
      
    },
    {
      id: 6,
      image: `https://loremflickr.com/300/200/peach`,
      title: "Pond's",
      
    },
    {
      id: 7,
      image: `https://loremflickr.com/300/200/cherry`,
      title: "Colgate",
      
    },
  ]);

  const sliderRef = useRef(null);
  let isDown = false;
  let startX;
  let scrollLeft;

  const handleMouseDown = (e) => {
    isDown = true;
    startX = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft = sliderRef.current.scrollLeft;
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
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="pr-16 pl-16">
        <div
      ref={sliderRef}
      className="overflow-x-scroll scrollbar-hide mb-4 relative "
      style={{ overflowY: "hidden", cursor: "grab" ,scrollbarWidth:'none'}}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div className="flex snap-x snap-mandatory gap-6 w-max">
        {cards.map((card) => (
          <div key={card.id} className="flex-none w-64 snap-center">
            <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto mt-24">
                <img src={card.image} alt="University of Southern California" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                <h3 className="z-10 mt-3 text-3xl font-bold text-white">{card.title}</h3>
                
            </article>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default SwipeCards;
