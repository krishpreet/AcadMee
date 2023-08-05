import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Header from "../layout/Header/Header";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [dispatch, navigate, isAuthenticated]);

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <MetaData title={`${user?.name}'s Profile`} />
      <div className="profileContainer">
        <div>
          <h1>My Profile</h1>
          {user && (
            <>
              <img src={user.avatar?.url} alt={user.name} />
              <Link to="/me/update">Edit Profile</Link>
            </>
          )}
        </div>
        <div>
          <div>
            <h4>Full Name</h4>
            <p>{user?.name}</p>
          </div>
          <div>
            <h4>Email</h4>
            <p>{user?.email}</p>
          </div>
          <div>
            <h4>Joined On</h4>
            <p>{String(user?.createdAt)?.substr(0, 10)}</p>
          </div>
          <div>
            <Link to="/orders">My Orders</Link>
            <Link to="/password/update">Change Password</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
