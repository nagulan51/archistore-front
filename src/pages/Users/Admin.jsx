import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const Container = styled.div`
  max-width: 1100px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
`;

const TableContainer = styled.div`
  overflow-x: auto;
  border-radius: 8px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const Thead = styled.thead`
  background-color: #00d0ff;
  color: white;
`;

const Th = styled.th`
  padding: 12px;
  text-align: left;
  font-weight: bold;
  font-size: 1rem;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  font-size: 0.95rem;
`;

const DeleteButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 0.9rem;
  transition: background 0.3s ease;

  &:hover {
    background-color: darkred;
  }
`;

const Admin = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      toast.error('Access denied! Redirecting...');
      navigate('/client');
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.role !== 'admin') {
        toast.error('Access denied! Redirecting...');
        navigate('/client');
        return;
      }
    } catch (error) {
      toast.error('Invalid session! Redirecting...');
      navigate('/client');
      return;
    }

    fetchUsers(token);
  }, [navigate]);

  const fetchUsers = async (token) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/admin/clients`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (response.ok) {
        setUsers(data);
      } else {
        toast.error('Failed to load users');
      }
    } catch (error) {
      toast.error('Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      toast.error('Unauthorized! Please log in again.');
      navigate('/login');
      return;
    }
  
    if (!window.confirm('Are you sure you want to delete this user? This action is irreversible.')) {
      return;
    }
  
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/admin/clients/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        toast.success('User deleted successfully!');
        setUsers(users.filter(user => user.id !== userId)); // Remove user from state
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to delete user.');
      }
    } catch (error) {
      toast.error('Error deleting user. Please try again.');
    }
  };
  

  return (
    <Container>
      <Title>Admin Panel - User List</Title>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <TableContainer>
          <Table>
            <Thead>
              <tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Actions</Th>
              </tr>
            </Thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.role}</Td>
                  <Td>
                    <DeleteButton onClick={() => handleDeleteUser(user.id)}>Delete</DeleteButton>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default Admin;