import React, { useEffect, useState } from "react";

import ProductItem from "./ProductItem";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdAddCircle } from "react-icons/md";
import { Input, InputGroup, InputGroupText } from "reactstrap";
import { FaSearch } from "react-icons/fa";
import Forms from "./Forms";
import { getTarification } from "../../store/actions/admin-action";

const TheProducts = () => {
  const products = useSelector((state) => state.products.filteredProducts);
  
  const [search, setSearch] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();
   useEffect(() => {
     dispatch(getTarification());
   }, [dispatch]);
  return (
    <div>
      <Forms
        about="product"
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <div className="flex items-center mx-4 my-8 p-8 bg-white shadow-2xl drop-shadow-md">
        <span className="text-4xl text-green-600 mr-6">
          <AiOutlineUnorderedList />
        </span>
        <h2 className=" text-4xl tracking-widest font-semibold">
          Gérer Les Produits
        </h2>
      </div>
      <div className="flex items-center mx-4 my-8 p-8 bg-white shadow-2xl drop-shadow-md">
        <InputGroup>
          <InputGroupText>
            <FaSearch />
          </InputGroupText>
          <Input
            placeholder="Tapez pour rechercher  "
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </InputGroup>
      </div>

      <div className="bg-white mx-4 p-8 shadow-lg space-y-12">
        <div>
          <button
            className="border-b-2 pb-3 border-gray-500 "
            onClick={() => {
              setModalShow(true);
            }}
          >
            <span className="inline-flex mr-3 text-green-600">
              <MdAddCircle />{" "}
            </span>
            Ajouter un Produit
          </button>
        </div>
        {products
          .filter((product) => {
            return (
              search.toLowerCase() === "" ||
              product.product_label.toLowerCase().includes(search)
            );
          })
          .map((product) => {
            return (
              <ProductItem key={product.id} product={product} update={false} />
            );
          })}
      </div>
    </div>
  );
};

export default TheProducts;
