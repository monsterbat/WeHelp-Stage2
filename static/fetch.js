// WeHelp BootCamp Assignemt - Stage 2 taipei_day_trip -*- index fetch data js -*-
// Update date: 2022/11/26
// Authored by SC Siao

// api URL
// let keyword = document.getElementById("keyword").value;
let page = 0;
let keyword = "";
let domainAndPort=""
let attractionsFind="api/attractions?"
let pageChoose="page"+page

url=domainAndPort+attractionsFind+pageChoose

// Page and layout

let onePageQty=12
let mainOneRowQty=4



// Load data from API 
function loadData(data){
    data=data["data"]
    // console.log("data",data)
    let TPC_attraction_information={}
    for (let i=0;i<data.length;i++)
    {
        // get the data into array
        let attraction_information=[];
        // Singal data list
        let attraction=data[i];
        
        // id -0
        let attraction_id=attraction["id"];
        attraction_information.push(attraction_id)

        // attraction_images -1
        let attraction_images=attraction["images"][0]
        attraction_information.push(attraction_images)
        // console.log("attraction_images",attraction)

        // attraction_name -2
        let attraction_name=attraction["name"];
        attraction_information.push(attraction_name)

        // attraction_mrt -3
        let attraction_mrt=attraction["mrt"];
        attraction_information.push(attraction_mrt)

        // attraction_category -4
        let attraction_category=attraction["category"];
        attraction_information.push(attraction_category)
        
        TPC_attraction_information[i]=attraction_information;
    }
    return TPC_attraction_information
}

// Creat element from load data
rowListCount=0
function createElement(TPC_attraction_information){

    // Creat new fetch div
    let newFetchDivId="#fetchData"
    let newFetchDivSelect = document.querySelector(newFetchDivId);
    let newFetchDiv = document.createElement("div");
    let newFetchDivIdSet = "fetchDataPage"+page;
    newFetchDiv.setAttribute("id",newFetchDivIdSet)
    newFetchDivSelect.appendChild(newFetchDiv);


    let fetchDataId="#fetchDataPage"+page
    let list = document.querySelector(fetchDataId);
    onePageQty=Object.keys(TPC_attraction_information).length
    for(let ls_1=0;ls_1<onePageQty;ls_1++){
        // Creat Row list
        rowListJudge=ls_1%mainOneRowQty
        if (rowListJudge==0){
            rowListCount+=1;
            let newRowList=document.createElement("div");
            rowListIdSet="list1_"+rowListCount;
            newRowList.setAttribute("id",rowListIdSet);
            newRowList.setAttribute("class","imageRowList");
            list.appendChild(newRowList);
        }

        idList=TPC_attraction_information[ls_1][0]
        // Creat ont item Block
        let blockChoose = "#"+rowListIdSet
        let block = document.querySelector(blockChoose);
        let newBlock=document.createElement("div");
        blockIdSet="list2_"+idList
        newBlock.setAttribute("id",blockIdSet)
        newBlock.setAttribute("class","imageBlock")
        block.appendChild(newBlock);
        
        // image
        let imageChoose = "#"+blockIdSet
        let image = document.querySelector(imageChoose);
        let newImage=document.createElement("div");
        imageIdSet="list3_1_"+idList
        newImage.setAttribute("id",imageIdSet)
        newImage.setAttribute("class","imageShow")
        image.appendChild(newImage);

        // Name with Backgroung
        let nameChoose = "#"+imageIdSet;
        let name = document.querySelector(nameChoose);
        let newName=document.createElement("div");
        nameIdSet = "list5_"+idList
        newName.setAttribute("id",nameIdSet)
        newName.setAttribute("class","imageTextName")
        name.appendChild(newName);

        // Text Box
        let textBoxChoose = "#"+blockIdSet
        let textBox = document.querySelector(textBoxChoose);
        let newTextBox=document.createElement("div");
        textBoxIdSet="list3_2_"+idList
        newTextBox.setAttribute("id",textBoxIdSet)
        newTextBox.setAttribute("class","imageTextBox")
        textBox.appendChild(newTextBox);

        // MRT
        let mrtChoose = "#"+textBoxIdSet
        let mrt = document.querySelector(mrtChoose);
        let newMrt = document.createElement("div");
        mrtIdSet="list4_1_"+idList
        newMrt.setAttribute("id",mrtIdSet)
        newMrt.setAttribute("class","imageTextMRT")
        mrt.appendChild(newMrt);

        // CAT
        let catChoose = "#"+textBoxIdSet
        let cat = document.querySelector(catChoose);
        let newCat = document.createElement("div");
        catIdSet="list4_2_"+idList
        newCat.setAttribute("id",catIdSet)
        newCat.setAttribute("class","imageTextCAT")
        cat.appendChild(newCat);
        // ______________
        // |    INNER   |
        // ¯¯¯¯¯¯¯¯¯¯¯¯¯¯

        // Inner image
        let newImage_1=document.createElement("img");
        newImage_1.src = TPC_attraction_information[ls_1][1];
        newImage_1.className = "imageShow";
        let imageId_1="list3_1_"+idList;
        let attractionImage=document.getElementById(imageId_1);
        attractionImage.appendChild(newImage_1);

        // Inner name
        let newDiv_name=document.createElement("div");        
        newDiv_name.id = "list5_"+idList;
        newDiv_name.className = "imageTextName";
        let textNode_name = document.createTextNode(TPC_attraction_information[ls_1][2]);
        newDiv_name.appendChild(textNode_name);
        document.getElementById(newDiv_name.id).appendChild(newDiv_name);

        // Inner MRT
        let newDiv_1=document.createElement("div");        
        newDiv_1.id = "list4_1_"+idList;
        newDiv_1.className = "imageTextMRT";
        let textNode_1 = document.createTextNode(TPC_attraction_information[ls_1][3]);
        let rr=newDiv_1.appendChild(textNode_1);
        document.getElementById(newDiv_1.id).appendChild(newDiv_1);

        // Inner CAT
        let newDiv_2=document.createElement("div");        
        newDiv_2.id = "list4_2_"+idList;
        newDiv_2.className = "imageTextCAT";
        let textNode_2 = document.createTextNode(TPC_attraction_information[ls_1][4]);
        let rr2=newDiv_2.appendChild(textNode_2);
        document.getElementById(newDiv_2.id).appendChild(newDiv_2);
    }


}

