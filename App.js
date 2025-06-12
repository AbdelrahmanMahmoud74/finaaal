// frontend (React) - src/App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult('');
      setError('');
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      setError('Please select an image first');
      return;
    }

    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await fetch('http://127.0.0.1:8000/detect_image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Server connection failed');
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setResult(imageUrl);
    } catch (err) {
      setError('❌ An error occurred during processing');
      console.error(err);
    }
  };

  return (
    <div className="app-wrapper">
      {/* Fantasy Background */}
      <div className="fantasy-background">
        <div className="base-landscape" />
        <div className="floating-islands">
          <div className="island-primary" />
          <div className="island-secondary" />
          <div className="island-tertiary" />
        </div>
        <div className="forest-layer">
          <div className="tree-cluster-1" />
          <div className="tree-cluster-2" />
          <div className="tree-cluster-3" />
        </div>
        <div className="machine-layer">
          <div className="recycling-unit-1" />
          <div className="recycling-unit-2" />
          <div className="energy-flows" />
        </div>
        <div className="atmosphere-layer">
          <div className="aurora-lights" />
          <div className="floating-particles" />
          <div className="light-rays" />
        </div>
      </div>

      <main className="main-container">
        <header className="header">
          <h1 className="title">Sea pollution based on image recognition</h1>
          <p className="subtitle">Upload an image to identify and classify different types of waste</p>
        </header>

        <section className="upload-section">
          <div className="file-input-wrapper">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="file-input-label">
              Choose Image
            </label>
          </div>

          <div className="preview-grid">
            {previewUrl && (
              <div className="preview-card">
                <h3 className="card-title">Original Image</h3>
                <div className="image-wrapper">
                  <img src={previewUrl} alt="Preview" className="preview-image" />
                </div>
              </div>
            )}

            {result && (
              <div className="preview-card">
                <h3 className="card-title">Processed Result</h3>
                <div className="image-wrapper">
                  <img src={result} alt="Result" className="preview-image" />
                </div>
              </div>
            )}
          </div>

          <button
            className="submit-button"
            onClick={handleSubmit}
            disabled={!image}
          >
            <span role="img" aria-label="magic">✨</span>
            Analyze Image
          </button>
        </section>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
