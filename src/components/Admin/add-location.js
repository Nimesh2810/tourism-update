import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../../index.css";

const AddLocation = ({ isOpen, onClose, formMode, locationData }) => {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [district, setDistrict] = useState("");
  const [history, setHistory] = useState("");
  const [description, setDescription] = useState("");
  const [map, setMap] = useState("");
  const [tips, setTips] = useState("");
  const [images, setImage] = useState(null);
  const [districts, setDistricts] = useState([]);

  const CLOUD_NAME = "dmblgzwnr";
  const UPLOAD_PRESET = "mpbkfft1";

  const toast = async (status, message) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: status,
      title: message,
    });
  };

  useEffect(() => {
    if (formMode === "edit" && locationData) {
      setLocation(locationData.location);
      setDistrict(locationData.district);
      setHistory(locationData.history);
      setDescription(locationData.description);
      setMap(locationData.map);
      setTips(locationData.tips);
      setImage(locationData.image);
    } else {
      setLocation("");
      setDistrict("");
      setHistory("");
      setDescription("");
      setMap("");
      setTips("");
      setImage(null);
    }
  }, [formMode, locationData]);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/districts");
        setDistricts(response.data);
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    };

    fetchDistricts();
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAddLocation = async (e) => {
    setLoading(true);
    e.preventDefault();

    let imageUrl = locationData?.image;
    if (images) {
      const formData = new FormData();
      formData.append("file", images);
      formData.append("upload_preset", UPLOAD_PRESET);

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          formData
        );
        imageUrl = response.data.secure_url;
      } catch (error) {
        toast("warning", "Image upload failed. Please try again.");
        console.error("Image upload error:", error);
        setLoading(false);
        return;
      }
    }

    try {
      if (formMode === "add") {
        await axios.post("http://localhost:5000/locations", {
          location,
          history,
          description,
          map,
          tips,
          image: imageUrl,
          districts: district,
        });
        toast("success", "Location added successfully!");
      } else if (formMode === "edit" && locationData?.id) {
        await axios.put(
          `http://localhost:5000/locationsEdit/${locationData.id}`,
          {
            location,
            history,
            description,
            map,
            tips,
            image: imageUrl,
            districts: district,
          }
        );
        toast("success", "Location updated successfully!");
      }

      setLoading(false);
      onClose();
      window.location.reload();
    } catch (error) {
      toast("error", "Failed to save location.");
      console.error("Error saving location:", error);
      setLoading(false);
    }
  };

  if (!isOpen) return null;
  return (
    <form onSubmit={handleAddLocation}>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-lg md:max-w-2xl mx-4 h-full max-h-screen md:max-h-[90vh] overflow-y-auto flex flex-col">
          <h2 className="text-2xl font-semibold mb-4">
            {formMode === "add" ? "Add New Location" : "Edit Location"}
          </h2>

          <div className="lg:flex space-y-4 lg:space-y-0 lg:space-x-4 w-full ">
            <div className="relative w-full lg:w-1/2">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-900"
              >
                Location
              </label>
              <input
                id="location"
                type="text"
                placeholder="Location Name"
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <div className="relative w-full lg:w-1/2">
              <label
                htmlFor="district"
                className="block text-sm font-medium text-gray-900"
              >
                District
              </label>
              <select
                id="district"
                className="p-2 mb-4 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 h-10 "
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required
              >
                <option value="">Select District</option>
                {districts.map((district, index) => (
                  <option key={index} value={district.district}>
                    {district.district}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="lg:flex space-y-4 lg:space-y-0 lg:space-x-4 w-full">
            <div className="relative w-full lg:w-1/2">
              <label
                htmlFor="history"
                className="block text-sm font-medium text-gray-900"
              >
                History of Place
              </label>
              <textarea
                id="history"
                rows={5}
                placeholder="History of Place"
                className="p-2 mb-4 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                value={history}
                onChange={(e) => setHistory(e.target.value)}
              ></textarea>
            </div>
            <div className="relative w-full lg:w-1/2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-900"
              >
                Description
              </label>
              <textarea
                id="description"
                rows={5}
                placeholder="Description"
                className="p-2 mb-4 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
          </div>

          <div className="lg:flex space-y-4 lg:space-y-0 lg:space-x-4 w-full mb-4 ">
            <div className="relative w-full ">
              <label
                htmlFor="tips"
                className="block text-sm font-medium text-gray-900"
              >
                Traveling Tips
              </label>
              <textarea
                id="tips"
                rows={4}
                placeholder="Useful Tips"
                className="p-2 mb-4 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                value={tips}
                onChange={(e) => setTips(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="lg:flex space-y-4 lg:space-y-0 lg:space-x-4 w-full mb-8">
            <div className="relative w-full lg:w-1/2">
              <label
                htmlFor="map"
                className="block text-sm font-medium text-gray-900"
              >
                Maps Embed Url
              </label>
              <input
                id="map"
                type="text"
                placeholder="Maps Embed Url"
                className="p-2 mb-4 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                value={map}
                onChange={(e) => setMap(e.target.value)}
                required
              />
              {formMode === "edit" ? (
                <iframe src={map} frameborder="0"></iframe>
              ) : (
                <></>
              )}
            </div>

            <div className="relative w-full lg:w-1/2">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-900"
              >
                Upload Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className=" block  text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none"
              />
              {formMode === "edit" ? (
                <img className="w-[300px] h-[200px]" src={images} alt="img" />
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className="flex justify-center space-x-2 lg:mt-11">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white w-full lg:w-1/6 h-10 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={` lg:w-1/6 w-full bg-green-500 text-white rounded hover:bg-green-7000  ${
                loading ? "bg-green-300" : "hover:bg-green-700 "
              }`}
            >
              {loading ? (
                <div className="spinner-border animate-spin inline-block h-4 border-4"></div>
              ) : formMode === "add" ? (
                "Save"
              ) : (
                "Update"
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddLocation;
