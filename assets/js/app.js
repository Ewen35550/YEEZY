window.onload = function() { 
    init();
}

function init() {
    fetch('assets/js/data.json') 
	.then(response => response.json()) 
	.then(data => { 

        if (data.length < 10) document.getElementById('nb_page').innerText = "0" + data.length;
        else document.getElementById('nb_page').innerText = data.length;

        const btns = document.querySelectorAll('.btn');
        let container = document.querySelector('.container_products');

        for (let i = 0; i < data.length; i++){
            let product = `<div class="product">
                            <span class="name">${data[i].name}</span>
                            <img src="${data[i].img}" alt="Yeezy 350 v2 ${data[i].name}">
                            <div class="opacity"></div>
                        </div>`;

            container.innerHTML += product;
        }

        let currentPage = 0;
        load_page();
        
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.classList.contains('btn_prev')){
                    currentPage--;
                    if (currentPage < 0){
                        currentPage = data.length - 1;
                    }
                } else if (btn.classList.contains('btn_next')){
                    currentPage++;
                    if (currentPage > data.length - 1){
                        currentPage = 0;
                    }
                }
                load_page();
            });
        });
        
        function load_page(){
            if (currentPage < 10) document.getElementById('current_page').innerText = "0" + (currentPage + 1);
            else document.getElementById('current_page').innerText = (currentPage + 1);

            document.getElementById('img_product').src = data[currentPage].img;
            document.getElementById('img_product').alt = "Yeezy 350 v2 " + data[currentPage].name;
            document.getElementById('release').innerText = data[currentPage].release;
            document.getElementById('price').innerText = data[currentPage].price;

            document.getElementById('progress_bar').style.width = 'calc(100% /'+data.length+'*'+(currentPage + 1)+')';

            let products = document.querySelectorAll('.product');

            products.forEach(product => {
                product.classList.remove('prev_product');
                product.classList.remove('preview_product');
                product.classList.remove('next_product');

                if (currentPage === 0) {
                    products[data.length - 1].classList.add('prev_product');
                    products[currentPage].classList.add('preview_product');
                    products[currentPage + 1].classList.add('next_product');
                } else if (currentPage > 0 && currentPage < data.length - 1) {
                    products[currentPage - 1].classList.add('prev_product');
                    products[currentPage].classList.add('preview_product');
                    products[currentPage + 1].classList.add('next_product');
                } else if (currentPage === data.length - 1){
                    products[currentPage - 1].classList.add('prev_product');
                    products[currentPage].classList.add('preview_product');
                    products[0].classList.add('next_product');
                }
            });
        }
    });
}