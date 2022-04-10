from flask import Flask, abort, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session
from config import ApplicationConfig
from models import db, User
import json 
import requests

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)
db.init_app(app)

with app.app_context():
    db.drop_all()
    db.create_all()



#API Routes
@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.filter_by(id=user_id).first()

    return jsonify({
        "id": user.id, 
        "email": user.email,
        "city": user.city,
        "name":user.name
    })

@app.route("/register", methods=["POST"])
def register_user():
    email = request.json["email"]
    password = request.json["password"]
    name = request.json["name"]
    city = request.json["city"]

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password, name=name, city=city)
    db.session.add(new_user)
    db.session.commit()


    return jsonify({
        "id": new_user.id, 
        "email": new_user.email,
        "name": new_user.name,
        "city": new_user.city
    })
@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Unauthorized"}), 401

    if not bcrypt.check_password_hash(user.password, password):
                return jsonify({"error": "Unauthorized"}), 401

    session["user_id"] = user.id


    return jsonify({
            "id": user.id, 
            "email": user.email
        })
@app.route("/weather", methods={'POST'})
def index():
    print("helloooo")
    city = request.json["data"]["city"]
    print("xcity",city)
    url='https://wttr.in/{0}?format=j1'.format(city)
    req=requests.get('https://wttr.in/?format=j1')

    req_dict = json.loads(req.content.decode("utf-8"))

    temp_C = float(req_dict["current_condition"][0]["temp_C"])
    wind_speed =float(req_dict["current_condition"][0]["windspeedKmph"]) 

    wind_chill = round(13.12 + 0.6215*temp_C - 11.37 *(wind_speed**0.16) + 0.3965*temp_C* (wind_speed**0.16))


    weather_info = {
        "temp_c" : temp_C,
        "wind_speed" : wind_speed,
        "wind_chill" : wind_chill
    }

    print("weather info",weather_info)

    class Switch(dict):
        def __getitem__(self, item):
            for key in self.keys():                 # iterate over the intervals
                if item in key:                     # if the argument is in that interval
                    return super().__getitem__(key) # return its associated value
            raise KeyError(item) 


    switch = Switch({
        range(-100,-20): "It's extremely cold out, consider staying inside.",
        range(-20,0): "It's very cold out, bundle up with a hat, scarf, gloves, and winter jacket.",
        range(0,10): "It's cold out, wear a winter jacket, light hat, and gloves.",
        range(10,17): "It's cool out, wear a light jacket.",
        range(17,22): "It's comfortable out, wear whatever you want.",
        range(22,27): "It's warm out, consider a t-shirt and pants."
    })

    clothing = switch[wind_chill]

    weather_info = {
        "temp_c" : temp_C,
        "wind_speed" : wind_speed,
        "wind_chill" : wind_chill,
        "clothing" : clothing
    }
    print("tempc",type(temp_C), "speed", type(wind_speed), "chjill", type(wind_chill),"clothing", type(clothing))

    return weather_info



if __name__ == "__main__":
    app.run(debug=True)