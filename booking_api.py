from flask import *
from MySQL_con import *
import jwt
import time
import pprint

booking_api = Blueprint(
    "booking_api",
    __name__,
    static_folder="static",
    static_url_path="/static",
)
jwt_key = "key"
@booking_api.route("/api/booking",methods=["GET","POST","DELETE"])
def booking():
    # Get token
    token = request.cookies.get('token')
    # check token with login or not
    if token == None:
        no_login_msg = jsonify({
            "error":True,
            "message":"使用者未登入"
        })
        return no_login_msg,403

    # decode token know the user inf
    token_data = jwt.decode(token, jwt_key, algorithms="HS256")
    user_email = token_data["email"]
    sql_command="""
    SELECT id,name,email
    FROM user 
    WHERE email=%s;
    """
    value_input = (user_email,)
    
    user_info = query_data(sql_command,value_input)
    user_id = user_info[0][0]

    if user_info == []:
        verify_msg = jsonify({
            "error": True,
            "message": "token 有誤"
        })
        return verify_msg,401
    
    # Booking data get
    if request.method == "GET":
        try:
            data = {"data":None}
            # Booking inf
            sql_command="""
            SELECT id,user_id,attraction_id,date,time,price
            FROM booking 
            WHERE user_id=%s;
            """
            value_input = (user_id,)
            booking_info = query_data(sql_command,value_input)
            # print(booking_info)
            if booking_info != []:
                # Attraction inf
                attraction_id = booking_info[0][2]
                sql_command="""
                SELECT id,name,address
                FROM attraction 
                WHERE id=%s;
                """
                value_input = (attraction_id,)
                attraction_info = query_data(sql_command,value_input)

                # Attraction img inf
                sql_command="""
                SELECT attraction_id,images FROM attraction
                INNER JOIN attraction_image ON attraction.id=attraction_image.attraction_id
                WHERE attraction_id = %s;
                """
                value_input=(attraction_id,)
                attraction_img = query_data(sql_command,value_input)

                data = {
                    "data":{
                        "attraction":{
                            "id": attraction_info[0][0],
                            "name":attraction_info[0][1],
                            "address":attraction_info[0][2],
                            "image":attraction_img[0][1]
                        },
                        "date":booking_info[0][3],
                        "time":booking_info[0][4],
                        "price":int(booking_info[0][5])
                    }
                }
            
            pprint.pprint(data)
            return data,200

        except:
            errorr_message = jsonify({
            "error": True,
            "message": "請按照情境提供對應的錯誤訊息"
            })
            return errorr_message,500

    if request.method == "POST":
        try:     
            # Delete previous data
            sql_command = """
            DELETE FROM booking 
            WHERE user_id = %s;
            """
            value_input = (user_id,)
            insert_or_update_data(sql_command,value_input)   

            try:
                # Insert data
                booking_data = request.get_json()
                attraction_id = booking_data["attractionId"]
                date = booking_data["date"]
                time = booking_data["time"]
                price = booking_data["price"]
            
                sql_command = """
                INSERT INTO booking (user_id, attraction_id, date, time, price)
                VALUES (%s,%s,%s,%s,%s);
                """
                value_input = (user_id,attraction_id,date,time,price)
                insert_or_update_data(sql_command,value_input)
                data=jsonify({"ok":True})
                return data,200
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
            print("here1")
            sql_command = """
            DELETE FROM booking 
            WHERE user_id = %s;
            """
            value_input = (user_id,)
            print("here2")
            insert_or_update_data(sql_command,value_input)
            print("here3")
            data=jsonify({"ok":True})
            return data
        except:
            errorr_message = jsonify({
            "error": True,
            "message": "請按照情境提供對應的錯誤訊息"
            })
            return errorr_message,500