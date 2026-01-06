const button = document.getElementById("tipBtn");

button.addEventListener("click", function () {
    const tips = [
        "Pack light! You can always buy what you need locally.",
        "Always carry a portable power bank for long journeys.",
        "Learn basic phrases in the local language; it goes a long way!",
        "Keep a digital copy of your passport in your email."
    ];

    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    alert("Travel Tip of the Day:\n\n" + randomTip);
});