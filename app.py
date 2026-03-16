from flask import Flask, request, render_template
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

app = Flask(__name__)

# Load dataset
data = pd.read_csv("./heart/heart.csv")

# Features and target
X, y = data.values[:, 0:13], data.values[:, -1]

# Train test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
clf = RandomForestClassifier(n_estimators=200, random_state=42)
clf.fit(X_train, y_train)

# Calculate accuracy
accuracy = np.mean(clf.predict(X_test) == y_test)
print("Model accuracy:", accuracy)


@app.route("/")
def home():
    return render_template(
        "index.html",
        accuracy=round(accuracy * 100, 2)
    )


@app.route("/predict", methods=["POST"])
def predict():

    expected_fields = [
        "Age",
        "Sex",
        "ChestPainType",
        "RestingBloodPressure",
        "SerumCholestrol",
        "FastingBloodSugar",
        "RestingECGResult",
        "MaxHeartRateAchieved",
        "ExerciseInducedAngina",
        "Oldpeak",
        "Slope",
        "MajorVessels",
        "Thal",
    ]

    float_features = [float(request.form.get(f)) for f in expected_fields]
    features = [np.array(float_features)]

    # Prediction
    prediction = clf.predict(features)

    # Probability
    probability = clf.predict_proba(features)

    # Risk %
    risk = round(probability[0][1] * 100, 2)

    if prediction[0] == 1:
        result = "Positive"
    else:
        result = "Negative"

    return render_template(
        "index.html",
        prediction_text=result,
        risk=risk,
        accuracy=round(accuracy * 100, 2)
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=False)