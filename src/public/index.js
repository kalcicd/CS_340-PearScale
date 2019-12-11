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

const postPear = () => {
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
    fetch('/createPear', options).catch((err) => {
        console.log(err);
    });
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

const login = () => {
    const username = document.getElementById('username-input').value;
    const password = document.getElementById('password-input').value;
    const userInfo = {
        username: username,
        password: password
    };
    const options = {
        method: 'POST',
        body: JSON.stringify(userInfo),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch('/login', options).catch((err) => {
        console.log(err);
    });
    hideLoginModal();
};

const showCreateAccountModal = () => {
    hideLoginModal();
    document.getElementById("create-account-modal").classList.remove("hidden");
    document.getElementById("modal-backdrop").classList.remove("hidden");
};

const hideCreateAccountModal = () => {
    const inputs = document.getElementsByClassName("create-account-input-element");

    for (ii = 0; ii < inputs.length; ii++) {
        const content = inputs[ii].querySelector('input, textarea');
        content.value = '';
    }

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

window.addEventListener('DOMContentLoaded', function () {

    document.getElementById("create-pear-button").addEventListener('click', showPearModal);
    document.getElementById("pear-cancel-button").addEventListener('click', hidePearModal);
    document.getElementById("pear-accept-button").addEventListener('click', postPear);
    document.getElementsByClassName("pear-close-button")[0].addEventListener('click', hidePearModal);

    document.getElementById("login-button").addEventListener('click', showLoginModal);
    document.getElementById("login-cancel-button").addEventListener('click', hideLoginModal);
    document.getElementById("login-login-button").addEventListener('click', login);
    document.getElementsByClassName("login-close-button")[0].addEventListener('click', hideLoginModal);

    document.getElementById("create-account-button").addEventListener('click', showCreateAccountModal);
    document.getElementById("create-account-cancel-button").addEventListener('click', hideCreateAccountModal);
    document.getElementById("create-account-confirm-button").addEventListener('click', createAccount);
    document.getElementsByClassName("create-account-close-button")[0].addEventListener('click', hideCreateAccountModal);

    document.getElementById("navbar-search-button").addEventListener('click', search);
});
