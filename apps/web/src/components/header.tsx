import React from "react";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Search } from "lucide-react";

function Header() {
  return (
    <div className="bg-blue-800 p-4 rounded-b-md fixed top-0 right-0 left-0 flex items-center justify-between z-10">
      {/* Left: Logo */}
      <div className="flex items-center space-x-3">
        <div className="text-lg font-semibold text-white">SocMedApp</div>
      </div>

      {/* Center: Search (takes available width but constrained) */}
      <div className="flex-1 max-w-xl px-4">
        <div className="mx-auto w-full relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-500" />
          </div>
          <Input className="w-full pl-10 bg-white" type="text" placeholder="Search" />
        </div>
      </div>

      {/* Right: Avatar */}
      <div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

export default Header;
