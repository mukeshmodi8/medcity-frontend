import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

// 👉 BACKEND BASE URL (yahi missing tha)
const API_BASE = "https://medcity-backend-t66f.onrender.com";

const HomeContentContext = createContext();

export function HomeContentProvider({ children }) {
  const [homeContent, setHomeContent] = useState(null);
  const [loadingHome, setLoadingHome] = useState(true);
  const [errorHome, setErrorHome] = useState(null);

  useEffect(() => {
    loadHome();
  }, []);

  async function loadHome() {
    try {
      setLoadingHome(true);
      setErrorHome(null);

      const res = await fetch(`${API_BASE}/pages/home`);
      if (!res.ok) {
        throw new Error("Failed to load home content");
      }

      const data = await res.json();
      setHomeContent(data);
    } catch (err) {
      console.error("Failed to load home content:", err);
      setErrorHome(err.message || "Error while loading home content");
    } finally {
      setLoadingHome(false);
    }
  }

  const value = {
    homeContent,
    setHomeContent,
    loadingHome,
    errorHome,
    reloadHome: loadHome,
  };

  return (
    <HomeContentContext.Provider value={value}>
      {children}
    </HomeContentContext.Provider>
  );
}

export function useHomeContent() {
  const ctx = useContext(HomeContentContext);
  if (!ctx) {
    throw new Error("useHomeContent must be used inside HomeContentProvider");
  }
  return ctx;
}
