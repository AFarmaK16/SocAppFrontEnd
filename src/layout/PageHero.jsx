import React from 'react';

import { Link } from 'react-router-dom';

const PageHero = ({ title, product ,alert}) => {
    return (
      <div className="bg-secondary-200 w-full min-h-[20vh] flex items-center">
        <div className="w-[80vw] mx-auto">
          <h3 className="sm:text-2xl md:text-[2rem] capitalize font-bold tracking-wider">
            <Link className="text-white" to="/">
              Accueil{" "}
            </Link>
            {product && (
              <Link className="text-white" to="/products">
                &gt; Produits{" "}
              </Link>
            )}
            &gt; {title}{" "}
            <span className=" top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {alert}
            </span>
          </h3>
        </div>
      </div>
    );
};

export default PageHero;