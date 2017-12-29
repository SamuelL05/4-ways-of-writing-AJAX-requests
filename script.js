window.onload = function() {

    var url = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';

    var AxiosBtn = document.querySelector("#Axios");
    var FetchBtn = document.querySelector("#Fetch");
    var XHRbtn = document.querySelector("#XHR");
    var comment = document.querySelector("#comment");

    // XHR
    XHRbtn.addEventListener("click", function() {

        var XHR = new XMLHttpRequest();
        XHR.open("GET", url);
        XHR.send();

        XHR.onreadystatechange = function() {
            if (XHR.readyState == 4 && XHR.status == 200) {
                let quote = JSON.parse(XHR.responseText)[0];
                comment.innerHTML = "\"" + quote + ".\"";
            }
            if (XHR.status != 200) {
                errorHandler("Failed to connect");
            }
        }
    });

    // Fetch
    FetchBtn.addEventListener("click", function() {
        fetch(url, {method: "GET"})
        .then(function(res) {
            return res.json();
        })
        .then(function(res) {
            comment.innerHTML = "\"" + res[0] + ".\"";
        })
        .catch(errorHandler);
    });

    // JQuery
    $("#JQuery").click(function() {
        $.getJSON(url)
        // Can also use .done
        .then(function(res) {
            $("#comment").text("\"" + res[0] + ".\"");
        })
        .fail(function(err) {errorHandler(err.statusText);});
    });

    // Axios
    AxiosBtn.addEventListener("click", axiosRequest);

    function axiosRequest() {
        axios.get(url, {method: "GET"})
        .then(function(res) {
            comment.innerHTML = "\"" + res.data[0] + ".\"";
        })
        .catch(errorHandler);
    }

    function errorHandler(error) {
        if (error.response !== null) {console.log(error.response);}
        else if (error.request !== null) {console.log(error.request);}
        else {console.log(error);}        
    }


}