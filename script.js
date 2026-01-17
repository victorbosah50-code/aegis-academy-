const firebaseConfig = {
  // PASTE YOUR CONFIG HERE
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const stripe = Stripe('pk_test_...');
const paystackKey = 'pk_test_...';
const grokApiKey = 'gsk_...';

document.getElementById('darkModeToggle').onclick = () => document.body.classList.toggle('dark-mode');

const authModal = document.getElementById('authModal');
const closes = document.getElementsByClassName('close');
for (let close of closes) {
    close.onclick = () => close.parentElement.parentElement.style.display = 'none';
}
document.getElementById('loginBtn').onclick = () => authModal.style.display = 'block';
document.getElementById('aiChatBtn').onclick = () => aiModal.style.display = 'block';
window.onclick = (event) => {
    if (event.target == authModal) event.target.style.display = 'none';
};

function signUp() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (!document.getElementById('ageConsent').checked) return alert('Confirm age');
    auth.createUserWithEmailAndPassword(email, password).then(() => {
        alert('Signed up! Now log in.');
        authModal.style.display = 'none';
    }).catch(err => alert(err.message));
}

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.signInWithEmailAndPassword(email, password).then(() => {
        alert('Logged in! Welcome.');
        authModal.style.display = 'none';
    }).catch(err => alert(err.message));
}

function googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(() => alert('Google login success!')).catch(err => alert(err.message));
}

async function pay(plan, gateway) {
    if (!auth.currentUser) return alert('Login first');
    // Backend integration coming in the last step
    alert('Payment coming soon – backend last');
}

auth.onAuthStateChanged(user => {
    if (user) document.getElementById('loginBtn').textContent = 'Logout', document.getElementById('loginBtn').onclick = () => auth.signOut();
    else document.getElementById('loginBtn').textContent = 'Login / Sign Up', document.getElementById('loginBtn').onclick = () => authModal.style.display = 'block';
});
