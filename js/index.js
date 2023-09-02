// Create navbar
const navbar = document.getElementById('nav-container');
navbar.innerHTML = `
<div class="flex justify-between items-center my-7">
<img class="w-52 hidden md:block lg:block" src="image/Logo.png" alt="">
<button class="py-2 px-3 bg-gray-200 rounded font-semibold capitalize">Sort by view</button>
<button class="py-2 px-4 text-white font-semibold rounded bg-red-500 capitalize"><a href="question-answer.html" target="_blank">Blog</a></button>
</div>
<hr>
`;


// Card
const loadCategory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const allCategory = data.data;
    console.log(allCategory)
    displayLoad(allCategory)

}

const displayLoad = (category) => {
    const categoryName = document.getElementById('categoryName');
    category.forEach(singleCategory => {
        const div = document.createElement('div');
        div.innerHTML = ` <a onclick="handleLoadId('${singleCategory.category_id}')" class="py-1 px-3 bg-gray-300 rounded hover:bg-red-500 cursor-pointer hover:text-white">${singleCategory.category}</a>`;

        categoryName.appendChild(div);

    })
}


const handleLoadId = async (categoryId) => {
    const res = await fetch(` https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();
    const cardData = data.data;
    loadDataCard(cardData);
}


const loadDataCard = (card) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = '';

    if(card.length === 0){
        const noContentContainer = document.getElementById('no-content-container');
        noContentContainer.textContent = '';
        const noContent = document.createElement('div');
        noContent.classList = `flex flex-col justify-center items-center mt-9`;
        noContent.innerHTML= `
        <img class="w-24 h-24" src="image/Icon.png" alt="">
            <p class="text-center text-2xl font-bold">Oops!! Sorry, There is no <br> content here</p>
        `;
        noContentContainer.appendChild(noContent);
    }
    if(card.length > 0){
        const noContentContainer = document.getElementById('no-content-container');
        noContentContainer.textContent = '';
    }

    card.forEach(singleCard => {
        // console.log(singleCard)
        const div = document.createElement('div');
        div.classList = `w-66 card `;
        div.innerHTML = `
            <figure class="w-66 h-[150px] rounded-xl">
                  <img src="${singleCard.thumbnail}" alt="Shoes" class="rounded-xl" />
            </figure>
            <div class=" items-center">
                <div class="flex gap-5 mt-6">
                    <img class="w-16 h-16 rounded-full" src="${singleCard.authors[0].profile_picture}" alt="">
                    <div>
                        <h2 class="card-title font-bold">${singleCard.title}</h2>
                        <div class="mt-2">
                            <p>${singleCard.authors[0].profile_name}</p>
                            <span></span>
                        </div>
                        <p>${singleCard.others.views}</p>
                    </div>
                </div>
            </div>
        `;
        cardContainer.appendChild(div)
    })
}
loadCategory()
handleLoadId(1000)