import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //inside return, {JSON.stringify(checked, null, 4)} to check array of selected id of categories
  //{JSON.stringify(radio, null, 4)} to check array of selected prices range
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category); //in get all categories, we are getting 'category' as response on success(try block)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotalCount();
  }, []);

  //get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
      }
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      const shuffledData = shuffleArray(data.products);
      setProducts(shuffledData);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  //get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`/api/v1/product/product-filters`, {
        checked,
        radio,
      });
      console.log(data);
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  //get totalCount
  const getTotalCount = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotalCount(data?.totalCount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  return (
    <Layout title={"All Products - Best Offers"}>
      <div className="row mt-2 p-3">
        <div className="col-md-2 p-4">
          <h4 className="text-left fs-4" style={{ color: "blue" }}>
            Filter By Category
          </h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
                className="fs-5"
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/*price filter*/}
          <h4 className="mt-4 fs-4" style={{ color: "blue" }}>
            Filter By Price
          </h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array} className="fs-5">
                    {p.name}
                  </Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div>
            <button
              className="btn btn-danger mt-3"
              onClick={() => window.location.reload()} // reload using window global object
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-10 ">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap justify-content-center">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/product-image/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title">{p.name}</h5>
                    <div className="d-flex">
                      <p className="fw-bold fs-5">{p.rating}</p>
                      <img
                        src="https://www.freeiconspng.com/thumbs/star-icon/star-icon-32.png"
                        alt="star"
                        className="mt-1"
                        height={"22px"}
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="card-text fs-5">by {p.brand}</p>
                    <p className="fw-bold fs-5">Rs {p.price}/-</p>
                  </div>
                </div>
                <div className="mb-3 ms-2 d-flex justify-content-center">
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    className="btn btn-secondary ms-2"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to Cart");
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < totalCount && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

/*JSON.stringify(value, replacer, space)
The <pre> tag defines preformatted text.*/
