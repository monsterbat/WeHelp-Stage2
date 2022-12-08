let signInButton = document.getElementById("signInButton")
let signOutButton = document.getElementById("signOutButton")
let signInWindow = document.getElementById("signIn")
let signUpWindow = document.getElementById("signUp")
let signFilter = document.getElementById("signFilter")
let signUpJudge = document.getElementById("signUpJudge")
let signInJudge = document.getElementById("signInJudge")

// Sign in or out status show
userStatus();
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
        signInButton.style.display = "block"
        signOutButton.style.display = "none"
    })
}

async function signIn(){
    console.log("into signUp")
    let signInEmail = document.getElementById("signInEmail").value;
    let signInPassword = document.getElementById("signInPassword").value;
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
            signInJudge.style.display = "block"
            signInJudge.textContent = "登入成功"
        }
        if(data.error == true){
            signInJudge.style.display = "block"
            signInJudge.textContent = "登入失敗"
        }
    })
}

async function signUp(){
    console.log("into signUp")
    let signUpName = document.getElementById("signUpName").value;
    let signUpEmail = document.getElementById("signUpEmail").value;
    let signUpPassword = document.getElementById("signUpPassword").value;    
    let url = `/api/user`
    let data = {
        "name":signUpName,
        "email":signUpEmail,
        "password":signUpPassword
    }
    // signUpJudge.style.display = "none"
    // signInJudge.style.display = "none"
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
            signUpJudge.style.display = "block"
            signUpJudge.textContent = "註冊成功"
        }
        if(data.error == true){
            signUpJudge.style.display = "block"
            signUpJudge.textContent = data.message
        }
    })
}

function signInBlock(){
    signInJudge.style.display = "none"

    signFilter.style.display = "block"

    signInWindow.style.display = "flex"
    signUpWindow.style.display = "none"
}
function signUpBlock(){
    signUpJudge.style.display = "none"

    signFilter.style.display = "block"

    signInWindow.style.display = "none"
    signUpWindow.style.display = "flex"
}

function closeSignWindow(){
    signInJudge.style.display = "none"
    signUpJudge.style.display = "none"
    signFilter.style.display = "none"
    signInWindow.style.display = "none"
    signUpWindow.style.display = "none"
}