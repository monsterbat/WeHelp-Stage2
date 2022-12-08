userStatus();
let signInButton = document.getElementById("signInButton")
let signOutButton = document.getElementById("signOutButton")
let signInWindow = document.getElementById("signIn")
let signUpWindow = document.getElementById("signUp")
let signFilter = document.getElementById("signFilter")

async function userStatus(){
    let url = `/api/user/auth`
    await fetch(url,{
        method:"GET",
    }).then(function(response){
        console.log("url",url)
        return response.json();
    }).then(function(data){
        if(data.data == null || data.error == true){
            signInButton.style.display = "block"
        }
        else{
            signOutButton.style.display = "block"
        }
    })
}

async function signOut(){
    let url = `/api/user/auth`
    await fetch(url,{
        method:"DELETE",
        // body:JSON.stringify(data),
        headers:new Headers({
            "Content-Type":"application/json"
        })
    }).then(function(response){
        return response.json();
    }).then(function(data){
        console.log("data",data)
        signInButton.style.display = "block"
        signOutButton.style.display = "none"
    })
}

async function signIn(){
    console.log("into signUp")
    let signInEmail = document.getElementById("signInEmail").value;
    let signInPassword = document.getElementById("signInPassword").value;
    let signInJudge = document.getElementById("signInJudge")
    let signInSuccess = document.getElementById("signInSuccess")
    let signInFail = document.getElementById("signInFail")
    let url = `/api/user/auth`
    let data = {
        "email":signInEmail,
        "password":signInPassword
    }
    await fetch(url,{
        method:"PUT",
        body:JSON.stringify(data),
        headers:new Headers({
            "Content-Type":"application/json"
        })
    }).then(function(response){
        return response.json();
    }).then(function(data){
        if(data.ok == true){
            location.reload();
            // signInSuccess.style.display = "block"
            // signInFail.style.display = "none"
        }
        if(data.error == true){
            signInSuccess.style.display = "none"
            signInFail.style.display = "block"
        }
    })
}

async function signUp(){
    console.log("into signUp")
    let signUpName = document.getElementById("signUpName").value;
    let signUpEmail = document.getElementById("signUpEmail").value;
    let signUpPassword = document.getElementById("signUpPassword").value;
    let signUpJudge = document.getElementById("signUpJudge")
    let url = `/api/user`
    let data = {
        "name":signUpName,
        "email":signUpEmail,
        "password":signUpPassword
    }
    await fetch(url,{
        method:"POST",
        body:JSON.stringify(data),
        headers:new Headers({
            "Content-Type":"application/json"
        })
    }).then(function(response){
        return response.json();
    }).then(function(data){
        if(data.ok == true){

            console.log("1")
            signUpJudge.textContent = "註冊成功"
            // location.reload()
            console.log("2")
            // signUpJudge.appendChild(signUpJudge)
        }
        if(data.error == true){
            signUpJudge.textContent = data.message
        }
    })
    // console.log("data",data)
}

function signInBlock(){
    console.log("ins",signInWindow.style.display)
    console.log("ups",signUpWindow.style.display)
    signFilter.style.display = "block"
    signInWindow.style.display = "flex"
    signUpWindow.style.display = "none"
}
function signUpBlock(){
    console.log("ins",signInWindow.style.display)
    console.log("ups",signUpWindow.style.display)
    signFilter.style.display = "block"
    signInWindow.style.display = "none"
    signUpWindow.style.display = "flex"
}

function closeSignWindow(){
    signFilter.style.display = "none"
    signInWindow.style.display = "none"
    signUpWindow.style.display = "none"
}