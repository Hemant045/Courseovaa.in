import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, BookOpen, Users, FileText, Menu, X, ChevronDown, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutUser } from "../utils/logout";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = async () => {
    await logoutUser();
    navigate("/"); // redirect to homepage after logout
  };

  return (
    <header className="fixed top-0 left-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <GraduationCap className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Courseova
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              {/* Courses dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <BookOpen className="h-4 w-4 mr-2" />
                  Courses
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[400px] p-4">
                    <h4 className="mb-2 text-sm font-medium leading-none">Our Courses</h4>
                    <div className="grid gap-3">
                      <Link to="/courses/web-development">
                        <NavigationMenuLink className="block p-3 hover:bg-accent rounded-md transition-colors">
                          <div className="text-sm font-medium mb-1">Web Development</div>
                          <p className="text-sm text-muted-foreground">
                            Master full-stack development from scratch
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Notes */}
              <NavigationMenuItem>
                <Link to="/notes">
                  <NavigationMenuLink className={cn("inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium hover:bg-accent hover:text-accent-foreground")}>
                    <FileText className="h-4 w-4 mr-2" />
                    Study Notes
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* Contact */}
              <NavigationMenuItem>
                <Link to="/contact">
                  <NavigationMenuLink className={cn("inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium hover:bg-accent hover:text-accent-foreground")}>
                    <Users className="h-4 w-4 mr-2" />
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* About dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <Users className="h-4 w-4 mr-2" />
                  About
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 p-4 w-[400px]">
                    <li>
                      <Link to="/about">
                        <NavigationMenuLink className="block p-3 rounded-lg hover:bg-accent transition">
                          <div className="text-sm font-semibold">About Us</div>
                          <p className="text-xs text-muted-foreground">Learn more about our mission and team.</p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link to="/privacy-policy">
                        <NavigationMenuLink className="block p-3 rounded-lg hover:bg-accent transition">
                          <div className="text-sm font-semibold">Privacy Policy</div>
                          <p className="text-xs text-muted-foreground">Understand how we handle your data.</p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link to="/refund-policy">
                        <NavigationMenuLink className="block p-3 rounded-lg hover:bg-accent transition">
                          <div className="text-sm font-semibold">Refund & Return Policy</div>
                          <p className="text-xs text-muted-foreground">Know your rights for refunds and returns.</p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link to="/terms-and-conditions">
                        <NavigationMenuLink className="block p-3 rounded-lg hover:bg-accent transition">
                          <div className="text-sm font-semibold">Terms & Conditions</div>
                          <p className="text-xs text-muted-foreground">Read the rules and guidelines of using our platform.</p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link to="/my-store" className="hover:underline text-blue-600">My Store</Link>

          {/* Button to Full Course Listing Page */}
          <Link to="/courses">
            <Button variant="outline" className="ml-4">Explore All Courses</Button>
          </Link>

          {/* Authentication UI for Desktop */}
          {user ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="relative group cursor-pointer">
              <svg className="h-7 w-7 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.31 0-6 2.69-6 6v2h12v-2c0-3.31-2.69-6-6-6z" />
              </svg>
              <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 text-xs bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap z-50">
                Login / Register
              </span>
            </Link>
          )}

          {/* Cart Icon */}
          <div className="relative group cursor-pointer mt-1">
            <Link to="/cart" className="hover:text-blue-600">
              <ShoppingCart className="h-6 w-6 text-black" />
            </Link>
            <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 text-xs bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap z-50">
              Cart
            </span>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      <div
        className={`fixed top-0 right-0 z-40 w-64 bg-background shadow-lg transform transition-all duration-300 ease-in-out h-screen overflow-y-auto ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 h-full flex flex-col justify-between relative">
          {/* Close button */}
          <button
            onClick={() => setMenuOpen(false)}
            className="text-lg font-semibold absolute top-4 right-4 p-1 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Menu Links */}
          <nav className="space-y-6 mt-8">
            <Link to="/" onClick={() => setMenuOpen(false)} className="block text-lg font-semibold hover:text-blue-600 transition">
              Home
            </Link>

            {/* Mobile Courses Dropdown */}
            <div className="mb-4">
              <button
                onClick={() => setCoursesOpen(!coursesOpen)}
                className="text-lg w-full text-left font-semibold py-2 flex justify-between items-center hover:text-blue-600 transition focus:outline-none"
                aria-expanded={coursesOpen}
                aria-controls="mobile-courses-menu"
              >
                Courses
                <ChevronDown
                  className={`h-5 w-5 transform transition-transform duration-300 ${coursesOpen ? "rotate-180" : ""}`}
                />
              </button>
              {coursesOpen && (
                <div id="mobile-courses-menu" className="pl-4 space-y-2 mt-2">
                  <Link to="/courses/web-development" onClick={() => setMenuOpen(false)} className="block text-sm font-medium hover:text-blue-600 transition">
                    Web Development
                  </Link>
                </div>
              )}
            </div>

            <Link to="/notes" onClick={() => setMenuOpen(false)} className="block text-lg font-semibold hover:text-blue-600 transition">
              Study Notes
            </Link>

            <Link to="/contact" onClick={() => setMenuOpen(false)} className="block text-lg font-semibold hover:text-blue-600 transition">
              Contact
            </Link>

            {/* Mobile About Dropdown */}
            <div className="mb-4">
              <button
                onClick={() => setAboutOpen(!aboutOpen)}
                className="text-lg w-full text-left font-semibold py-2 flex justify-between items-center hover:text-blue-600 transition focus:outline-none"
                aria-expanded={aboutOpen}
                aria-controls="mobile-about-menu"
              >
                About
                <ChevronDown
                  className={`h-5 w-5 transform transition-transform duration-300 ${aboutOpen ? "rotate-180" : ""}`}
                />
              </button>
              {aboutOpen && (
                <div id="mobile-about-menu" className="pl-4 space-y-2 mt-2">
                  <Link to="/about" onClick={() => setMenuOpen(false)} className="block text-sm font-medium hover:text-blue-600 transition">
                    About Us
                  </Link>
                  <Link to="/privacy-policy" onClick={() => setMenuOpen(false)} className="block text-sm font-medium hover:text-blue-600 transition">
                    Privacy Policy
                  </Link>
                  <Link to="/refund-policy" onClick={() => setMenuOpen(false)} className="block text-sm font-medium hover:text-blue-600 transition">
                    Refund & Return Policy
                  </Link>
                  <Link to="/terms-and-conditions" onClick={() => setMenuOpen(false)} className="block text-sm font-medium hover:text-blue-600 transition">
                    Terms & Conditions
                  </Link>
                </div>
              )}
            </div>

            {/* Explore All Courses */}
            <Link to="/courses" onClick={() => setMenuOpen(false)} className="block text-lg font-semibold hover:text-blue-600 transition">
              Explore All Courses
            </Link>

            <Link to="/cart" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-lg font-semibold hover:text-blue-600 transition">
              Add to Cart <ShoppingCart className="h-5 w-5" />
            </Link>

            {/* Mobile Auth Buttons */}
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  <Button className="w-full mt-3">Login</Button>
                </Link>
                <Link to="/signup" onClick={() => setMenuOpen(false)}>
                  <Button className="w-full mt-3">Register</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Entire page shift on mobile */}
      <div
        className={`transition-transform duration-300 ease-in-out ${menuOpen ? "transform translate-x-64" : "transform translate-x-0"} md:transform-none`}
      >
        {/* Wrap your page content here */}
        <div className="content">
          {/* Your content, like the homepage, courses, etc. */}
        </div>
      </div>
    </header>
  );
}
