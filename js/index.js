let siteName = document.getElementById("siteName")
let siteUrl = document.getElementById("siteUrl")
let submit = document.getElementById("submit")
let tbody = document.getElementById("tbody")

let sites =[]
if(localStorage.getItem("sites")){
    sites = JSON.parse(localStorage.getItem("sites"))
    display()
    
}
function addSite(){
    let site = {
        sName : siteName.value,
        url : siteUrl.value,
    }

    if(isValidHttpUrl(site.url)){
        sites.push(site)
        localStorage.setItem("sites",JSON.stringify(sites))
        console.log(sites);
        display()
    }
    else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Site Name or Url is not valid,",
          });
    }
    
    clearInput()
    
}

function display (){
    cartona =``
    for( let i = 0 ; i < sites.length ; i++){
        cartona +=`
            <tr>
                <th>${i+1}</th>
                <td>${sites[i].sName}</td>
                <td><a href="${sites[i].url}" target="_blank"><button class="btn btn-info" >visit</button></a></td>
                <td><button onclick="deletUrl(${i})" class="btn btn-danger" >delete</button></td>
            </tr>
        `
    }
    tbody.innerHTML=cartona
}

function clearInput(){
    siteName.value = null
    siteUrl.value = null
}



function deletUrl(i){
    sites.splice(i,1)
    localStorage.setItem("sites",JSON.stringify(sites))
    display()
}

function isValidHttpUrl(string) {
    let url;
    try {
        url = new URL(string);
    } catch (_) {
        return false;  
    }
    return url.protocol === "http:" || url.protocol === "https:";
}


