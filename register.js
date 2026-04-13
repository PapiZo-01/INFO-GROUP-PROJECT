function emailRegister(event) {
    event.preventDefault();

    const password = document.getElementById('regPassword').value.trim();
    const confirm = document.getElementById('regConfirm').value.trim();

    if (password !== confirm) {
        document.getElementById('registerError').textContent = 'Passwords do not match.';
        return;
    }

    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();

    auth.createUserWithEmailAndPassword(email, password)
        .then(result => result.user.updateProfile({ displayName: name }))
        .then(() => window.location.href = 'index.html')
        .catch(error => {
            document.getElementById('registerError').textContent = friendlyError(error.code);
        });
}




function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(() => window.location.href = 'index.html')
        .catch(error => console.error("Login failed:", error));
}

function friendlyError(code) {
    const errors = {
        'auth/user-not-found':      'No account found with that email.',
        'auth/wrong-password':      'Incorrect password.',
        'auth/email-already-in-use':'An account with that email already exists.',
        'auth/weak-password':       'Password must be at least 6 characters.',
        'auth/invalid-email':       'Please enter a valid email address.',
    };
    return errors[code] || 'Something went wrong. Please try again.';
}