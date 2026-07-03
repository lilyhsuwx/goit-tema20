import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

let instance = null;

const URL = "https://pixabay.com/api/";
const API_KEY = "56145635-1dfedf23379adae5fa585b845";

let search = "";
let limit = 12;
let page = 1;
let per_page = 20;

const formEl = document.querySelector(".search-form");
const galeryEl = document.querySelector(".gallery");
const divEl = document.querySelector(".element")


// fetch(`${URL}?key=${API_KEY}&q=${search}&page=${page}&per_page=${per_page}`)
// .then(res => res.json())
// .then(res => console.log(res))

async function getImages(search, page) {
    const res = await fetch(`${URL}?key=${API_KEY}&q=${search}&page=${page}&per_page=${limit}`,);

    const data = await res.json();
    return data;
}

formEl.addEventListener("submit", async(e) => {

    e.preventDefault();
    search = e.currentTarget.elements.query.value;
    
    const res = await getImages(search, page);
    // console.log(getImages(search, page));
    
    await renderImages(res.hits)


})


// Тобі цікаві такі властивості:

// webformatURL - посилання на маленьке зображення для списку карток
// largeImageURL - посилання на велике зображення (дивись пункт 'додатково')
// likes - кількість лайків
// views - кількість переглядів
// comments - кількість коментарів
// downloads - кількість завантажень


function renderImages(array) {

        const item = array.map(({webformatURL, largeImageURL, likes, views, comments, downloads, tags}) => {
            return `    
                <li class="photo-card">

  <img src="${webformatURL}" alt="${tags}" data-src="${largeImageURL}"/>



  <div class="stats">

    <p class="stats-item">

      <i class="material-icons">thumb_up</i>

      ${likes}

    </p>

    <p class="stats-item">

      <i class="material-icons">visibility</i>

      ${views}

    </p>

    <p class="stats-item">

      <i class="material-icons">comment</i>

      ${comments}

    </p>

    <p class="stats-item">

      <i class="material-icons">cloud_download</i>

      ${downloads}

    </p>

  </div>

</li>`
    }).join("");

    galeryEl.insertAdjacentHTML("beforeend", item)
}


const observer = new IntersectionObserver((entry) => {

    // console.log(entry);
    
    entry.forEach(async (e) => {
        
        if(e.isIntersecting && search !== ""){
            page += 1;
            const res = await getImages(search, page);
    
            await renderImages(res.hits)
        }

    })

}, {
    rootMargin: "200px"
})

observer.observe(divEl);


galeryEl.addEventListener("click", (e) => {


  if (e.target.nodeName !== "IMG") {
    return
  };

  // console.log(e.target.dataset.src);

  const largeImg = e.target.dataset.src;

  instance = basicLightbox.create(`
    <div class="modal">
       <img src="${largeImg}" alt="#"/>
    </div>
  `)

  instance.show()


if(instance) {

  document.addEventListener("keydown", closeModal);

}
  

});

if (!instance) {
  document.removeEventListener("keydown", closeModal)
}

function closeModal(e) {

      if (e.key === "Escape") {
      instance.close();
      instance = null;
      
    }

}
