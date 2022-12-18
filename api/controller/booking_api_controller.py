from flask import *
from MySQL_con import *
import jwt
import time
import pprint
import sys
sys.path.append('api/module')
import booking_api_module

booking_api_controller = Blueprint(
    "booking_api",
    __name__,
    static_folder="static",
    static_url_path="/static",
)
jwt_key = "key"
@booking_api_controller.route("/api/booking",methods=["GET","POST","DELETE"])
def booking():
    # jwt verify
    user_id = booking_api_module.verify_booking()
    
    # Booking data get
    if request.method == "GET":
        try:
            booking_msg = booking_api_module.get_booking_get(user_id)
            return booking_msg

        except:
            errorr_message = jsonify({
            "error": True,
            "message": "請按照情境提供對應的錯誤訊息"
            })
            return errorr_message,500

    if request.method == "POST":
        try:     
            booking_api_module.delete_booking_inf(user_id)
            try:
                booking_msg = booking_api_module.get_booking_post(user_id)
                return booking_msg
            except:
                errorr_message = jsonify({
                "error": True,
                "message": "建立失敗，輸入不正確或其他原因"
                })
                return errorr_message,400
        except:
            errorr_message = jsonify({
            "error": True,
            "message": "伺服器內部錯誤"
            })
            return errorr_message,500
    if request.method == "DELETE":
        try:
            booking_api_module.delete_booking_inf(user_id)
            booking_msg=jsonify({"ok":True})
            return booking_msg
        except:
            errorr_message = jsonify({
            "error": True,
            "message": "請按照情境提供對應的錯誤訊息"
            })
            return errorr_message,500