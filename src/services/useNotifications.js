import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const useNotifications = () => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const cookie = new Cookies();
  const token = cookie.get("user");

  useEffect(() => {
    if (!token) return;

    const ws = new WebSocket(
      `${import.meta.env.VITE_SOCKET_SERVER_URL}notifications/?token=${token}`
    );

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setNotifications((prev) => [...prev, data]); // Yangi notifikatsiyalarni qo'shish
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [token]);

  return { notifications, socket };
};

export default useNotifications;
