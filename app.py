from flask import Flask, request, render_template
import joblib
import pandas as pd

app = Flask(__name__)

# Load model components
model = joblib.load('model/svm_model.pkl')  # Make sure the file exists
transformer = joblib.load('model/transformer.pkl')  # Make sure the file exists
label_encoder = joblib.load('model/label_encoder.pkl')  # Make sure the file exists

@app.route('/')
def home():
    return render_template('index.html')  # Render the initial form

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        # Get data from form
        description = request.form['description']
        resource = request.form['resource']
        throughput = request.form['throughput']
        load = request.form['load']

        # Create DataFrame for the input data
        input_df = pd.DataFrame([{
            'Description': description,
            'Resource Allocation Strategy': resource,
            'Throughput Maximization Outcome': throughput,
            'Load Balancing Outcome': load
        }])

        # Transform input data using the transformer
        input_transformed = transformer.transform(input_df)

        # Predict using the SVM model
        prediction = model.predict(input_transformed)

        # Decode the prediction result
        label = label_encoder.inverse_transform(prediction)[0]

        # Return the prediction result to the template
        return render_template('index.html', prediction_text=f'Prediction: {label}')


if __name__ == '__main__':
    app.run(debug=True)  # Ensure debug is enabled for error tracking