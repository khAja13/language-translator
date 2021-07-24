function myFunction(x) {
    if (x.matches) { 
        document.body.innerText = "This webiste works better on bigger screens."
        document.body.className = "mob"
    } else{
        document.body.style.backgroundColor = "#DDDDDD"
        document.body.className = ""
    }
}

var x = window.matchMedia("(max-width: 993px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction)

const btn = document.getElementById('tra')
const textFrom = document.getElementById('textFrom')
let forSrc = false, forDest = false

const here = () => {
    return $('.check').val();
}
const here2 = () => {
    return $('.checkSrc').val();
}

var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://google-translate1.p.rapidapi.com/language/translate/v2",
    "method": "POST",
    "headers": {
        "x-rapidapi-host": "google-translate1.p.rapidapi.com",
        "x-rapidapi-key": "6d6c201d92mshcde905c3091c36dp176388jsneabb3a4ca8f9",
        "content-type": "application/x-www-form-urlencoded"
    },
    "data": {
        "source": () => { here2 },
        "q": () => { here },
        "target": ""
    }
}

$(document).ready(function () {
    $(".dropdown-item").click(function (e) {
        if (!$(this).hasClass('checkDest')) {
            $('.check').html($(this).html());
            settings.data.source = this.getAttribute('value')
            forSrc = true
        }
        else {
            $('.checkSrc').html($(this).html());
            settings.data.target = this.getAttribute('value')
            forDest = true
        }
    });
});

btn.addEventListener('click', () => {
    if (textFrom.value) {
        if (forSrc && forDest) {
            settings.data.q = textFrom.value;
            fetchTranslation()
        }
    }
})
function fetchTranslation() {
    $.ajax(settings).done(function (response) {
        var translatedText = response.data.translations[0].translatedText;
        $('#destText').html(translatedText)
    });

}