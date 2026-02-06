import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="container mx-auto px-12 py-16">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">About Foodie</h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Foodie is your trusted food delivery service. We are dedicated to bringing quality food to your doorstep with the fastest and most reliable service. Our mission is to make delicious food accessible to everyone, and we work hard to maintain the highest standards of quality and customer satisfaction.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
