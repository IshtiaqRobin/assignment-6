const lodeAllNews = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/news/categories");
    const data = await response.json();
    return data.data.news_category
}

const setAllmenu = async () => {
    lodeAllNews();

    const data = await lodeAllNews();

    const menu = document.getElementById('all-menu');

    for (const news of data) {
        const li = document.createElement("li");
        li.innerHTML = `<a onclick="updateNews(${news.category_id})" >${news.category_name}</a>
        
        `;
        menu.appendChild(li);
        li.classList.add("mr-16")
    }
}



// lodeAllNews();

const updateNews = (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayPost(data.data));
};

// dynamic cetagory button click
const displayPost = updates => {
    // console.log(updates);

    const updateNewsContainer = document.getElementById('new-news');
    updateNewsContainer.textContent = ``;

    updates.forEach(newNews => {
        // console.log(newNews);
        const newNewsDiv = document.createElement('div');
        const details = newNews.details;
        newNewsDiv.innerHTML = `
        
        <div class="card card-side bg-base-100 shadow-xl mb-2.5">
                    <img src="${newNews.thumbnail_url}"/>
                <div class="card-body">
                    <h2 class="card-title font-bold text-2xl">${newNews.title}</h2>
                    <P>${details.length > 500 ? details.slice(0, 500) + '...' : details}</p>

                    <div class="flex avatar">
                <div class="w-10" rounded-full">
                    <img class="w-10 rounded-full" src="${newNews.image_url}"/>
                </div>
                    <p class="font-black ml-2">${newNews.author.name}</p>
                    <p class="font-black"><i class="fa-regular fa-eye"></i> ${newNews.total_view ? newNews.total_view : 'No Viwe founded'}M</p>
                    <label for="my-modal" onclick="showModal('${newNews._id}')" class="btn modal-button">Details</label>
                </div >
            </div >
        </div >
                `;
        updateNewsContainer.appendChild(newNewsDiv);
    });
    document.getElementById('dynamic-num').innerText = updates.length ? updates.length : 'No news founded'
}

const modalDisplay = (views) => {
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <figure><img class="object-cover h-80 w-96" src="${views.thumbnail_url}" /></figure>
    <h2 class="card-title">${views.title}</h2>
    <p>publich-date : ${views.author.published_date ? views.author.published_date : 'no published date'}</p>
    `;
}

setAllmenu();

// const toggleSpinner = isLoading => {
//     const loaderSection = document.getElementById('loader');
//     if (isLoading) {
//         loaderSection.classList.remove('hidden');
//     }
//     else {
//         loaderSection.classList.add('hidden');
//     }
// }