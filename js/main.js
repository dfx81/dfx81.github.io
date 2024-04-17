window.onload = () => {
    console.log("Website programmed & designed by Danial 'dfx' Fitri.");
    console.log("Site v1.0");

    let mail = document.querySelector(".email > .small");

    mail.innerText = mail.innerText.replace(" [plus] ", "+").replace(" [at] ", "@").replace(" [dot] ", ".").replace("spam", "dfx");
    mail.setAttribute("href", "mailto:" + mail.innertext);

    document.querySelector(".content").classList.add("slide-in");
    document.querySelector(".header").classList.add("fade-in");
    document.querySelector(".footer").classList.add("fade-in");
};