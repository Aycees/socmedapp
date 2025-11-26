import { useQuery } from "@tanstack/react-query";
import { findAllUsers } from "../services/userServices";

export const useUsersQuery = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: findAllUsers,
        staleTime: 5 * 60 * 1000
    })
}