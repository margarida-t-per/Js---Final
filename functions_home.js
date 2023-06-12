//

// Ir buscar as Categorieas

async function getCategorias() {
  try {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories"
    );
    return response.json();
  } catch (error) {
    throw new Error("Error!");
  }
}

const gerarMenu = (obj, n) => {
  const navItem = document.createElement("div");
  navItem.setAttribute("class", "nav__item");

  const navItemLabel = document.createElement("a");
  navItemLabel.setAttribute("class", "nav__item__label");
  navItemLabel.setAttribute("href", "#");
  navItemLabel.append(obj[n].toUpperCase());

  navItem.append(navItemLabel);

  const navItems = document.getElementById("nav__items");
  navItems.append(navItem);
};

const gerarFirstSection = (obj, n) => {
  const linkTag = document.createElement("a");
  linkTag.setAttribute("href", "/product_search.html");

  const categoriaDiv = document.createElement("div");
  categoriaDiv.setAttribute("class", "category category--s category--seating");

  linkTag.append(categoriaDiv);

  const categoriaSpan = document.createElement("span");
  categoriaSpan.setAttribute("class", "category__name");
  categoriaSpan.append(obj[n].toUpperCase());

  categoriaDiv.append(categoriaSpan);

  const firstCategorySection = document.getElementById(
    "first__category__section"
  );
  firstCategorySection.append(linkTag);
};

function usarCategorias() {
  getCategorias()
    .then((response) => {
      response.forEach((category, index) => {
        gerarMenu(response, index);
        gerarFirstSection(response, index);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

// NEWSLETTER

function subscreverNewsletter() {
  const email = document.getElementById("newsletter__email").value;

  return fetch("https://fakenewsletter.com/", {
    method: "PUT",
    body: email,
  });
}

// FUNCTION TRADEMARK

const assignTrademark = () =>
  document
    .getElementById("footer__trademark")
    .append(`${new Date().getFullYear()} © copyright`);

// ONLOAD

window.onload = () => {
  usarCategorias();
  assignTrademark();

  const formularioDeNewsletter = document.getElementById("form__newsletter");
  formularioDeNewsletter.onsubmit = subscreverNewsletter;

  window.setTimeout(() => {
    document.getElementById("loading__screen").style.display = "none";
  }, 3000);
};
