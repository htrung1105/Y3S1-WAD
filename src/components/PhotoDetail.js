import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const PhotoDetail = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [description, setDescription] = useState('');

  const generateDescription = (photoData) => {
    const aspectRatio = (photoData.width / photoData.height).toFixed(2);
    const orientation = photoData.width > photoData.height ? 'horizontal' : photoData.width < photoData.height ? 'vertical' : 'square';
    const megapixels = ((photoData.width * photoData.height) / 1000000).toFixed(1);

    return `A photographic artwork by ${photoData.author}. This image has a ${orientation} format with a resolution of ${photoData.width} x ${photoData.height} pixels (${megapixels} megapixels), aspect ratio ${aspectRatio}:1. The image offers sharp quality with high detail, suitable for diverse purposes from graphic design, wallpapers to high-quality printing.`;
  };

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://picsum.photos/id/${id}/info`);
        const photoData = response.data;
        setPhoto(photoData);

        setDescription(generateDescription(photoData));

      } catch (err) {
        setError('Error fetching photo details');
        console.error('Error fetching photo:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!photo) return <div>Photo not found</div>;

  return (
    <div className="photo-detail">
      <Link to="/">← Back to Gallery</Link>
      <h1>Photo by {photo.author}</h1>
      <img
        src={`https://picsum.photos/id/${photo.id}/800/600`}
        alt={`by ${photo.author}`}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
      <div className="photo-info">
        <div className="photo-description">
          <h2>Description</h2>
          <p>{description}</p>
        </div>
        <div className="photo-metadata">
          <h3>Detail Information</h3>
          <p><strong>Author:</strong> {photo.author}</p>
          <p><strong>Demensions:</strong> {photo.width} x {photo.height} pixels</p>
          {photo.url && (
            <p><a href={photo.url} target="_blank" rel="noopener noreferrer">View original photo</a></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoDetail;
