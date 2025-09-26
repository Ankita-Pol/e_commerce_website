import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const fetchCategories = async () => {
  const response = await axios.get("https://dummyjson.com/products/categories");
  return response.data; // array of strings
};

const fetchProductsByCategory = async (category) => {
  const response = await axios.get(
    `https://dummyjson.com/products/category/${category}`
  );
  return response.data.products;
};

const CategoryScreen = () => {
  const { id: selectedCategory } = useParams();

  const {
    data: categories,
    isLoading: loadingCategories,
    isError: errorCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const {
    data: products,
    isLoading: loadingProducts,
    isError: errorProducts,
  } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: () => fetchProductsByCategory(selectedCategory),
    enabled: !!selectedCategory,
  });

  if (loadingCategories || (selectedCategory && loadingProducts))
    return <div>Loading...</div>;

  if (errorCategories || errorProducts)
    return <div>Sorry, something went wrong.</div>;

  return (
    <div className="p-6 md:p-10 bg-[#E6E4D9] min-h-screen">
      {!selectedCategory ? (
        <>
          {/* Header */}
          <h2 className="text-3xl font-bold mb-8 text-[#4B3F2F] tracking-tight">
            Explore Categories
          </h2>

          {/* Categories List */}
          <div className="flex flex-wrap gap-4">
            {categories.map((category, index) => (
              <Link to={`/category/${category.slug}`} key={index}>
                <button className="px-6 py-3 rounded-xl border-2 border-black bg-[#E6E4D9] font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[3px_3px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:shadow-none">
                  {category.name}
                </button>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Products Header */}
          <h2 className="text-3xl font-bold mb-8 text-[#4B3F2F] capitalize">
            Products in "{selectedCategory}"
          </h2>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="group block bg-white rounded-3xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="w-full mb-4">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    // className="w-full max-h-[250px] object-contain rounded-xl"
                     className="w-full object-cover max-h-96"
                  />
                </div>
                <h3 className="text-[#4B3F2F] font-semibold text-lg mb-1 truncate">
                  {product.title}
                </h3>
                <p className="text-gray-600 font-medium">${product.price}</p>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryScreen;
