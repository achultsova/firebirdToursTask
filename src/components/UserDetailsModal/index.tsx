import React from 'react';
import { User } from '../../types/userType';
import './UserDetailsModal.scss';

interface UserModalProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  user: User | null;
}

const UserDetailsModal: React.FC<UserModalProps> = ({ user, isOpen, handleCloseModal }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal" onClick={handleCloseModal}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <span className="close" onClick={handleCloseModal}>&times;</span>
        {user && (
          <>
            <h2>{user.name}</h2>
            <p><b>Username:</b><br/> {user.username}</p>
            <p><b>Email:</b><br/> {user.email}</p>
            <p><b>Address:</b><br/> {user.address.street}, {user.address.suite},<br/> {user.address.city}, {user.address.zipcode}</p>
            <div className='lat-lng'>
            <p><b>Latitude:</b><br/> {user.address.geo.lat}</p>
            <p><b>Longitude:</b><br/> {user.address.geo.lng}</p>
            </div>
            <p><b>Phone:</b><br/> {user.phone}</p>
            <p><b>Website:</b><br/> {user.website}</p>
            <p><b>Work:</b><br/> {user.company.name},<br/>{user.company.catchPhrase},<br/> {user.company.bs}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default UserDetailsModal;