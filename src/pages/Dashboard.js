import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const DashboardContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 8px;
`;

const StatBox = styled.div`
  text-align: center;
`;

const FileList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FileItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  border-bottom: 1px solid #ddd;
`;

const UploadForm = styled.form`
  margin-top: 1rem;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px;
  background-color: #00d0ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #00b5e0;
  }
`;

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalStorage: 0, usedStorage: 0, remainingStorage: 0 });
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchStats();
    fetchFiles();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/stats`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await response.json();
      setStats(data);
    } catch (error) {
      toast.error('Failed to load storage stats.');
    }
  };

  const fetchFiles = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/files`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await response.json();
      setFiles(data);
    } catch (error) {
      toast.error('Failed to load files.');
    }
  };

  const handleFileUpload = async (e) => {
  e.preventDefault();

  if (!selectedFile) {
    toast.error('Please select a file.');
    return;
  }

  if (selectedFile.size / (1024 * 1024) > stats.remainingStorage) {
    toast.warning('Not enough storage! Redirecting to Buy Storage page...');
    navigate('/buy-storage'); // Redirect user to buy storage page
    return;
  }

  const formData = new FormData();
  formData.append('file', selectedFile);

  try {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/files/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: formData,
    });

    const data = await response.json();
    toast.success('File uploaded successfully!');
    setFiles([...files, data.file]);
    fetchStats(); // Refresh storage stats
  } catch (error) {
    toast.error('Failed to upload file.');
  }
};


  const handleDeleteFile = async (fileId) => {
    try {
      await fetch(`${process.env.REACT_APP_SERVER_URL}/files/${fileId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      toast.success('File deleted successfully!');
      setFiles(files.filter(file => file.id !== fileId));
      fetchStats(); // Refresh storage stats
    } catch (error) {
      toast.error('Failed to delete file.');
    }
  };

  return (
    <DashboardContainer>
      <h2>Dashboard</h2>
      <StatsContainer>
        <StatBox>
          <h3>{(stats.totalStorage / 1024).toFixed(2)} GB</h3>
          <p>Total Storage</p>
        </StatBox>
        <StatBox>
          <h3>{(stats.usedStorage / 1024).toFixed(2)} GB</h3>
          <p>Used Storage</p>
        </StatBox>
        <StatBox>
          <h3>{(stats.remainingStorage / 1024).toFixed(2)} GB</h3>
          <p>Remaining Storage</p>
        </StatBox>
      </StatsContainer>

      <UploadForm onSubmit={handleFileUpload}>
        <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
        <Button type="submit">Upload</Button>
      </UploadForm>

      <h3>Your Files</h3>
      <FileList>
        {files.map(file => (
          <FileItem key={file.id}>
            <span>{file.name} ({(file.size / 1024).toFixed(2)} MB)</span>
            <Button onClick={() => handleDeleteFile(file.id)}>Delete</Button>
          </FileItem>
        ))}
      </FileList>
    </DashboardContainer>
  );
};

export default Dashboard;
