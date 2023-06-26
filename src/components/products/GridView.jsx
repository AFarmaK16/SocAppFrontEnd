import React from "react";
import { Link } from "react-router-dom";
import { FaCartPlus, FaPlus, FaSearch } from "react-icons/fa";
import { formatPrice } from "../../utils/helpers";
// import product_img from "../assets/CEMIIB-LL32-5RCE.jpg";
import product_img from "../../assets/cemiib-ll32-5rce.jpg";

const GridView = ({ products }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-6">
        {products.map((product) => {
          const { id, product_label, tarification, product_image } = product;
          return (
            <div key={id}>
              <div className="relative rounded-md">
                <Link
                  to={`/products/${id}`}
                  className="flex items-center justify-center absolute bg-[#222] w-full h-[175px] rounded-md opacity-0 hover:opacity-70 transition-all duration-300"
                >
                  <span className="flex items-center justify-center bg-secondary-100 w-10 h-10 rounded-full">
                    <FaCartPlus />
                  </span>
                </Link>
                <img
                  className="w-full h-[175px] block object-contain rounded"
                  src={product_img}
                  alt={product_label}
                />
              </div>
              <footer
                className="
               flex mt-4 
              justify-between items-center"
              >
                <h4 className="mb-0 font-normal">{product_label}</h4>
                {/* <br /> */}
                <p className="mb-0 font-normal text-secondary-100 tracking-widest">
                  {formatPrice(tarification.montant)}
                </p>
              </footer>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GridView;
