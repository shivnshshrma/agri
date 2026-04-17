import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Advisor from "./Advisor";
import Home from "./Home";
import How from "./How";
import "./App.css";
import { FaLeaf, FaHome, FaComments, FaInfoCircle, FaTimes, FaBars } from "react-icons/fa";



function App() {
  const [preferredLang, setPreferredLang] = useState(
    localStorage.getItem("preferredLanguage") || "en"
  );
  const [isOpen, setIsOpen] = useState(false);
  const [sunlight, setSunlight] = useState(false);

  const getInitialTheme = () => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") return stored;
    } catch {
      // ignore
    }
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  const [name, setName] = useState(localStorage.getItem("farmerName") || "");
  const [inputName, setInputName] = useState("");


  const handleLogin = (e) => {
    e.preventDefault();

    if (!inputName.trim()) {
      alert("Name is required");
      return;
    }

    localStorage.setItem("farmerName", inputName);

    setName(inputName);

    setInputName("");
    window.location.href = "/";
  };

  const handleLogout = () => {
    localStorage.removeItem("farmerName");
    setName("");
    window.location.href = "/";
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("theme-dark", theme === "dark");
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // ignore
    }
  }, [theme]);

  return (
    <Router>
      <div className={sunlight ? "app sunlight" : "app"}>

        {/* Navbar */}
        {/* NAVBAR */}
        <nav className="navbar">
          <div className="nav-left">
            <FaLeaf className="icon" />
            <Link to="/" className="brand">
              Fasal Saathi
            </Link>
          </div>

          <ul className={`nav-center ${isOpen ? "active" : ""}`}>
            <li>
              <Link to="/" onClick={() => setIsOpen(false)}>
                <FaHome className="icon" /> Home
              </Link>
            </li>
            <li>
              <Link to="/advisor" onClick={() => setIsOpen(false)}>
                <FaComments className="icon" /> Chat
              </Link>
            </li>
            <li>
              <Link to="/how-it-works" onClick={() => setIsOpen(false)}>
                <FaInfoCircle className="icon" /> How It Works
              </Link>
            </li>
          </ul>

          <div className="nav-right">
            <button
              type="button"
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
              className="theme-toggle"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              aria-pressed={theme === "dark"}
              title={theme === "dark" ? "Light mode" : "Dark mode"}
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

            <button
              onClick={() => setSunlight(!sunlight)}
              className="sunlight-toggle"
              aria-label="Toggle high contrast mode"
              aria-pressed={sunlight}
            >
              {sunlight ? "Normal Contrast" : "High Contrast"}
            </button>

            {/* Language Dropdown */}
            {/* LANGUAGE SELECT */}
            <div id="google_translate_element" style={{ opacity: 0, position: "absolute", zIndex: -1 }}></div>
            <select
              className="lang-select"
              value={preferredLang}
              onChange={(e) => {
                const lang = e.target.value;
                setPreferredLang(lang);
                localStorage.setItem("preferredLanguage", lang);

                // Update Google Translate automatically
                const gtCombo = document.querySelector(".goog-te-combo");
                if (gtCombo) {
                  gtCombo.value = lang;
                  gtCombo.dispatchEvent(new Event("change"));
                }
              }}
            >
              <option value="en">🌍 English</option>
              <option value="hi">🇮🇳 हिंदी</option>
              <option value="mr">🇮🇳 मराठी</option>
              <option value="bn">🇮🇳 বাংলা</option>
              <option value="ta">🇮🇳 தமிழ்</option>
              <option value="te">🇮🇳 తెలుగు</option>
              <option value="gu">🇮🇳 ગુજરાતી</option>
              <option value="pa">🇮🇳 ਪੰਜਾਬੀ</option>
              <option value="kn">🇮🇳 ಕನ್ನಡ</option>
              <option value="ml">🇮🇳 മലയാളം</option>
              <option value="or">🇮🇳 ଓଡ଼ିଆ</option>
              <option value="as">🇮🇳 অসমীয়া</option>
            </select>

            {/* USER */}
            <div className="nav-user">
              {name ? (
                <>
                  👋 Welcome, {name}!
                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
              )}
            </div>
          </div>

          <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </nav>

        {/* ROUTES */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/advisor" element={<Advisor />} />
          <Route path="/how-it-works" element={<How />} />

          <Route
            path="/login"
            element={
              <div className="login-page">
                <div className="login-card">
                  <h2>👨‍🌾 Farmer Login</h2>

                  <form onSubmit={handleLogin}>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={inputName}
                      onChange={(e) => setInputName(e.target.value)}
                    />

                    <select
                      value={preferredLang}
                      onChange={(e) => {
                        const lang = e.target.value;
                        setPreferredLang(lang);
                        localStorage.setItem("preferredLanguage", lang);

                        // Update Google Translate automatically
                        const gtCombo = document.querySelector(".goog-te-combo");
                        if (gtCombo) {
                          gtCombo.value = lang;
                          gtCombo.dispatchEvent(new Event("change"));
                        }
                      }}
                      style={{ marginBottom: "18px" }}
                    >
                      <option value="en">English</option>
                      <option value="hi">Hindi</option>
                      <option value="mr">Marathi</option>
                    </select>

                    <button type="submit">Login</button>
                  </form>
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
