// load phones from api
document.getElementById('search-button').addEventListener('click', () => {
    const searchField = document.getElementById('search-phone');
    const searchText = searchField.value;
    searchField.value = '';
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res => res.json())
        .then(data => displayPhone(data.data))
})

// display phones by searching

const displayPhone = data => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = "";
    document.getElementById('display-details').textContent = "";
    if (data.length === 0) {
        alert('Stock Out!');
    }
    else {
        data.slice(0, 20).forEach(element => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100 rounded-3 mt-3 ms-3 me-3">
                    <img src="${element.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${element.phone_name}</h5>
                        <p class="card-text">${element.brand}</p>
                    </div>
                    <button id = 'details-button' onclick="showPhoneDetails('${element.slug}')">Details</button>
            </div>
            `;
            searchResult.appendChild(div);
        });
    }
}

// load phone details

const showPhoneDetails = phoneId => {
    fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data))
}

// dislay phone details


const displayPhoneDetails = phoneId => {
    const phoneDetails = document.getElementById('display-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('col');
    if (!phoneId.others) {
        alert("Full features are not available for this device");
    }
    else {
        div.innerHTML = `
        <div class="card h-100">
                <img src="${phoneId.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Model: ${phoneId.name}</h5>
                    <h5 class="card-title">Release Date: ${phoneId.releaseDate ? phoneId.releaseDate : "Not Available"}</h5>
                    <h5 class="card-text">Storage: ${phoneId.mainFeatures.storage}</h5>
                    <h5 class="card-text">Display Size: ${phoneId.mainFeatures.displaySize}</h5>
                    <h5 class="card-text">ChipSet: ${phoneId.mainFeatures.chipSet}</h5>
                    <h5 class="card-text">Memory: ${phoneId.mainFeatures.memory}</h5>
                    <h5 class="card-text">Sensors: ${phoneId.mainFeatures.sensors ? phoneId.mainFeatures.sensors : "No Sensors"}</h5>
                    <h5 class="card-text">WLAN: ${phoneId.others.WLAN}</h5>
                    <h5 class="card-text">Bluetooth: ${phoneId.others.Bluetooth}</h5>
                    <h5 class="card-text">GPS: ${phoneId.others.GPS}</h5>
                    <h5 class="card-text">NFC: ${phoneId.others.NFC}</h5>
                    <h5 class="card-text">Radio: ${phoneId.others.Radio}</h5>
                    <h5 class="card-text">USB: ${phoneId.others.USB}</h5>
                    <h5 class="card-text">Brand Name: ${phoneId.brand}</h5>
                </div>
        </div>
        `;
        phoneDetails.appendChild(div);
    }
}