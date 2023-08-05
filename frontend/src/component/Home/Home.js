import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import "./Home.css";
import Middlepage from "./Middlepage";
import TrustedSection from "./TrustedSection";
import Footer from "../layout/Footer/Footer";
import Footer1 from "../layout/Footer/Footer1";
import Header from "../layout/Header/Header";


const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <Fragment>
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="What do you wanna study.."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="AcadME" />

          <div className="banner">
            <h1>Personalized Learning, Just a Click Away</h1>
          </div>
          <MetaData title="AcadME" />

          <Search />
          <hr></hr>
          <Middlepage />
          <hr></hr>
          <TrustedSection />
          <Footer1 />
          <Footer />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
