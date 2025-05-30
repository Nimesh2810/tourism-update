import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdAddLocationAlt } from "react-icons/md";
import { IoIosMore } from "react-icons/io";
import Logo from "../../assets/logo.png";
import LocationModal from "./add-location";
import DeleteConfirmationModal from "./delete-conform";

const AdminPanel = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [locations, setLocations] = useState([]);
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  const [formMode, setFormMode] = useState('');
  const [currentLocationData, setCurrentLocationData] = useState(null);


  const openAddModal = () => {
    setFormMode("add");
    setCurrentLocationData(null);
    setShowModal(true);
  };

  const openEditModal = (location) => {
    setFormMode("edit");
    setCurrentLocationData(location);
    setShowModal(true);
    toggleMenu(null);
  };

  const openDeleteModal = (location) => {
    setCurrentLocationData(location.id);
    setShowModalDelete(true);
    toggleMenu(null);
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

  const toggleMenu = (index) => {
    setActiveMenuIndex(activeMenuIndex === index ? null : index);
  };

  return (
    <>
      <LocationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        formMode={formMode}
        locationData={currentLocationData}
      />

      <DeleteConfirmationModal
       isOpen={showModalDelete}
       onClose={() => setShowModalDelete(false)}
       locationData={currentLocationData}
      />
      <div className="w-screen  overflow-x-hidden relative">
        <div className="flex p-5">
          <img
            src={Logo}
            alt="Logo"
            className="md:h-12 md:w-12 w-10 h-10 object-fill"
          />
          <span className="md:text-4xl text-sm ml-3 mt-2 font-semibold">
            Dashboard
          </span>
          <div className="ml-auto">
            <button
              className="bg-green-400 hover:bg-green-700 border-none rounded-lg text-white p-2 text-sm md:text-lg mt-2 flex items-center"
              onClick={openAddModal}
            >
              <MdAddLocationAlt className="mr-2" /> Add Location
            </button>
          </div>
        </div>

        <div className="space-y-4 p-6">
          {locations.map((location, index) => (
            <div
              className=" flex p-4 bg-gray-200 rounded-lg shadow-md w-full relative cursor-pointer"
              key={index}
            >
              <div className="flex-none w-auto ">{index + 1}.&nbsp;</div>
              <div className="flex-none md:w-3/12  lg:w-2/12">
                {location.location}{" "}
              </div>
              <div className="truncate px-1 w-screen flex-grow ">
                :&nbsp;
                {location.description}&nbsp;
              </div>
              <button
                className="cursor-pointer text-3xl"
                onClick={() => toggleMenu(index)}
              >
                <IoIosMore />
              </button>

              {activeMenuIndex === index && (
                <div
                  class="flex flex-col absolute  md:right-1 right-3 z-10 mt-6 p-2 origin-top-right rounded-md bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none "
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabindex="-1"
                >
                  <span
                    className="cursor-pointer font-medium "
                    onClick={() => openEditModal(location)}
                  >
                    Edit
                  </span>
                  <span
                    className="cursor-pointer font-medium"
                    onClick={() => openDeleteModal(location)}
                  >
                    Remove
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
