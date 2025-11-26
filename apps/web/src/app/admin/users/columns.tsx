"use client"

import { ColumnDef } from "@tanstack/react-table"
import { User } from "@/lib/types/user-type"

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "userType",
    header: "Role"
  }
]