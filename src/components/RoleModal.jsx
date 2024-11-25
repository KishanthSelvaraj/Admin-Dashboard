import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function RoleModal({ isOpen, onClose, onSubmit, permissions, role, title }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissionIds: [],
  });

  useEffect(() => {
    if (role) {
      setFormData({
        name: role.name,
        description: role.description,
        permissionIds: role.permissions.map((p) => p.id),
      });
    } else {
      setFormData({
        name: '',
        description: '',
        permissionIds: [],
      });
    }
  }, [role]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedPermissions = permissions.filter((p) =>
      formData.permissionIds.includes(p.id)
    );

    onSubmit({
      name: formData.name,
      description: formData.description,
      permissions: selectedPermissions,
    });
    onClose();
  };

  const togglePermission = (permissionId) => {
    setFormData((prev) => ({
      ...prev,
      permissionIds: prev.permissionIds.includes(permissionId)
        ? prev.permissionIds.filter((id) => id !== permissionId)
        : [...prev.permissionIds, permissionId],
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Role Name</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {permissions.map((permission) => (
                  <label key={permission.id} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      checked={formData.permissionIds.includes(permission.id)}
                      onChange={() => togglePermission(permission.id)}
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-700">{permission.name}</p>
                      <p className="text-xs text-gray-500">{permission.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
