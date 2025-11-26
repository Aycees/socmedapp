import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUsers } from "../services/userServices";
import { CreateUserRequests } from "@/lib/types/user-type";

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserRequests) => createUsers(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
