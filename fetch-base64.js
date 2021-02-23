const fetchAsBlob = url => fetch(url)
    .then(response => response.blob());

const convertBlobToBase64 = blob => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
});


function start() {    
    var list = document.getElementsByTagName('img');
    for (let item of list) {
        let url = item.getAttribute('data-src');       
        fetchAsBlob(url)
            .then(convertBlobToBase64)
            .then(
                function (data) {            
                                  
                    item.setAttribute('src', data);
                }
            )
    }
}
let btnElement = document.querySelector('#getImg');
btnElement.addEventListener('click', start);