import React from "react";

import { GiCompass, GiDiamondHard, GiStabbedNote } from 'react-icons/gi';

import { NavLink } from "react-router-dom";
import gamme_img from "../../assets/gamme_nobg.png";


const TheServices = () => {
    return (
      <div className="bg-secondary-200 px-8 py-24">
        <div className="xl:w-[85%] mx-auto">
          <div className="flex justify-between mb-12">
            <h3 className="text-3xl text-[#453227] capitalize tracking-wide font-semibold w-1/2">
              Nos produits <br />{" "}
              <NavLink
                className="ml-2 p-2 lg:text-lg font-semibold"
                to="/products"
              >
                <u> En savoir plus &gt;</u>
              </NavLink>
            </h3>
            <div className="w-1/2 leading-relaxed text-[#795744]">
              <img src={gamme_img} alt="" srcset="" width={900} height={900} />
            </div>
          </div>
        </div>
      </div>
    );
};



export default TheServices;