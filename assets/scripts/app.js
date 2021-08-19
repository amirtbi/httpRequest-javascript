//variables
const listElement = document.querySelector(".posts");
const postElement = document.getElementById("single-post");
const fetchButton = document.querySelector("#available-posts button");
const form = document.querySelector("#new-post form");
//define httprequest object


//define sendingRequest function

function sendingHttpRequest(method,url,data){
    const xhr = new XMLHttpRequest();
    const promise = new Promise((resolve,reject)=>{
        xhr.open(method,url);
        xhr.responseType = "json";
        xhr.onload = function(){
            resolve(xhr.response);
        };
        //seding request to server
        xhr.send(JSON.stringify(data));
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

async function createPost(title,content){
    //sendingHttpRequst
    
    const userId = Math.random();
    const post = {
        title:title,
        body:content,
        userId:userId,
        
    }
     await sendingHttpRequest("POST","https://jsonplaceholder.typicode.com/posts",post);

}

fetchButton.addEventListener("click",fetchData);

//sending dummyData to server
form.addEventListener("submit",event=>{
    event.preventDefault();
    
    const enteredTitle = event.currentTarget.querySelector("#title").value;
    const enteredContent = event.currentTarget.querySelector("#content").value;
    createPost(enteredTitle,enteredContent);
})