// ***************   fetch the data from Net    ***************
function fetchAndCreatData(){
    console.log("HERE1")
    fetch(
        `${domainAndPort}api/attractions?page=${page}&keyword=${keyword}`
    ).then(function(response){
        console.log("HERE2")
        return response.json();
    }).then(function(data)
    {
        console.log("HERE3")
        TPC_attraction_information=loadData(data)
        createElement(TPC_attraction_information)
        page = data["nextPage"];
        console.log("page＝＝＝＝＝＝＝＝＝",page)
    });

}

// Create category element
let catOneRowQty = 3
function creatCategoryElement(data){
    // Create CAT block
    let createCat = document.querySelector("#category0");
    let newCatTable=document.createElement("div");
    newCatTable.setAttribute("id","category");
    newCatTable.setAttribute("class","catTable");
    createCat.appendChild(newCatTable);
    // Create element
    let rowListCount=0
    data=data["data"];        
    dataQty = data.length
    let CAT = document.querySelector("#category");
    for (let ls=0;ls<dataQty;ls++){
        rowListJudge = ls%catOneRowQty
        // Create Row
        if (rowListJudge == 0){
            rowListCount+=1;
            let newRowList=document.createElement("div");
            rowListIdSet="CAT_List1_"+rowListCount;
            newRowList.setAttribute("id",rowListIdSet);
            newRowList.setAttribute("class","catRowList");
            CAT.appendChild(newRowList);
        }
        // Creat block
        let blockChoose = "#"+rowListIdSet
        let block = document.querySelector(blockChoose);
        let newBlock=document.createElement("div");
        blockIdSet="CAT_List2_"+ls
        newBlock.setAttribute("id",blockIdSet)
        newBlock.setAttribute("class","catBlock")
        block.appendChild(newBlock);

        // Inner CAT
        let newCatDiv=document.createElement("div");        
        newCatDiv.id = "CAT_List2_"+ls;
        newCatDiv.className = "catBlock";
        newCatDiv.setAttribute("onclick","categoryClick(this)")
        let textNode = document.createTextNode(data[ls]);
        newCatDiv.appendChild(textNode);
        document.getElementById(newCatDiv.id).appendChild(newCatDiv);
    }
}

