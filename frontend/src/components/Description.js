import React from 'react';
import '../Description.css';

const Description = () => {
  return (
    <div className="description-container">
      <h1 className="description-h1">DL-Powered Diabetic Retinopathy Detection</h1>
      <h3 className="description-h3">Revolutionizing Retinal Disease Detection Through Deep Learning</h3>

      <p className="description-text">
        Welcome to our AI-based diagnostic interface, where cutting-edge <span className="description-strong">Swin Transformer</span> architecture meets clinical innovation. 
        This application leverages the power of vision transformers to assist in the <span className="description-strong">early and accurate detection of diabetic retinopathy (DR)</span> 
        from fundus images — helping doctors and patients make faster, more informed decisions.
      </p>

      <div className="description-section">
        <h2 className="description-h2">Why Swin Transformer?</h2>
        <p className="description-text">
          Unlike traditional convolutional neural networks, the <span className="description-strong">Swin Transformer</span> (Shifted Window Transformer) brings hierarchical attention 
          to image regions, enabling the model to:
        </p>
        <ul className="description-list description-list-unordered">
          <li className="description-list-item">Capture fine-grained retinal features like microaneurysms, hemorrhages, and exudates.</li>
          <li className="description-list-item">Maintain both local context and global spatial awareness.</li>
          <li className="description-list-item">Scale efficiently across different image resolutions.</li>
        </ul>
        <p className="description-text">
          This allows for a more precise and generalizable classification of diabetic retinopathy stages, from <span className="description-emphasis">No DR</span> to <span className="description-emphasis">Proliferative DR</span>.
        </p>
      </div>

      <div className="description-section">
        <h2 className="description-h2">How It Works</h2>
        <ol className="description-list description-list-ordered">
          <li className="description-list-item">Upload a fundus image using the Predict tab.</li>
          <li className="description-list-item">The model processes the image using trained Swin Transformer layers.</li>
          <li className="description-list-item">A prediction is generated indicating the stage of diabetic retinopathy with confidence.</li>
        </ol>
      </div>

      <div className="description-section">
        <h2 className="description-h2">Built With</h2>
        <ul className="description-list description-list-unordered">
          <li className="description-list-item">Swin Transformer Base model</li>
          <li className="description-list-item">PyTorch for training and inference</li>
          <li className="description-list-item">GPU equipped Laptoop for training model</li>
          <li className="description-list-item">React.js frontend and plain CSS</li>
        </ul>
      </div>

      <div className="description-section">
        <h2 className="description-h2">Data Gathering and Preprocessing</h2>
        <ul className="description-list description-list-unordered">
          <li className="description-list-item">
            <a className="description-link" href="https://www.kaggle.com/competitions/diabetic-retinopathy-detection" target="_blank" rel="noopener noreferrer">
              EyePACS dataset
            </a> for retinal images
          </li>
          <li className="description-list-item">Preprocess images to size of 224 X 224 pixels</li>
        </ul>
      </div>

      <p className="description-text">
        This frontend is more than just a tool—it's a step toward accessible, automated retinal health assessment for underserved populations around the world.
      </p>
    </div>
  );
};

export default Description;