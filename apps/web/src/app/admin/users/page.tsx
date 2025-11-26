"use client";

import { useUsersQuery } from "@/lib/api/queries/userQueries";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const Users = () => {

  const { data: users, isLoading, isError } = useUsersQuery();
  console.log("Users: ", users);
  
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching users</div>;
  
  return (
    <div className="w-full">
      <div className="text-3xl font-bold">Users Management</div>
      <div className="container mx-auto py-5">
        <DataTable columns={columns} data={users || []} />
      </div>
    </div>
  );
};

export default Users;
