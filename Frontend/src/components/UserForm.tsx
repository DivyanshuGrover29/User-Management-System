import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { User } from '../redux/userSlice';
import ConfirmationDialog from './ConfirmationDialog';

interface UserFormProps {
  onDeleteUser: (user: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onDeleteUser }) => {
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [newHobby, setNewHobby] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userId, setUserId] = useState('');

  const handleAddHobby = () => {
    if (newHobby.trim()) {
      setHobbies((prevHobbies) => [...prevHobbies, newHobby]);
      setNewHobby('');
    }
  };

  const handleRemoveHobby = (index: number) => {
    setHobbies((prevHobbies) => prevHobbies.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = { username, age: parseInt(age), hobbies };

    try {
      const response = await axios.post(`${API_BASE_URL}/users`, userData);
      console.log(response.data);  // Log the full response object
      setStatusMessage('User added successfully');
      setUsername('');
      setAge('');
      setHobbies([]);

      if (response.data && response.data.data && response.data.data.id) {
        setUserId(response.data.data.id); 
      } else {
        console.error('User ID not returned in response');
      }
    } catch (error) {
      setStatusMessage('Error adding user');
      console.error('Error:', error);
    }
  };

  const handleDeleteUser = async () => {
    if (!userId) {
      console.error('No user ID provided for deletion.');
      return;
    }
    setShowConfirmation(true);  // Show confirmation dialog when delete is clicked
  };

  const handleConfirmDelete = async () => {
    console.log('Deleting user with ID:', userId); // Log the userId to confirm deletion
    if (!userId) {
      console.log('User ID:', userId);  
      console.error('No user ID provided for deletion.');
      return; 
    }

    try {
      await axios.delete(`${API_BASE_URL}/users/${userId}`);
      onDeleteUser({ id: userId, username, age: parseInt(age), hobbies });
      setShowConfirmation(false);
      setUserId('');  // Reset user ID after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '400px',
        margin: '20px 0',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff',
      }}
    >
      <form onSubmit={handleSubmit}>
        <h3>User Form</h3>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          style={{
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '6px',
            border: '1px solid #ddd',
            backgroundColor: '#f9f9f9',
          }}
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
          required
          style={{
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '6px',
            border: '1px solid #ddd',
            backgroundColor: '#f9f9f9',
          }}
        />
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            value={newHobby}
            onChange={(e) => setNewHobby(e.target.value)}
            placeholder="New hobby"
            style={{
              width: '80%',
              padding: '8px',
              marginRight: '10px',
              borderRadius: '6px',
              border: '1px solid #ddd',
              backgroundColor: '#f9f9f9',
            }}
          />
          <button
            type="button"
            onClick={handleAddHobby}
            style={{
              padding: '8px',
              marginTop: '7px',
              backgroundColor: '#64B5F6',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
            >
            Add Hobby
          </button>
        </div>
        {hobbies.map((hobby, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '5px',
            }}
          >
            <span>{hobby}</span>
            <button
              type="button"
              onClick={() => handleRemoveHobby(index)}
              style={{
                backgroundColor: '#ff5252',
                color: '#fff',
                border: 'none',
                padding: '5px',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#64B5F6',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            marginTop: '10px',
          }}
        >
          Submit
        </button>

        <button
          type="button"
          onClick={() => setShowConfirmation(true)}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#ff5252',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            marginTop: '10px',
          }}
        >
          Delete User
        </button>

        {statusMessage && (
          <div
            style={{
              marginTop: '10px',
              color: statusMessage.includes('Error') ? 'red' : 'green',
            }}
          >
            {statusMessage}
          </div>
        )}
      </form>

      {showConfirmation && (
        <ConfirmationDialog
          action="delete"
          onConfirm={handleConfirmDelete}
          onClose={() => setShowConfirmation(false)}
        />
      )}
    </div>
  );
};

export default UserForm;
