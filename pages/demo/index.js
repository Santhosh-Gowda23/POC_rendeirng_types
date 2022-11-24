import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export async function getServerSideProps() {
  const response = await fetch("http://localhost:4000/recentlyviewed");
  console.log("response is", response);
  const data = await response.json();
  return {
    props: {
      productDetails: data,
    },
  };
}

const Demo = ({ productDetails }) => {
  console.log("productDetails page", productDetails);
  const [pro, setPro] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch("http://localhost:4000/recentlyviewed");
    const data = await response.json();
    setPro(data);
  };
  return pro != null ? (
    <>
      <h1>Recently Viewed Products</h1>
      {pro?.map((product) => (
        <div key={product.id}>
          <p>
            Product : {product.productName} <br></br> Category :{" "}
            {product.categories[1]}
          </p>
          <Image
            src="https://colgateb2b.vtexassets.com/arquivos/ids/155410/juniorbrush.jpg?v=1752687606"
            alt={"pro_image"}
            height={107}
            width={107}
          />
          <Link href={product.link}>Go to product</Link>
        </div>
      ))}
    </>
  ) : (
    <p>Loading.....</p>
  );
};

export default Demo;
