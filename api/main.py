import os
# Turn off oneDNN optimizations completely (or set to '2' to just hide the log)
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0' 

# Suppress standard TensorFlow INFO and WARNING logs
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2' 

from fastapi import FastAPI, File, UploadFile
import uvicorn
import numpy as np
from PIL import Image
from io import BytesIO
import tensorflow as tf

app = FastAPI()

MODEL = tf.keras.models.load_model('C:\\Users\\HomePC\\Documents\\Desktop_2\\MyJN\\Tomato_disease_classification\\Saved_model\\1\\model_1.keras')

CLASS_NAMES = ['Tomato_Bacterial_spot',
 'Tomato_Early_blight',
 'Tomato_Late_blight',
 'Tomato_Leaf_Mold',
 'Tomato_Septoria_leaf_spot',
 'Tomato_Spider_mites_Two_spotted_spider_mite',
 'Tomato__Target_Spot',
 'Tomato__Tomato_YellowLeaf__Curl_Virus',
 'Tomato__Tomato_mosaic_virus',
 'Tomato_healthy']

@app.get('/ping')
async def ping():
    return 'Hello i am Alive'

def read_file_as_img(data):
    image = np.array(Image.open(BytesIO(data)))
    return image

@app.post('/predict/')
async def predict(file: UploadFile = File(...)):
    image = read_file_as_img(await file.read())
    image_batch = np.expand_dims(image, 0)

    prediction = MODEL.predict(image_batch)
    predicted_class = CLASS_NAMES[np.argmax(prediction)]
    confidence = round(100 * (np.max(prediction[0])), 2)
    return {
        'class': predicted_class,
        'confidence': float(confidence)
    }


if __name__ == '__main__':
    uvicorn.run(app, host='localhost', port=7070)