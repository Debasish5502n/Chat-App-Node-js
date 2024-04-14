import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const storedData = localStorage.getItem("chat-user");
		const userData = JSON.parse(storedData);
		
        // Set headers
        const headers = {
          "Content-Type": "application/json",
          Authorization: `${userData.token}`, // Example of setting an Authorization header
          // Add other headers as needed
        };

        // Fetch user data from API using stored data and headers
        const res = await fetch("/api/users", {
          headers: headers,
        });

        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};
export default useGetConversations;
