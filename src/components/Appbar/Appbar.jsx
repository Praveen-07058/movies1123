import { Link, NavLink } from "react-router-dom";

export default function Appbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-red-500">MovieZZZ</Link>
        <nav className="flex items-center gap-5 text-sm sm:text-base">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-red-400" : "text-gray-300 hover:text-white"}>Search</NavLink>
          <NavLink to="/favorites" className={({ isActive }) => isActive ? "text-red-400" : "text-gray-300 hover:text-white"}>Favorites</NavLink>
        </nav>
      </div>
    </header>
  );
}
