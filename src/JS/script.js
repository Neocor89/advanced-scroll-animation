const postSection = document.querySelector("#section-title");
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

const boxes = document.querySelectorAll(".box");

window.addEventListener("scroll", checkBoxes)



function checkBoxes() {
  const triggerBottom = window.innerHeight / 4 * 4;
  console.log(triggerBottom);

  boxes.forEach((box) => {
    const boxTop = box.getBoundingClientRect().top

    if(boxTop < triggerBottom) {
      box.classList.add('show')
    } else {
      box.classList.remove('show')
    }
  })
}
