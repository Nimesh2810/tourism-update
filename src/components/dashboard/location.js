import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import { PropagateLoader } from "react-spinners";
import Bg from "../../assets/bg.jpg";

const Location = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [districts, setDistricts] = useState("");
  const [locations, setLocations] = useState("");
  const [sameLocation, setSameLocation] = useState("");
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

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

  const isDistricts = (district, location) => {
    setDistricts(district);
    setLocations(location);
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/loadByDistrictsLocation/${districts}/${locations}`
        );
        setSameLocation(response.data);
      } catch (error) {
        console.error("Error fetching location for Districts:", error);
      }
    };

    fetchLocation();
  }, [districts, locations]);

  if (!location)
    return (
      <div className="flex justify-center items-center w-full mt-96">
        <PropagateLoader />
      </div>
    );

  return (
    <>
      <div className=" w-screen  h-screen overflow-x-hidden relative">
        {location.map((location, index) => (
          <div
            className="w-full"
            key={index}
            onLoad={() => isDistricts(location.districts, location.location)}
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
              <div className="lg:flex relative lg:flex-row cursor-pointer">
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
        {sameLocation.length !== 0 && (
          <>
            <div className="lg:px-28 p-5 ml-4 slider-container ">
              <span className="lg:text-2xl text-xl font-bold mt-8 ">
                Other Attractions to visit in this Area
              </span>
              {sameLocation.length <= 2 ? (
                <div className="flex justify-center w-full mt-10 ">
                <div className=" grid gap-4 md:grid-cols-2 md:w-[80%] w-full">
                  {sameLocation.map((location, index) => (
                    <div
                      key={index}
                      className="bg-white  text-black rounded-xl w-full"
                    >
                      <div className="h-56 flex justify-center items-center rounded-t-xl">
                        <img
                          src={location.image}
                          alt="img"
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
                            window.location.reload();
                          }}
                        >
                          See More...
                        </button>
                      </div>
                    </div>
                  ))}
                  </div>
                </div>
              
              ) : (
                <div className="md:w-3/4 m-auto w-full mt-10">
                    <Slider {...settings}>
                      {sameLocation.map((location, index) => (
                        <div
                          key={index}
                          className="bg-white  text-black rounded-xl"
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
                                window.location.reload();
                              }}
                            >
                              See More...
                            </button>
                          </div>
                        </div>
                      ))}
                    </Slider>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Location;
