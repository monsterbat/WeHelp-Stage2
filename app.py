"""
WeHelp BootCamp Assignemt - Stage 2 taipei_day_trip -*- main program -*-
Update date: 2022/11/17
Authored by SC Siao
"""

from flask import *
from MySQL_con import *
from flask_cors import CORS

app=Flask(
	__name__,
	static_folder="static",
    static_url_path="/static"
)
CORS(app)
app.config["JSON_AS_ASCII"]=False
app.config["TEMPLATES_AUTO_RELOAD"]=True



@app.route("/api/attractions", methods=["GET"])
def attractions():
	# Normal situation
	try:
		one_page_quanity=12
		page=int(request.args.get("page",0))
		data_start=int(page*one_page_quanity)
		keyword=request.args.get("keyword",False)
		if keyword!=False:
			# attraction information With keyword
			sql_command="""
			SELECT * FROM attraction
			WHERE category like %s OR name like %s
			LIMIT %s, %s;
			"""
			sql_input=(keyword,"%"+keyword+"%",data_start,one_page_quanity)
			attraction_info=query_data(sql_command,sql_input)
		else:
			# attraction information WithOut keyword
			sql_command="""
			SELECT * FROM attraction
			LIMIT %s, %s;
			"""
			sql_input=(data_start,one_page_quanity)
			attraction_info=query_data(sql_command,sql_input)
		
		data_result=[]
		count=0
		while count<len(attraction_info):
			data={}
			data["id"] = attraction_info[count][0]
			data["name"] = attraction_info[count][1]
			data["category"] = attraction_info[count][2]
			data["description"] = attraction_info[count][3]
			data["address"] = attraction_info[count][4]
			data["transport"] = attraction_info[count][5]
			data["mrt"] = attraction_info[count][6]
			data["lat"] = attraction_info[count][7]
			data["lng"] = attraction_info[count][8]
			# attraction image
			data_image_ls=[]
			data_image=[]
			id_check=data["id"]
			
			# With keyword 
			if keyword!=False:
				sql_command="""
				SELECT attraction_id,images FROM attraction
				INNER JOIN attraction_image ON attraction.id=attraction_image.attraction_id
				WHERE category LIKE %s AND attraction_id LIKE %s OR name LIKE %s AND attraction_id LIKE %s;
				"""	
				sql_input=(keyword,id_check,"%"+keyword+"%",id_check)
				attraction_img=query_data(sql_command,sql_input)
			# WithOut keyword
			else:
				sql_command="""
				SELECT attraction_id,images FROM attraction
				INNER JOIN attraction_image ON attraction.id=attraction_image.attraction_id
				WHERE attraction_id = %s;
				"""
				sql_input=(id_check,)
				attraction_img=query_data(sql_command,sql_input)
			
			count_image=0
			while count_image<len(attraction_img):
				data_image_ls=[attraction_img[count_image][1]]
				data_image.extend(data_image_ls)
				count_image+=1
			data["images"]=data_image
			# Merge all data
			data_result.append(data)
			# next one
			count+=1
	
		# page judge
		if len(attraction_info)==one_page_quanity:
			next_page=page+1
		else:
			next_page=None
		
		# Combine
		data_main=jsonify({
			"nextPage":next_page,
			"data":data_result
			})
		return data_main

	# Unexcept situation
	except:
		errorr_message = {
            "error": True,
            "message": "請按照情境提供對應的錯誤訊息"
        }
		return errorr_message,500

@app.route("/api/attraction/<attractionId>", methods=["GET"])
def attractionId(attractionId):
	# Normal situation
	try:
		# attraction information
		sql_command=f"""
		SELECT * FROM attraction
		WHERE id={attractionId};
		"""
		attraction_info=query_data_read(sql_command)
		# With data situation
		if attraction_info!=[]:
			data_result=[]
			count=0
			data={}
			data["id"] = attraction_info[count][0]
			data["name"] = attraction_info[count][1]
			data["category"] = attraction_info[count][2]
			data["description"] = attraction_info[count][3]
			data["address"] = attraction_info[count][4]
			data["transport"] = attraction_info[count][5]
			data["mrt"] = attraction_info[count][6]
			data["lat"] = attraction_info[count][7]
			data["lng"] = attraction_info[count][8]
			# attraction image
			data_image_ls=[]
			data_image=[]
			sql_command="""
			SELECT attraction_id,images FROM attraction
			INNER JOIN attraction_image ON attraction.id=attraction_image.attraction_id
			WHERE attraction_id=%s;
			"""
			sql_input=(attractionId,)
			attraction_img=query_data(sql_command,sql_input)
			count_image=0
			while count_image<len(attraction_img):
				data_image_ls=[attraction_img[count_image][1]]
				data_image.extend(data_image_ls)
				count_image+=1
			data["images"]=data_image
			data_result=data
			
			data_main={
				"data":data_result
				}

			return data_main
		# No data situation
		else:
			errorr_message = {
            "error": True,
            "message": "請按照情境提供對應的錯誤訊息"
        }
		return errorr_message,400
	# Unexcept situation
	except:
		errorr_message = {
            "error": True,
            "message": "請按照情境提供對應的錯誤訊息"
        }
		return errorr_message,500

@app.route("/api/categories", methods=["GET"])
def categories():
	# Normal situation
	try:
		sql_command="""
		SELECT DISTINCT category FROM attraction;
		"""
		categories_raw_data=query_data_read(sql_command)
		data={}
		data_categories_ls=[]
		categories_data=[]
		count_categories=0
		while count_categories<len(categories_raw_data):
			data_categories_ls=[categories_raw_data[count_categories][0]]
			categories_data.extend(data_categories_ls)
			count_categories+=1
		data["data"]=categories_data
		return data
	# Unexcept situation
	except:
		errorr_message = {
            "error": True,
            "message": "請按照情境提供對應的錯誤訊息"
        }
		return errorr_message,500

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