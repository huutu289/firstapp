
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
    let list = document.getElementsByTagName('img');
    let count = list.length;
    console.log(count);

    for (let item of list) {
        let url = item.getAttribute('data-src');

        //check if url is base64
        const checkBase64 = url.includes('data:image');
        if (checkBase64) {
            item.setAttribute('src', url);

            item.removeAttribute('data-src');
            
            //del icon loading
            let parentNode = item.parentElement;
            let loadIcon = parentNode.firstElementChild;
            loadIcon.remove();
            count--;
            turnOff(count);
        }

        else {

            if (url != null) {
                // console.log(url);
                fetchAsBlob(url)
                    .then(convertBlobToBase64)
                    .then(
                        function (data) {
                            item.setAttribute('src', data);
                            item.removeAttribute('data-src');
                            let parentNode = item.parentElement;
                            let loadIcon = parentNode.firstElementChild;

                            loadIcon.remove();

                            count--;
                            turnOff(count);
                        }
                    )
            }
        }

        
    }




}
start();

function turnOff(count) {
    console.log(count);
    if (count === 0) {
        let status = document.querySelector('#load');
        console.log(status);
        status.remove();

    }


}

// let btnElement = document.querySelector('#getImg');
// btnElement.addEventListener('click', start);