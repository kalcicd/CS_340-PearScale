const insertNewPear = (pimage, ptitle, pauthor) => {
    const newPear = document.querySelector("main.pear-container");
    const pearContent = Handlebars.templates.pear;
    const pearHTML = pearContent({image: pimage, title: ptitle, author: pauthor});
    newPear.insertAdjacentHTML('beforeend', pearHTML);
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
    console.log("TODO: this");
    hidePearModal();
};

window.addEventListener('DOMContentLoaded', function() {
    
    document.getElementById("create-pear-button").addEventListener('click', showPearModal);
    document.getElementById("modal-cancel-button").addEventListener('click', hidePearModal);
    document.getElementById("modal-accept-button").addEventListener('click', postPear);
    document.getElementsByClassName("modal-close-button")[0].addEventListener('click', hidePearModal)

});