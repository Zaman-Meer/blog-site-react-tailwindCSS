import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="w-full h-32  p-8   bg-gray-900 text-white">
      <Link to="/" className="text-2xl no-underline">TechBlog</Link>
    </div>
  );
}
