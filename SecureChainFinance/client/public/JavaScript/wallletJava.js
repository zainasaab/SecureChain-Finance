const showCredentialsBtn = document.getElementById("show-credentials-btn");
const credentialsPopup = document.getElementById("credentials-popup");
const closePopupBtn = document.getElementById("close-popup-btn");
const cardType = document.getElementById("card-type");
const publicKey = document.getElementById("public-key");
const name = document.getElementById("name");
const balance = document.getElementById("balance");

showCredentialsBtn.addEventListener("click", () => {
  const otp = prompt("Enter your one-time password:");
  if (otp === "secret") {
    credentialsPopup.classList.add("open");
    cardType.textContent = "Credit";
    publicKey.textContent = "0x1234567890abcdef";
    name.textContent = "John Doe";
    balance.textContent = "$5000";
  } else {
    alert("Incorrect one-time password.");
  }
});

closePopupBtn.addEventListener("click", () => {
  credentialsPopup.classList.remove("open");
});