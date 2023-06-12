let id;

let arrayProdutos = [];

let mainObj = { id: "", category: "" };

function buscarObj() {
  let urlPresente = new URLSearchParams(window.location.search);
  id = urlPresente.get("id");

  const produto = arrayProdutos.find((prod) => prod.id == id);
  if (produto) {
    preencherDadosProduto(produto);
    recomendados(produto.category);
  }
}

function getProdutos() {
  return fetch("https://fakestoreapi.com/products/")
    .then((response) => response.json())
    .catch((error) => {
      throw new Error("Error!");
    });
}

function gerarArrayProdutos(obj, n) {
  return new Promise(function (resolve) {
    arrayProdutos.push(obj[n]);
    resolve();
  });
}
function preencherDadosProduto(prod) {
  const prod_image = document.getElementById("main_image");
  prod_image.setAttribute("src", prod.image);

  const prod_title = document.getElementById("product__title");
  prod_title.append(prod.title);

  const prod_price = document.getElementById("product__price");
  prod_price.append(prod.price + " € + Free Shipping");

  const prod_des = document.getElementById("product__description");
  prod_des.append(prod.description);
}

function recomendados(cat) {
  const arrayRecomendados = arrayProdutos.filter(
    (prod) => prod.id != id && prod.category == cat
  );

  for (let i = 0; i < 3 && i < arrayRecomendados.length; i++) {
    let produtoRec = arrayRecomendados[i];

    const products__list__item = document.createElement("div");
    products__list__item.setAttribute("class", "products__list__item");

    const list__item__link = document.createElement("a");
    list__item__link.setAttribute(
      "href",
      `product_page.html?id=${produtoRec.id}`
    );
    products__list__item.append(list__item__link);

    const products__list__item__img = document.createElement("div");
    products__list__item__img.setAttribute(
      "class",
      "products__list__item__img img--1"
    );

    products__list__item__img.setAttribute(
      "style",
      `background-image: url(${produtoRec.image})`
    );

    list__item__link.append(products__list__item__img);

    // --- div
    const list__item__label = document.createElement("div");
    // a
    const label__title__link = document.createElement("a");
    label__title__link.setAttribute(
      "href",
      `product_page.html?id=${produtoRec.id}`
    );
    const label__title = document.createElement("h4");
    label__title.append(produtoRec.title);
    label__title__link.append(label__title);

    list__item__label.append(label__title__link);

    // price

    const product__price = document.createElement("span");
    product__price.append(produtoRec.price + " €");

    list__item__label.append(product__price);

    products__list__item.append(list__item__label);

    const products__list = document.getElementById("recomendados__list");
    products__list.append(products__list__item);
  }
}

function usarDadosProduto() {
  getProdutos()
    .then(function (response) {
      const promises = [];
      for (let i = 0; i < response.length; i++) {
        promises.push(gerarArrayProdutos(response, i));
      }
      return Promise.all(promises);
    })
    .then(function () {
      buscarObj();
    })
    .catch(function (error) {
      console.log(error);
    });
}
//--------------------------Add to Cart

function submeter(event) {
  event.preventDefault();
  const userId = 2;
  const dataHoje = new Date();
  const dataHojeFormatada =
    dataHoje.getFullYear() +
    "-" +
    (dataHoje.getMonth() + 1) +
    "-" +
    dataHoje.getDate();
  const quantidade = document.getElementById("product_quantity");

  fetch("https://fakestoreapi.com/products/7", {
    method: "PUT",
    body: JSON.stringify({
      uderId: userId,
      date: dataHojeFormatada,
      price: {
        productId: id,
        quantity: quantidade,
      },
    }),
  })
    .then((res) => res.json())
    .then((json) => console.log(json));
}

//--------------------------ONLOAD

window.onload = (event) => {
  usarDadosProduto();

  const formAddToCart = document.getElementById("formAddToCart");
  formAddToCart.addEventListener("submit", submeter);
};
