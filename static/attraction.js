let id = location.href.split("/").slice(-1);
let domainAndPort=""
let url = `${domainAndPort}/api/attraction/` + id


let attractionImg =[]
let imageCount = 0
let attractionImgLen = 0
attractionImg = fetchAndCreatData()
async function fetchAndCreatData(){
    return fetch(url).then((response)=>{
        return response.json();
    }).then((data)=>{
        console.log("data",data)
        TPC_attraction_information = loadData(data)
        console.log("TPC_attraction_information",TPC_attraction_information)
        attractionImg = createElement(TPC_attraction_information)
        return attractionImg
    })
}

function loadData(data){
    data=data["data"];
    console.log("data",data)    
    return data;
}
function createElement(TPC_attraction_information){
    // _____________
    // | Load Data |
    // ¯¯¯¯¯¯¯¯¯¯¯¯¯
    let idList = TPC_attraction_information["id"];
    let attractionImg = TPC_attraction_information["images"];
    let attractionName = TPC_attraction_information["name"];
    let attractionMRT = TPC_attraction_information["mrt"];
    let attractionCAT = TPC_attraction_information["category"];
    let attractionAddress = TPC_attraction_information["address"];
    let attractionDescription = TPC_attraction_information["description"];
    let attractionTransport = TPC_attraction_information["transport"];
    let attractionLat = TPC_attraction_information["lat"];
    let attractionLng = TPC_attraction_information["lng"];
    // ====Image====
    // Image
    let imageShow = document.querySelector("#attractionsImagesShow")
    let newImageDiv = document.createElement("img")
    attractionImgLen = attractionImg.length
    let imageShowLs = imageCount%attractionImgLen
    newImageDiv.setAttribute("id","newImageDiv")
    newImageDiv.setAttribute("class","newImageDiv")
    newImageDiv.src = attractionImg[imageShowLs]
    imageShow.appendChild(newImageDiv)
    // Image change button
    let leftButton = document.createElement("img")
    leftButton.setAttribute("id","leftButton")
    leftButton.setAttribute("class","leftButton")
    leftButton.setAttribute("onclick","imageLeftChoose();")
    leftButton.src = "../static/image/btn_leftArrow.png"
    imageShow.appendChild(leftButton)

    let RightButton = document.createElement("img")
    RightButton.setAttribute("id","RightButton")
    RightButton.setAttribute("class","RightButton")
    RightButton.setAttribute("onclick","imageRightChoose();")
    RightButton.src = "../static/image/btn_rightArrow.png"
    imageShow.appendChild(RightButton)
    
    // Bottom circle
    let bottomCircleBlock =  document.createElement("div")
    bottomCircleBlock.setAttribute("id","bottomCircleBlock")
    bottomCircleBlock.setAttribute("class","bottomCircleBlock")
    imageShow.appendChild(bottomCircleBlock)

    let bottomCircleCurrent = document.createElement("img")
    bottomCircleCurrent.setAttribute("id","bottomCircleCurrent_0")
    bottomCircleCurrent.setAttribute("class","bottomCircleCurrent_0")
    bottomCircleCurrent.src = "../static/image/circle_current.png"
    bottomCircleBlock.appendChild(bottomCircleCurrent)
    console.log("attractionImgLen",attractionImgLen)
    for (i=1;i<attractionImgLen;i++){
        let bottomCircleCurrent = document.createElement("img")
        bottomCircleCurrent.setAttribute("id",`bottomCircleCurrent_${i}`)
        bottomCircleCurrent.setAttribute("class",`bottomCircleCurrent_${i}`)
        bottomCircleCurrent.src = "../static/image/circle_candidate.png"
        bottomCircleBlock.appendChild(bottomCircleCurrent)
    }


    let nameAndBookingShow = document.querySelector("#nameAndBooking")
    // Name    
    let newNameDiv = document.createElement("div")
    newNameDiv.setAttribute("id","name")
    newNameDiv.setAttribute("class","name")
    newNameDiv.textContent = attractionName
    nameAndBookingShow.appendChild(newNameDiv)

    // CAT and MRT
    let catAndMrt = document.createElement("div")
    catAndMrt.setAttribute("id","catAndMrt")
    catAndMrt.setAttribute("class","catAndMrt")
    catAndMrt.textContent = attractionCAT+" at "+attractionMRT
    nameAndBookingShow.appendChild(catAndMrt)

    // Booking block
    let bookingBlock = document.createElement("div")
    bookingBlock.setAttribute("id","bookingBlock")
    bookingBlock.setAttribute("class","bookingBlock")
    nameAndBookingShow.appendChild(bookingBlock)

    let bookingShow = document.querySelector("#bookingBlock")
    // 訂購導覽行程
    let bookingTitle = document.createElement("div")
    bookingTitle.setAttribute("id","bookingTitle")
    bookingTitle.setAttribute("class","bookingTitle")
    bookingTitle.textContent = "訂購導覽行程"
    bookingShow.appendChild(bookingTitle)
    // 以此景點為中心的一日行程，帶您探索城市角落故事
    let bookingDescription = document.createElement("div")
    bookingDescription.setAttribute("id","bookingDescription")
    bookingDescription.setAttribute("class","bookingDescription")
    bookingDescription.textContent = "以此景點為中心的一日行程，帶您探索城市角落故事"
    bookingShow.appendChild(bookingDescription)
    // ======日期========
    // 日期Block
    let dataChooseBlock = document.createElement("div")
    dataChooseBlock.setAttribute("id","dataChooseBlock")
    dataChooseBlock.setAttribute("class","dataChooseBlock")    
    bookingShow.appendChild(dataChooseBlock)
    // 選擇日期
    let dataChooseTitle = document.createElement("div")
    dataChooseTitle.setAttribute("id","dataChooseTitle")
    dataChooseTitle.setAttribute("class","dataChooseTitle")
    dataChooseTitle.textContent = "選擇日期："
    dataChooseBlock.appendChild(dataChooseTitle)
    // 輸入日期
    let dataInput = document.createElement("input")
    dataInput.setAttribute("id","dataInput")
    dataInput.setAttribute("class","dataInput")
    dataInput.setAttribute("type","date")
    dataInput.setAttribute("onclick","showPrice();")
    dataChooseBlock.appendChild(dataInput)

    // ======日期========
    // 時間Block
    let timeChooseBlock = document.createElement("div")
    timeChooseBlock.setAttribute("id","timeChooseBlock")
    timeChooseBlock.setAttribute("class","timeChooseBlock")    
    bookingShow.appendChild(timeChooseBlock)
    // 選擇時間：
    let timeChooseTitle = document.createElement("div")
    timeChooseTitle.setAttribute("id","timeChooseTitle")
    timeChooseTitle.setAttribute("class","timeChooseTitle")
    timeChooseTitle.textContent = "選擇時間："
    timeChooseBlock.appendChild(timeChooseTitle)
    // 上半天 下半天 Block
    let timeChosenBlock = document.createElement("div")
    timeChosenBlock.setAttribute("id","timeChosenBlock")
    timeChosenBlock.setAttribute("class","timeChosenBlock")
    timeChooseBlock.appendChild(timeChosenBlock)
    // 上半天 下半天
    let timeChosenAm = document.createElement("input")
    timeChosenAm.setAttribute("id","timeChosen")
    timeChosenAm.setAttribute("class","timeChosen")
    timeChosenAm.setAttribute("name","timeChosen")
    timeChosenAm.setAttribute("type","radio")
    timeChosenAm.setAttribute("value","am")
    timeChosenAm.setAttribute("onclick","showPrice();")
    timeChosenBlock.appendChild(timeChosenAm)
    let timeChosenAmOption = document.createElement("label")
    timeChosenAmOption.setAttribute("id","timeChosenAmOption")
    timeChosenAmOption.setAttribute("class","timeChosenAmOption")
    timeChosenAmOption.textContent = "上半天"
    timeChosenBlock.appendChild(timeChosenAmOption)
    let timeChosenPm = document.createElement("input")
    timeChosenPm.setAttribute("id","timeChosen")
    timeChosenPm.setAttribute("class","timeChosen")
    timeChosenPm.setAttribute("name","timeChosen")
    timeChosenPm.setAttribute("type","radio")
    timeChosenPm.setAttribute("value","pm")
    timeChosenPm.setAttribute("onclick","showPrice();")
    timeChosenBlock.appendChild(timeChosenPm)
    let timeChosenPmOption = document.createElement("label")
    timeChosenPmOption.setAttribute("id","timeChosenPmOption")
    timeChosenPmOption.setAttribute("class","timeChosenPmOption")
    timeChosenPmOption.textContent = "下半天"
    timeChosenBlock.appendChild(timeChosenPmOption)

    // =====導覽費用====
    // 導覽費用Block
    let guidePriceBlock = document.createElement("div")
    guidePriceBlock.setAttribute("id","guidePriceBlock")
    guidePriceBlock.setAttribute("class","guidePriceBlock")    
    bookingShow.appendChild(guidePriceBlock)
    // 導覽費用： 
    let guidePriceTitle = document.createElement("div")
    guidePriceTitle.setAttribute("id","guidePriceTitle")
    guidePriceTitle.setAttribute("class","guidePriceTitle")
    guidePriceTitle.textContent = "導覽費用："
    guidePriceBlock.appendChild(guidePriceTitle)
    // Price default
    let guidePrice = document.createElement("div")
    guidePrice.setAttribute("id","guidePrice")
    guidePrice.setAttribute("class","guidePrice")
    guidePrice.textContent = "請選擇日期及時間"
    guidePriceBlock.appendChild(guidePrice)
    // 開始預約行程
    let startButton = document.createElement("div")
    startButton.setAttribute("id","startButton")
    startButton.setAttribute("class","startButton")
    startButton.textContent = "開始預約行程"
    bookingShow.appendChild(startButton)

    // ________________
    // | Inner Section 2 |
    // ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯
    let description = document.querySelector("#description")
    description.textContent = attractionDescription
    
    let address = document.querySelector("#address")
    address.textContent = attractionAddress
    
    let transport = document.querySelector("#transport")
    transport.textContent = attractionTransport
    return attractionImg
}
function showPrice(){
    let dataInputResult = document.querySelector('#dataInput');
    let timeChosenResult = document.querySelector('input[name="timeChosen"]:checked');
    let guidePrice = document.querySelector('#guidePrice');
    if (dataInputResult.value != 0 & timeChosenResult != null){
        console.log("dataInputResult",dataInputResult.value)
        if (timeChosenResult.value == "am"){
            guidePrice.innerHTML = "新台幣 2000 元"
        }
        if (timeChosenResult.value == "pm"){
            guidePrice.innerHTML = "新台幣 2500 元"
        }
    }
}
// Left and Right Bottom to change Image and Bottom
function imageLeftChoose(){
    console.log("Left")
    imageCount-=1
    bottomIconChange(imageCount)
}
function imageRightChoose(){
    console.log("Right")    
    imageCount+=1
    bottomIconChange(imageCount)
}
let imageShowLs = 0
function bottomIconChange(imageCount){
    if (imageCount<0){
        imageShowLs = Math.abs(imageCount)
        imageShowLs = imageShowLs%attractionImgLen
        imageShowLs = attractionImgLen-imageShowLs
    }else{
        imageShowLs = imageCount
    }
    imageShowLs = imageShowLs%attractionImgLen
    let imageShow = document.querySelector("#newImageDiv")
    imageShow.src = attractionImg[imageShowLs]
    // Bottom icon
    let srcChange = ""
    for (i=0;i<attractionImgLen;i++){
        if (i == imageShowLs){
            srcChange = "../static/image/circle_current.png"
        }else{
            srcChange = "../static/image/circle_candidate.png"
        }
        bottomCircleCurrent = document.querySelector(`#bottomCircleCurrent_${i}`)
        bottomCircleCurrent.src = srcChange
    }
}
// test
function test(){

    let test = document.querySelector('input[name="timeChosen"]:checked');

    console.log("test",timeChosenResult.value)
}