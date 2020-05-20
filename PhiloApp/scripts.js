function showForm(){
    hide("info");
    show("form");
}

function create(){
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let password = document.getElementById("pword");
    
    if (name.value.length != 0 && email.value.length != 0 && password.value.length != 0)
    {
        hide("create");
        show("policy");
    }
}

function show(str){
    document.getElementById(str).style.display = "block";
    document.getElementById(str).style.opacity = "1";
}

function hide(str){
    document.getElementById(str).style.opacity = "0";
    document.getElementById(str).style.display = "none";
}

let check = false;
let nRead = 0;
let readTime = [];

function showPolicy(){
    let str = ""
       str += "1. 'We' and 'us' in this document refers to the team behind the development behind this program/website. The second party is the end user of our program/website and will be refered as 'user'. Third party in this document refers to any services used by us.\n";
       str += "2. By agreeing to this policy and using this program/website or the services provided by us, we're allowed to collect data from the user. The private data collected includes the user's email address as required by the registration, and other personal data that can be found from the email.\n";
       str += "3. By agreeing to this policy and using our services, you're also approving the way we handles your personal data, which is by selling them to third parties. We're NOT reliable for any damages done to the user, such as identity theft, and spam emails.\n";
       str += "4. The user will also be able to subscribe to our newsletter, where we occasionally send offers regarding our service. In context of the current service, the latest leaderboard position will be mailed to the respective users. The user CANNOT unsubscribe from our newsletter.\n";
       str += "5. By agreeing to this, the user agrees that they're not responsible with their personal data and will freely give them out to other parties such as this obvious trap website.\n";
       str += "6. Referring to point 5, the user agrees to be refered as 'dummy dumb dumb' or 'boomer'.\n";
    
    readTime.push(Date.now());
    check = false;
    
    while (!check){
        check = window.confirm(str);
        if (!check) readTime[nRead] = Date.now();
    }
    
    readTime[nRead] = (Date.now() - readTime[nRead]) / 1000;
    
    nRead++;
}

function accept(tricked){
    let agree = document.getElementById("agree");
    let news = document.getElementById("news");
    let read = document.getElementById("read");
    let understand = document.getElementById("understand");
    let cookies = document.getElementById("cookies");
    
    if (agree.checked && cookies.checked || !tricked)
    {
        hide("form");
        hide("policy");
        show("result");
    
        let data = document.getElementById("data");
        let str = "Your Result:<br/><br/>";
        str += "Tricked to accept ridiculous privacy policy?: " + tricked + "<br/>";
        str += "Checked the privacy policy?: " + check + "<br/>";
        str += "Number of times read the policy: " + nRead + " times<br/>";
    
        let longest = 0;
        for (i = 0; i != nRead; i++)
            if (readTime[i] > longest)
                longest = readTime[i];
        
        str += "Time taken to read the policy: (longest) " + longest + " seconds<br/>";
        if (tricked)
        {
            str += "Agreed to ridiculous policies?: " + agree.checked + "<br/>";
            str += "Did not join the newsletter that can't be unsubscribed from?: " + news.checked + "<br/>";
            str += "Admit did not read the policy?: " + read.checked + "<br/>";
            str += "Admit the existence of a point that did not exist in the policy?: " + understand.checked + "<br/>";
            str += "Accept cookies?: " + cookies.checked + "<br/><br/>";
            str += "Guess we found the dummy dumb dumb user...<br/>";
        }
        
        data.innerHTML = str;
        window.open("https://youtu.be/dQw4w9WgXcQ");
    }
}

function decline(){
    window.alert("Good Job!\nYou spotted the traps we've prepared. If you still didn't realize it yet, this is just a big complicated survey. There is no game at all. Don't worry about your data as we did not collect anything aside from some psychological/behavioural data from your interaction with this website.\n\nFeel free to share this site with your peers to help with our research.");
    accept(false);
}