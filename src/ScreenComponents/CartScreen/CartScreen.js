// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const CartScreen = () => {
//   const [carts, setCarts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchCarts = async () => {
//       try {
//         const response = await axios.get("https://dummyjson.com/carts");
//         setCarts(response.data.carts);
//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch cart data");
//         setLoading(false);
//       }
//     };

//     fetchCarts();
//   }, []);

//   if (loading) return <div className="p-6">Loading cart...</div>;
//   if (error) return <div className="p-6 text-red-600">{error}</div>;

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h2 className="text-3xl font-bold mb-6 text-gray-800">All Cart Items</h2>
//       {carts.map((cart) => (
//         <div
//           key={cart.id}
//           className="border rounded-lg p-4 mb-6 shadow-sm bg-white"
//         >
//           <h3 className="text-lg font-semibold mb-4 text-gray-700">
//             🛒 Cart ID: {cart.id} | 👤 User ID: {cart.userId}
//           </h3>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {cart.products.map((product) => (
//               <div
//                 key={product.id}
//                 className="flex gap-4 items-center border rounded-md p-3"
//               >
//                 <img
//                   src={product.thumbnail}
//                   alt={product.title}
//                   className="w-20 h-20 object-cover rounded-md"
//                 />
//                 <div>
//                   <h4 className="text-md font-semibold">{product.title}</h4>
//                   <p className="text-sm text-gray-600">
//                     Quantity: {product.quantity} × ${product.price}
//                   </p>
//                   <p className="text-sm font-medium text-gray-800">
//                     Total: ${product.total.toFixed(2)}
//                   </p>
//                   <p className="text-sm text-green-600">
//                     Discount: -${(product.total - product.discountedTotal).toFixed(2)}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="mt-4 text-right text-lg font-semibold text-gray-800">
//             Cart Total: ${cart.total} → After Discount: ${cart.discountedTotal}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CartScreen;

// CartContext.js

import React from "react";
import { useCart } from "../../context/CartContext";

const CartScreen = () => {
  const { cartItems, removeFromCart } = useCart();

  if (cartItems.length === 0) {
    return <div className="p-6">Your cart is empty.</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-4 mb-4 border p-4 rounded shadow"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-20 h-20 object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{item.title}</h3>
              <p>
                Price: ${item.price} x Quantity: {item.quantity}
              </p>
              <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartScreen;
