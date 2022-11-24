import Link from "next/link";
import { useState } from "react";
import Demo from "../../component/demo";

const PLP = ({ products }) => {
    const [productList, setProducts] = useState(products);

    //FILTER DATA ON CLIENT SIDE
    const handleSort = async () => {
        const response = await fetch("http://localhost:4000/products?categoryId=40");
        const data = await response.json();
        setProducts(data)
    }

    const handleAllProducts = () => {
        setProducts(products)
    }

    //GET REST OF THE PRODUCTS FROM CLIENT SIDE
    const handlePaginate = async () => {
        const response = await fetch(`http://localhost:4000/products?_page=3&_limit=5`);
        const data = await response.json();
        setProducts([...products, ...data])
    }

    return <div>
        <h2>Welcome to my PLP</h2>
        <h5>Click here to filter products of Toothbrush Category <button onClick={handleSort}>Sort</button></h5>
        <button onClick={handleAllProducts}>clear sort</button>

        {
            productList.map((product) => (
                <Link href={product.link}>
                    <p key={product.id}>Product : {product.productName}  <br></br> Category : {product.categories[1]}</p>
                </Link>
            ))
        }
        <button onClick={handlePaginate}>Next page</button>
        {/*
        Calling CSR Component in SSR
       */}
        <Demo />
        <Demo />
        <Demo />
    </div>;
};

//INITIALLY RENDER 10 PRODUCTS FROM PRE-BUILD
export async function getServerSideProps(context) {
    const { query } = context
    console.log(`http://localhost:4000/products?${Object.keys(query)[0]}=${Object.values(query)[0]}`)
    console.log(".................... GENERATING OR REVALIDATING ......................")
    const response = await fetch(`http://localhost:4000/products?${Object.keys(query)[0]}=${Object.values(query)[0]}`);
    // const response = await fetch(`http://localhost:4000/products?_page=1&_limit=10`);
    const data = await response.json();
    return {
        props: {
            products: data,
        },
        // revalidate: 10
    };
}

export default PLP;
