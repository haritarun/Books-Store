import React, { useRef, useState } from "react";
import Books28 from '../assets/img/Books28.jpg'
import Books29 from '../assets/img/Books29.jpg'
import Books30 from '../assets/img/Books30.jpg'
import Books31 from '../assets/img/Books31.jpg'
import Books32 from '../assets/img/Books32.jpg'
import Books33 from '../assets/img/Books33.avif'
import Books34 from '../assets/img/Books34.jpg'



const SwipeCards = () => {
  const [cards] = useState([
  {
    id: 1,
    image:Books28,
    title: 'J.K. Rowling',
    type: 'Fantasy',
    notableWork: 'Harry Potter Series'
  },
  {
    id: 2,
    image:Books29,
    title: 'Stephen King',
    type: 'Horror/Thriller',
    notableWork: 'The Shining, IT'
  },
  {
    id: 3,
    image:Books30,
    title: 'Agatha ',
    type: 'Mystery',
    notableWork: 'Murder on the Orient Express'
  },
  {
    id: 4,
    image: Books31,
    title: 'Jane Austen',
    type: 'Classic Literature',
    notableWork: 'Pride and Prejudice'
  },
  {
    id: 5,
    image: Books32,
    title: ' R.R. Martin',
    type: 'Epic Fantasy',
    notableWork: 'A Song of Ice and Fire (Game of Thrones)'
  },
  {
    id: 6,
    image:Books33,
    title: 'Morrison',
    type: 'Literary Fiction',
    notableWork: 'Beloved'
  },
  {
    id: 7,
    image:Books34,
    title: 'Neil Gaiman',
    type: 'Fantasy/Sci-Fi',
    notableWork: 'American Gods, Good Omens'
  }
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
