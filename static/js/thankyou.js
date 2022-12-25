let thankyouTitle1 = document.getElementById("thankyouTitle1")
let thankyouTitle2 = document.getElementById("thankyouTitle2")
let thankyouTitle3 = document.getElementById("thankyouTitle3")
let final = document.getElementById("final")
orderNumber = location.href.split("=").slice(-1);
fetch (`/api/orders/${orderNumber}`,{
    method:"GET",
}).then(function(response){
    return response.json();
}).then(function(data){
    userName = data.data.contact.name
    orderName = data.data.number
    thankyouTitle1.textContent = "Hi! "+userName+" 恭喜您完成行程預定"
    thankyouTitle2.textContent = "您的訂單編號為 「"+orderName+"」"
    thankyouTitle3.textContent = "非常感謝您的支持！"

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
    document.getElementById("footerNoSchedule").style.height = footerNoScheduleDivHeight+"px";
    return data
})
