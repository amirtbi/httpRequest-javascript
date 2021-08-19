//variables
const listElement = document.querySelector(".posts");
const postElement = document.getElementById("single-post");
const fetchButton = document.querySelector("#available-posts button");
const form = document.querySelector("#new-post form");
const postList = document.querySelector("ul");
//define httprequest object


const xhr = new XMLHttpRequest();
//define sendingRequest function

function sendingHttpRequest(method,url,data){
    const promise = new Promise((resolve,reject)=>{
        xhr.open(method,url);
        xhr.responseType = "json";
        
        xhr.onload = function(){
            if(xhr.status >=200 && xhr.status<300){

                resolve(xhr.response);
            }else{
                reject(new Error("something went wrong!.."));
            }
        };
        xhr.onerror = function(){
            reject(new Error("Failed to send request !"));
        }
        //seding request to server
        xhr.send(JSON.stringify(data));
    });
    return promise;
}

//defining fetch data function
async function fetchData(){
    try{
        const responseData = await sendingHttpRequest("GET",'https://jsonplaceholder.typicode.com/post');
         const listOfPosts = responseData;
        for(const post of listOfPosts){
            //import template
            const postEl = document.importNode(postElement.content,true);
            postEl.querySelector("h2").textContent = post.title.toUpperCase();
            postEl.querySelector("p").textContent = post.body;
            postEl.querySelector("li").id = post.id;
            //append data to ul list element
            listElement.append(postEl);
        }
    }
    catch(error){
        alert(error.message);
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
//fetch data after occuring click Listener
fetchButton.addEventListener("click",fetchData);

//sending dummyData to server
form.addEventListener("submit",event=>{
    event.preventDefault();
    //user input data
    const enteredTitle = event.currentTarget.querySelector("#title").value;
    const enteredContent = event.currentTarget.querySelector("#content").value;
    createPost(enteredTitle,enteredContent);
})


postList.addEventListener("click",event=>{
    if(event.target.tagName==="BUTTON"){
        const postId = event.target.closest("li").id;
        sendingHttpRequest("DELETE",`https://jsonplaceholder.typicode.com/posts/${postId}`)
    }
})