import React, { useState, useEffect } from "react";
import "./User.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {notification} from 'antd';
import Navbar from "../NavBar/Navbar";

const User = () => {
  const { id } = useParams();
  const [profileImage, setProfileImage] = useState(null);
  const [Technology, setTechnology] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setmobile] = useState("");
  const [gender, setGender] = useState("male");
  const [category, setCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("http://localhost:5200/record/user/" + id).then((response) => {
      const { data } = response;
      setName(data.name);
      setGender(data.gender);
      setEmail(data.email);
      setmobile(data.mobile);
      setCategory(data.category);
    });
  }, [id]);


  const handleFileChange = (event) => {
    const files = event.target.files[0];
    setProfileImage(files);
  };

  const changeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleTechnologyChange = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setTechnology((prevTechnology) => [...prevTechnology, value]);
    } else {
      setTechnology((prevTechnology) =>
        prevTechnology.filter((Technology) => Technology !== value)
      );
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("gender", gender);
      formData.append("email", email);
      formData.append("mobile", mobile);
      formData.append("category", category);
      formData.append("Technology", JSON.stringify(Technology));
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }
      if (id) {
        await axios.put("http://localhost:5200/record/" + id, formData);
      } else {
        await axios.post("http://localhost:5200/record/newuser", formData);
        notification.success({
          message: "User Created",
          description: "Creation Successfull",
        });
      }
      navigate("/view");
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Failed",
        description: "Creation Failed",
      });
    }
  };


  const handlePreview = (e) => {
    e.preventDefault();
    if (!name) {
      notification.error({
        message: "Registration Failed",
        description: "Name is required",
      });
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      notification.error({
        message: "Registration Failed",
        description: "Name should contain only letters and spaces",
      });
      return;
    }
    if (!email) {
      notification.error({
        message: "Registration Failed",
        description: "Email is required",
      });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      notification.error({
        message: "Registration Failed",
        description: "Email is not valid",
      });
      return;
    }

    if (!mobile) {
      notification.error({
        message: "Registration Failed",
        description: "Mobile Number is required",
      });
      return;
    }
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      notification.error({
        message: "Registration Failed",
        description: "Mobile number is not valid",
      });
      return;
    }
    if(!category){
      notification.error({
        message: "Registration Failed",
        description: "Please select category",
      });
      return;
    }
    if(Technology.length===0){
      notification.error({
        message: "Registration Failed",
        description: "Please select Technology",
      });
      return;
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
    <Navbar/>
      <form id="loginForm" className="mb-1 mx-auto col-10 col-md-8 col-lg-6">
        <div className="col-md-4">
          <div className="mb-2">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              id="name"
              placeholder="Name *"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              placeholder="Email *"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label>Mobile</label>
            <input
              type="text"
              name="mobile"
              className="form-control"
              id="mobile"
              placeholder="Mobile *"
              value={mobile}
              onChange={(e)=>setmobile(e.target.value)}
            />
          </div>
          <div id="gender" className="mb-2">
            <label>Gender</label>
            <div className="form-check form-check-inline male">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="male"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
              />
              <label className="form-check-label" htmlFor="male">
                Male
              </label>
            </div>
            <div className="form-check form-check-inline female">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="female"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
              />
              <label className="form-check-label" htmlFor="female">
                Female
              </label>
            </div>
          </div>
          <div className="mb-2">
            <label>Category</label>
            <select
              className="form-control"
              name="category"
              id="category"
              value={category}
              onChange={changeCategory}
            >
              <option value="" disabled selected hidden>
                Select your Category
              </option>
              <option value="General">General</option>
              <option value="SC/ST">SC/ST</option>
              <option value="OBC">OBC</option>
            </select>
          </div>

          <div className="mb-2">
            <label>Technology</label>
            <div className="form-check checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                value="C"
                id="C"
                checked={Technology.includes("C")}
                onChange={handleTechnologyChange}
              />
              <label className="form-check-label">C</label>
            </div>
            <div className="form-check checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                value="C++"
                id="C++"
                checked={Technology.includes("C++")}
                onChange={handleTechnologyChange}
              />
              <label className="form-check-label">C++</label>
            </div>
            <div className="form-check checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                value="Java"
                id="Java"
                checked={Technology.includes("Java")}
                onChange={handleTechnologyChange}
              />
              <label className="form-check-label">Java</label>
            </div>
            <div className="form-check checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                value="JavaScript"
                id="JavaScript"
                checked={Technology.includes("JavaScript")}
                onChange={handleTechnologyChange}
              />
              <label className="form-check-label">JavaScript</label>
            </div>
          </div>

          <div className="form-check photo mb-2">
            <label className="header">Profile Photo:</label>
            <input
              id="file"
              type="file"
              name="profile_photo"
              placeholder="Photo"
              accept="image/jpeg, image/png"
              onChange={handleFileChange}
            />
          </div>

          <div>
            {profileImage && (
              <img
                src={URL.createObjectURL(profileImage)}
                alt="Profile"
                className="profile-image"
              />
            )}
          </div>

          <button
            className="previewbutton"
            type="submit"
            onClick={handlePreview}
          >
            Preview
          </button>
        </div>
      </form>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="modal-title">Preview</h2>
            <div className="modal-details">
              <p>
                <strong>Name:</strong> {name}
              </p>
              <p>
                <strong>Gender:</strong> {gender}
              </p>
              <p>
                <strong>Email:</strong> {email}
              </p>
              <p>
                <strong>mobile:</strong> {mobile}
              </p>
              <p>
                <strong>Category:</strong> {category}
              </p>
              <p>
                <strong>Technologies:</strong>{" "}
                {Technology.map((t) => (
                  <span>{t} </span>
                ))}
              </p>
              <p>
                <strong>Profile Picture:</strong> <br />{" "}
                <img
                  src={profileImage ? URL.createObjectURL(profileImage) : ""}
                  alt="Profile"
                  className="profile-image"
                />
              </p>
            </div>
            <div className="modal-buttons">
              <button
                className="modal-button cancel-button"
                onClick={closeModal}
              >
                Close
              </button>
              <button className="modal-button btn-primary" onClick={submitForm}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
