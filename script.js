const firebaseConfig = {
  // PASTE YOUR REAL FIREBASE CONFIG HERE FROM STEP 2
  apiKey: "AIzaSy...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const stripe = Stripe('pk_test_XXXXXXXXXXXXXXXXXXXXXXXX'); // ← your Stripe publishable key
const paystackKey = 'pk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'; // ← your Paystack public key
const grokApiKey = 'gsk_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'; // ← your xAI Grok API key

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

// Authentication functions
function signUp() {
  const email = document.getElementById('email')?.value;
  const password = document.getElementById('password')?.value;
  if (!document.getElementById('ageConsent')?.checked) return alert('Please confirm age consent');
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

// Payment function (Stripe + Google Pay + Paystack)
async function pay(plan, gateway) {
  if (!auth.currentUser) return alert('Please sign in first');

  const uid = auth.currentUser.uid;
  const backendUrl = 'https://your-backend-name.onrender.com/create-session'; // ← UPDATE AFTER RENDER DEPLOY

  if (gateway === 'stripe') {
    try {
      const res = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, uid, payment_method_types: ['card', 'google_pay'] })
      });
      const { id: sessionId } = await res.json();
      stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      alert('Payment error – please try again');
    }
  } else if (gateway === 'paystack') {
    const amount = plan === 'basic' ? 500000 : 2000000; // kobo
    const handler = PaystackPop.setup({
      key: paystackKey,
      email: auth.currentUser.email,
      amount,
      currency: 'NGN',
      callback: response => {
        if (response.status === 'success') {
          db.collection('users').doc(uid).update({
            plan,
            purchasedCourses: firebase.firestore.FieldValue.arrayUnion('all')
          });
          alert('Payment successful!');
        }
      }
    });
    handler.openIframe();
  }
}

// AI Copilot (xAI Grok)
async function askAI() {
  const query = document.getElementById('aiQuery')?.value.trim();
  if (!query) return;

  const box = document.getElementById('aiResponse');
  box.textContent = 'Thinking...';

  try {
    const res = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${grokApiKey}`
      },
      body: JSON.stringify({
        model: 'grok-beta',
        messages: [{ role: 'user', content: `You are EduOS AI Copilot. Help kindly and accurately with homework, leadership coaching, discipline, world religions (factually & respectfully): ${query}` }]
      })
    });

    const data = await res.json();
    box.textContent = data.choices?.[0]?.message?.content || "Sorry, I couldn't answer right now.";
  } catch (err) {
    box.textContent = "Connection error. Try again later.";
  }
}

// Enroll button redirect
document.getElementById('enrollBtn')?.addEventListener('click', () => {
  if (!auth.currentUser) authModal.style.display = 'flex';
  else window.location.href = 'courses.html';
});

// Auth state listener
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
