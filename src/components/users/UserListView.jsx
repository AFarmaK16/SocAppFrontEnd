import React from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/helpers";
import { HiChevronDoubleRight } from "react-icons/hi";

const UserListView = ({ products }) => {
  return (
    <div>
      {products((product) => {
        const {
          id,
          product_name,
          product_description,
          tarification,
          product__image,
        } = product;
        return (
          <div key={id} className="flex mb-8">
            <img
              className="w-[300px] h-[200px] object-contain mb-4 rounded"
              src={product__image}
              alt={product_name}
            />
            <div className="flex flex-col">
              <h3 className="mb-2 text-lg font-bold tracking-widest">
                {product_name}
              </h3>
              <h4 className="mb-2 text-secondary-100 italic font-bold">
                {formatPrice(tarification.montant)}
              </h4>
              <p className="max-w-2xl mb-3 text-gray-500">
                {product_description.substring(0, 150)}...
              </p>
              <Link
                to={`/products/${id}`}
                className="text-sm uppercase bg-secondary-100 text-white rounded-md font-bold py-1 px-2 ml-auto shadow-lg"
              >
                Details
                <span className="inline-block ml-1">
                  <HiChevronDoubleRight />
                </span>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserListView;
