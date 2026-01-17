// script.js - Core functionality for EduOS

// Replace with your real Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Replace with your real keys
const stripe = Stripe('pk_test_XXXXXXXXXXXXXXXXXXXXXXXX');
const paystackKey = 'pk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
const grokApiKey = 'gsk_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

// Dark mode toggle
document.getElementById('darkModeToggle')?.addEventListener('click', () =>
  document.body.classList.toggle('dark-mode')
);

// Modals
const authModal = document.getElementById('authModal');
const aiModal = document.getElementById('aiModal');

document.querySelectorAll('.close').forEach(el => {
  el.addEventListener('click', () => {
    authModal.style.display = 'none';
    aiModal.style.display = 'none';
  });
});

document.getElementById('loginBtn')?.addEventListener('click', () => authModal.style.display = 'flex');
document.getElementById('aiChatBtn')?.addEventListener('click', () => aiModal.style.display = 'flex');

// Auth functions
function signUp() {
  const email = document.getElementById('email')?.value;
  const password = document.getElementById('password')?.value;
  if (!document.getElementById('ageConsent')?.checked) return alert('Age consent required');
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => { alert('Account created!'); authModal.style.display = 'none'; })
    .catch(err => alert(err.message));
}

function login() {
  const email = document.getElementById('email')?.value;
  const password = document.getElementById('password')?.value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => { alert('Welcome back!'); authModal.style.display = 'none'; })
    .catch(err => alert(err.message));
}

function googleSignIn() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(() => alert('Signed in with Google!'))
    .catch(err => alert(err.message));
}

// Payment stub (backend coming in Phase 2)
function pay(plan, gateway) {
  alert(`Payment for ${plan} with ${gateway} – backend next phase`);
}

// AI Copilot (stub – full xAI in Phase 2)
function askAI() {
  const query = document.getElementById('aiQuery')?.value.trim();
  if (!query) return;
  document.getElementById('aiResponse').textContent = 'Thinking...';
  setTimeout(() => {
    document.getElementById('aiResponse').textContent = `AI response for: "${query}" (full integration in Phase 2)`;
  }, 1500);
}

// Auth state
auth.onAuthStateChanged(user => {
  const btn = document.getElementById('loginBtn');
  if (user) {
    btn.textContent = 'Sign Out';
    btn.onclick = () => auth.signOut().then(() => location.reload());
  } else {
    btn.textContent = 'Sign In';
    btn.onclick = () => authModal.style.display = 'flex';
  }
});
