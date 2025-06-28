from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import torch
import torch.nn as nn
from torchvision import models, transforms
import io

app = Flask(__name__)
CORS(app)

# Device configuration
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")


class DiabeticRetinopathyClassifier(nn.Module):
    def __init__(self, num_classes=5):
        super().__init__()
        # Load the pre-trained Swin-B model
        self.backbone = models.swin_b(weights="IMAGENET1K_V1")

        # Replace the head with a multi-layer classifier
        self.backbone.head = nn.Linear(
            self.backbone.head.in_features, 5
        )  # Output layer for 5 classes)

    def forward(self, x):
        return self.backbone(x)


# Load model
model = DiabeticRetinopathyClassifier()
model.load_state_dict(torch.load("swin_model_best.pth", map_location=device))
model = model.to(device)
model.eval()

# Image transform pipeline
transform = transforms.Compose(
    [
        transforms.Resize(224, interpolation=transforms.InterpolationMode.LANCZOS),
        transforms.Pad(padding=(0, 0, 224, 224), fill=(0, 0, 0)),
        transforms.CenterCrop((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225]),
    ]
)

# Class names
class_names = ["No_DR", "Mild", "Moderate", "Severe", "Proliferative_DR"]


@app.route("/predict", methods=["POST"])
def predict():
    # Check for required fields
    if (
        "image" not in request.files
        or "name" not in request.form
        or "age" not in request.form
        or "gender" not in request.form
    ):
        return (
            jsonify({"error": "Missing required fields: image, name, age, or gender"}),
            400,
        )

    # Extract form data
    name = request.form["name"]
    age = request.form["age"]
    gender = request.form["gender"]
    image_file = request.files["image"]

    try:
        # Process image
        img = Image.open(image_file).convert("RGB")
        img = transform(img).unsqueeze(0).to(device)

        # Make prediction
        with torch.no_grad():
            outputs = model(img)
            probabilities = torch.softmax(outputs, dim=1)[0]
            _, predicted = torch.max(outputs, 1)
            prediction = class_names[predicted.item()]

            # Prepare confidence scores as a dictionary
            confidence_scores = {
                class_names[i]: probabilities[i].item() for i in range(len(class_names))
            }

        # Log prediction details
        print(f"Prediction for {name} (Age: {age}, Gender: {gender}): {prediction}")
        print(f"Confidence Scores: {confidence_scores}")

        # Return response
        return jsonify(
            {
                "prediction": prediction,
                "confidence_scores": confidence_scores,
                "patient_details": {"name": name, "age": age, "gender": gender},
            }
        )
    except Exception as e:
        print(f"Error in prediction: {str(e)}")
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
