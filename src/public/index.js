const createNewPear = (pimage, ptitle, pdescription, pauthor) => {
    const pearContent = {
        image: pimage,
        title: ptitle,
        description: pdescription,
        author: pauthor,
        rating: Math.floor(Math.random() * 1500) / 100
    };
    return pearHTML = Handlebars.templates.pear(pearContent);

};

const showPearModal = () => {
    document.getElementById("create-pear-modal").classList.remove("hidden");
    document.getElementById("modal-backdrop").classList.remove("hidden");
};

const hidePearModal = () => {
    const inputs = document.getElementsByClassName("pear-input-element");
    for (ii = 0; ii < inputs.length; ii++) {
        const content = inputs[ii].querySelector('input, textarea');
        content.value = '';
    }

    document.getElementById("create-pear-modal").classList.add("hidden");
    document.getElementById("modal-backdrop").classList.add("hidden");
};

const postPear = async () => {
    const image = document.getElementById('pear-image-input').value;
    const title = document.getElementById('pear-title-input').value;
    const description = document.getElementById('pear-description-input').value;
    const newPearAttributes = {
        image: image,
        title: title,
        description: description
    };
    const options = {
        method: 'POST',
        body: JSON.stringify(newPearAttributes),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    hidePearModal();
    const result = await fetch('/createPear', options).catch((err) => {
        console.log(err);
    });
    if (result.status === 401) {
        // todo: user not logged in
    }
};

const showLoginModal = () => {
    document.getElementById("login-modal").classList.remove("hidden");
    document.getElementById("modal-backdrop").classList.remove("hidden");
};

const hideLoginModal = () => {
    const inputs = document.getElementsByClassName("login-input-element");

    for (ii = 0; ii < inputs.length; ii++) {
        const content = inputs[ii].querySelector('input, textarea');
        content.value = '';
    }

    document.getElementById("login-modal").classList.add("hidden");
    document.getElementById("modal-backdrop").classList.add("hidden");
};

const login = async () => {
    const username = document.getElementById('username-input').value;
    const password = document.getElementById('password-input').value;
    const userInfo = {
        username: username,
        password: password
    };
    const options = {
        method: 'POST',
        body: JSON.stringify(userInfo),
        headers: {'Content-Type': 'application/json'}
    };
    const response = await fetch('/login', options).catch((err) => {
        console.log(err);
    });
    if (response.status === 401) {
        // todo: authentication failed (incorrect username or password)
    }
    hideLoginModal();
};

const createAccount = () => { // todo: use login() as example of how to do this

};

const search = () => {
    const query = document.getElementById("navbar-search-input").value;
    document.getElementById("navbar-search-input").value = '';
    window.location.replace(`/?search=${query}`);
};

const showRatingModal = () => {
    document.getElementById("rating-modal").classList.remove("hidden");
    document.getElementById("modal-backdrop").classList.remove("hidden");
};

const hideRatingModal = () => {
    document.getElementById("rating-modal").classList.add("hidden");
    document.getElementById("modal-backdrop").classList.add("hidden");
};

const postRating = async () => {
    const newRating = {
        PID: window.location.pathname.split('/')[2],
        rating: document.getElementById('pear-rating').value,
    };
    const options = {
        method: 'POST',
        body: JSON.stringify(newRating),
        headers: {'Content-Type': 'application/json'}
    };
    const response = await fetch('/ratePear', options).catch((err) => {
        console.log(err);
    });
    if (response.status === 401) {
        // todo: do something because user is not authenticated
    }
    if (response.status === 201) {
        hideRatingModal();
        window.location.reload();
    }
};

const showReportModal = () => {
    document.getElementById("report-modal").classList.remove("hidden");
    document.getElementById("modal-backdrop").classList.remove("hidden");
};

const hideReportModal = () => {
    document.getElementById("report-modal").classList.add("hidden");
    document.getElementById("modal-backdrop").classList.add("hidden");
};

const postReport = async () => {
    const newReport = {
        PID: window.location.pathname.split('/')[2],
        description: document.getElementById('report-reason').value,
    };
    const options = {
        method: 'POST',
        body: JSON.stringify(newReport),
        headers: {'Content-Type': 'application/json'}
    };
    const response = await fetch('/reportPear', options).catch((err) => {
        console.log(err);
    });
    if (response.status === 201) {
        alert("Report submitted! Thank you for keeping PearScale safe from bad pears.");
        hideReportModal();
    } else {
        // something went wrong
    }

    // todo: give some sort of visual confirmation that response was received, i.e. response.status = 201
};

const showDeleteModal = () => {
    document.getElementById("delete-modal").classList.remove("hidden");
    document.getElementById("modal-backdrop").classList.remove("hidden");
};

const hideDeleteModal = () => {
    document.getElementById("delete-modal").classList.add("hidden");
    document.getElementById("modal-backdrop").classList.add("hidden");
};

const deletePear = async () => {
    let confirmed = false;
    if (confirm('Are you sure you want to delete this pear? This action cannot be undone')){
        if (confirm("pls don't go :(")){
            if (confirm("I don't know if you're thinking this one through all the way.")){
                if (confirm('Fine then. Be that way.')){
                    confirmed = true;
                }
            }
        }
    }
    if (confirmed) {
        const deleteInfo = {PID: window.location.pathname.split('/')[2]};
        const options = {
            method: 'POST',
            body: JSON.stringify(deleteInfo),
            headers: {'Content-Type': 'application/json'},
        };
        const response = await fetch('/deletePear', options).catch((err) => console.log(err));
        const {status} = response;
        if (status === 200) {
            alert('Pear has been deleted');
            window.location.replace('/');
        } else if (status === 401) {
            console.log('You are unauthorized. GTFO')
            // probably do nothing if unauthorized, bc delete button shouldn't even be visible is user is logged in
        } else if (status === 500) {
            alert('An error occurred when attempting to delete this pear. Try again later');
        }
    }
    hideDeleteModal();
};

//When DOM is loaded do all this stuff
window.addEventListener('DOMContentLoaded', function () {

    //set active navlink
    const navlinks = document.getElementsByClassName("navitem navlink");
    for(ii = 0; ii < navlinks.length; ii++) {
        if(navlinks[ii].firstChild.pathname === window.location.pathname) {
            navlinks[ii].classList.value="navitem navlink active";
            break;
        }
    }

    //only add event listeners if button is loaded
    if (document.getElementById("rate-pear-button")) {
        document.getElementById("rate-pear-button").addEventListener('click', showRatingModal);
        document.getElementById("rating-cancel-button").addEventListener('click', hideRatingModal);
        document.getElementById("rating-accept-button").addEventListener('click', postRating);
        document.getElementById("rating-close-button").addEventListener('click', hideRatingModal);
    }

    if (document.getElementById("report-pear-button")) {
        document.getElementById("report-pear-button").addEventListener('click', showReportModal);
        document.getElementById("report-cancel-button").addEventListener('click', hideReportModal);
        document.getElementById("report-accept-button").addEventListener('click', postReport);
        document.getElementById("report-close-button").addEventListener('click', hideReportModal);
    }

    if (document.getElementById("delete-pear-button")) {
        document.getElementById("delete-pear-button").addEventListener('click', showDeleteModal);
        document.getElementById("delete-cancel-button").addEventListener('click', hideDeleteModal);
        document.getElementById("delete-accept-button").addEventListener('click', deletePear);
        document.getElementById("delete-close-button").addEventListener('click', hideDeleteModal);
    }

    if (document.getElementById("create-pear-button")) {
        document.getElementById("create-pear-button").addEventListener('click', showPearModal);
        document.getElementById("pear-cancel-button").addEventListener('click', hidePearModal);
        document.getElementById("pear-accept-button").addEventListener('click', postPear);
        document.getElementById("pear-close-button").addEventListener('click', hidePearModal);
    }

    //these elements are always loaded so if statement is not needed
    document.getElementById("login-button").addEventListener('click', showLoginModal);
    document.getElementById("login-cancel-button").addEventListener('click', hideLoginModal);
    document.getElementById("login-login-button").addEventListener('click', login);
    document.getElementById("login-close-button").addEventListener('click', hideLoginModal);
    document.getElementById("navbar-search-button").addEventListener('click', search);

});
