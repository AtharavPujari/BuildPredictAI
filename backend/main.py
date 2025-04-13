from flask import Flask, request, jsonify
from flask_cors import CORS
import datetime

app = Flask(__name__)

# Configure CORS with explicit settings
CORS(app, 
     resources={
         r"/*": {
             "origins": "http://localhost:3000",
             "methods": ["GET", "POST", "OPTIONS"],
             "allow_headers": ["Content-Type"],
             "supports_credentials": False  # Set to True only if using cookies
         }
     })

@app.route('/predict_from_data', methods=['POST', 'OPTIONS'])
def predict_from_data():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    
    try:
        data = request.get_json()
        
        # Sample prediction logic - replace with your actual calculations
        cost = int(data.get('siteArea', 1000)) * 1200
        timeline = int(data.get('floors', 1)) * 30
        
        return _corsify_response(jsonify({
            'cost': cost,
            'timeline': timeline,
            'status': 'success'
        }))
        
    except Exception as e:
        return _corsify_response(jsonify({
            'error': str(e),
            'status': 'error'
        })), 500

@app.route('/detect_ppe', methods=['POST', 'OPTIONS'])
def detect_ppe():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    
    try:
        if 'image' not in request.files:
            raise ValueError("No image file provided")
            
        # Sample PPE detection - replace with your actual logic
        detected_items = ['Helmet', 'Safety vest']
        
        return _corsify_response(jsonify({
            'detected': detected_items,
            'status': 'success'
        }))
        
    except Exception as e:
        return _corsify_response(jsonify({
            'error': str(e),
            'status': 'error'
        })), 500

def _build_cors_preflight_response():
    response = jsonify({'status': 'preflight'})
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type")
    response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
    return response

def _corsify_response(response):
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)