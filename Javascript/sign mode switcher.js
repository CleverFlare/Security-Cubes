const signinBtn = document.querySelector('.signinBtn');
const signupBtn = document.querySelector('.signupBtn');
const switcher = document.querySelector('.switch');
const username = document.querySelector('#in .emailCont input');
const password = document.querySelector('#in .passCont input');
const submit = document.querySelector('#in .formFooter input');

const signUsername = document.querySelector('#up .emailCont input');
const signPassword = document.querySelector('#up .passCont input');
const signSubmit = document.querySelector('#up .formFooter input');

signinBtn.addEventListener('click', e => {
    e.preventDefault();
    switcher.classList.remove('signup');
})
signupBtn.addEventListener('click', e => {
    e.preventDefault();
    switcher.classList.add('signup');
})

async function login() {
    let data = {
        username: username.value,
        password: password.value
    }
    await fetch('https://securitycubes.com/api/login/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(res => {
        res.json().then(json => {
            if(json.token) {
                localStorage.setItem("token", json.token);
                location.href = localStorage.getItem('destination');
            }
            if(json.error) {
                const optionContRight = document.querySelector('#in .optionalCont .optionalContRight')
                while(document.querySelector('#in .optionalCont .optionalContRight p') !== null) {
                    optionContRight.removeChild(document.querySelector('#in .optionalCont .optionalContRight p'));
                }
                const errorDisplayer = document.createElement('p');
                errorDisplayer.innerText = 'Either the Email or the Password is incorrect';
                errorDisplayer.classList.add('errorDisplayer');
                optionContRight.appendChild(errorDisplayer);
            }
        })
    })
}

async function signup() {
    let signdata = {
        email: signUsername.value,
        first_name: '',
        last_name: '',
        password: signPassword.value,
        username: signUsername.value.split('@')[0]
    }
    await fetch('https://securitycubes.com/api/signup/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signdata)
    }).then(res => {
        res.json().then(json => {
            if(json.token) {
                localStorage.setItem("token", json.token);
                location.reload();
            }
            console.log(json);
            if(json.error) {
                const optionContRight = document.querySelector('#up .optionalCont .optionalContRight')
                while(document.querySelector('#up .optionalCont .optionalContRight p') !== null) {
                    optionContRight.removeChild(document.querySelector('#up .optionalCont .optionalContRight p'));
                }
                const errorDisplayer = document.createElement('p');
                errorDisplayer.innerText = `Failed! seems like we\'ve ran into an Error: ${json.error}`;
                errorDisplayer.classList.add('errorDisplayer');
                optionContRight.appendChild(errorDisplayer);
            } else {
                const optionContRight = document.querySelector('#up .optionalCont .optionalContRight')
                const errorDisplayer = document.createElement('p');
                errorDisplayer.innerText = 'You\'ve successfully signed up';
                errorDisplayer.classList.add('successDisplayer');
                optionContRight.appendChild(errorDisplayer);
            }
        })
    })
}

signSubmit.addEventListener('click', e => {
    e.preventDefault();
    signup();
})

submit.addEventListener('click', e => {
    e.preventDefault();
    login()
})