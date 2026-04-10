"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/language/use-language";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { User, Role } from "@/types/user";
import { addUser, deleteUser, updateUser, fetchUsers } from "@/store/users";
import { UserFilters, UserTable, UserFormModal, DeleteConfirmModal } from "@/components/users";
import { Pagination, PageHeader } from "@/components/ui";
import { toast } from "sonner";

export function UserManagement() {
  const { messages } = useLanguage();
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.users);
  const isLoading = useAppSelector((state) => state.users.isLoading);

  useEffect(() => {
    dispatch(fetchUsers())
      .unwrap()
      .catch(() => {
        toast.error(messages.users.error_fetch);
      });
  }, [dispatch, messages.users.error_fetch]);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleRoleFilterChange = (value: string) => {
    setRoleFilter(value);
    setCurrentPage(1);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (user: User) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      dispatch(deleteUser(userToDelete.id))
        .unwrap()
        .then(() => {
          toast.success(messages.users.success_delete);
        })
        .catch(() => {
          toast.error(messages.users.error_delete);
        });
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    }
  };

  const handleFormSubmit = (data: { name: string; role: Role; permissions: string[] }) => {
    if (editingUser) {
      dispatch(updateUser({ id: editingUser.id, role: data.role, permissions: data.permissions }))
        .unwrap()
        .then(() => {
          toast.success(messages.users.success_update);
        })
        .catch(() => {
          toast.error(messages.users.error_update);
        });
    } else {
      dispatch(addUser(data))
        .unwrap()
        .then(() => {
          toast.success(messages.users.success_add);
        })
        .catch(() => {
          toast.error(messages.users.error_add);
        });
    }
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const openAddModal = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-6xl w-full mx-auto">
      <PageHeader title={messages.home.title || "User Role Management"} />

      <UserFilters
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        roleFilter={roleFilter}
        onRoleFilterChange={handleRoleFilterChange}
        onAdd={openAddModal}
      />

      <div className="flex flex-col gap-6">
        <UserTable
          users={paginatedUsers}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={(id: string) => {
            const user = users.find((u) => u.id === id);
            if (user) handleDelete(user);
          }}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <UserFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        user={editingUser}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        userName={userToDelete?.name || ""}
      />
    </div>
  );
}
