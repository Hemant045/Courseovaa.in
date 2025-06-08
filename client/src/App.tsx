import { Routes, Route, useLocation, BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/navbar";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Courses from "@/pages/courses";
import Payment from "@/pages/Payment";
import WebPayment from "@/pages/WebPayment";
import WebNotePayment from "@/pages/WebNotePayment";
import WebNotePayment2 from "@/pages/WebNotePayment2";
import WebNotePayment3 from "@/pages/WebNotePayment3";
import CourseDetail from "@/pages/course-detail";
import About from "@/pages/about";
// import NoteDetail from "@/pages/note-detail";
import NoteDetail from "@/pages/note-detail";
import Notes from "@/pages/notes";
import Contact from "./pages/Contact";
import WebDevelopmentCoursePage from "@/pages/courses/web-development";
import { ThemeProvider } from "@/hooks/useTheme";
import { useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { MenuProvider, useMenuContext } from "@/components/MenuContext";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import CartPage from "./pages/Cart";
import PremiumAccess from "./pages/PremiumAccess";
import ScrollToTop from "./components/ScrollToTop";
import { CartProvider } from './context/CartContext';
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import ProtectedRoute from "@/components/ProtectedRoute";
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import PaymentSuccess from "./pages/PaymentSuccess";
import Logout from "./pages/Logout";
import MyStorePage from "./pages/MyStorePage"; 

function PageWrapper() {
  const { isMenuOpen } = useMenuContext();
  const location = useLocation();

  return (
    <div
      className={`transition-transform duration-300 ease-in-out md:translate-x-0 ${
        isMenuOpen ? "-translate-x-64" : ""
      }`}
    >
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/web-development" element={<WebDevelopmentCoursePage />} />
        <Route path="/courses/:courseId" element={<CourseDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/notes/demo-note/:topic" element={<NoteDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/WebPayment" element={<WebPayment />} />
        <Route path="/WebNotePayment" element={<WebNotePayment />} />
        <Route path="/WebNotePayment2" element={<WebNotePayment2 />} />
        <Route path="/WebNotePayment3" element={<WebNotePayment3 />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/cart" element={<CartPage />} />
        <Route
         path="/premium-access"
          element={
            <ProtectedRoute>
              <PremiumAccess />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/notes/demo-note/:topic" element={<NoteDetail />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/my-store" element={<MyStorePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

function App() {
  const location = useLocation();

  useEffect(() => {
    const fetchNotes = async () => {
      const snap = await getDocs(collection(db, "notes"));
      console.log("🔥 Notes fetched:", snap.docs.map((doc) => doc.data()));
    };
    fetchNotes();
  }, []);

  const hideNavbarRoutes = ["/payment"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <MenuProvider>
          <ScrollToTop />
          <div className="min-h-screen bg-background text-foreground transition-colors overflow-x-hidden">
            {!shouldHideNavbar && <Navbar />}
            {/* ✅ Content below fixed navbar */}
            <div className="pt-16">
              <PageWrapper />
            </div>
          </div>
          <Toaster />
        </MenuProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

// Wrap Router and CartProvider at root level so CartContext is available everywhere including routes
export default function WrappedApp() {
  return (
    <CartProvider>
      <Router>
        <App />
      </Router>
    </CartProvider>
  );
}