"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateUserMutation } from "@/lib/api/mutations/userMutations";
import { userFormSchema } from "@/lib/schema/user-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";

type UserSignupForm = z.infer<typeof userFormSchema>;

export function SignupForm() {
  const router = useRouter();
  const createUserMutation = useCreateUserMutation();

  const { register, handleSubmit, setError, formState: { isSubmitting, errors}} = useForm<UserSignupForm>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
      bio: "",
      avatarUrl: ""
    }
  });

  const onSubmit: SubmitHandler<UserSignupForm> = async (data) => {
    await new Promise ((resolve) => setTimeout(resolve, 1000))
    await createUserMutation.mutateAsync(data, {
      onSuccess: () => {
        console.log("creation success")
        console.log("Data: ", data);
        router.push("/users/home");
      },
      onError: (error) => {
        if (error.message.toLowerCase().includes("username")) {
          setError("username", { message: error.message });
        } else if (error.message.toLowerCase().includes("email")) {
          setError("email", { message: error.message });
        }
      }
    })
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create a New Account</CardTitle>
        <CardDescription>
          Enter your information to create an account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="username">Username</Label>
              </div>
              <Input
                {...register("username")}
                type="text"
                placeholder="Username"
                required
              />
              {errors.username && (
                <span className="text-red-500 text-sm">{errors.username.message}</span>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="bio">Bio</Label>
                <span className="ml-2 text-xs text-gray-400">(optional)</span>
              </div>
              <Input
                {...register("bio")}
                type="text"
                placeholder="Bio"
              />
              {errors.bio && (
                <span className="text-red-500 text-sm">{errors.bio.message}</span>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="fullname">Full Name</Label>
              </div>
              <Input
                {...register("name")}
                type="text"
                placeholder="Full Name"
                required
              />
              {errors.name && (
                <span className="text-red-500 text-sm">{errors.name.message}</span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="m@example.com"
                  required
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">{errors.email.message}</span>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  {...register("password")}
                  type="password"
                  placeholder="Password"
                  required
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">{errors.password.message}</span>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Create Account
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
