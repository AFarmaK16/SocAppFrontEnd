import React from "react";
import { Link } from "react-router-dom";

const Overview = () => {
  return (
    <div className="w-full bg-[#f1f5f8] py-32 text-center">
      <div className="px-3 lg:px-0 lg:w-[55%] mx-auto">
        <h2 className="font-extrabold text-5xl text-[#242833] capitalize mb-10 tracking-widest leading-10">
          LA FONDATION SOCOCIM
        </h2>
        <p className="text-lg text-[#555] tracking-widest font-normal mb-5 leading-7">
          CRÉATRICE D'IMPACTS ET DE SYNERGIES
        </p>
        <p className="text-lg text-[#555] tracking-widest font-normal mb-5 leading-7">
          Culture, emploi, science, formation… La Fondation créée en 2010
          s’implique auprès d’associations sénégalaises pour le développement de
          projets socio-économiques et culturels.
        </p>
        {/* <Link
          className="inline-block px-6 py-3 font-semibold tracking-wider text-white bg-primary uppercase mt-8 text-lg hover:bg-secondary-200 transition-all duration-300"
          to="/about"
        >
          En savoir plus
        </Link> */}
      </div>
    </div>
  );
};

export default Overview;
