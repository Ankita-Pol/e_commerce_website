import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
  
const navItems = [
  { id: 1, name: "Dashboard", path: "/" },
  { id: 2, name: "About us", path: "/about" },
  // { id: 3, name: "Carrier", path: "/carrier" },
  // { id: 4, name: "Contact us", path: "/contact" },
  // { id: 5, name: "Blogs", path: "/blog" },
  { id: 6, name: "Cart", path: "/cart" },
];
 

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
    }
  };

  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true); 
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

 
  if ( location.pathname === "/" ||
    location.pathname.startsWith("/product/") ||
    location.pathname.startsWith("/search") ||
        location.pathname.startsWith("/cart") ||
                location.pathname.startsWith("/category") ||
                location.pathname.startsWith("/about")
                // location.pathname.startsWith("/")
  ) {
    return null;
  }

  return (
    <header
      className={`bg-transparent py-3 fixed w-full top-0 z-50 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto px-4 max-w-[1320px]">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-white text-2xl font-semibold leading-9">
           ClinkNBuy
          </Link>

       
          <nav className="hidden md:flex gap-5 items-center">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`${
                  location.pathname === item.path
                    ? "text-white font-semibold"
                    : "text-white/80 hover:text-white"
                } no-underline`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
           <div>
      {/* your nav items */}
      {user ? (
        <button onClick={logout} className="text-white ml-4">Logout</button>
      ) : (
        <Link to="/login" className="text-white ml-4">Login</Link>
      )}
    </div>
<form
  onSubmit={handleSearch}
  className="hidden md:flex items-center bg-[#E6E4D9] rounded-full px-4 py-1 focus-within:ring-2 focus-within:ring-[#101355] transition-all duration-200 w-full max-w-sm"
>
  <Search className="text-[#101355] w-5 h-5 mr-2" />
  <input
    type="text"
    placeholder="Search products..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="bg-transparent outline-none text-sm text-[#101355] w-full placeholder-[#101355]/70"
  />
  <button
    type="submit"
    className="ml-2 bg-[#101355] text-white px-4 py-1 rounded-full text-sm font-medium hover:bg-[#6b563d] transition-colors"
  >
    Search
  </button>
</form>

          {/* Hamburger for mobile */}
          <button
            className="md:hidden text-white text-lg"
            onClick={toggleSidebar}
          >
            <FaBars />
          </button>
        </div>

        {/* Sidebar Overlay */}
        <div
          className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
            isSidebarOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={toggleSidebar}
        ></div>

        {/* Sidebar */}
        <div
          className={`fixed top-0 bottom-0 left-0 w-[230px] h-screen bg-white p-4 z-50 rounded-tr-lg rounded-br-lg transition-all duration-300 ${
            isSidebarOpen
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          } md:hidden`}
        >
          <div className="flex justify-between items-center">
            <span className="text-black text-xl font-semibold">MyWebsite</span>
            <button
              onClick={toggleSidebar}
              className="text-black border border-gray-300 bg-gray-300 p-1 rounded-full hover:text-gray-600"
            >
              <MdClose size={20} />
            </button>
          </div>

          <ul className="flex flex-col gap-3 mt-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`block no-underline ${
                    location.pathname === item.path
                      ? "text-gray-600"
                      : "text-black hover:text-gray-600"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
