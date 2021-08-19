//variables
const listElement = document.querySelector(".posts");
const postElement = document.getElementById("single-post");

//define httprequest object


//define sendingRequest function

function sendingHttpRequest(method,url){
    const xhr = new XMLHttpRequest();
    const promise = new Promise((resolve,reject)=>{
        xhr.open(method,url);
        xhr.responseType = "json";
        xhr.onload = function(){
            resolve(xhr.response);
        };
        //seding request to server
        xhr.send();
    });
    return promise;
}

//defining fetch data function
async function fetchData(){
    const responseData = await sendingHttpRequest("GET",'https://jsonplaceholder.typicode.com/posts');
    const listOfPosts = responseData;
    for(const post of listOfPosts){
        //import template
        const postEl = document.importNode(postElement.content,true);
        postEl.querySelector("h2").textContent = post.title.toUpperCase();
        postEl.querySelector("p").textContent = post.body;
        //append data to ul list element
        listElement.append(postEl);
    }
}


fetchData();