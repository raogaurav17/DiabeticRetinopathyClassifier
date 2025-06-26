// src/components/Home.js
import React from 'react';
import '../styles.css'; // assuming this contains your styles
import About from './About';

const backgroundStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundImage: "url('/assets/blue-eye.jpg')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  filter: 'blur(8px) brightness(0.6)',
  zIndex: -1
};


function Home() {
  return (
    <>
      <div style={backgroundStyle}></div>
      <div className='content'>
        <h1 className="title">Diabetic Retinopathy Detection</h1>
        <p className="lead">
          Diabetic Retinopathy is a complication of diabetes that affects the eyes. Our AI-powered model helps detect it early by analyzing retinal images.
        </p>
        <p className="description">
        Our project leverages a state-of-the-art Swin Transformer model, trained on thousands of retinal images, 
        to classify diabetic retinopathy into five severity levels: No DR, Mild, Moderate, Severe, and Proliferative 
        DR. By uploading a retinal image on our <a href="/prediction" className="link">Predict</a> page, you can receive
        a detailed analysis with confidence scores for each severity level, empowering you with actionable insights. This 
        tool is designed to complement professional medical evaluations, offering a convenient first step in screening for 
        diabetic retinopathy. 
        </p>
      </div>
      <About />
    </>
  );
}

export default Home;