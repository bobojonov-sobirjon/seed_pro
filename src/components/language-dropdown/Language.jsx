import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", name: "English", flag: "EN" },
  { code: "ru", name: "Russian", flag: "RU" },
  { code: "cn", name: "Chinese", flag: "CN" }, // Fixed flag for Chinese
];

const LanguageSelector = (props) => {
  const { classes = "", classesOption = "w-56" } = props;
  const { i18n } = useTranslation();
  const dropdownRef = useRef(null);

  // Load the saved language from localStorage or default to the first language
  const savedLanguageCode =
    localStorage.getItem("language") || languages[1].code;
  const [selectedLang, setSelectedLang] = useState(
    languages.find((lang) => lang.code === savedLanguageCode) || languages[1]
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Update the i18n language on initial render
    i18n.changeLanguage(selectedLang.code);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedLang, i18n]);

  const handleLanguageChange = (langCode) => {
    const selectedLanguage = languages.find((lang) => lang.code === langCode);
    if (selectedLanguage) {
      i18n.changeLanguage(selectedLanguage.code);
      localStorage.setItem("language", selectedLanguage.code);
      setSelectedLang(selectedLanguage);
      setIsOpen(false);
    }
  };

  return (
    <div className={`relative inline-block text-left ${classes}`}>
      {/* Button to toggle dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* <span className="mr-2">{selectedLang.flag}</span> */}
        {selectedLang.name}
        <svg
          className="ml-2 -mr-1 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className={`z-30 origin-top-right absolute right-0 mt-2 ${classesOption ? classesOption : 'left-0'} rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
        >
          <div
            className="py-1 transition transform ease-in-out duration-300"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {languages?.length > 0 && languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-200`}
                role="menuitem"
              >
                <span className="mr-2">{lang.flag}</span>
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
