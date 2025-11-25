import React from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const Users = async () => {
    // Fetch users data from your API

  return (
    <div className="w-full">
      <div>Users Management</div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={[]} />
      </div>
    </div>
  );
};

export default Users;
