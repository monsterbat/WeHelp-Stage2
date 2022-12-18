from flask import *
import sys
sys.path.append('api/module')
import attraction_api_module

attractions_api_controller = Blueprint(
    "attractions_api_controller",
    __name__,
    static_folder="static",
    static_url_path="/static",
) 

@attractions_api_controller.route("/api/attractions", methods=["GET"])
def attractions():
    try:
        page = int(request.args.get("page",0))
        keyword = request.args.get("keyword",False)
        attractions = attraction_api_module.get_attractions(page, keyword)
        return attractions
    except:
        errorr_message = jsonify({
            "error": True,
            "message": "伺服器內部錯誤"
        })
        return errorr_message,500

@attractions_api_controller.route("/api/attraction/<attractionId>", methods=["GET"])
def attractionId(attractionId):
    try:
        data = attraction_api_module.get_attractionId(attractionId)
        return data
    except:
        errorr_message = jsonify({
            "error": True,
            "message": "伺服器內部錯誤"
        })
        return errorr_message,500

@attractions_api_controller.route("/api/categories", methods=["GET"])
def categories():
    # Normal situation
    try:
        data = attraction_api_module.get_categories()
        return data
    except:
        errorr_message = jsonify({
            "error": True,
            "message": "伺服器內部錯誤"
        })
        return errorr_message,500