import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PhotoDetail = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await axios.get(`https://picsum.photos/id/${id}/info`);
        setPhoto(response.data);
      } catch (error) {
        console.error('Error fetching photo details:', error);
      }
      setLoading(false);
    };

    fetchPhoto();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!photo) {
    return <p>Photo not found.</p>;
  }

  return (
    <div>
      <h1>{photo.author}</h1>
      <img src={photo.download_url} alt={photo.author} style={{ maxWidth: '100%' }} />
      <p>Author: {photo.author}</p>
      <p>
        Dimensions: {photo.width} x {photo.height}
      </p>
    </div>
  );
};

export default PhotoDetail;
