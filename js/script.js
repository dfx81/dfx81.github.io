var forceScroll = window.setTimeout(scroll, 2000);

function scroll()
{
    if (!(scrollY >= document.getElementById("header").offsetHeight))
    {
        window.scrollTo(0, document.getElementById("header").offsetHeight);
    }
}