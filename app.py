from flask import Flask, render_template, request
import pandas as pd
import numpy as np
import pickle

app = Flask(__name__)

model = pickle.load(open('model_s.pkl', 'rb'))
df = pickle.load(open('data_s.pkl', 'rb'))
X = pickle.load(open('X.pkl', 'rb'))

def predict_price(location, sqft, bath, bhk):
    loc_index = np.where(X.columns == location)[0][0]

    x = np.zeros(len(X.columns))
    x[0] = sqft
    x[1] = bath
    x[2] = bhk
    if loc_index >= 0:
        x[loc_index] = 1

    return model.predict([x])[0]

@app.route('/')
def home():
    return render_template('ml.html', locations=df['location'].unique())

@app.route('/predict', methods=['POST'])
def predict():
    location = request.form['location']
    sqft = float(request.form['sqft'])
    bath = float(request.form['bath'])
    bhk = float(request.form['bhk'])

    var = predict_price(location=location, sqft=sqft, bath=bath, bhk=bhk)
    return render_template('result.html', result=int(var))

if __name__ == '__main__':
    app.run(debug=True)
