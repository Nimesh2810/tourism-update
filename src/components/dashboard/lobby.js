import React from "react";

const Lobby = () => {
  return (
    <section
      id="lobby"
      className=" text-center md:flex justify-center h-screen md:columns-2 items-center w-full px-4 md:px-8 lg:px-16 "
    >
      <div className="text-center mb-8 top-10">
        <span className="block text-3xl md:text-5xl text-gray-800 mb-4 font-bold mt-16 cursor-pointer">
          Sri Lanka is Back!
        </span>
        <span className="block text-5xl font-bold md:text-7xl lg:text-8xl text-black cursor-pointer">
          LOVE SRI <br className="hidden md:inline-block cursor-pointer" /> LANKA
        </span>
      </div>

      <div className="max-w-2xl text-center  top-10 px-5 md:ml-16">
        <span className="text-black text-2xl md:text-4xl font-semibold cursor-pointer">
          The Pearl of the Indian Ocean Awaits
        </span>
        <p className="text-black text-base md:text-lg leading-relaxed text-justify mt-5 cursor-pointer">
          Nestled in the heart of the Indian Ocean, Sri Lanka is a vibrant
          island nation known for its stunning beaches, lush landscapes, and
          rich cultural heritage. From ancient temples and breathtaking tea
          plantations to lively wildlife sanctuaries, Sri Lanka offers an
          unforgettable experience for every traveler. Wander through the
          UNESCO-listed Galle Fort, spot leopards in Yala National Park, and
          explore the bustling streets of Colombo. With its warm hospitality,
          diverse cuisine, and scenic beauty, Sri Lanka is a paradise waiting to
          be explored. Discover why it's one of Asia's must-visit destinations.
        </p>
      </div>
    </section>
  );
};

export default Lobby;
