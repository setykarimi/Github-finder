import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GithubProvider } from "./components/context/github/GithubContext";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import AboutPage from "./pages/About";
import HomePage from "./pages/Home";
import Notfound from "./pages/Notfound";


function App() {
  return (
    <GithubProvider>
      <BrowserRouter>
        <div className="flex flex-col justify-between h-screen">
          <Navbar />
          <main className="container mx-auto px-3 pb-12">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/" element={<Notfound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </GithubProvider>
  );
}

export default App;
