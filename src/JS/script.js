const postSection = document.querySelector("#posts__boxes");
const postTemplate = document.querySelector("#template__boxes");

(async () => {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const fetchData = await fetch(url);
  const jsonData = await fetchData.json();
  let i = 0;
  jsonData.forEach((getValue) => {
    i++;
    if (i < 11) {
      const title = getValue.title;
      const body = getValue.body;
      console.log(title);
      fetch("https://unsplash.it/300/200")
        .then((res) => res.blob())
        .then((blob) => {
          const newPost = document.importNode(postTemplate.content, true);

          let displayName = newPost.querySelector("#box__title");
          console.log(displayName);
          let displayBody = newPost.getElementById("box__content");
          let displayImg = newPost.querySelector(".box__img");

          displayImg.src = URL.createObjectURL(blob);
          displayName.innerText = title;
          displayBody.innerText = body;
          postSection.appendChild(newPost);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  });
})();
