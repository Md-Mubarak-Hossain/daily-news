/*.................................

load news in title or navigation

...................................
*/


const loadNewsTitle = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsTitle(data.data);
}

const displayNewsTitle = newsType => {

    loadSpiner(true);
    const newsCategory = newsType.news_category;
    const newsTitleContainer = document.getElementById('news-title-container');
    newsCategory.forEach(newsHeading => {
        // inputField.value = newsHeading.length;
        const newsTitleDiv = document.createElement('div');
        newsTitleDiv.classList.add('d-flex');
        newsTitleDiv.innerHTML = `
        <button class="btn btn-outline-primary btn-white me-1 border-0" onclick="loadNews('${newsHeading.category_id}')">${newsHeading.category_name}</button>
        `;
        newsTitleContainer.appendChild(newsTitleDiv);
    })
    loadSpiner(false);
}

loadNewsTitle();

/*
..............................

loadNews in card

.............................
*/


const loadNews = async (category_id) => {
    loadSpiner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);
}

const displayNews = (newsDetail) => {
    const newsCard = document.getElementById('news-card');
    const inputField = document.getElementById('input-field');
    inputField.value = newsDetail.length + ' items found this category news.';
    console.log(inputField.value);
    newsCard.innerText = '';
    console.log(newsDetail);


    // sorting


    newsDetail.sort((a, b) => parseFloat(b.total_view || 0) - parseFloat(a.total_view || 0));

    newsDetail.forEach(eachNews => {
        console.log(eachNews);

        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card');
        newsDiv.classList.add('mb-3');
        newsDiv.classList.add('rounded-5');
        newsDiv.innerHTML = `   
        <div onclick="loadNewsDetails('${eachNews.title}','${eachNews.author.name}')" class="row ">
        <div  class="col-md-4 p-5">
        <img height=200px; src="${eachNews.thumbnail_url}" class="img-fluid rounded-start " alt="...">
        </div>
        <div class="col-md-8">
        <div class="card-body py-5">
        <h3 class="card-title">${eachNews.title}</h3>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p class="card-text">
        
        <div class="text-muted d-flex justify-content-between pt-5 mt-5">
        <div class="d-flex">
        <img height=45px; class="rounded-circle mx-2" src="${eachNews.author.img}">
        <div style="height:40px">
        <p style="height:50%; margin:0 2px" class="fw-bold text-dark">${eachNews.author.name}</p>
        <p style="height:50%; margin:0 2px">${eachNews.author.published_date}
        </p>
        </div>
        </div> 
        <div class="d-flex">
        <img height=25px; src="images/view-1.png">
        <strong class="px-2">${eachNews.total_view}</strong>
        </div> 
        <div class="d-flex text-muted">
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star-half-stroke"></i>
        <strong class="px-2">${eachNews.rating.number}</strong>
        </div> 
        <div class="px-2 text-primary fs-2 me-3 px-3">
        <strong>&rarr;</strong>
        </div> 
        </div>
        </p>
        </div>
        </div>
        </div>
        `;
        newsCard.appendChild(newsDiv);
    })
    loadSpiner(false);
}
/*
...........................................

modal
..........................................
// */
const loadNewsDetails = (detailes, detailes2) => {
    console.log(detailes);
    const newsDetailsContainer = document.getElementById('modal-body');
    newsDetailsContainer.innerHTML = `<p>${detailes}</p>
    <p>${detailes2}</p>`;
}

/*
...............................

load spinner function

................................
*/
const loadSpiner = (isLoading) => {

    const loadingSpin = document.getElementById('loader');
    if (isLoading) {
        loadingSpin.classList.remove('d-none');
    }
    else {
        loadingSpin.classList.add('d-none');
    }
}