login = document.getElementById('login')
login_form = document.getElementById('login-form')

login.onclick = () => {
    if (login_form.style.display != 'block'){
        login_form.style.display = 'block'
    } else {
        login_form.style.display = 'none'        
    }
}