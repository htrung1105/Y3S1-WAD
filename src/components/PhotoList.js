import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PhotoList = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPhotos = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=30`);
      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        setPhotos(prevPhotos => [...prevPhotos, ...response.data]);
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
    setLoading(false);
  }, [page, loading, hasMore]);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight || loading) {
      return;
    }
    fetchPhotos();
  }, [loading, fetchPhotos]);


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div>
      <h1>Picsum Photo Gallery</h1>
      <div className="photo-grid">
        {photos.map(photo => (
          <div key={photo.id} className="photo-item">
            <Link to={`/photos/${photo.id}`}>
              <img src={photo.download_url} alt={photo.author} />
              <p>{photo.author}</p>
            </Link>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more photos to load.</p>}
    </div>
  );
};

export default PhotoList;