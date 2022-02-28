document.getElementById('search-button').addEventListener('click', () => {
    const searchField = document.getElementById('search-phone');
    const searchText = searchField.value;
    searchField.value = '';
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res => res.json())
        .then(data => displayPhone(data.data))
})

const displayPhone = data => {
    const searchResult = document.getElementById('search-result');
    data.forEach(element => {
        console.log(element);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
                <img src="${element.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.</p>
                </div>
                <button>Details</button>
        </div>
        `;
        searchResult.appendChild(div);
    });
}