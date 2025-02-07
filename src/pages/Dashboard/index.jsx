import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { fileIcons } from "./types";
import { form } from "framer-motion/client";

// Dashboard container styling
const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
`;

// Stats section styling
const StatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
`;

const StatBox = styled.div`
  padding: 1rem;
  text-align: center;
  background: #f1f3f4;
  border-radius: 12px;
  width: 30%;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 1.5rem;
    color: #333;
  }
  p {
    font-size: 0.9rem;
    color: #666;
  }
`;

// Upload form styling (visible and in a modern style)
const UploadForm = styled.form`
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

// Button styling used in the upload form and file actions
const Button = styled.button`
  padding: 10px 16px;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #155bb5;
  }
`;

// File grid styling for Google Drive–like layout
const FileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
`;

// Each file card styled to look like a Google Drive file icon card
const FileCard = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  position: relative;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 3px 6px 12px rgba(0, 0, 0, 0.2);
  }

  img {
    width: 80px;
    height: 80px;
    margin-bottom: 12px;
  }

  p {
    font-size: 0.9rem;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

// Actions (Download / Delete) that appear on hover
const FileActions = styled.div`
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s;

  ${FileCard}:hover & {
    opacity: 1;
    visibility: visible;
  }

  button {
    padding: 6px 10px;
    background-color: #00d0ff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.8rem;
    transition: background-color 0.3s;

    &:hover {
      background-color: #00b5e0;
    }
  }
`;

// Function to return the correct icon based on file extension
const getFileIcon = (fileName) => {
  if (!fileName) return fileIcons.unknown;
  const ext = fileName.split(".").pop().toLowerCase();
  return fileIcons[ext] || fileIcons.unknown;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    usage: 0,
    remaining: 0,
  });
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  // Load stats and files on component mount
  useEffect(() => {
    fetchStats();
    fetchFiles();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/subscriptions/getcurrentusage`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setStats(data);
    } catch (error) {
      toast.error("Failed to load storage stats.");
    }
  };

  const fetchFiles = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/files`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setFiles(data);
    } catch (error) {
      toast.error("Failed to load files.");
    }
  };

  // Handle file upload when the form is submitted
  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error("Please select a file.");
      return;
    }

    // Check if file size exceeds the remaining storage (assuming stats are in MB)
    if (selectedFile.size / (1024 * 1024) > stats.remainingStorage) {
      toast.warning("Not enough storage! Redirecting to Buy Storage page...");
      navigate("/buy-storage");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/files/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      const data = await response.json();
      toast.success("File uploaded successfully!");
      setFiles([...files, data.file]);
      fetchStats();
      form.reset();
    } catch (error) {
      toast.error("Failed to upload file.");
    }
  };

  // Handle file deletion
  const handleDeleteFile = async (fileId) => {
    try {
      await fetch(`${process.env.REACT_APP_SERVER_URL}/files/${fileId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("File deleted successfully!");
      setFiles(files.filter((file) => file.id !== fileId));
      fetchStats();
    } catch (error) {
      toast.error("Failed to delete file.");
    }
  };

  // Handle file download
  const handleDownloadFile = (fileId, originalName) => {
    const link = document.createElement("a");
    link.href = `${
      process.env.REACT_APP_SERVER_URL
    }/files/getfile/${fileId}?token=${localStorage.getItem("token")}`;
    link.download = originalName;
    link.click();
  };

  return (
    <DashboardContainer>
      <h2>Drive Dashboard</h2>
      <StatsContainer>
        <StatBox>
          <h3>{(stats.total / 1024).toFixed(4)} GB</h3>
          <p>Total Storage</p>
        </StatBox>
        <StatBox>
          <h3>{(stats.usage / 1024).toFixed(4)} GB</h3>
          <p>Used Storage</p>
        </StatBox>
        <StatBox>
          <h3>{(stats.remaining / 1024).toFixed(4)} GB</h3>
          <p>Remaining Storage</p>
        </StatBox>
      </StatsContainer>

      {/* Visible Upload Form (kept as per your code) */}
      <UploadForm onSubmit={handleFileUpload}>
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
        <Button type="submit">Upload</Button>
      </UploadForm>

      <h3>Your Files</h3>
      <FileGrid>
        {files.map((file) => (
          <FileCard key={file.id}>
            <img src={getFileIcon(file.originalName)} alt="File icon" />
            <p>{file.originalName}</p>
            <FileActions>
              <button
                onClick={() => handleDownloadFile(file.name, file.originalName)}
              >
                Download
              </button>
              <button onClick={() => handleDeleteFile(file.id)}>Delete</button>
            </FileActions>
          </FileCard>
        ))}
      </FileGrid>
    </DashboardContainer>
  );
};

export default Dashboard;
