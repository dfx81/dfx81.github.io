window.onload = () => {
    console.log("Website programmed & designed by Danial 'dfx' Fitri.");
    console.log("Site v1.0, Cache v202404190001");

    let mail = document.querySelector(".email > .small");

    if (mail) {
        let formattedMail = mail.innerText.replace(" [at] ", "@").replace(" [dot] ", ".");

        mail.innerText = formattedMail;
        mail.href = "mailto:" + formattedMail;
    }

    document.querySelector(".content").classList.add("slide-in");
    document.querySelector(".header").classList.add("fade-in");
    document.querySelector(".footer").classList.add("fade-in");
};