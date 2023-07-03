import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import ProductImages from "../components/productDetail/ProductImages";
import Stars from "../components/productDetail/Stars";
import PageHero from "../layout/PageHero";
import AddToCart from "../components/productDetail/AddToCart";
import { getProductDetails } from "../store/actions/products-actions";
import { formatPrice } from "../utils/helpers";
import TheSpinner from "../layout/TheSpinner";
// -----------------JUST FOR TEST PURPOSE
import product_img from "../assets/cemiib-ll32-5rce.jpg";
import { Col, Row } from "reactstrap";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const dispatchOrders = useDispatch();
  const loading = useSelector((state) => state.ui.productDetailLoading);
    const isAuthenticated = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    dispatch(getProductDetails(productId));
  }, [dispatch, productId]);


  const product = useSelector((state) => state.products.productDetails);

  console.log(product)
  const {
    id,
    product_name,
    product_description,
    tarification,
    product_price,
    product_label,
    product_image,
  } = product;
const {montant}= tarification || {};
  //   const {
  //   order_id,
  //   order_Date,
  //   order_Amount,
  //   order_status,
  //   deliverRef,
  //   customerRef,
  //   customer,
  //   facture,
  //   orderItems,
  // } = orders;
  return (
    <motion.div
      className="mb-48"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <PageHero title={product_label} product />
      <div className="mt-16 space-y-16 w-[80vw] mx-auto">
        {isAuthenticated ? (
          <Link
            to="/customer/c/products"
            className="uppercasepx-4 py-2 rounded text-white font-semibold shadow-lg"
          >
            <button className="btn btn-success">Retour</button>
          </Link>
        ) : (
          <Link
            to="/products"
            className="uppercasepx-4 py-2 rounded text-white font-semibold shadow-lg"
          >
            <button className="btn btn-success">Retour</button>
          </Link>
        )}

        {loading ? (
          <TheSpinner />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* <ProductImages product_image={product_image} /> */}

            <Col>
              <Row>
                <div>
                  {" "}
                  <img src={product_img} />
                </div>
              </Row>
              <Row>
                {" "}
                <div>
                  <h2 className="font-bold text-5xl tracking-wide mb-5">
                    {product_name}
                  </h2>
                  <p className="text-lg  tracking-wider text-gray-600">
                    <b> Product ID:</b> {id}
                  </p>
                  <div className="flex flex-col w-full sm:w-3/4 lg:w-1/2 space-y-5">
                    <div className=" ">
                      <p className="text-lg  tracking-wider text-gray-600">
                        <b>Reférence :</b>
                        {product_label}
                      </p>
                    </div>
                  </div>
                  <p className="text-lg  tracking-wider text-gray-600">
                    {/* <p className="text-lg font-semibold text-secondary-100 tracking-widest italic my-4"> */}
                    <b>P.U HT: </b> {formatPrice(montant)}
                  </p>
                </div>
              </Row>
              <Row>
                {" "}
                <hr className="my-6" />
                <p className="text-lg  tracking-wider text-gray-600">
                  {/* <p className="max-w-3xl tracking-wider leading-8 text-gray-500 mb-6"> */}
                  <b> Domaines d’utilisation :</b>
                  {product_description}
                </p>
                <hr className="my-6" />
              </Row>
            </Col>
            <div>
              <br />
              {isAuthenticated && <AddToCart product={product} />}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductDetail;
