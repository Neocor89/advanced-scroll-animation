const postSection = document.querySelector("#header");
const postTemplate = document.querySelector("#template__boxes");

(async () => {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const fetchData = await fetch(url);
  const jsonData = await fetchData.json();
  let i = 0;
  jsonData.forEach((getValue) => {
    const addContent = () => {
      const title = getValue.title;
      const body = getValue.body;
      fetch("https://unsplash.it/300/200")
        .then((res) => res.blob())
        .then((blob) => {
          const newPost = document.importNode(postTemplate.content, true);

          let displayName = newPost.querySelector("#box__title");

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
    };
    const watcher = document.querySelector(".box__watcher");

    const handleIntersect = (entries) => {
      if (entries[0].isIntersecting) {
        addContent();
      }
    };
    new IntersectionObserver(handleIntersect).observe(watcher);
  });
})();
