import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../Home/Productcard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import "./Products.css"; // You can create a CSS file for styling (ProductList.css)
import Header from "../layout/Header/Header";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5); // Number of products per page
  const [priceFilter, setPriceFilter] = useState([0, 25000]);
  const [showFilterDialog, setShowFilterDialog] = useState(false);

  useEffect(() => {
    // Fetch products from the backend API
    axios
      .get("/api/v1/products")
      .then((response) => {
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching products.");
        setLoading(false);
      });
  }, []);

  const handleFilterByRatingAndPrice = () => {
    const filtered = products.filter(
      (product) =>
        product.rating >= ratingFilter &&
        product.price >= priceFilter[0] &&
        product.price <= priceFilter[1]
    );
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset pagination to first page when applying filters
    setShowFilterDialog(false); // Close the filter dialog after applying filters
  };

  // Get current products to be displayed on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Header />
      <div className="productListContainer">
        <div className="productList">
          <h1>Product List</h1>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setShowFilterDialog(true)}
          >
            Filter
          </Button>
          <div className="productCardContainer">
            {currentProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <Pagination
            activePage={currentPage}
            itemsCountPerPage={productsPerPage}
            totalItemsCount={filteredProducts.length}
            onChange={handlePageChange}
            innerClass="pagination"
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>

        <div className="googleMapsContainer">
          {/* Your Google Maps API component goes here */}
          {/* For demonstration purposes, a placeholder div is used */}
          <div className="placeholder">Google Maps API Placeholder</div>
        </div>

        <Dialog
          open={showFilterDialog}
          onClose={() => setShowFilterDialog(false)}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>Adjust Filters</DialogTitle>
          <DialogContent>
            <div className="sliderContainer">
              <div className="sliderLabel">Filter by Rating:</div>
              <Slider
                value={ratingFilter}
                onChange={(e, newValue) => setRatingFilter(newValue)}
                valueLabelDisplay="auto"
                step={0.5}
                min={0}
                max={5}
              />
            </div>
            <div className="sliderContainer">
              <div className="sliderLabel">Filter by Price:</div>
              <Slider
                value={priceFilter}
                onChange={(e, newValue) => setPriceFilter(newValue)}
                valueLabelDisplay="auto"
                step={1000}
                min={0}
                max={25000}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowFilterDialog(false)}>Cancel</Button>
            <Button onClick={handleFilterByRatingAndPrice} color="primary">
              Apply Filters
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default ProductList;