// fetch category
function fetchCategory(){
    fetch(`${domainAndPort}api/categories`).then(function(response){
        return response.json();
    }).then(function(data){
        creatCategoryElement(data)
    })
}
// =========================================
// =======   CAT SHOW and DISAPPEAR  =======
// =========================================
let clickSearchBarNum = 0
let showOrDisJudge =0
let body = document.getElementById('body');
let searchBar = document.querySelector("#keyword");

document.addEventListener("click", function () {
    showOrDisCatClickDoc();
}, false);
searchBar.addEventListener("click", function (ev) {
    clickSearchBarCount();
    showOrDisCat();
    ev.stopPropagation();
}, false);

function clickSearchBarCount(){
    clickSearchBarNum = clickSearchBarNum+1
    showOrDisJudge = clickSearchBarNum%2
}

function showOrDisCat(){
    if (showOrDisJudge == 1){
        fetchCategory()
    }else{
        let categoryShow = document.querySelector("#category");
        categoryShow.remove()
    }
};

function showOrDisCatClickDoc(){
    if (showOrDisJudge == 1){ 
        clickSearchBarNum = 0
        let categoryShow = document.querySelector("#category");
        categoryShow.remove()
        showOrDisJudge = 0
    }else{
        clickSearchBarNum = 0
    }
}
// =========================================
// =======   CAT CHOOSE AND SHOW ON  =======
// =========================================
let categorySelectBar = document.querySelector("#category0");
categorySelectBar.addEventListener("click", function (ev) {
    chooseCategory();
    showOrDisCatClickDoc();
    ev.stopPropagation();
}, false);

function chooseCategory(){
    categorySelectBar.addEventListener("mousedown",chooseOneCategoryAndShow());
}

function chooseOneCategoryAndShow(){
    document.getElementById("keyword").value = categoryChosen;
}

let categoryChosen = ""
function categoryClick(element){
    categoryChosen = element.innerHTML
}

// =========================================
// =======   USE KEY WORD TO SEARCH  =======
// =========================================
let searchBarButton = document.querySelector(".searchBarButton")
searchBarButton.addEventListener("click",searchAttraction);

function searchAttraction(){
    // Remove Data
    let fetchDataSelect = document.querySelector("#fetchData");
    fetchDataSelect.remove()
    // Creat new fetch div
    let mainFetchDataSelect = document.querySelector("#mainFetchData");
    let newFetchDiv = document.createElement("div");
    let newFetchDivId="fetchData"    
    newFetchDiv.setAttribute("id",newFetchDivId)
    mainFetchDataSelect.appendChild(newFetchDiv);
    // Defind page and keyword
    // page = 0
    keywordDiv = document.querySelector("#keyword");
    keyword = keywordDiv.value;

    // If no Data
    console.log("page",page)
    console.log("RR",TPC_attraction_information.length)
    if (Object.keys(TPC_attraction_information).length == 0){
        let mainFetchDataSelect = document.querySelector("#mainFetchData");
        let noData = document.createElement("div");
        let noDataId="fetchData"    
        noData.setAttribute("id",noDataId)
        mainFetchDataSelect.appendChild(noData);

        let newDiv_name=document.createElement("div");        
        newDiv_name.id = "fetchData";
        newDiv_name.className = "imageTextName";
        let textNode_name = document.createTextNode("No Data")
        newDiv_name.appendChild(textNode_name);
        document.getElementById(newDiv_name.id).appendChild(newDiv_name);
        console.log("check1")        
    }
    // fetchAndCreatData(); 
    console.log("check2")
}

// IntersectionObserver
let target = document.querySelector("footer");
ccount = 0
let callback = (entries) => {
    console.log("count0",ccount)
    for (const entry of entries) 
    {
        // ccount+=1
        // console.log("count1",ccount)
      // Load more
      if (entry.isIntersecting) {
        console.log("count2",ccount)
        if (page != null) {
            fetchAndCreatData(); 
            // console.log("HERE5",page)                   
        } 
        else {
          observer.observe(target);            
        //   console.log("HERE6",page)            
        }
      }
    }
    // console.log("Done")
}

let options={
    rootMargin: '0px',
    threshold: 0,
}
let observer = new IntersectionObserver(callback, options);
observer.observe(target);

function pageReturn0(){
    page=0
    console.log("page",page)
}
