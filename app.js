titlePage = document.querySelector("h1");
search = document.querySelector(".search");
form = document.querySelector(".form");
title = document.querySelector(".title");
article = document.querySelector(".article");
submitBtn = document.querySelector(".submit");
postArea = document.querySelector(".posts-area");

editContainer = document.querySelector(".edit-container");
formEdit = document.querySelector(".formEdit");
titleEdit = document.querySelector(".titleEdit");
articleEdit = document.querySelector(".articleEdit");
submitBtnEdit = document.querySelector(".submitEdit");
cancleEdit = document.querySelector(".cancleEdit");

const defaultPost = [
  {
    title: "Yester day",
    article: "lorem sdifos saer cdfeew",
    date: new Date(),
    id: 1,
  },
  {
    title: "To day",
    article: "consectetur adipisicing elit",
    date: new Date(),
    id: 2,
  },
  {
    title: "Last night",
    article: "Lorem ipsum dolor sit amet consectetur",
    date: new Date(),
    id: 3,
  },
];

let id = defaultPost.length;

let posts = [...defaultPost];

function init(infoPost) {
  postArea.innerHTML = "";
  infoPost.forEach(addPostEle);
}

function addPostEle(post) {
  const datePost = post.date.toLocaleString();
  const postEle = document.createElement("div");
  postEle.innerHTML = `<div class="p-3 border-2 my-2 flex flex-col">
  <div class="flex justify-between">
    <h3 class="font-bold">${post.title}</h3>
    <p>${datePost}</p>
  </div>
  <p class="w-auto">${post.article}</p>
  <div class="flex place-self-end">
  <button class="bg-yellow-500 text-white rounded-sm px-2 hover:bg-yellow-600 place-self-end mr-1" onclick="showEditGetId(${post.id})">edit</button>
  <button class="bg-red-500 text-white rounded-sm px-2 hover:bg-red-600 place-self-end" onclick="removePost(${post.id})">delete</button>
  </div>
  </div>`;
  postArea.appendChild(postEle);
}

function removePost(idPost) {
  posts = posts.filter((post) => post.id !== idPost);
  init(posts);
}

function addDataPost(e) {
  e.preventDefault();
  const data = {
    title: title.value,
    article: article.value,
    date: new Date(),
    id: (id += 1),
  };
  posts = [data, ...posts];
  init(posts);
  title.value = "";
  article.value = "";
}
let idEdit;

function showEditGetId(id) {
  idEdit = id;
  editToggle();
}

function editToggle() {
  titleEdit.value = "";
  articleEdit.value = "";
  editContainer.classList.toggle("move");
}

function edit(e) {
  e.preventDefault();
  const newPost = posts.map((post) => {
    if (post.id !== idEdit) {
      return post;
    } else {
      post.title = titleEdit.value;
      post.article = articleEdit.value;
      return post;
    }
  });
  posts = [];
  posts = [...newPost];
  init(posts);
  editToggle();
  searchPost();
}

function searchPost() {
  let searchPost = posts.filter((post) =>
    post.title.toLowerCase().trim().includes(search.value.toLowerCase().trim())
  );
  init(searchPost);
}

cancleEdit.addEventListener("click", editToggle);
search.addEventListener("input", searchPost);
form.addEventListener("submit", addDataPost);
formEdit.addEventListener("submit", edit);
init(posts);
