// A URL returns Image data (Blob).

//  var url = "https://raw.githubusercontent.com/o7planning/webexamples/master/_testdatas_/triceratops.png";
let btn = document.querySelector('#getImg');

btn.addEventListener('click', start);
function start() {

    var list = document.getElementsByTagName('img');
    for (let item of list) {
        let url = item.getAttribute('data-src');
        var imgId = item.getAttribute('id');
        doGetBlob(url, imgId);
    }
}
function doGetBlob(url, imgId) {

    // Call fetch(url) with default options.
    // It returns a Promise object:
    var aPromise = fetch(url);

    // Work with Promise object:
    aPromise
        .then(function (response) {
            console.log("OK! Server returns a response object:");
            console.log(response);

            if (!response.ok) {
                throw new Error("HTTP error, status = " + response.status);
            }
            // Get Blob Promise from response object:
            var myBlob_promise = response.blob();
            return myBlob_promise;
        })
        .then(function (myBlob) {
            // console.log("OK! Blob:");
            // console.log(myBlob);

            var objectURL = URL.createObjectURL(myBlob);

           console.log('object url ',objectURL);
            

            var myImage = document.getElementById(imgId);
            myImage.src = objectURL;
        })
        .catch(function (error) {
            console.log("Noooooo! Something error:");
            console.log(error);
        });

}

