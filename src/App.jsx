import { useState } from 'react';
import { Users, ShieldCheck, Lock } from 'lucide-react';
import { users as initialUsers, roles as initialRoles, permissions } from './data/mockData';
import Header from './components/Header';
import UserTable from './components/UserTable';
import RoleTable from './components/RoleTable';
import UserModal from './components/UserModal';
import RoleModal from './components/RoleModal';
import DeleteConfirmation from './components/DeleteConfirmation';

export default function App() {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState(initialUsers);
  const [roles, setRoles] = useState(initialRoles);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [deleteType, setDeleteType] = useState('user');

  const tabs = [
    { id: 'users', name: 'Users', icon: Users },
    { id: 'roles', name: 'Roles', icon: ShieldCheck },
    { id: 'permissions', name: 'Permissions', icon: Lock },
  ];

  // User Management
  const handleAddUser = (userData) => {
    const newUser = {
      ...userData,
      id: (users.length + 1).toString(),
      lastLogin: new Date().toISOString(),
    };
    setUsers([...users, newUser]);
  
    // Clear selectedUser and close the modal
    setSelectedUser(null);
    setIsUserModalOpen(false);
  };
  

  const handleEditUser = (userData) => {
    if (!selectedUser) return;
    const updatedUsers = users.map((user) =>
      user.id === selectedUser.id ? { ...user, ...userData } : user
    );
    setUsers(updatedUsers);
  };

  const handleDeleteUser = () => {
    if (!selectedUser) return;
    const filteredUsers = users.filter((user) => user.id !== selectedUser.id);
    setUsers(filteredUsers);
    setIsDeleteModalOpen(false);
  };

  const handleToggleUserStatus = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
          : user
      )
    );
  };

  // Role Management
  const handleAddRole = (roleData) => {
    const newRole = {
      ...roleData,
      id: (roles.length + 1).toString(),
    };
    setRoles([...roles, newRole]);
  };

  const handleEditRole = (roleData) => {
    if (!selectedRole) return;
    const updatedRoles = roles.map((role) =>
      role.id === selectedRole.id ? { ...role, ...roleData } : role
    );
    setRoles(updatedRoles);
  };

  const handleDeleteRole = () => {
    if (!selectedRole) return;
    const filteredRoles = roles.filter((role) => role.id !== selectedRole.id);
    setRoles(filteredRoles);
    setIsDeleteModalOpen(false);
  };

  const openDeleteModal = (type, item) => {
    setDeleteType(type);
    if (type === 'user') {
      setSelectedUser(item);
    } else {
      setSelectedRole(item);
    }
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
  <nav
    className="flex flex-wrap space-x-4 justify-center  md:justify-start overflow-x-auto scrollbar-hide"
    aria-label="Tabs"
  >
    {tabs.map((tab) => {
      const Icon = tab.icon;
      return (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`${
            activeTab === tab.id
              ? "bg-white text-indigo-600 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          } px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors m-1 md:m-0`}
        >
          <Icon className="h-5 w-5" />
          <span>{tab.name}</span>
        </button>
      );
    })}
  </nav>
</div>


        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
          </h2>
          {(activeTab === "users" || activeTab === "roles") && (
            <button
              onClick={() => {
                if (activeTab === "users") {
                  setSelectedUser(null);
                  setIsUserModalOpen(true);
                } else {
                  setSelectedRole(null);
                  setIsRoleModalOpen(true);
                }
              }}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Add {activeTab === "users" ? "User" : "Role"}
            </button>
          )}
        </div>

        {activeTab === "users" && (
          <UserTable
            users={users}
            onEdit={(user) => {
              setSelectedUser(user);
              setIsUserModalOpen(true);
            }}
            onDelete={(user) => openDeleteModal("user", user)}
            onToggleStatus={handleToggleUserStatus}
          />
        )}

        {activeTab === "roles" && (
          <RoleTable
            roles={roles}
            onEdit={(role) => {
              setSelectedRole(role);
              setIsRoleModalOpen(true);
            }}
            onDelete={(role) => openDeleteModal("role", role)}
          />
        )}

        {activeTab === "permissions" && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {permissions.map((permission) => (
                <div
                  key={permission.id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-indigo-500 transition-colors"
                >
                  <h3 className="font-medium text-gray-900 mb-1">
                    {permission.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {permission.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <UserModal
        isOpen={isUserModalOpen}
        onClose={() => {
          setIsUserModalOpen(false);
          setSelectedUser(null);
        }}
        onSubmit={selectedUser ? handleEditUser : handleAddUser}
        roles={roles}
        user={selectedUser}
        title={selectedUser ? "Edit User" : "Add User"}
      />

      <RoleModal
        isOpen={isRoleModalOpen}
        onClose={() => {
          setIsRoleModalOpen(false);
          setSelectedRole(null);
        }}
        onSubmit={selectedRole ? handleEditRole : handleAddRole}
        permissions={permissions}
        role={selectedRole}
        title={selectedRole ? "Edit Role" : "Add Role"}
      />

      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedUser(null);
          setSelectedRole(null);
        }}
        onConfirm={deleteType === "user" ? handleDeleteUser : handleDeleteRole}
        userName={
          deleteType === "user"
            ? selectedUser?.name || ""
            : selectedRole?.name || ""
        }
      />
    </div>
  );
}
