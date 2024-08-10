import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import JoblyApi from "../api/api";
import UserContext from "./UserContext";

const Profile = () => {
  const history = useHistory();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        username: currentUser.username,
      });
    }
  }, [currentUser]);

  async function handleSubmit(evt) {
    evt.preventDefault();

    const profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    };

    try {
      const updatedUser = await JoblyApi.saveProfile(
        formData.username,
        profileData
      );
      
      setFormErrors([]);
      setCurrentUser(updatedUser);
      history.push("/");
    } catch (errors) {
      setFormErrors(errors);
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((f) => ({ ...f, [name]: value }));
    setFormErrors([]);
  }

  return (
    <div>
      <h1>Edit {formData.username}'s Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {formErrors.length > 0 && (
        <ul>
          {formErrors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;
