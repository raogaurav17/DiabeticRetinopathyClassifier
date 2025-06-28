// src/components/Prediction.js
import { useState } from 'react';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import '../styles.css';

function Prediction() {
  const [formData, setFormData] = useState({ name: '', age: '', gender: '', image: null });
  const [predictions, setPredictions] = useState(null);
  const [patientDetails, setPatientDetails] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('age', formData.age);
    data.append('gender', formData.gender);
    data.append('image', formData.image);

    try {
      const response = await axios.post('http://localhost:5000/predict', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Backend response:', response.data);
      if (!response.data.confidence_scores || !response.data.patient_details) {
        throw new Error('Invalid response structure');
      }
      setPredictions(response.data.confidence_scores);
      setPatientDetails(response.data.patient_details);
      setPredictionResult(response.data.prediction);
      setShowResults(true);
    } catch (error) {
      console.error('Error:', error);
      setError('Prediction failed. Please check the image and try again.');
    }
  };

  const generateReport = () => {
    const reportContent = `
      <div class="pdf-report">
        <div class="pdf-header">
          <h1>Diabetic Retinopathy Detection Report</h1>
          <p>Generated on: ${new Date().toLocaleDateString()}</p>
        </div>
        <div class="pdf-section">
          <h2>Patient Details</h2>
          <p><strong>Name:</strong> ${patientDetails?.name || 'N/A'}</p>
          <p><strong>Age:</strong> ${patientDetails?.age || 'N/A'}</p>
          <p><strong>Gender:</strong> ${patientDetails?.gender || 'N/A'}</p>
        </div>
        <div class="pdf-section">
          <h2>Prediction Results</h2>
          <p><strong>Predicted Class:</strong> ${predictionResult || 'N/A'}</p>
          <table class="pdf-table">
            <thead>
              <tr>
                <th>Class</th>
                <th>Confidence</th>
              </tr>
            </thead>
            <tbody>
              ${predictions
                ? Object.entries(predictions)
                    .map(
                      ([key, value]) => `
                        <tr>
                          <td>${key}</td>
                          <td>${(value * 100).toFixed(2)}%</td>
                        </tr>
                      `
                    )
                    .join('')
                : '<tr><td colspan="2">No data available</td></tr>'}
            </tbody>
          </table>
        </div>
        <div class="pdf-footer">
          <p><strong>Diabetic Retinopathy Detection</strong></p>
          <p>Contact: <a href="mailto:contact@231212012@nitdelhi.ac.in">231212012@nitdelhi.ac.in</a></p>
          <p>Disclaimer: This report is for informational purposes only and should not replace professional medical advice.</p>
        </div>
      </div>
    `;
    const element = document.createElement('div');
    element.innerHTML = reportContent;
    document.body.appendChild(element);

    
    const opt = {
      margin: [0.5, 0.5],
      filename: `DR_Report_${formData.name || 'Patient'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    // Generate and download PDF
    html2pdf()
      .from(element)
      .set(opt)
      .save()
      .then(() => {
        document.body.removeChild(element); // Clean up
      });
  };

  return (
    <div className='bod'>
    <section className="container">
      <h1 className="pred title">Predict Diabetic Retinopathy</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="image">Upload Retinal Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Predict</button>
      </form>

      {showResults && predictions && patientDetails && (
        <div id="results" className="results">
          <h2>Prediction Results</h2>
          <p><strong>Name:</strong> {patientDetails.name}</p>
          <p><strong>Age:</strong> {patientDetails.age}</p>
          <p><strong>Gender:</strong> {patientDetails.gender}</p>
          <p><strong>Predicted Class:</strong> {predictionResult}</p>
          <h3>Confidence Scores</h3>
          <ul className="prediction-list">
            {Object.entries(predictions).map(([key, value]) => (
              <li key={key}>
                {key}: {(value * 100).toFixed(2)}%
              </li>
            ))}
          </ul>
          <button onClick={generateReport} className="download-button">
            Download Report
          </button>
        </div>
      )}
    </section>
    </div>
  );
}

export default Prediction;