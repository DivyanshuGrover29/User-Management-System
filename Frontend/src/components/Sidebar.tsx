import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { addHobbyToUser } from '../redux/userSlice';
import '../App.css'; // Import the CSS file

interface User {
  _id: string;
  username: string;
  age: number;
  hobbies: string[];
}

const Sidebar: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const hobbies = useSelector((state: RootState) => state.hobbies.hobbies);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${API_BASE_URL}/users`)
      .then((response) => setUsers(response.data.data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const filteredHobbies = hobbies.filter((hobby) =>
    hobby.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const HobbyItem: React.FC<{ hobby: string }> = ({ hobby }) => {
    const [, dragRef] = useDrag(() => ({
      type: 'HOBBY',
      item: { hobby },
    }));

    return (
      <div ref={dragRef} className="hobby-item">
        {hobby}
      </div>
    );
  };

  const handleDrop = (item: { hobby: string }, userId: string) => {
    dispatch(addHobbyToUser({ userId, hobby: item.hobby }));
  };

  const UserNode: React.FC<{ user: User }> = ({ user }) => {
    const [, dropRef] = useDrop(() => ({
      accept: 'HOBBY',
      drop: (item: { hobby: string }) => handleDrop(item, user._id),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }));

    return (
      <div ref={dropRef} className="user-node">
        <h4>{user.username}</h4>
        <p>Age: {user.age}</p>
        <p>Hobbies: {user.hobbies.join(', ')}</p>
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="sidebar">
        <h3>Hobby Categories</h3>
        <input
          type="text"
          placeholder="Search hobbies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {filteredHobbies.map((hobby, index) => (
          <HobbyItem key={index} hobby={hobby} />
        ))}
      </div>
    </DndProvider>
  );
};

export default Sidebar;
