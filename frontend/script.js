
// ===================================
// API CONFIGURATION
// ===================================

// Replace this with your actual backend API URL
const API_URL = "http://127.0.0.1:8000/predict";

// ===================================
// GET HTML ELEMENTS
// ===================================

const imageInput = document.getElementById("imageInput");
const browseBtn = document.getElementById("browseBtn");
const uploadArea = document.getElementById("uploadArea");

const imagePreview = document.getElementById("imagePreview");
const previewContainer = document.getElementById("previewContainer");
const fileName = document.getElementById("fileName");

const predictBtn = document.getElementById("predictBtn");

const loading = document.getElementById("loading");
const errorMessage = document.getElementById("errorMessage");
const resultContainer = document.getElementById("resultContainer");

const predictedClass = document.getElementById("predictedClass");
const confidenceScore = document.getElementById("confidenceScore");
const confidenceBar = document.getElementById("confidenceBar");

let selectedImage = null;

// ===================================
// OPEN FILE SELECTOR
// ===================================

browseBtn.addEventListener("click", () => {
    imageInput.click();
});

// ===================================
// HANDLE IMAGE SELECTION
// ===================================

imageInput.addEventListener("change", (event) => {
    const file = event.target.files[0];

    if (file) {
        handleImage(file);
    }
});

function handleImage(file) {

    // Check if selected file is an image
    if (!file.type.startsWith("image/")) {
        showError("Please select a valid image file.");
        return;
    }

    // Check file size (maximum 10MB)
    if (file.size > 10 * 1024 * 1024) {
        showError("Image size must not exceed 10MB.");
        return;
    }

    selectedImage = file;

    // Clear previous results and errors
    resultContainer.classList.add("hidden");
    errorMessage.classList.add("hidden");

    // Display image preview
    const imageURL = URL.createObjectURL(file);

    imagePreview.src = imageURL;
    previewContainer.style.display = "block";

    fileName.textContent = file.name;

    // Enable prediction button
    predictBtn.disabled = false;
}

// ===================================
// DRAG AND DROP FUNCTIONALITY
// ===================================

uploadArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    uploadArea.classList.add("dragover");
});

uploadArea.addEventListener("dragleave", () => {
    uploadArea.classList.remove("dragover");
});

uploadArea.addEventListener("drop", (event) => {
    event.preventDefault();

    uploadArea.classList.remove("dragover");

    const file = event.dataTransfer.files[0];

    if (file) {
        handleImage(file);
    }
});

// ===================================
// SEND IMAGE TO BACKEND API
// ===================================

predictBtn.addEventListener("click", async () => {

    if (!selectedImage) {
        showError("Please select an image first.");
        return;
    }

    // Show loading state
    loading.classList.remove("hidden");
    resultContainer.classList.add("hidden");
    errorMessage.classList.add("hidden");

    predictBtn.disabled = true;

    try {

        // Create FormData object
        const formData = new FormData();

        // "file" must match your API's expected field name
        formData.append("file", selectedImage);

        // Send image to API
        const response = await fetch(API_URL, {
            method: "POST",
            body: formData
        });

        // Handle HTTP errors
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        // Convert API response to JSON
        const data = await response.json();

        // ===================================
        // DISPLAY API RESPONSE
        // ===================================

        const className = data.class;
        const confidence = Number(data.confidence);

        if (
            className === undefined ||
            className === null ||
            !Number.isFinite(confidence) ||
            confidence < 0
        ) {
            throw new Error("Invalid prediction response from API.");
        }

        // Accept confidence as either 0-1 or 0-100
        const confidencePercent = Math.min(
            confidence <= 1 ? confidence * 100 : confidence,
            100
        );

        predictedClass.textContent = className;

        confidenceScore.textContent =
            confidencePercent.toFixed(2) + "%";

        confidenceBar.style.width = confidencePercent + "%";

        // Show result
        resultContainer.classList.remove("hidden");

    } catch (error) {

        console.error("Prediction error:", error);

        showError(
            error.message || "Something went wrong while classifying the image."
        );

    } finally {

        // Hide loading and enable button
        loading.classList.add("hidden");
        predictBtn.disabled = false;
    }
});

// ===================================
// DISPLAY ERROR MESSAGES
// ===================================

function showError(message) {

    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");

    resultContainer.classList.add("hidden");
}
