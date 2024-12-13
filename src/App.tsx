import React from 'react';
import Carousel from './components/Carousel';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Card Carousel</h1>
      <Carousel />
      <Carousel />
      <Carousel />
      <Carousel />
      <Carousel />
      <Carousel />
    </div>
  );
};

export default App;
