import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProduct = async (id) => {
  const response = await axios.get(`https://dummyjson.com/products/${id}`);
  return response.data;
};

const ProductDetail = () => {
  const { id } = useParams(); // get product ID from URL
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading product</div>;

  return (
    <div className="p-6 md:p-10 bg-white rounded-3xl shadow-xl max-w-3xl mx-auto">
      {/* Title */}
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
        {data.title}
      </h1>

      {/* Image */}
      <div className="overflow-hidden rounded-2xl shadow-md transition-transform duration-300 hover:scale-105">
        <img
          src={data.thumbnail}
          alt={data.title}
          className="w-full object-cover max-h-96"
        />
      </div>

      {/* Price */}
      <p className="text-2xl font-semibold text-indigo-600 mt-6">
        ${data.price}
      </p>

      {/* Description */}
      <p className="mt-4 text-base text-gray-700 leading-relaxed">
        {data.description}
      </p>
    </div>
  );
};

export default ProductDetail;
