import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactFlow, { Node, Edge, Position, Controls, addEdge, Connection } from 'reactflow';
import 'reactflow/dist/style.css';
import axios from 'axios';
import { RootState } from '../redux/store';
import { addHobbyToUser } from '../redux/userSlice';
import { API_BASE_URL } from '../config';
import { User } from '../redux/userSlice';

const MainVisualizationArea: React.FC = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState<User[]>([]);
  const hobbies = useSelector((state: RootState) => state.hobbies.hobbies);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [newHobby, setNewHobby] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios
.get(`${API_BASE_URL}/users`)
      .then((response) => {
        setUsers(response.data.data);
      })
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const userNodes: Node[] = users
    .filter((user) => user.username.toLowerCase().includes(searchQuery.toLowerCase()))
    .map((user) => ({
      id: user.id,
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data: { label: `${user.username} (Age: ${user.age})` },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      style: { borderRadius: '10px', padding: '8px', background: '#4CAF50', color: 'white' },
    }));

  const hobbyNodes: Node[] = hobbies
    .filter((hobby) => hobby.toLowerCase().includes(searchQuery.toLowerCase()))
    .map((hobby, index) => ({
      id: `hobby-${index}`,
      position: { x: 300 + Math.random() * 200, y: 300 + Math.random() * 200 },
      data: { label: hobby },
      sourcePosition: Position.Left,
      targetPosition: Position.Right,
      style: { borderRadius: '10px', padding: '8px', background: '#2196F3', color: 'white' },
    }));

  const handleConnect = useCallback(
    (connection: Connection) => {
      const { source, target } = connection;


    if (!source || !target) {
      console.error('Invalid connection: source or target is null');
      return;
    }

      // Prevent duplicate edges
      if (edges.some((edge) => edge.source === source && edge.target === target)) {
        alert('This connection already exists.');
        return;
      }

      const userId = source;
      const hobbyId = target;

      if (hobbyId && hobbyId.startsWith('hobby-')) {
        const hobbyIndex = parseInt(hobbyId.split('-')[1]);
        const hobbyName = hobbies[hobbyIndex] ?? '';

        // Dispatch Redux action
        dispatch(addHobbyToUser({ userId, hobby: hobbyName }));

        // Update backend (example placeholder)
        axios.post(`${API_BASE_URL}/add-hobby`, { userId, hobby: hobbyName })
          .catch((error) => console.error('Error updating backend:', error));

        setEdges((prevEdges) => addEdge(connection, prevEdges));
      }
    },
    [hobbies, dispatch, edges]
  );

  const handleAddHobby = () => {
    if (newHobby.trim() && !hobbies.includes(newHobby)) {
      // Assuming there's a Redux action or API to add hobbies
      // dispatch(addHobby(newHobby));
      console.log(`Hobby added: ${newHobby}`);
      setNewHobby('');
    } else {
      alert('Hobby is empty or already exists.');
    }
  };

  return (
    <div
      style={{
        flex: 1,
        padding: '20px',
        backgroundColor: '#f4f4f9',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        height: '100vh',
      }}
    >
      {/* Search Bar */}
      <div style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Search users or hobbies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: 1,
            padding: '8px',
            borderRadius: '8px',
            border: '1px solid #ddd',
          }}
        />
        <input
          type="text"
          placeholder="Add new hobby..."
          value={newHobby}
          onChange={(e) => setNewHobby(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '8px',
            border: '1px solid #ddd',
          }}
        />
        <button
          onClick={handleAddHobby}
          style={{
            padding: '8px 12px',
            borderRadius: '8px',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Add Hobby
        </button>
      </div>

      <ReactFlow
        nodes={[...userNodes, ...hobbyNodes]}
        edges={edges}
        onConnect={handleConnect}
        style={{
          height: '100%',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default MainVisualizationArea;
