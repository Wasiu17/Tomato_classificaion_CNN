# Tomato Disease Classification

## Project Overview

Tomato Disease Classification is a Machine Learning-based application designed to identify and classify tomato leaf diseases from images.

The project uses a trained deep learning model to analyze uploaded tomato leaf images and predict their corresponding disease classes. It provides a simple web interface where users can submit images and receive classification results.

The application consists of three major components:

- **Training:** Contains the Jupyter Notebook and training resources used to develop the classification model.
- **Backend API:** Handles image processing, model loading, and disease prediction.
- **Frontend:** Provides a user-friendly interface for uploading tomato leaf images and displaying prediction results.

## Project Objectives

The main objectives of this project are:

1. Develop a machine learning model for tomato leaf disease classification.
2. Identify different tomato leaf disease categories from images.
3. Build an API to serve the trained classification model.
4. Develop a web interface for image upload and prediction.
5. Demonstrate how machine learning can support agricultural disease identification.

## Project Structure

```text
Tomato-Disease-Classification/
│
├── api/
│   ├── main.py
│   ├── main_endpoint.py
│   └── requirement.txt
│
├── frontend/
│   ├── index.html
│   ├── script.js
│   ├── style.css
│   └── tomato.jpg
│
├── Saved_model/
│   ├── 1/
│   ├── 2/
│   └── 3/
│
├── saved_models/
│   └── tomato_model/
│       ├── 1/
│       ├── 2/
│       └── 3/
│
└── Training/
    ├── main.ipynb
    ├── README.md
    └── tomato-classification...
```

## Technologies Used

The project is organized around the following technologies and tools:

- **Python:** Model development and backend programming.
- **Machine Learning / Deep Learning:** Tomato leaf image classification.
- **Jupyter Notebook:** Model training and experimentation.
- **FastAPI:** Backend API development.
- **HTML:** Frontend structure.
- **CSS:** Frontend styling.
- **JavaScript:** Frontend interactions and API communication.

## Project Components

### 1. Model Training

The `Training` directory contains the Jupyter Notebook used for model development and training.

The training component is responsible for:

- Loading and preparing tomato leaf images.
- Preprocessing image data.
- Training the classification model.
- Evaluating model performance.
- Saving the trained model for deployment.

### 2. Saved Models

The project contains two model-related directories:

- `Saved_model/`
- `saved_models/tomato_model/`

These directories contain saved model-related files used by the application.

The trained model is loaded by the backend to perform predictions on new tomato leaf images.

### 3. Backend API

The `api` directory contains the backend implementation.

Files include:

- `main.py`: Main backend application.
- `main_endpoint.py`: API endpoint implementation.
- `requirement.txt`: Python dependencies required by the backend.

The backend handles image uploads, processes the submitted images, loads the trained model, and returns classification predictions.

### 4. Frontend

The `frontend` directory contains the web application interface.

Files include:

- `index.html`: Defines the structure of the web interface.
- `style.css`: Handles the application's visual appearance.
- `script.js`: Manages frontend interactions and communication with the backend API.
- `tomato.jpg`: Image asset used by the frontend.

## Installation and Setup

### Prerequisites

Ensure you have the following installed:

- Python 3.9 or later (depending on library compatibility).
- Git.
- A modern web browser.

### Step 1: Clone the Repository

```bash
git clone https://github.com/Wasiu17/Tomato_classificaion_CNN
```

### Step 2: Navigate to the Project Directory

```bash
cd Tomato-Disease-Classification
```

### Step 3: Create a Virtual Environment

```bash
python -m venv venv
```

Activate the environment:

**Windows:**
```bash
venv\Scripts\activate
```

**Linux / macOS:**
```bash
source venv/bin/activate
```

### Step 4: Install Dependencies

```bash
pip install -r api/requirement.txt
```

### Step 5: Run the Backend

From the project root directory, run:

```bash
uvicorn api.main:app --reload
```

This command assumes that `main.py` exposes a FastAPI application instance named `app`. Adjust it if your entry point or application variable has a different name.

### Step 6: Access the Frontend

Open the `frontend/index.html` file in your browser or serve the frontend using a local development server.

Ensure that the API URL configured in `script.js` matches the backend address.

## How to Use the Application

1. Launch the backend API.
2. Open the frontend application in your browser.
3. Upload an image of a tomato leaf.
4. Submit the image for classification.
5. The backend processes the image using the trained model.
6. View the predicted classification result on the frontend.

## Model Prediction

The classification model takes a tomato leaf image as input and generates a predicted class.

The prediction process involves:

1. Receiving an uploaded image.
2. Preprocessing the image into the format expected by the model.
3. Passing the processed image into the trained model.
4. Generating the predicted class.
5. Returning the result to the frontend.

## Future Improvements

Potential improvements include:

- Adding more tomato disease categories.
- Improving model accuracy through hyperparameter tuning.
- Increasing prediction speed.
- Displaying prediction confidence scores.
- Deploying the application to a cloud platform.
- Improving the user interface and user experience.
- Providing disease management and prevention recommendations.

## Project Significance

Tomato diseases can negatively affect agricultural productivity and crop quality.

This project demonstrates how machine learning and image classification can be applied to agricultural problems by providing an automated approach to identifying tomato leaf diseases.

The application can serve as a useful prototype for AI-assisted crop disease identification.

## Author

**Wasiu17**

GitHub: [@Wasiu17](https://github.com/Wasiu17)

## Disclaimer

This project is developed for educational and research purposes. Model predictions should be treated as preliminary identification results and not as a substitute for professional agricultural diagnosis.