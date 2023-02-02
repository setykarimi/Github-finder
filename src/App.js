import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AlertProvider } from "./components/context/alert/AlertContext";
import { GithubProvider } from "./components/context/github/GithubContext";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import AboutPage from "./pages/About";
import HomePage from "./pages/Home";
import Notfound from "./pages/Notfound";
import User from "./pages/User";


function App() {
  return (
    <GithubProvider>
      <AlertProvider>
        {/* <Alert> */}
          <BrowserRouter>
            <div className="flex flex-col justify-between h-screen">
              <Navbar />
              <main className="container mx-auto px-3 pb-12">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/user/:login" element={<User />} />
                  <Route path="/" element={<Notfound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        {/* </Alert> */}
      </AlertProvider>
    </GithubProvider>
  );
}

export default App;
