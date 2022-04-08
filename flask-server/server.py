from flask import Flask
import requests
import json 
app = Flask(__name__)

#API Route

@app.route("/weather", methods={'GET'})
def index():
    req=requests.get('https://wttr.in/?format=j1')

    weather_dict = json.loads(req.content.decode("utf-8"))



    
    return weather_dict["nearest_area"][0]["areaName"][0]["value"]

if __name__ == "__main__":
    app.run(debug=True)