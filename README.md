# Diabetic Retinopathy Detection

This project leverages deep learning to detect diabetic retinopathy from retinal images. It consists of a backend for model inference and a frontend for user interaction.

## Project Structure

- **backend/**  
  Contains the API server and the trained Swin Transformer model for image classification.
- **frontend/**  
  React-based web application for uploading images and viewing predictions.
- **Eyepacs images/**  
  Sample retinal images for testing and demonstration.
- **Labels.csv**  
  Labels for the sample images.

## Features

- Upload retinal images and receive predictions for diabetic retinopathy severity.
- Uses a Swin Transformer model trained on thousands of images.
- Five severity levels: No DR, Mild, Moderate, Severe, Proliferative DR.
- User-friendly web interface.

## Getting Started

### Backend

1. Install dependencies:
    ```sh
    pip install -r backend/requirements.txt
    ```
2. Run the API server:
    ```sh
    python backend/app.py
    ```

### Frontend

1. Install dependencies:
    ```sh
    cd frontend
    npm install
    ```
2. Start the development server:
    ```sh
    npm start
    ```

## Usage

1. Open the frontend in your browser.
2. Navigate to the **Predict** page.
3. Upload a retinal image to receive a prediction and confidence scores.

## Notes

- The tool is for educational and research purposes only and does not replace professional medical advice.
- Large model files and image datasets are excluded from version control (see [.gitignore](.gitignore)).

## License

See [LICENSE](LICENSE) for details.