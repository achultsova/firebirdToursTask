import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState, User } from '../../types/userType';
import { fetchUsers, removeUser, filterUsers, reset } from '../../store/actions';
import UserModal from '../UserDetailsModal';
import { useAppDispatch } from '../../utils/useAppDispatch';
import Highlight from '../Highlight';
import styles from './UsersList.module.scss';
const UsersList: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [removingUsers, setRemovingUsers] = useState<number[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { data, filter, loading, error, filteredData } = useSelector((state: { users: AppState }) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleRemoveUser = (id: number) => {
    setRemovingUsers([...removingUsers, id]);

    setTimeout(() => {
      dispatch(removeUser(id));
      setRemovingUsers(removingUsers.filter((userId) => userId !== id));
    }, 500);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterUsers(event.target.value));
  };

  const handleReset = () => {
    dispatch(reset());
  };

  const handleOpenModal = (user: User) => {
    setSelectedUser(user)
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.inputBox}>
        <input className={styles.searchInput} type="text" value={filter} onChange={handleFilterChange} placeholder="Filter users" />
        <button className={styles.resetButton} onClick={handleReset}>RESET</button>
      </div>
      <div className={styles.usersList}>
        {filteredData.map((user) => (
          <div 
            id={`user-${user.id}`} 
            className={`${styles.userItem} ${removingUsers.includes(user.id) ? styles.removing : ''}`}  
            key={user.id}
          >
            <div className={styles.userMainInfo}>
              <div onClick={() => handleOpenModal(user)} className={styles.usernameBox}>
                <p><Highlight highlight={filter}>{user.name}</Highlight></p>
                <p>(<Highlight highlight={filter}>{user.username}</Highlight>)</p>
              </div>
              <p className={styles.email}><Highlight highlight={filter}>{user.email}</Highlight></p>
            </div>
            <span className={styles.removeButton} onClick={() => handleRemoveUser(user.id)}>&times;</span>
          </div>
        ))}
      </div>
      <UserModal isOpen={isOpen} user={selectedUser} handleCloseModal={handleCloseModal}/>
    </div>
  );
};

export default UsersList;