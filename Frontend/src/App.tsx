import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import MainVisualizationArea from './components/MainVisualizationArea';
import Sidebar from './components/Sidebar';
import UserForm from './components/UserForm';
import ConfirmationDialog from './components/ConfirmationDialog';
import { User } from './redux/userSlice';

const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedUser(null);
  };

  return (
    <Provider store={store}>
      <div
        style={{
          display: 'flex',
          height: '100vh',
          background: 'linear-gradient(135deg, #f5f5f5, #e0e0e0)',
        }}
      >
        <Sidebar />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            padding: '20px',
            justifyContent: 'flex-start',
            alignItems: 'stretch',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <MainVisualizationArea />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <UserForm onDeleteUser={handleDeleteUser} />
          </div>
        </div>
      </div>

      {isDialogOpen && selectedUser && (
        <ConfirmationDialog
          userId={selectedUser.id}
          action="delete"
          userData={selectedUser}
          onClose={handleCloseDialog}
          onConfirm={() => handleDeleteUser(selectedUser)}
        />
      )}
    </Provider>
  );
};

export default App;
