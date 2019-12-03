const insertNewPear = (pimage, ptitle, pauthor) => {
    var newPear = document.querySelector("main.pear-container");
    var pearContent = Handlebars.templates.pear;
    var pearHTML = pearContent({image: pimage, title: ptitle, author: pauthor});
    newPear.insertAdjacentHTML('beforeend', pearHTML);
};

window.addEventListener('DOMContentLoaded', function() {
    
    document.getElementById("create-pear-button").addEventListener('click', insertNewPear);

});