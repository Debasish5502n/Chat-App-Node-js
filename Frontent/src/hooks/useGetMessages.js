import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		const getMessages = async () => {
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
                const res = await fetch(`/api/messages/${selectedConversation._id}`, {
                  headers: headers,
                });

				//const res = await fetch(`/api/messages/${selectedConversation._id}`);
				const data = await res.json();
				if (data.error) throw new Error(data.error);
				setMessages(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]);

	return { messages, loading };
};
export default useGetMessages;