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
                    <h5 class="card-title">${element.phone_name}</h5>
                    <p class="card-text">${element.brand}</p>
                </div>
                <button>Details</button>
        </div>
        `;
        searchResult.appendChild(div);
    });
}