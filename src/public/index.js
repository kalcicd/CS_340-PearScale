const showPearModal = () => {
    document.getElementById("create-pear-modal").classList.remove("hidden");
    document.getElementById("modal-backdrop").classList.remove("hidden");
};

const hidePearModal = () => {
    clearInputs();
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
    clearInputs();
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

const logout = async () => {
    const username = document.getElementById('username-input').value;
    const userInfo = {
        username: username
    };
    const options = {
        method: 'POST',
        body: JSON.stringify(userInfo),
        headers: {'Content-Type': 'application/json'}
    };
    const response = await fetch('/logout', options).catch((err) => {
        console.log(err);
    });
    if (response.status === 401) {
        // todo: authentication failed (incorrect username or password)
    } else {
        
    }
}

const showCreateAccountModal = () => {
    hideLoginModal();
    document.getElementById("create-account-modal").classList.remove("hidden");
    document.getElementById("modal-backdrop").classList.remove("hidden");
};

const hideCreateAccountModal = () => {
    clearInputs();
    document.getElementById("create-account-modal").classList.add("hidden");
    document.getElementById("modal-backdrop").classList.add("hidden");
};

const createAccount = async () => {
    const username = document.getElementById('ca-username-input').value;
    const password = document.getElementById('ca-password-input').value;
    const email = document.getElementById('ca-email-input').value;
    const birthday = document.getElementById('ca-birthday-input').value;
    console.log("===Birthday:" + birthday);
    if(password != document.getElementById('ca-password-confirm-input').value) {
        console.log("passwords do not match");
        //todo: dont allow this
    }
    const userInfo = {
        username: username,
        password: password,
        email: email,
        birthday: birthday
    };

    const options = {
        method: 'POST',
        body: JSON.stringify(userInfo),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const newUser = await(fetch('/createAccount', options).catch((err) => {
        console.log(err);
    }));

    if(newUser.status === 200) {
        fetch('/login', options).catch((err) => {
            console.log(err);
        });
    }

    hideCreateAccountModal();
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

const clearInputs = () => {
    const inputs = document.getElementsByClassName("modal-input-element");

    for (ii = 0; ii < inputs.length; ii++) {
        const content = inputs[ii].querySelector('input, textarea');
        content.value = '';
    }
}

window.addEventListener('DOMContentLoaded', function () {

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

    if(document.getElementById("login-button")) {
        document.getElementById("login-button").addEventListener('click', showLoginModal);
        document.getElementById("login-cancel-button").addEventListener('click', hideLoginModal);
        document.getElementById("login-login-button").addEventListener('click', login);
        document.getElementById("login-close-button").addEventListener('click', hideLoginModal);

        document.getElementById("create-account-button").addEventListener('click', showCreateAccountModal);
        document.getElementById("create-account-cancel-button").addEventListener('click', hideCreateAccountModal);
        document.getElementById("create-account-confirm-button").addEventListener('click', createAccount);
        document.getElementById("create-account-close-button").addEventListener('click', hideCreateAccountModal);
    }

    if(document.getElementById("logout-button")) {
        document.getElementById("logout-button").addEventListener('click', logout);
    }
    
    document.getElementById("navbar-search-button").addEventListener('click', search);

    

});
