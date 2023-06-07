import * as React from "react";

const DarkModeToggle = () => {
  const toggleDarkMode = () => {
    document.body.classList.toggle("dark");
  };
  return <button onClick={toggleDarkMode}>Toggle Dark Mode</button>;
};

export default DarkModeToggle;
