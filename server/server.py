from flask import Flask, request
import json
from PIL import Image
from transformers import CLIPProcessor, CLIPModel
import torch

# Initialize Flask app
app = Flask(__name__)

# Initialize CLIP model
model = CLIPModel.from_pretrained("openai/clip-vit-large-patch14")
processor = CLIPProcessor.from_pretrained("openai/clip-vit-large-patch14")

# Load labels
file = open('labels.json')
data = json.load(file)
labels = list(data.keys())
clip_labels = ["a photo of " + label for label in labels]

# Route for object labeling
@app.route("/", methods=["GET", "POST"])
def label():
    print("Got request")
    if request.files:
        # Get image from request
        image = request.files["image"]
        image = Image.open(image)

        # Perform first pass of CLIP
        clip_labels = ["a photo of " + label for label in labels]
        inputs = processor(text=clip_labels, images=image, return_tensors="pt", padding=True)
        outputs = model(**inputs)
        logits_per_image = outputs.logits_per_image
        probs = logits_per_image.softmax(dim=1)
        label = labels[probs.argmax().item()]

        # Create dictionary of labels and probabilities
        label_list = []
        for i in range(len(labels)):
            label_list.append((labels[i], probs[0][i].item()))
        # Sort dictionary by probability
        label_list = sorted(label_list, key=lambda x: x[1], reverse=True)

        # Run second pass is needed
        sub_labels = data[label]
        if len(sub_labels) > 0:
            sub_clip_labels = ["a photo of " + label for label in sub_labels]
            sub_inputs = processor(text=sub_clip_labels, images=image, return_tensors="pt", padding=True)
            sub_outputs = model(**sub_inputs)
            sub_logits_per_image = sub_outputs.logits_per_image
            sub_probs = sub_logits_per_image.softmax(dim=1)

            # Create list of sub-labels and probabilities
            sub_label_list = []
            for i in range(len(sub_labels)):
                sub_label_list.append((sub_labels[i], sub_probs[0][i].item()))
            
            # Sort labels by probability
            sub_label_list = sorted(sub_label_list, key=lambda x: x[1], reverse=True)
            print("Processed image")
            return json.dumps({"labels": label_list, "sub_labels": sub_label_list})
        else:
            print("Processed image")
            return json.dumps({"labels": label_list})
    return "No image provided"