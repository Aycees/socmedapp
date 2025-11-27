import { BASE_URL } from "@/lib/config/api";
import { CreateUserRequests, User } from "@/lib/types/user-type";

export const findAllUsers = async () => {
    try {
        const response = await fetch(`${BASE_URL}/users`, {
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

export const createUsers = async (userData: CreateUserRequests) => {
    const response = await fetch(`${BASE_URL}/users/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(userData),
    });

    if (!response.ok) {
        let errorMessage = "User creation failed";
        try {
            const errorData = await response.json();
            if (errorData.message) {
                errorMessage = errorData.message;
            }
        } catch {}
        throw new Error(errorMessage);
    }
    
    const data = await response.json();
    return data;
}