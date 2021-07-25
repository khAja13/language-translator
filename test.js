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
        // the key will be provided by rapidapi
        "x-rapidapi-key": "c2ac343d3emsh818b4617d1b2f55p12605bjsn1a507cb54e75",
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
