
let page = 0;
let keyword = "";
let domainAndPort=""
let attractionsFind="api/attractions?";
let pageChoose="page"+page;
let thisPageQty=0;
url=domainAndPort+attractionsFind+pageChoose;

// Page and layout

let onePageQty=12;
let mainOneRowQty=4;



// Load data from API 
function loadData(data){
    data=data["data"];
    let TPC_attraction_information={};
    for (let i=0;i<data.length;i++)
    {
        // get the data into array
        let attraction_information=[];
        // Singal data list
        let attraction=data[i];
        
        // id -0
        let attraction_id = attraction["id"];
        attraction_information.push(attraction_id);

        // attraction_images -1
        let attraction_images = attraction["images"];
        attraction_information.push(attraction_images);

        // attraction_name -2
        let attraction_name = attraction["name"];
        attraction_information.push(attraction_name);

        // attraction_mrt -3
        let attraction_mrt = attraction["mrt"];
        attraction_information.push(attraction_mrt);

        // attraction_category -4
        let attraction_category = attraction["category"];
        attraction_information.push(attraction_category);

        // attraction_address -5
        let attraction_address = attraction["address"];
        attraction_information.push(attraction_address);

        // attraction_description -6
        let attraction_description = attraction["description"];
        attraction_information.push(attraction_description);

        // attraction_ -7
        let attraction_transport = attraction["transport"];
        attraction_information.push(attraction_transport);
        
        // attraction_ -8
        let attraction_lat = attraction["lat"];
        attraction_information.push(attraction_lat);

        // attraction_ -9
        let attraction_lng = attraction["lng"];
        attraction_information.push(attraction_lng);
        
        TPC_attraction_information[i]=attraction_information;
    }
    return TPC_attraction_information;
}
// Creat element from load data
function createAtt(TPC_attraction_information){

    let fetchDataId="#fetchData";
    let mainData = document.querySelector(fetchDataId);
    thisPageQty=Object.keys(TPC_attraction_information).length;
    for(let ls=0;ls<thisPageQty;ls++){
        
        // _____________
        // | Load Data |
        // ¯¯¯¯¯¯¯¯¯¯¯¯¯
        // Load data
        let idList = TPC_attraction_information[ls][0];
        let attractionImg = TPC_attraction_information[ls][1];
        let attractionName = TPC_attraction_information[ls][2];
        let attractionMRT = TPC_attraction_information[ls][3];
        let attractionCAT = TPC_attraction_information[ls][4];
        
        // ________________
        // | Create Block |
        // ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯

        // Creat attractions main Block
        let newMainBlock=document.createElement("a");
        newMainBlockIdSet="mainId_"+idList;
        newMainBlock.setAttribute("href",`/attraction/${idList}`);
        newMainBlock.setAttribute("id",newMainBlockIdSet);
        newMainBlock.setAttribute("class","imageBlock");

        mainData.appendChild(newMainBlock);
        // ======================================================
        // Attraction Block
        let newAttractionBlock = document.createElement("div");
        newAttractionBlockIdSet = "newAttractionBlock_"+idList;
        newAttractionBlock.setAttribute("id",newAttractionBlockIdSet);
        newAttractionBlock.setAttribute("class","imageShow") ;

        newMainBlock.appendChild(newAttractionBlock);
        
        // Attraction image
        let newAttractionImage = document.createElement("img");
        newAttractionImage.src = attractionImg[0];

        newAttractionBlock.appendChild(newAttractionImage);
        
        // Attraction name
        let newAttractionName = document.createElement("p");
        newAttractionNameIdSet = "newAttractionName_"+idList;
        newAttractionName.setAttribute("id",newAttractionNameIdSet);
        newAttractionName.setAttribute("class","imageTextName");
        newAttractionName.textContent = attractionName;

        newAttractionBlock.appendChild(newAttractionName);

        // ======================================================
        // Attraction details
        let newDetails =  document.createElement("div");
        newDetailsIdSet = "newTextBox_"+idList;
        newDetails.setAttribute("id",newDetailsIdSet);
        newDetails.setAttribute("class","imageTextBox") ;

        newMainBlock.appendChild(newDetails);

        // Details MRT
        let newMRT = document.createElement("p");
        newMRTIdSet = "newMrt_"+idList;
        newMRT.setAttribute("id",newMRTIdSet);
        newMRT.setAttribute("class","imageTextMRT");
        newMRT.textContent = attractionMRT;

        newDetails.appendChild(newMRT);

        // Detaiatls CAT
        let newCAT = document.createElement("p");
        newCATIdSet = "newMrt_"+idList;
        newCAT.setAttribute("id",newCATIdSet);
        newCAT.setAttribute("class","imageTextCAT");
        newCAT.textContent = attractionCAT;

        newDetails.appendChild(newCAT);
    }
    return thisPageQty;

}
// ***************   fetch the data from Net    ***************
function fetchAndCreatData(){
    return fetch(
        `${domainAndPort}api/attractions?page=${page}&keyword=${keyword}`
    ).then((response)=>{
        return response.json();
    }).then(function(data)
    {
        TPC_attraction_information=loadData(data);
        thisPageQty=createAtt(TPC_attraction_information);
        page = data["nextPage"];
        return thisPageQty;
    });
    
}
// fetch category
function fetchCategory(){
    fetch(`${domainAndPort}api/categories`).then(function(response){
        return response.json();
    }).then(function(data){
        creatCategoryElement(data)
    })
}

