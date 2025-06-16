import { useState, useEffect } from 'react';
import api from '../utils/api';
import UserList from '../components/UserList';
import UserForm from '../components/UserForm';

function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      await loadUsers();
    } catch (error) {
      alert(error);
    }
  };

  const handleFormSubmit = async () => {
    setShowForm(false);
    setSelectedUser(null);
    await loadUsers();
  };

  return (
    <div>
      <UserList
        users={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {showForm && (
        <UserForm
          user={selectedUser}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
}

export default Users;