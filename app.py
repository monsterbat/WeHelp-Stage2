"""
WeHelp BootCamp Assignemt - Stage 2 taipei_day_trip -*- main program -*-
Update date: 2022/12/08
Authored by SC Siao
"""

from flask import *
from flask_cors import CORS
import user_api
import attractions_api

app=Flask(
	__name__,
	static_folder="static",
    static_url_path="/static"
)
CORS(app)

app.register_blueprint(user_api.user_api)
app.register_blueprint(attractions_api.attractions_api)

# Pages
@app.route("/")
def index():
	return render_template("index.html")
@app.route("/attraction/<id>")
def attraction(id):
	return render_template("attraction.html")
@app.route("/booking")
def booking():
	return render_template("booking.html")
@app.route("/thankyou")
def thankyou():
	return render_template("thankyou.html")

app.debug = True
app.run(host = "0.0.0.0",port=3000)