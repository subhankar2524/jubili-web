import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search/${encodeURIComponent(searchQuery.trim())}`);
        }
    };
    return (
        <nav className="flex items-center px-8 h-[60px] bg-white font-sans gap-8">
            {/* Logo */}
            <div className="font-bold text-2xl tracking-wide mr-8">Jubili</div>

            {/* Search */}
            <form onSubmit={handleSearch} className="relative flex-1 max-w-[350px] mr-8">
                <input
                    type="text"
                    placeholder="Search here"
                    className="w-full py-2 pr-10 pl-4 rounded-full border border-gray-200 text-base outline-none bg-[#fafafa]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                    <svg width="18" height="18" fill="none" stroke="#BDBDBD" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </button>
            </form>

            {/* Menu - hidden on mobile */}
            <div className="hidden md:flex items-center gap-6 mr-auto">
                <div className="text-sm font-medium cursor-pointer flex items-center">
                    All Category <span className="text-xs ml-1">▼</span>
                </div>
                <div className="text-sm font-medium cursor-pointer">Gift Cards</div>
                <div className="text-sm font-medium cursor-pointer">Special Event</div>
            </div>

            {/* Icons - hidden on mobile */}
            <div className="hidden md:flex items-center gap-8">
                <span className="flex items-center cursor-pointer h-6 w-6">
                    <img src="/icons/compass.svg" alt="CC" width={24} height={24} />
                </span>
                <span className="flex items-center cursor-pointer h-6 w-6">
                    <img src="/icons/bell.svg" alt="Notification" width={24} height={24} />
                </span>
                <span className="flex items-center cursor-pointer h-6 w-6">
                    <img src="/icons/heart.svg" alt="Favourites" width={24} height={24} />
                </span>
                <span className="flex items-center cursor-pointer h-6 w-6">
                    <img src="/icons/user.svg" alt="Profile" width={24} height={24} />
                </span>
                <span className="flex items-center cursor-pointer h-6 w-6">
                    <img src="/icons/cart.svg" alt="Cart" width={24} height={24} />
                </span>
            </div>
        </nav>
    );
};

export default Navbar;