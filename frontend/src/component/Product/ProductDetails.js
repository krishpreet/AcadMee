import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import BookingCalendar from "./BookingCalendar";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const options = {
    size: "small",
    value: product?.ratings || 0,
    readOnly: true,
    precision: 0.5,
  };

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showAllDescription, setShowAllDescription] = useState(false);

  const maxWordsToShow = 100;
  const shortenedDescription =
    product?.description?.split(" ").slice(0, maxWordsToShow).join(" ") || "";

  const toggleDescriptionPopup = () => {
    setShowAllDescription((prev) => !prev);
  };

  const submitReviewToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const reviewSubmitHandler = () => {
    if (!product) {
      return;
    }

    const formData = new FormData();
    formData.set("rating", rating);
    formData.set("comment", comment);
    formData.set("productId", product._id);

    dispatch(newReview(formData));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, reviewError, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product?.name}`} />
          {product && (
            <div className="ProductDetails">
              <div className="detailsBlock-1">
                <h1>{product.name}</h1>
                <p>
                  <span>📍</span>
                  {product.Address} &#9733;{product.numOfReviews} Reviews
                </p>
                <hr />
              </div>

              <div className="carouselContainer">
                <Carousel>
                  {product.images?.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
                </Carousel>
              </div>
              <div className="detailsBlock-4">
                {showAllDescription ? (
                  <Dialog
                    open={true}
                    onClose={toggleDescriptionPopup}
                    maxWidth="md"
                    fullWidth
                  >
                    <DialogTitle>About {product.name}</DialogTitle>
                    <DialogContent>
                      <p>{product?.description}</p>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={toggleDescriptionPopup} color="primary">
                        Close
                      </Button>
                    </DialogActions>
                  </Dialog>
                ) : (
                  <>
                    <p>{shortenedDescription}</p>
                    {product?.description?.length > maxWordsToShow && (

                      <button
                        className="seeAllButton"
                        onClick={toggleDescriptionPopup}
                      >
                        Show more
                      </button>
                    )}
                  </>
                )}
              </div>

              <div className="detailsblock-3">
                <BookingCalendar />
              </div>
            </div>
          )}

          <div className="Reviewsection">
            <h3 className="reviewsHeading">All Reviews</h3>
            <Dialog
              aria-labelledby="simple-dialog-title"
              open={open}
              onClose={submitReviewToggle}
            >
              <DialogTitle>Submit Review</DialogTitle>
              <DialogContent className="submitDialog">
                <Rating
                  onChange={(e, newValue) => setRating(newValue)}
                  value={rating}
                  size="large"
                />

                <textarea
                  className="submitDialogTextArea"
                  cols="30"
                  rows="5"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </DialogContent>
              <DialogActions>
                <Button onClick={submitReviewToggle} color="secondary">
                  Cancel
                </Button>
                <Button onClick={reviewSubmitHandler} color="primary">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>

            {product?.reviews && product.reviews.length > 0 ? (
              <div className="reviews">
                {product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
              </div>
            ) : (
              <p className="noReviews">No Reviews Yet</p>
            )}
            <div className="detailsBlock-2">
              <span className="detailsBlock-2-span">
                &#9733;{product.numOfReviews} Reviews
              </span>
              <button onClick={submitReviewToggle} className="submitReview">
                Add a review
              </button>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
