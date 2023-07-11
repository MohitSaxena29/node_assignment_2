import React, { useState, useEffect } from "react";
import "./View.css";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import {notification} from 'antd';
import Navbar from "../NavBar/Navbar";
const View = () => {
  const [users, setUsers] = useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:5200/record/user")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5200/record/user/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
      notification.success({
        message: "User Deleted",
        description: "Deletion Successfull",
      });
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Failed",
        description: "Deletion Failed",
      });
    }
  };

  return (
    <>
      <Navbar/>
      {users.length > 0 ? (
        <div className="grid-container">
          {users.map((item) => (
            <div className="grid-item" key={item._id}>
              <div className="row">
                <div className="col-sm-3 col-md-3 col-lg-3">
                  <span className="viewdata">Image:</span>
                </div>
                <div className="col-sm col-md col-lg">
                  <span className="displaydata">
                    <img
                      src={`http://localhost:5200/record/getfile/${item.profileImage}`}
                      alt="User Image"
                    />
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3 col-md-3 col-lg-3">
                  <span className="viewdata">Name:</span>
                </div>
                <div className="col-sm col-md col-lg">
                  <span className="displaydata">{item.name}</span>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3 col-md-3 col-lg-3">
                  <span className="viewdata">Email:</span>
                </div>
                <div className="col-sm col-md col-lg">
                  <span className="displaydata">{item.email}</span>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3 col-md-3 col-lg-3">
                  <span className="viewdata">Mobile:</span>
                </div>
                <div className="col-sm col-md col-lg">
                  <span className="displaydata">{item.mobile}</span>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3 col-md-3 col-lg-3">
                  <span className="viewdata">Gender:</span>
                </div>
                <div className="col-sm col-md col-lg">
                  <span className="displaydata">{item.gender}</span>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3 col-md-3 col-lg-3">
                  <span className="viewdata">Category:</span>
                </div>
                <div className="col-sm col-md col-lg">
                  <span className="displaydata">{item.category}</span>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3 col-md-3 col-lg-3">
                  <span className="viewdata">Technology:</span>
                </div>
                <div className="col-sm col-md col-lg">
                  {item.Technology.map((TechnologyItem, index) => (
                    <span key={index}>{TechnologyItem}</span>
                  ))}
                </div>
              </div>
              <div className="buttons">
                <Link to={"/" + item._id} className="update-button">
                  Update
                </Link>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="container">
          <span>
            <h3>Please fill data in form first.</h3>
            <button className="btn btn-primary" onClick={()=>navigate('/')}>Register Page</button>
          </span>
        </div>
      )}
    </>
  );
};

export default View;
