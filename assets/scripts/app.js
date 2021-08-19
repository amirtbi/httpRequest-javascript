//variables
const listElement = document.querySelector(".posts");
const postElement = document.getElementById("single-post");
const fetchButton = document.querySelector("#available-posts button");
const form = document.querySelector("#new-post form");
const postList = document.querySelector("ul");
//define httprequest object

const xhr = new XMLHttpRequest();

function sendingHttpReqeust(method, url, data) {
  const promise = new Promise((resolve, reject) => {
    xhr.open(method, url);
    xhr.responseType = "json";
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject(new Error("Something went wrong!"));
      }
    };
    xhr.onerror = function () {
      reject(new Error("Sending request Failed!. trye again"));
    };
    xhr.send(JSON.stringify(data));
  });
  return promise;
}

async function fetchData() {
  try {
    const responseData = await sendingHttpReqeust(
      "GET",
      "https://jsonplaceholder.typicode.com/posts"
    );
    const listOFPosts = responseData;
    for (const post of listOFPosts) {
      const postEl = document.importNode(postElement.content, true);
      postEl.querySelector("h2").textContent = post.title.toUpperCase();
      postEl.querySelector("p").textContent = post.body;
      postEl.querySelector("li").id = post.id;

      listElement.append(postEl);
    }
  } catch (error) {
    alert(error.message);
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
  const post = {
    userId: userId,
    title: enteredTitle,
    body: enteredContent,
  };
  sendingHttpReqeust(
    "POST",
    "https://jsonplaceholder.typicode.com/posts",
    post
  );
}

let Validitiy = "pending" //user input validity
const cautionMessage = document.querySelectorAll(".caution-message");
const userInputs = document.querySelectorAll("input");
form.addEventListener("submit", (event) => {
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
    sendingHttpReqeust(
      "DELETE",
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
  }
}
postList.addEventListener("click", (event) => {
  deletePost(event);
});
