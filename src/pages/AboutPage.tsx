import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="w-full bg-blue-500 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">About HR-AI Portal</h1>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">About Us</h2>
        <p className="text-lg text-gray-600 mb-8">
          HR-AI Portal is a leading food ordering system that connects you with the best restaurants in town. Our mission is to provide a seamless and enjoyable food ordering experience for our customers.
        </p>
        <p className="text-lg text-gray-600 mb-8">
          Whether you're craving a quick bite or looking for a gourmet meal, HR-AI Portal has got you covered. We partner with a wide range of restaurants to bring you a diverse selection of cuisines.
        </p>
        <p className="text-lg text-gray-600 mb-8">
          Our user-friendly platform makes it easy to browse menus, place orders, and track your delivery in real-time. Join us on a culinary journey and discover the best food your city has to offer.
        </p>
      </main>
      <footer className="w-full bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 HR-AI Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;