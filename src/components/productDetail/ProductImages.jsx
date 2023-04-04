import React, { useState } from 'react';


const ProductImages = ({ product_image = [[]] }) => {
  const [main, setMain] = useState(product_image[0]);

  console.log(product_image[0]);

  return (
    <div>
      {/* <img
        src={main.image}
        alt=""
        className="h-[600px] w-full block rounded object-contain"
      /> */}
      <div className="mt-8 grid grid-cols-5 gap-x-4">
        {product_image.map((image, index) => {
          return (
            <h1>There should be the image</h1>
            // <img
            //   src={image.image}
            //   alt=""
            //   key={index}
            //   onClick={() => setMain(product_image[index])}
            //   className={`h-12 lg:h-20 w-full block rounded object-contain cursor-pointer ${
            //     main.image === image.image
            //       ? "border-2 border-solid border-secondary-200"
            //       : ""
            //   }`}
            // />
          );
        })}
      </div>
    </div>
  );
};


export default ProductImages;