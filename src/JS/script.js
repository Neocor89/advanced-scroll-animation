const postSection = document.querySelector("#section-title");
const postTemplate = document.querySelector("#template__boxes");

(async () => {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const fetchData = await fetch(url);
  const jsonData = await fetchData.json();
  let i = 0;
  jsonData.forEach((getValue) => {
    i++;
    if (i < 21) {
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
    }
  });
})();

const boxes = document.querySelector("h1");
   
const watcher = document.querySelector(".box__watcher");


const handleIntersect = entries => {
  console.log(entries);
}
const newObserver = new IntersectionObserver(handleIntersect)
newObserver.observe(watcher);

// window.addEventListener('scroll', () => {
  
//   const { scrollTop, clientHeight } = document.documentElement;
//   const topBoxes = boxs.getBoundingClientRect().top;
//   console.log(scrollTop);
//   if(scrollTop > (scrollTop + topBoxes).toFixed() - clientHeight * 0.50) {
//     boxs.classList.add('active')
//   } else {
//     boxs.classList.remove('active')
//   }
// })