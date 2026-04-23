import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Book from "@/pages/Book";
import Resources from "@/pages/Resources";
import Tools from "@/pages/Tools";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Quotes from "@/pages/Quotes";
import Login from "@/pages/Login";
import Admin from "@/pages/Admin";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/lib/LanguageContext";

function App() {
  return (
    <div className="App">
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/book" element={<Book />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/quotes" element={<Quotes />} />
            </Route>
            {/* Hidden routes, not in nav */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-center" richColors />
      </LanguageProvider>
    </div>
  );
}

export default App;
