import React from "react";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import axios from "axios"; // ✅ Use default axios here
import { Link } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const fetchProducts = async () => {
  const response = await axios.get("https://dummyjson.com/products");
  return response.data.products;
};

const BestSellerScreen = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching products</div>;

  const handleAddToCart = async (productId) => {
    const cartData = {
      userId: 1, // can be dynamic later
      products: [
        {
          id: productId,
          quantity: 1,
        },
      ],
    };

    try {
      const response = await axios.post(
        "https://dummyjson.com/carts/add",
        cartData
      );
      console.log("Cart updated:", response.data);
      alert("Product added to cart!");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Failed to add product to cart.");
    }
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Best Selling Products
      </h2>
      <div className="relative group">
        <Slider {...settings}>
          {data.map((product) => (
            <div key={product.id} className="px-2">
              <div className="bg-white rounded-lg shadow-md p-4">
                <Link to={`/product/${product.id}`}>
                  <img src={product.thumbnail} alt={product.title}  className="w-full object-cover max-h-96"/>
                  <h3>{product.title}</h3>
                </Link>
                <p className="text-gray-600">${product.price}</p>
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="mt-2 px-4 py-2 bg-[#101355] text-white rounded hover:bg-[#E6E4D9]"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BestSellerScreen;
