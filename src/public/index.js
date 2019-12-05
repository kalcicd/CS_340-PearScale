const createNewPear = (pimage, ptitle, pauthor) => {
    // const newPear = document.querySelector("main.pear-container");
    const pearContent = {
        image: pimage,
        title: ptitle,
        author: pauthor,
        rating: Math.floor(Math.random()*1500)/100
    };
    const pearHTML = Handlebars.templates.pear(pearContent);
    //newPear.insertAdjacentHTML('beforeend', pearHTML);
    return pearHTML;
};

const getAllPears = (pears) => {
    var allPears = [];
    for(ii = 0; ii < pears.length; ii ++) {
        allPears.push(createNewPear(pears[ii].Image, pears[ii].Title, pears[ii].Username));
    }
    return allPears;
};

const showPearModal = () => {
    document.getElementById("create-pear-modal").classList.remove("hidden");
    document.getElementById("modal-backdrop").classList.remove("hidden");
};

const hidePearModal = () => {
    var inputs = document.getElementsByClassName("pear-input-element");

    for(ii = 0; ii < inputs.length; ii ++) {
        var content = inputs[ii].querySelector('input, textarea');
        content.value = '';
    }

    document.getElementById("create-pear-modal").classList.add("hidden");
    document.getElementById("modal-backdrop").classList.add("hidden");
};

const postPear = () => {
    var image = document.getElementById('pear-image-input').value;
    var title = document.getElementById('pear-title-input').value;
    //var description = document.getElementById('pear-description-input').value;
    var author = "cool guy";
    const newPear = createNewPear(image, title, author);
    const pearHTML = document.querySelector("main.pear-container");
    pearHTML.insertAdjacentHTML('beforeend', newPear);
    hidePearModal();
};

const showLoginModal = () => {
    document.getElementById("login-modal").classList.remove("hidden");
    document.getElementById("modal-backdrop").classList.remove("hidden");
};

const hideLoginModal = () => {
    var inputs = document.getElementsByClassName("login-input-element");

    for(ii = 0; ii < inputs.length; ii ++) {
        var content = inputs[ii].querySelector('input, textarea');
        content.value = '';
    }

    document.getElementById("login-modal").classList.add("hidden");
    document.getElementById("modal-backdrop").classList.add("hidden");
};

const login = () => {
    console.log("TODO: This");
    hideLoginModal();
};

const search = () => {
    const query = document.getElementById("navbar-search-input").value;
    console.log("Searching for " + query);
    document.getElementById("navbar-search-input").value = '';
};

window.addEventListener('DOMContentLoaded', function() {
    
    document.getElementById("create-pear-button").addEventListener('click', showPearModal);
    document.getElementById("pear-cancel-button").addEventListener('click', hidePearModal);
    document.getElementById("pear-accept-button").addEventListener('click', postPear);
    document.getElementsByClassName("pear-close-button")[0].addEventListener('click', hidePearModal)

    document.getElementById("login-button").addEventListener('click', showLoginModal);
    document.getElementById("login-cancel-button").addEventListener('click', hideLoginModal);
    document.getElementById("login-login-button").addEventListener('click', login);
    document.getElementsByClassName("login-close-button")[0].addEventListener('click', hideLoginModal)

    document.getElementById("navbar-search-button").addEventListener('click', search);
});