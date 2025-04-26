import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import translations from "../translation/translations-login.json";
import "../css/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/homePage");
    }
  }, [navigate]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      setMessage(translations[language].success);
      navigate("/homePage", { state: { role: response.data.role } });
    } catch (error) {
      setMessage(translations[language].error);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const t = translations[language];

  return (
    <>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <div
        className={`login-page ${language === "ar" ? "rtl" : "ltr"} ${
          darkMode ? "dark-mode" : ""
        }`}
      >
        <button onClick={toggleLanguage} className="language-button">
          {t.language}
        </button>
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
          {darkMode ? "☀️" : "🌙"}
        </button>
        <div className="login-box">
          <h2 className="login-title">{t.login}</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="email"
              placeholder={t.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input"
            />
            <div className="password-container">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder={t.password}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="login-input"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? "🙈" : "👁️"}
              </button>
            </div>
            <button type="submit" className="login-button">
              {t.submit}
            </button>
          </form>
          {message && <p className="login-message">{message}</p>}
          <div className="signup-section">
            <p>
              {t.noAccount}{" "}
              <a href="/signup" className="signup-href">
                {t.signUp}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
