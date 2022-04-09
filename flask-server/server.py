from flask import Flask
import requests
import json 
app = Flask(__name__)

#API Route

@app.route("/weather", methods={'GET'})
def index():
    req=requests.get('https://wttr.in/?format=j1')

    req_dict = json.loads(req.content.decode("utf-8"))

    temp_C = float(req_dict["current_condition"][0]["temp_C"])
    wind_speed =float(req_dict["current_condition"][0]["windspeedKmph"]) 
    print(type (temp_C))
    print(type (wind_speed))

    wind_chill = round(13.12 + 0.6215*temp_C - 11.37 *(wind_speed**0.16) + 0.3965*temp_C* (wind_speed**0.16))


    weather_info = {
        "City" : req_dict["nearest_area"][0]["areaName"][0]["value"],
        "Country" : req_dict["nearest_area"][0]["country"][0]["value"],
        "temp_c" : temp_C,
        "wind_speed" : wind_speed,
        "wind_chill" : wind_chill
    }

    print(weather_info)

    


    
    return req_dict
if __name__ == "__main__":
    app.run(debug=True)