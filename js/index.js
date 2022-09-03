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
        
        `
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

const displayPost = updates => {
    console.log(updates);
    const updateNewsContainer = document.getElementById('new-news');
    updateNewsContainer.textContent = ``;
    updates.forEach(newNews => {
        console.log(newNews);
        const newNewsDiv = document.createElement('div');
        newNewsDiv.innerHTML = `
        <div class="card card-side bg-base-100 shadow-xl mb-2.5">
        <figure><img src="${newNews.thumbnail_url}" /></figure>
        <div class="card-body">
        <h2 class="card-title">The best fashion influencers to follow for sartorial inspiration</h2>
        <p>Click the button to watch on Jetflix app.</p>
        <div class="flex avatar">
        <div class="w-10" rounded-full">
        <img src="${newNews.image_url}"/>
        </div>
        <p class="text-xl font-black ml-2">${newNews.author.name}jon</p>
        <p class="font-black">${newNews.total_view ? newNews.total_view : 'no Viwe founded'}M</p>
        <button class="btn btn-outline">Button</button>
        </div >
        </div >
        </div >
                `;
        updateNewsContainer.appendChild(newNewsDiv);
    });
}


setAllmenu();