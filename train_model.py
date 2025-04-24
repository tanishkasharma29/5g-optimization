import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.compose import ColumnTransformer
from sklearn.metrics import accuracy_score
from sklearn.svm import LinearSVC
import joblib

# Load data
df = pd.read_csv("5GNetworkOptimization.csv")

# Drop unnecessary columns
X = df.drop(columns=["Optimization Label", "CaseID"])
y = df["Optimization Label"]

# Encode target labels
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

# Define feature types
text_col = "Description"
categorical_cols = ["Resource Allocation Strategy", "Throughput Maximization Outcome", "Load Balancing Outcome"]

# Preprocessing pipeline
preprocessor = ColumnTransformer(
    transformers=[
        ("text", TfidfVectorizer(), text_col),
        ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_cols)
    ]
)

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y_encoded, test_size=0.2, stratify=y_encoded, random_state=42
)

# Fit transformer
X_train_transformed = preprocessor.fit_transform(X_train)
X_test_transformed = preprocessor.transform(X_test)

# Print shape
print("X_train_transformed shape:", X_train_transformed.shape)
print("X_test_transformed shape:", X_test_transformed.shape)

# Train SVM
svm_clf = LinearSVC(max_iter=5000, random_state=42)
svm_clf.fit(X_train_transformed, y_train)

# Evaluate
y_pred_svm = svm_clf.predict(X_test_transformed)
print("SVM Performance:")
print("Accuracy:", accuracy_score(y_test, y_pred_svm))

# Save model and preprocessing tools
joblib.dump(svm_clf, 'model/svm_model.pkl')
joblib.dump(label_encoder, 'model/label_encoder.pkl')
joblib.dump(preprocessor, 'model/transformer.pkl')