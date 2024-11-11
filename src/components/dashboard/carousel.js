import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../../index.css";
import { useNavigate } from "react-router-dom";

const Carousel = () => {
  const navigate = useNavigate();
  const runningTimeRef = useRef(null);
  const carouselRef = useRef(null);
  const listRef = useRef(null);
  const [locations, setLocations] = useState([]);
  const timeRunning = 3000;
  const timeAutoNext = 7000;
  const autoSlideTimer = useRef(null);

  const showSlider = (type) => {
    if (!listRef.current || !carouselRef.current) return;

    const sliderItems = listRef.current.querySelectorAll(".item");
    if (sliderItems.length === 0) return;

    if (type === "next") {
      listRef.current.appendChild(sliderItems[0]);
      carouselRef.current.classList.add("next");
    } else {
      listRef.current.prepend(sliderItems[sliderItems.length - 1]);
      carouselRef.current.classList.add("prev");
    }

    setTimeout(() => {
      carouselRef.current.classList.remove("next", "prev");
    }, timeRunning);
  };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/location");
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchLocations();
  }, []);

  useEffect(() => {
    if (locations.length > 0) {
      autoSlideTimer.current = setInterval(
        () => showSlider("next"),
        timeAutoNext
      );
    }

    return () => clearInterval(autoSlideTimer.current);
  }, [locations]);

  return (
    <section
      id="location"
      className=" w-screen h-screen -mt-12 overflow-hidden relative "
    >
      <div ref={carouselRef} className="carousel ">
        <div ref={listRef} className="list">
          {locations.map((location, index) => (
            <div
              key={index}
              className="item flex-shrink-0 w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${location.image})` }}
            >
              <div className="content h-3/5 ">
                <div className="title ">{location.location}</div>
                <p className="des text-base mb-4 line-clamp-5">
                  {location.description}
                </p>
                <div className="btn">
                <button onClick={() => navigate(`/location/${location.id}`)}>See More...</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="arrows ">
        <button onClick={() => showSlider("prev")} className="prev">
            &lt;
          </button>
          <button onClick={() => showSlider("next")} className="next">
            &gt;
          </button>
        </div>

        <div ref={runningTimeRef} className="timeRunning"></div>
      </div>
    </section>
  );
};

export default Carousel;
