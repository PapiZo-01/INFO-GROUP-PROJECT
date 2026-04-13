function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(result => {
            // Login successful — go to the map
            window.location.href = 'index.html';
        })
        .catch(error => console.error("Login failed:", error));
}

function emailLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    auth.signInWithEmailAndPassword(email, password)
        .then(() => window.location.href = 'index.html')
        .catch(error => {
            document.getElementById('loginError').textContent = friendlyError(error.code);
        });
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

function resetPassword() {
    const email = document.getElementById('loginEmail').value.trim();
    if (!email) {
        document.getElementById('loginError').textContent = 'Enter your email above first.';
        return;
    }
    auth.sendPasswordResetEmail(email)
        .then(() => {
            document.getElementById('loginError').style.color = 'green';
            document.getElementById('loginError').textContent = 'Reset email sent — check your inbox.';
        })
        .catch(error => {
            document.getElementById('loginError').textContent = friendlyError(error.code);
        });
}