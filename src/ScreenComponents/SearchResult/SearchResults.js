import React from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const fetchSearchedProducts = async (searchTerm) => {
  const response = await fetch(`https://dummyjson.com/products/search?q=${searchTerm}`);
  const data = await response.json();
  return data.products;
};

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["search", query],
    queryFn: () => fetchSearchedProducts(query),
    enabled: !!query, // only fetch if query exists
  });

  if (!query) return <div className="p-4">Please enter a search term.</div>;
  if (isLoading) return <div className="p-4">Loading results for "{query}"...</div>;
  if (isError) return <div className="p-4">Error fetching search results.</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Search Results for "{query}"</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.length > 0 ? (
          data.map((product) => (
            <div key={product.id} className="border p-2 rounded shadow">
                              <Link to={`/product/${product.id}`}>
              
              <img src={product.thumbnail} alt={product.title} className="h-40 w-full object-cover mb-2" />
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-gray-600">${product.price}</p>
              </Link>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