// Create category element
let catOneRowQty = 3;
let CAT = document.querySelector("#category0");
function creatCategoryElement(data){
    data = data["data"];    
    for (ls=0;ls<data.length;ls++){
        let newCatDiv = document.createElement("div");
        newCatDiv.className = "catBlock";
        newCatDiv.setAttribute("onclick","categoryClick(this)");
        newCatDiv.textContent = data[ls];
        CAT.appendChild(newCatDiv);
    }
}


// =========================================
// =======   CAT SHOW and DISAPPEAR  =======
// =========================================

fetchCategory()
let clickSearchBarNum = 0;
let showOrDisJudge = 0;
let body = document.getElementById('body');
let searchBar = document.querySelector("#keyword");

document.addEventListener("click", function () {
    closeCat();
}, false);
searchBar.addEventListener("click", function (ev) {
    clickSearchBarCount();
    showCat();    
    ev.stopPropagation();
}, false);

function clickSearchBarCount(){
    clickSearchBarNum += 1
    showOrDisJudge = clickSearchBarNum%2
}
function showCat(){
    if (showOrDisJudge == 1){
        CAT.style.display = "grid";
    }else{
        CAT.style.display = "none";
    }
} 
function closeCat(){
    CAT.style.display = "none";
    clickSearchBarNum=0
}

// =========================================
// =======   CAT CHOOSE AND SHOW ON  =======
// =========================================

CAT.addEventListener("click", function (ev) {
    chooseCategory();
    closeCat()
    ev.stopPropagation();
}, false);

function chooseCategory(){
    CAT.addEventListener("mousedown",chooseOneCategoryAndShow());

}

function chooseOneCategoryAndShow(){
    document.getElementById("keyword").value = categoryChosen;
}

let categoryChosen = "";
function categoryClick(element){ 
    categoryChosen = element.innerHTML;
}

// =========================================
// =======   USE KEYWORD TO SEARCH  ========
// =========================================
let searchBarButton = document.querySelector(".searchBarButton")
searchBarButton.addEventListener("click",searchAttraction);

async function searchAttraction(){
    onloadCount+=1
    // Remove Data
    let fetchDataSelect = document.querySelector("#fetchData");
    fetchDataSelect.remove();
    // Creat new fetch div
    let mainFetchDataSelect = document.querySelector("#mainFetchData");
    let newFetchDiv = document.createElement("div");
    let newFetchDivId="fetchData"    ;
    newFetchDiv.setAttribute("id",newFetchDivId);
    newFetchDiv.setAttribute("class","fetchData");
    mainFetchDataSelect.appendChild(newFetchDiv);
    // Defind page and keyword
    page = 0
    keywordDiv = document.querySelector("#keyword");
    keyword = keywordDiv.value;
    thisPageQty=await fetchAndCreatData();
    // If no Data
    if (thisPageQty== 0){
        let mainFetchDataSelect = document.querySelector("#fetchData");
        mainFetchDataSelect.style = `            
            justify-content:center;
            display: inline-flex;
            `
        let noData = document.createElement("div");
        let noDataId="fetchNoData";
        noData.setAttribute("id",noDataId);
        noData.setAttribute("class","fetchNoData");
        
        noData.textContent = "找不到資料";
        mainFetchDataSelect.appendChild(noData);       
    }     

}

// IntersectionObserver
let target = document.querySelector("footer");
let callback = (entries,observer) => {
    entries.forEach(entry => {
        if (page != null) {
            fetchAndCreatData(); 
        } 
        else {
            observer.unobserve(target);
        }        
    });
};

let headerDiv = document.querySelector("header")
let mainDIV = document.querySelector("main")

let headerDivHeight = headerDiv.offsetHeight
let sloganDivHeight = mainDIV.offsetHeight
let windowHeight = window.innerHeight

let rootMarginTop = (headerDivHeight+sloganDivHeight)-windowHeight

const options = {
  root: null,
  rootMargin: `${rootMarginTop}px 0px 0px 0px`,
  threshold: 0,
};

let observer = new IntersectionObserver(callback, options);
let onloadCount = 0

observer.observe(target);

function pageReturn0(){
    page=0;
}