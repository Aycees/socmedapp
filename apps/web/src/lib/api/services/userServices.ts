export const findAllUsers = async () => {
    try {
        const response = await fetch('http://localhost:8000/users', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!response.ok) {
            console.error("Response status:", response.status, response.statusText);
            throw new Error(`Failed to fetch users: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data);
        return data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};