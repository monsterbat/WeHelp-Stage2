let bookingInformation = document.getElementById("bookingInformation")
let bookingTitle = document.getElementById("bookingTitle")
let bookingItem = document.getElementById("bookingItem")
let bookingImg = document.getElementById("bookingImg")
let bookingDetail = document.getElementById("bookingDetail")
let bookingAttraction = document.getElementById("bookingAttraction")
let bookingDate = document.getElementById("bookingDate")
let bookingTime = document.getElementById("bookingTime")
let bookingPrice = document.getElementById("bookingPrice")
let bookingAddress = document.getElementById("bookingAddress")
let nameInput = document.getElementById("nameInput")
let emailInput = document.getElementById("emailInput")
let userPay = document.getElementById("userPay")
let payBlock = document.getElementById("payBlock")
let spacer1 = document.getElementById("spacer1")
let spacer2 = document.getElementById("spacer2")
let spacer3 = document.getElementById("spacer3")
let totelPrice = document.getElementById("totelPrice")
let main = document.querySelector("main")
let final = document.getElementById("final")

// Loading data
createBookingData();

// Get bookin inf
async function getBookingData(){
    return fetch(`/api/booking`,{
        method:"GET",
    }).then(function(response){
        // console.log("url",url)
        return response.json();
    }).then(function(data){
        // console.log(data)
        return data
    })
}
// Get user inf
async function getUserData(){
    return fetch(`/api/user/auth`,{
        method:"GET",
    }).then(function(response){
        // console.log("url",url)
        return response.json();
    }).then(function(data){
        // console.log(data)
        return data
    })
}
// Create page
async function createBookingData(){
    let bookingData = await getBookingData()
    let userData = await getUserData()
    console.log(bookingData)
    if (bookingData.data != null){        
        let userNameShow = userData.data.name
        let userEmailShow = userData.data.email
        let userIdShow = userData.data.id
        let bookingNameShow = bookingData.data.attraction.name
        let bookingAddressShow = bookingData.data.attraction.address
        let bookingImgShow = bookingData.data.attraction.image
        let bookingDateShow = bookingData.data.date
        let bookingTimeShow = bookingData.data.time
        let bookingPriceShow = bookingData.data.price
        
        console.log("bookingData",bookingData)
        console.log("userData",userData.data.email)
        console.log("bookingAddressShow",bookingData.data.attraction.address)
        console.log(bookingTitle)
        bookingTitle.textContent = "您好，"+userNameShow+"，待預訂的行程如下："
        bookingImg.src = bookingImgShow
        bookingAttraction.textContent = "台北一日遊："+bookingNameShow
        bookingDate.textContent = bookingDateShow
        // Time trans
        if (bookingTimeShow == "morning"){
            bookingTimeShow = "早上9點到下午4點"
        }
        if (bookingTimeShow == "afternoon"){
            bookingTimeShow = "下午上4點到晚上9點"
        }
        // 
        bookingTime.textContent = bookingTimeShow
        bookingPrice.textContent = "新台幣 "+bookingPriceShow+" 元"
        bookingAddress.textContent = bookingAddressShow
        nameInput.setAttribute("value",userNameShow)
        emailInput.setAttribute("value",userEmailShow)
        totelPrice.textContent = "總價：新台幣 "+bookingPriceShow+" 元"
    }else{
        let userNameShow = userData.data.name
        bookingTitle.textContent = "您好，"+userNameShow+"，待預訂的行程如下："
        bookingItem.remove()
        spacer1.remove()
        spacer2.remove()
        spacer3.remove()
        userInformation.remove()
        userPay.remove()
        payBlock.remove()
        let noSchedule = document.createElement("div")
        noSchedule.setAttribute("id","noSchedule");
        noSchedule.setAttribute("class","noSchedule");
        noSchedule.textContent = "目前沒有任何待預訂的行程"
        bookingInformation.appendChild(noSchedule);
        
        let footerNoSchedule = document.createElement("div")
        footerNoSchedule.setAttribute("id","footerNoSchedule");
        footerNoSchedule.setAttribute("class","footerNoSchedule");
        final.appendChild(footerNoSchedule);
        let headerDiv = document.querySelector("header")
        let mainDIV = document.querySelector("main")
        let footer = document.querySelector("footer")

        let headerDivHeight = headerDiv.offsetHeight
        let sloganDivHeight = mainDIV.offsetHeight
        let footerDivHeight = footer.offsetHeight
        let windowHeight = window.innerHeight
        footerNoScheduleDivHeight = windowHeight-(headerDivHeight+sloganDivHeight+footerDivHeight)
        console.log(footerNoScheduleDivHeight)
        document.getElementById("footerNoSchedule").style.height = footerNoScheduleDivHeight+"px";

        console.log("null") 
    }
    
}
// Delete schedule
async function bookingCancel(){
    await fetch(`/api/booking`,{
        method:"DELETE",
        headers:new Headers({
            "Content-Type":"application/json"
        })
    })
    location.reload();
}

