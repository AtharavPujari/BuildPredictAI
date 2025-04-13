import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib
import os

# Generate mock data
np.random.seed(42)
size = 500

data = pd.DataFrame({
    "area_sqft": np.random.randint(1000, 10000, size),
    "floors": np.random.randint(1, 10, size),
    "workers": np.random.randint(5, 50, size),
    "machinery_count": np.random.randint(1, 10, size),
    "material_quality": np.random.uniform(0.5, 1.0, size),
    "weather": np.random.choice(["sunny", "rainy", "stormy"], size)
})

data["cost"] = (
    data["area_sqft"] * 200 +
    data["floors"] * 100000 -
    data["material_quality"] * 5000 +
    data["workers"] * 1000
)

data["time_days"] = (
    data["floors"] * 7 +
    (1 - data["material_quality"]) * 50 -
    data["workers"] * 0.5
)

data["safety_risk"] = np.where(
    (data["weather"] == "stormy") | (data["material_quality"] < 0.6),
    "High",
    "Low"
)

# Encode weather
label_encoder = LabelEncoder()
data["weather_encoded"] = label_encoder.fit_transform(data["weather"])

# Models
X = data[["area_sqft", "floors", "workers", "machinery_count", "material_quality", "weather_encoded"]]

# Cost prediction
cost_model = LinearRegression().fit(X, data["cost"])
joblib.dump(cost_model, "models/cost_model.pkl")

# Time prediction
time_model = LinearRegression().fit(X, data["time_days"])
joblib.dump(time_model, "models/time_model.pkl")

# Safety risk
risk_model = RandomForestClassifier().fit(X, data["safety_risk"])
joblib.dump(risk_model, "models/risk_model.pkl")

# Save encoders
joblib.dump(label_encoder, "models/weather_encoder.pkl")

print("Models saved successfully.")
