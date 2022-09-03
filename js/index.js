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
    console.log(updates);

    // start spinner or loader
    // toggleSpinner(true);
    const updateNewsContainer = document.getElementById('new-news');
    updateNewsContainer.textContent = ``;


    updates.forEach(newNews => {
        // console.log(newNews);
        const newNewsDiv = document.createElement('div');
        newNewsDiv.innerHTML = `
        <div class="card card-side bg-base-100 shadow-xl mb-2.5">
                    <img src="${newNews.thumbnail_url}"/>
                <div class="card-body">
                    <h2 class="card-title font-bold text-2xl">${newNews.title}</h2>
                    <P>${newNews.details.slice(0, 700)}</p>
                    <div class="flex avatar">
                <div class="w-10" rounded-full">
                    <img class="w-10 rounded-full" src="${newNews.image_url}"/>
                </div>
                    <p class="font-black ml-2">${newNews.author.name}</p>
                    <p class="font-black"><i class="fa-regular fa-eye"></i> ${newNews.total_view ? newNews.total_view : 'No Viwe founded'}M</p>
                    <button type="button" data-modal-toggle="defaultModal"><i class="text-xl font-bold fa-sharp fa-solid fa-arrow-right"></i></button>

                    <button
                        class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                        Toggle modal
                    </button>
                </div >
            </div >
        </div >
                `;
        updateNewsContainer.appendChild(newNewsDiv);

    });
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