// Request

function getJewelery() {
  return fetch("https://fakestoreapi.com/products/category/jewelery")
    .then((response) => response.json())
    .catch((error) => {
      throw new Error("Error!");
    });
}

let arrayJewlery = [];

function gerarArrayJewlery(obj, n) {
  arrayJewlery.push(obj[n]);
}

function gerarListaProdutos(obj, n, id_main) {
  const products__list__item = document.createElement("div");
  products__list__item.setAttribute("class", "products__list__item");

  const list__item__link = document.createElement("a");
  list__item__link.setAttribute("href", `product_page.html?id=${obj[n].id}`);
  products__list__item.append(list__item__link);

  const products__list__item__img = document.createElement("div");
  products__list__item__img.setAttribute(
    "class",
    "products__list__item__img img--2"
  );
  products__list__item__img.setAttribute(
    "style",
    `background-image: url(${obj[n].image})`
  );

  list__item__link.append(products__list__item__img);

  // --- div
  const list__item__label = document.createElement("div");
  // a
  const label__title__link = document.createElement("a");
  label__title__link.setAttribute("href", `product_page.html?id=${obj[n].id}`);
  const label__title = document.createElement("h4");
  label__title.append(obj[n].title);
  label__title__link.append(label__title);

  list__item__label.append(label__title__link);

  // price

  const product__price = document.createElement("span");
  product__price.append(obj[n].price + " €");

  list__item__label.append(product__price);

  const label__description = document.createElement("p");
  label__description.append(obj[n].description);

  list__item__label.append(label__description);

  products__list__item.append(list__item__label);

  const products__list = document.getElementById(id_main);
  products__list.append(products__list__item);
}

function usarCategoriaJewllery() {
  getJewelery()
    .then((response) => {
      response.forEach((product, index) => {
        gerarListaProdutos(response, index, "products__list");
        gerarArrayJewlery(response, index);
      });
      gerarHighlightCarousel();
    })
    .catch((error) => {
      console.log(error);
    });
}

//--------------------------Carousel

function gerarHighlightCarousel() {
  const highlight__carousel_list = document.getElementById(
    "highlight__carousel_list"
  );

  counter = 0;
  arrayJewlery.forEach((joia) => {
    if (joia.rating.rate > 3) {
      counter++;

      //criar link
      const carousel__link = document.createElement("a");
      carousel__link.setAttribute("href", `product_page.html?id=${joia.id}`);

      //criar div dentro do link
      const carousel__item = document.createElement("div");

      // So o 1o nao tem display none
      if (counter === 1) {
        carousel__item.setAttribute(
          "class",
          "category category--m carouselItem"
        );
      } else {
        carousel__item.setAttribute(
          "class",
          "category category--m carouselItem carouselInactive"
        );
      }

      carousel__item.setAttribute(
        "style",
        `background-image: url(${joia.image})`
      );
      carousel__item.setAttribute("id", `highlight_${joia.id}`);

      carousel__link.append(carousel__item);

      highlight__carousel_list.append(carousel__link);
    }
  });
}

function carouselPrev() {
  const carouselItems = document.getElementsByClassName("carouselItem");
  for (let i = 0; i < carouselItems.length; i++) {
    if (!carouselItems[i].classList.contains("carouselInactive")) {
      carouselItems[i].classList.add("carouselInactive");
      if (carouselItems[i - 1]) {
        carouselItems[i - 1].classList.remove("carouselInactive");
        break;
      } else {
        carouselItems[carouselItems.length - 1].classList.remove(
          "carouselInactive"
        );
        break;
      }
    }
  }
}

function carouselNext() {
  const carouselItems = document.getElementsByClassName("carouselItem");
  for (let i = 0; i < carouselItems.length; i++) {
    if (!carouselItems[i].classList.contains("carouselInactive")) {
      carouselItems[i].classList.add("carouselInactive");
      if (carouselItems[i + 1]) {
        carouselItems[i + 1].classList.remove("carouselInactive");
        break;
      } else {
        carouselItems[0].classList.remove("carouselInactive");
        break;
      }
    }
  }
}

//--------------------------Search

function procuraProduto(e) {
  let valorInserido = e.target.value;

  if (valorInserido == "") {
    document.getElementById("products__list--search").innerHTML = "";
  } else {
    let produtosEncontrados = arrayJewlery.filter(
      (produto) =>
        produto.title.toLowerCase().includes(valorInserido.toLowerCase()) ||
        produto.description.toLowerCase().includes(valorInserido.toLowerCase())
    );

    const productsListSearch = document.getElementById(
      "products__list--search"
    );
    productsListSearch.innerHTML = "";

    produtosEncontrados.forEach((produto, index) => {
      gerarListaProdutos(produtosEncontrados, index, "products__list--search");
    });
  }
}

//--------------------------ONLOAD

window.onload = (event) => {
  usarCategoriaJewllery();
};
