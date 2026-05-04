var heroItems = [
  {
    image: "img/prod.webp",
    title: "Classic Froyo Cup",
    desc: "Creamy soft serve with fun toppings."
  },
  {
    image: "img/prod1.webp",
    title: "Loaded Dessert Cup",
    desc: "A sweet mix of sauce, crunch, and soft serve."
  },
  {
    image: "img/prod2.webp",
    title: "Party Sprinkle Cup",
    desc: "Colorful, fun, and made for sharing."
  },
  {
    image: "img/boba.webp",
    title: "Sundae Boba",
    desc: "Soft serve with chewy boba pearls."
  },
  {
    image: "img/matchaice.webp",
    title: "Matcha Cream",
    desc: "A green tea favorite with a creamy swirl."
  }
];

var cakeItems = [
  {
    image: "img/tiramisu.webp",
    title: "Banana Tiramisu",
    desc: "A chilled cake with banana flavor and creamy layers."
  },
  {
    image: "img/mgraham.webp",
    title: "Mango Graham",
    desc: "Sweet mango, cream, and graham crunch in every slice."
  },
  {
    image: "img/choco.webp",
    title: "Chocolate Soft Serve",
    desc: "Rich chocolate swirl for a classic dessert moment."
  },
  {
    image: "img/float.webp",
    title: "Matcha Milktea Float",
    desc: "A refreshing drink topped with soft serve."
  }
];

var heroIndex = 0;
var cakeIndex = 0;

var heroImage = document.getElementById("hero-product");
var heroTitle = document.getElementById("hero-title");
var heroDesc = document.getElementById("hero-desc");
var cakeImage = document.getElementById("cake-image");
var cakeTitle = document.getElementById("cake-title");
var cakeDesc = document.getElementById("cake-desc");
var cakeNext = document.getElementById("cake-next");
var menuButton = document.querySelector(".menu-button");
var siteNav = document.getElementById("site-nav");

function changeHero() {
  if (!heroImage || !heroTitle || !heroDesc) {
    return;
  }

  heroIndex = (heroIndex + 1) % heroItems.length;
  heroImage.classList.add("is-changing");

  window.setTimeout(function () {
    heroImage.src = heroItems[heroIndex].image;
    heroImage.alt = heroItems[heroIndex].title;
    heroTitle.textContent = heroItems[heroIndex].title;
    heroDesc.textContent = heroItems[heroIndex].desc;
    heroImage.classList.remove("is-changing");
  }, 350);
}

function changeCake() {
  if (!cakeImage || !cakeTitle || !cakeDesc) {
    return;
  }

  cakeIndex = (cakeIndex + 1) % cakeItems.length;
  cakeImage.classList.add("is-changing");

  window.setTimeout(function () {
    cakeImage.src = cakeItems[cakeIndex].image;
    cakeImage.alt = cakeItems[cakeIndex].title;
    cakeTitle.textContent = cakeItems[cakeIndex].title;
    cakeDesc.textContent = cakeItems[cakeIndex].desc;
    cakeImage.classList.remove("is-changing");
  }, 350);
}

if (cakeNext) {
  cakeNext.addEventListener("click", changeCake);
}

if (heroImage && heroTitle && heroDesc) {
  window.setInterval(changeHero, 3000);
}

if (cakeImage && cakeTitle && cakeDesc) {
  window.setInterval(changeCake, 5000);
}

if (menuButton && siteNav) {
  menuButton.addEventListener("click", function () {
    var isOpen = siteNav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
}
