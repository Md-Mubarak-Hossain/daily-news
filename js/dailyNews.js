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

        const newsTitleDiv = document.createElement('div');
        newsTitleDiv.classList.add('d-flex');
        newsTitleDiv.innerHTML = `
        <button class="btn btn-outline-secondary btn-white me-1 border-0" onclick="loadNews('${newsHeading.category_id}','${newsHeading.category_name}')">${newsHeading.category_name}</button>
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


const loadNews = async (category_id, newsCategoryName) => {
    loadSpiner(true);
    try {
        const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
        const res = await fetch(url);
        const data = await res.json();
        displayNews(data.data, newsCategoryName);
    }
    catch {
        return 'not found';
    }
}

const displayNews = (newsDetail, newsCategoryName) => {
    const newsCard = document.getElementById('news-card');
    const inputField = document.getElementById('input-field');
    inputField.value = `${newsDetail.length} items found for category ${newsCategoryName}`;

    newsCard.innerText = '';
    console.log(newsDetail);
    const noData = document.getElementById('no-data');
    if (newsDetail.length === 0) {
        noData.classList.remove('d-none');

    }
    else {
        noData.classList.add('d-none');
    }
    // sorting
    newsDetail.sort((a, b) => parseFloat(b.total_view || 0) - parseFloat(a.total_view || 0));
    newsDetail.forEach(eachNews => {
        console.log(eachNews);
        const newsDiv = document.createElement('div');
        // newsDiv.classList.add('card');
        newsDiv.classList.add('mb-3');
        newsDiv.classList.add('rounded-2');
        newsDiv.classList.add('d-none');
        if (`${eachNews.author.name}` === "null" || `${eachNews.total_view}` === "null") {
            console.log('null');
            const newsDiv2 = document.createElement('div');
            // newsDiv2.classList.add('card');
            newsDiv2.classList.add('mb-3');
            newsDiv2.classList.add('py-5');
            newsDiv2.classList.add('text-center');
            newsDiv2.classList.add('fw-bold');
            newsDiv2.classList.add('fs-3');
            newsDiv2.classList.add('text-danger');

            newsDiv2.classList.add('rounded-2');

            newsDiv2.innerHTML = `<p>No data available</p>`;
            newsCard.appendChild(newsDiv2); ''
        }
        else {
            newsDiv.classList.remove('d-none');
            newsDiv.innerHTML = `   
    <div onclick="loadNewsDetails('${eachNews.title}','${eachNews.author.name}','${eachNews.details.slice(0, 400)}')"
    class="row ">
    <div class="col-md-4 p-5">
        <img height=200px; src="${eachNews.thumbnail_url}" class="img-fluid rounded-start " alt="...">
    </div>
    <div class="col-md-8">
        <div class="card-body py-5">
            <h3 class="card-title">${eachNews.title}</h3>
            <p class="card-text">${eachNews.details.slice(0, 300)}<strong data-bs-toggle="tooltip"
                    data-bs-placement="top" data-bs-title="Tooltip on top" title="more read click">
                    ...
                </strong>
            </p>

            <div class="text-muted d-md-flex d-lg-flex text-justify justify-content-between pt-md-5 mt-md-5">
                <div class="d-flex">
                    <img height=45px; class="rounded-circle mx-2" src="${eachNews.author.img}">
                    <div style="height:40px">
                        <p style="height:50%; margin:0 2px" class="fw-bold text-dark">${eachNews.author.name}</p>
                        <p style="height:50%; margin:0 2px">${eachNews.author.published_date}
                        </p>
                    </div>
                </div>
                <div class="d-flex py-3">
                    <img height=25px; src="images/view-1.png" class="rounded-circle">
                    <strong class="px-md-2 ">${eachNews.total_view}</strong>
                </div>
                <div class="d-flex text-muted">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star-half-stroke"></i>
                    <strong class="px-2">${eachNews.rating.number}</strong>
                </div>
                <div class="px-2 text-primary fs-2 me-3 px-3 d-none d-md-block d-lg-block">
                    <strong>&rarr;</strong>
                </div>
            </div>
        </div>
    </div>
</div>
    `;
            newsCard.appendChild(newsDiv);

        }

    })
    loadSpiner(false);
}
/*
...........................................

modal
..........................................
// */
const loadNewsDetails = (title, author, details) => {
    const newsDetailsContainer = document.getElementById('modal-body');
    newsDetailsContainer.innerHTML = `<h4>${title}</h4>
    <p class="text-muted">${author}</p>
        <p class="secondary" > ${details}</p > `
        ;
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

loadNews('05', "Entertainment");