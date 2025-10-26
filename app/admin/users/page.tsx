"use client";

import userService from "@/services/userService";
import { User } from "@/types/user.type";
import { useEffect, useState } from "react";

export default function UserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        setLoading(true);
        const res = await userService.getAll();
        if (res && res.users) {
          setUsers(res.users);
        }
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchAPI();
  }, []);

  if (loading) {
    return <div>Loading users...</div>;
  }

  console.log("users: ", users);
  return <></>;
}
