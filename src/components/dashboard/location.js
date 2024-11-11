import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "../../index.css";

const Location = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [districts, setDistricts] = useState("");
  const [sameLocation, setSameLocation] = useState("");

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/loadLocation/${id}`
        );
        setLocation(response.data);
      } catch (error) {
        console.error("Error fetching location details:", error);
      }
    };

    fetchLocation();
  }, [id]);

  const isDistricts = (district) => {
    setDistricts(district);
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/loadByDistrictsLocation/${districts}`
        );
        setSameLocation(response.data);
      } catch (error) {
        console.error("Error fetching location for Districts:", error);
      }
    };

    fetchLocation();
  }, [districts]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (!location) return <div>Loading...</div>;

  return (
    <>
      <div className=" w-screen  h-screen overflow-x-hidden relative">
        {location.map((location, index) => (
          <div
            className="w-full"
            key={index}
            onLoad={() => isDistricts(location.districts)}
          >
            <div
              className="item flex-shrink-0 w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${location.image})`,
                height: "500px",
              }}
            ></div>
            <div className="lg:px-20">
              <div className="flex ml-12 cursor-pointer py-3">
                <a href="/">Home&nbsp;&nbsp; </a>
                <span>&#10148; &nbsp;{location.location}</span>
              </div>
              <div className="lg:flex relative lg:flex-row">
                <div className="p-10 lg:w-1/2 w-screen flex flex-col ">
                  <span className="lg:text-5xl  text-3xl font-bold ">
                    {location.location}
                  </span>
                  {location.history && (
                    <>
                      <span className="lg:text-2xl text-xl font-bold mt-8">
                        History of the Place
                      </span>
                      <p className="lg:text-lg text-sm mt-5 text-justify">
                        {location.history}
                      </p>
                    </>
                  )}
                  <span className="lg:text-2xl text-xl font-bold mt-8">
                    Location details
                  </span>
                  <p className="lg:text-lg text-sm mt-5 text-justify">
                    {location.description}
                  </p>
                </div>
                <div className="p-10 lg:w-1/2 w-screen flex flex-col  relative lg:mt-32 ">
                  <iframe
                    src={location.map}
                    frameborder="0"
                    className="w-full h-2/5 "
                    title={location.location}
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                  {location.tips && (
                    <div className="border-2 border-cyan-700 lg:w-3/5 h-auto mt-10 rounded-lg  lg:ml-28 ">
                      <p className=" font-semibold text-center text-lg text-cyan-800 mt-5">
                        Use Full Tips
                      </p>
                      <p className="p-6 font-semibold">
                        &#10148; {location.tips}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        {sameLocation && (
          <>
            <div className="lg:px-28 p-5 ml-4 slider-container ">
              <span className="lg:text-2xl text-xl font-bold mt-8 ">
                Other Attractions to visit in this Area
              </span>
              <div className="md:w-3/4 m-auto w-full">
                <div className="mt-10">
                  <Slider {...settings}>
                    {sameLocation.map((location, index) => (
                      <div
                        key={index}
                        className="bg-white h-[450px] text-black rounded-xl"
                      >
                        <div className="h-56 flex justify-center items-center rounded-t-xl">
                          <img
                            src={location.image}
                            alt=""
                            className="h-full w-full rounded-t-xl"
                          />
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 gap-4 bg-gray-200 rounded-b-xl">
                          <span className="font-semibold text-xl">
                            {location.location}
                          </span>
                          <button
                            onClick={() => {
                              navigate(`/location/${location.id}`);
                              window.scrollTo(10,200);
                            }}
                          >
                            See More...
                          </button>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Location;
