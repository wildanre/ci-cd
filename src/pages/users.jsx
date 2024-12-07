import { useState, useEffect } from 'react';
import TableUsers from '../components/TableUsers';
import UserForm from '../components/UserForm';
import { ButtonAdd } from '../components/button';

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    role: '',
    phoneNumber: '',
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/users`)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const openDialog = (user = null) => {
    if (user) {
      setSelectedUser(user);
      setUserData({
        name: user.name,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber,
      });
    } else {
      setSelectedUser(null);
      setUserData({ name: '', email: '', role: '', phoneNumber: '' });
    }
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    const url = selectedUser
      ? `${import.meta.env.VITE_API_URL}/users/${selectedUser.id}`
      : `${import.meta.env.VITE_API_URL}/users`;
    const method = selectedUser ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then(() => {
        setIsDialogOpen(false);
        fetch(`${import.meta.env.VITE_API_URL}/users`)
          .then((response) => response.json())
          .then((data) => setUsers(data))
          .catch((error) => console.error('Error fetching users:', error));
      })
      .catch((error) => console.error('Error saving user:', error));
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
        method: 'DELETE',
      })
        .then(() => {
          fetch(`${import.meta.env.VITE_API_URL}/users`)
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error('Error fetching users:', error));
        })
        .catch((error) => console.error('Error deleting user:', error));
    }
  };

  return (
    <div className='mx-2'>
      <ButtonAdd onClick={() => openDialog()} />
      <TableUsers users={users} onEdit={openDialog} onDelete={handleDelete} />
      {isDialogOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50'>
          <UserForm
            userData={userData}
            onChange={handleChange}
            onSave={handleSave}
            onCancel={closeDialog}
            isEditing={selectedUser}
          />
        </div>
      )}
    </div>
  );
}
