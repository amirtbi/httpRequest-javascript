//variables
const listElement = document.querySelector(".posts");
const postElement = document.getElementById("single-post");
const fetchButton = document.querySelector("#available-posts button");
const form = document.querySelector("#new-post form");
const postList = document.querySelector("ul");
//define httprequest object

const xhr = new XMLHttpRequest();
//Error handler function
function errorHandler(response) {
  if (!response.ok) {
    throw new Error("something went wrong!");
  }
  return response;
}
function sendingHttpReqeust(method, url, data) {
  //using promise during XMLHttpRequst
  // const promise = new Promise((resolve, reject) => {
  //   xhr.open(method, url);
  //xhr.setRequestHeader('Content-type','Application/json');
  //   xhr.responseType = "json";
  //   xhr.onload = function () {
  //     if (xhr.status >= 200 && xhr.status < 300) {
  //       resolve(xhr.response);
  //     } else {
  //       reject(new Error("Something went wrong!"));
  //     }
  //   };
  //   xhr.onerror = function () {
  //     reject(new Error("Sending request Failed!. trye again"));
  //   };
  //   xhr.send(JSON.stringify(data));
  // });
  // return promise;
  //======fetchAPI=====
  //getting method
  return fetch(url, {
    method: method,
    body:data //user when data formt is json ===> JSON.stringify(data),
  })
    .then(errorHandler)
    .then((response) => {
      //returning response object
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
}

async function fetchData() {
  try {
    // const responseData = await sendingHttpReqeust(
    //   "GET",
    //   "https://jsonplaceholder.typicode.com/posts"
    // );
    const responseData = await axios.get('https://jsonplaceholder.typicode.com/posts')
    console.log(responseData);
    // const listOFPosts = responseData;
    //using axios library
    const listOFPosts = responseData.data;

    for (const post of listOFPosts) {
      const postEl = document.importNode(postElement.content, true);
      postEl.querySelector("h2").textContent = post.title.toUpperCase();
      postEl.querySelector("p").textContent = post.body;
      postEl.querySelector("li").id = post.id;

      listElement.append(postEl);
    }
  } catch (error) {
    console.log(error);
  }
}

//defining a click listner after fetch button is clicked

fetchButton.addEventListener("click", fetchData);

//sending requestt

async function createPost(event) {
  event.preventDefault();

  const enteredTitle = event.currentTarget.querySelector("#title").value;
  const enteredContent = event.currentTarget.querySelector("#content").value;
  const userId = Math.random();
  //using post while data format is json
  const post = {
    userId: userId,
    title: enteredTitle,
    body: enteredContent,
  };
  //formData format
  const fd = new FormData(form);
  // fd.append("title",title);
  // fd.append("body",enteredContent),
  fd.append("userId",userId);
  // sendingHttpReqeust(
  //   "POST",
  //   "https://jsonplaceholder.typicode.com/posts",
  //   fd
  // );
  //using axios library
  const response = await axios.post('https://jsonplaceholder.typicode.com/posts',fd);
  console.log(response)
 
} 

let Validitiy = "pending"; //user input validity
form.addEventListener("submit", (event) => {
  const cautionMessage = document.querySelectorAll(".caution-message");
  const userInputs = document.querySelectorAll("input");
  event.preventDefault();
  //user input validation
  userInputs.forEach((input, index) => {
    if (input.value === "") {
      Validitiy = "invalid";
      cautionMessage[index].style.display = "block";
    } else {
      Validitiy = "valid";
      cautionMessage[index].style.display = "none";
    }
  });
  if (Validitiy === "valid") {
    createPost(event);
  } else {
    return false;
  }
});

//deleting data
function deletePost(event) {
  if (event.target.tagName === "BUTTON") {
    const postId = event.target.closest("li").id;
    // sendingHttpReqeust(
    //   "DELETE",
    //   `https://jsonplaceholder.typicode.com/posts/${postId}`
    // );
    //using axios library
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  }
}
postList.addEventListener("click", (event) => {
  deletePost(event);
});
