from flask import Flask
import requests

app = Flask(__name__)

#API Route

@app.route("/weather", methods={'GET'})
def index():
    req=requests.get('https://wttr.in/')
    print(req.content)
    return req.content

if __name__ == "__main__":
    app.run(debug=True)