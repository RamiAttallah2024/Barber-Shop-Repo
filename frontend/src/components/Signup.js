import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import translations from "../translation/translations-signup.json";
import "../css/signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const navigate = useNavigate();

  // Set document direction and language
  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validatePassword = (password) => {
    const minLength = /.{8,}/;
    const upperCase = /[A-Z]/;
    const lowerCase = /[a-z]/;
    const number = /\d/;
    const specialChar = /[@$!%*?&]/;

    const errors = [];
    const t = translations[language];

    if (!minLength.test(password)) errors.push(t.minLength);
    if (!upperCase.test(password)) errors.push(t.upperCase);
    if (!lowerCase.test(password)) errors.push(t.lowerCase);
    if (!number.test(password)) errors.push(t.number);
    if (!specialChar.test(password)) errors.push(t.specialChar);

    return errors.length > 0
      ? `${t.passwordRequirements}\n${errors.join("\n")}`
      : "";
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(validatePassword(newPassword));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordError) {
      setMessage("Please fix password issues before signing up.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/signup", {
        username,
        email,
        password,
        phoneNumber,
        role,
      });
      setMessage(response.data.message);
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setMessage(translations[language].emailUsed);
    }
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
        className={`signup-container ${language === "ar" ? "rtl" : "ltr"} ${
          darkMode ? "dark-mode" : ""
        }`}
      >
        <button onClick={toggleLanguage} className="language-button">
          {t.language}
        </button>
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
          {darkMode ? "☀️" : "🌙"}
        </button>
        <div className="signup-box">
          <h2 className="signup-title">{t.signup}</h2>
          <form onSubmit={handleSubmit} className="signup-form">
            <input
              type="text"
              placeholder={t.username}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="signup-input"
            />
            <input
              type="email"
              placeholder={t.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="signup-input"
            />
            <input
              type="tel-local"
              placeholder={t.phoneNumber}
              value={phoneNumber}
              onChange={(e) => setphoneNumber(e.target.value)}
              required
              className="signup-input "
            />
            <div className="password-container">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder={t.password}
                value={password}
                onChange={handlePasswordChange}
                required
                className="signup-input"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? "🙈" : "👁️"}
              </button>
            </div>
            {passwordError && (
              <div className="password-error">
                {passwordError.split("\n").map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            )}
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={role === "user"}
                  onChange={() => setRole("user")}
                />
                {t.user || "User"}
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="role"
                  value="shop"
                  checked={role === "shop"}
                  onChange={() => setRole("shop")}
                />
                {t.shop || "Shop"}
              </label>
            </div>
            <button
              type="submit"
              className="signup-button"
              disabled={!!passwordError}
            >
              {t.submit}
            </button>
          </form>
          {message && <p className="signup-message">{message}</p>}

          <div className="login-section">
            <p>
              {t.haveAccount}{" "}
              <a href="/" className="login-href-signup">
                {t.login}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
