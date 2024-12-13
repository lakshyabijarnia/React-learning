import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { moveNext, movePrev } from '../features/CarouselSlice';
import { RootState } from '../app/store';

interface Card {
  id: number;
  title: string;
  description: string;
  imgSrc: string;
}

const cards: Card[] = [
  { id: 1, title: 'Card 1', description: 'Description for card 1.', imgSrc: 'https://via.placeholder.com/200' },
  { id: 2, title: 'Card 2', description: 'Description for card 2.', imgSrc: 'https://via.placeholder.com/200' },
  { id: 3, title: 'Card 3', description: 'Description for card 3.', imgSrc: 'https://via.placeholder.com/200' },
  { id: 4, title: 'Card 4', description: 'Description for card 4.', imgSrc: 'https://via.placeholder.com/200' },
  { id: 5, title: 'Card 5', description: 'Description for card 5.', imgSrc: 'https://via.placeholder.com/200' },
  { id: 6, title: 'Card 6', description: 'Description for card 6.', imgSrc: 'https://via.placeholder.com/200' },
  { id: 7, title: 'Card 7', description: 'Description for card 7.', imgSrc: 'https://via.placeholder.com/200' },
  { id: 8, title: 'Card 7', description: 'Description for card 7.', imgSrc: 'https://via.placeholder.com/200' },
  { id: 9, title: 'Card 7', description: 'Description for card 7.', imgSrc: 'https://via.placeholder.com/200' },
  { id: 10, title: 'Card 7', description: 'Description for card 7.', imgSrc: 'https://via.placeholder.com/200' },
  { id: 11, title: 'Card 7', description: 'Description for card 7.', imgSrc: 'https://via.placeholder.com/200' },
  { id: 12, title: 'Card 7', description: 'Description for card 7.', imgSrc: 'https://via.placeholder.com/200' },
  { id: 13, title: 'Card 7', description: 'Description for card 7.', imgSrc: 'https://via.placeholder.com/200' },
  { id: 14, title: 'Card 7', description: 'Description for card 7.', imgSrc: 'https://via.placeholder.com/200' },

];

const Carousel: React.FC = () => {
  const dispatch = useDispatch();
  const carouselRef = useRef<HTMLDivElement>(null);

  // States for checking scrollable areas
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft;
      const scrollWidth = carouselRef.current.scrollWidth;
      const clientWidth = carouselRef.current.clientWidth;

      setCanScrollLeft(scrollLeft > 0); // If scrollLeft > 0, we can scroll left
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth); // If we haven't scrolled to the right end, we can scroll right
    }
  };

  const handleNext = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth / 3; // Scroll by one card width (3 cards visible at once)
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
    dispatch(moveNext());
  };

  const handlePrev = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth / 3; // Scroll by one card width
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
    dispatch(movePrev());
  };

  useEffect(() => {
    checkScroll(); // Check scrollable area whenever the component mounts or the index changes
  }, []);

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Carousel Container with horizontal scrolling */}
      <div className="relative overflow-x-auto scroll-smooth" ref={carouselRef} onScroll={checkScroll}>
        <div className="flex space-x-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex-shrink-0 w-[calc(20%-16px)]  px-4"
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className="bg-white p-6 rounded-lg shadow-md">
                <img src={card.imgSrc} alt={card.title} className="w-full h-48 object-cover rounded-t-lg mb-4" />
                <h3 className="text-xl font-semibold">{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prev/Next Buttons */}
      {canScrollLeft && (
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full"
        >
          &#10094;
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full"
        >
          &#10095;
        </button>
      )}
    </div>
  );
};

export default Carousel;
