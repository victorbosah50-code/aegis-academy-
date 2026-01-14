// Navigation
function go(pageId){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");
}

// Login simulation
function login(){
  const user=document.getElementById("loginUser").value;
  const pass=document.getElementById("loginPass").value;
  if(user && pass){
    alert("Login successful as "+user);
    go("parentsDashboard");
  } else { alert("Enter username & password"); }
}

// Pricing calculators
function calculateBasic(){
  const hours=document.getElementById("basicHours").value;
  document.getElementById("basicResult").innerText=
    hours?"Total: ₦"+(hours*20000).toLocaleString():"";
}
function calculatePro(){
  const hours=document.getElementById("proHours").value;
  document.getElementById("proResult").innerText=
    hours?"Total: ₦"+(hours*50000).toLocaleString():"";
}

// Free Demo Simulation
function showDemo(){
  alert("This free demo shows differences between Basic, Professional, and Premium platforms for parents to decide.");
}

// Simple AI Tutor Chat
function sendMessage(){
  const input=document.getElementById("chatInput");
  const chatBox=document.getElementById("chatBox");
  if(input.value.trim()!==""){
    const msg=document.createElement("div");
    msg.innerText="You: "+input.value;
    chatBox.appendChild(msg);
    const response=document.createElement("div");
    response.innerText="TutorBot: Let's work on "+input.value+" together!";
    response.style.fontWeight="bold";
    chatBox.appendChild(response);
    chatBox.scrollTop=chatBox.scrollHeight;
    input.value="";
  }
}
