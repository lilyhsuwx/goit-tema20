let e="",t=1,a=document.querySelector(".search-form"),s=document.querySelector(".gallery"),i=document.querySelector(".element");async function c(e,t){let a=await fetch(`https://pixabay.com/api/?key=56145635-1dfedf23379adae5fa585b845&q=${e}&page=${t}&per_page=12`);return await a.json()}function l(e){let t=e.map(({webformatURL:e,largeImageURL:t,likes:a,views:s,comments:i,downloads:c,tags:l})=>`    
                <li class="photo-card">

  <img src="${e}" alt="${l}" />



  <div class="stats">

    <p class="stats-item">

      <i class="material-icons">thumb_up</i>

      ${a}

    </p>

    <p class="stats-item">

      <i class="material-icons">visibility</i>

      ${s}

    </p>

    <p class="stats-item">

      <i class="material-icons">comment</i>

      ${i}

    </p>

    <p class="stats-item">

      <i class="material-icons">cloud_download</i>

      ${c}

    </p>

  </div>

</li>`).join("");s.insertAdjacentHTML("beforeend",t)}a.addEventListener("submit",async a=>{a.preventDefault(),e=a.currentTarget.elements.query.value;let s=await c(e,t);await l(s.hits)}),new IntersectionObserver(a=>{a.forEach(async a=>{if(a.isIntersecting&&""!==e){t+=1;let a=await c(e,t);await l(a.hits)}})},{rootMargin:"200px"}).observe(i);
//# sourceMappingURL=goit-tema20.7b7b02d0.js.map
