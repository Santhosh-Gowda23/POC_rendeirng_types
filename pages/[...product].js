import Image from "next/image";
import React from "react";
import Demo from "../component/demo";

export async function getServerSideProps(context) {
  const { query } = context;
  const response = await fetch(
    `http://localhost:4000/products?linkText=${Object.values(query.product)[0]}`
  );
  const data = await response.json();
  return {
    props: {
      productDetails: data,
    },
  };
}

const Product = ({ productDetails }) => {
  // console.log(productDetails);
  return (
    <div>
      {productDetails?.map((product) => (
        <div key={product.id}>
          <h1>Product name: {product.productName}</h1>
          <p>Price :{product.items[0].sellers[0].commertialOffer.ListPrice}</p>
          <Image
            src={product.items[0].images[0].imageUrl}
            alt="product image"
            height={300}
            width={300}
          />
        </div>
      ))}
      <Demo />
    </div>
  );
};

export default Product;
