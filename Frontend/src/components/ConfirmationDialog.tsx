import React from 'react';

interface ConfirmationDialogProps {
  action: string;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ action, onConfirm, onClose }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          width: '300px',
        }}
      >
        <h4>{`Are you sure you want to ${action} this user?`}</h4>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            onClick={onConfirm}
            style={{
              backgroundColor: '#64B5F6',
              color: '#fff',
              padding: '8px 12px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            style={{
              backgroundColor: '#ff5252',
              color: '#fff',
              padding: '8px 12px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
