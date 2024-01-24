var left = "";
var center = "";
var right = "";
var bg = "";

var metaLeft = "";
var metaCenter = "";
var metaRight = "";

function generateImage() {
  // Update current image to collection
  const position = document.getElementById("position").value;
  const world = document.getElementById("world").value;
  let currentImage = document.querySelector(
    `#imageContainer img[data-world='${world}'][data-position='${position}']`
  );
  const carouselItem = document.querySelector(
    "#spriteContainer .carousel-item.active img"
  );

  if (carouselItem) {
    currentImage.src = carouselItem.src;
    currentImage.dataset.show = "true";
  } else currentImage.dataset.show = "false";

  // Generate preview
  generate();
}

function appendToList() {
  const imageList = document.getElementById("usedCharactersList");
  const backgroundList = document.getElementById("usedBackgroundList");
  const usedImages = document.getElementById("imageContainer").children;
  const usedBackgrounds = document.getElementById("backgroundContainer").children;

  while (backgroundList.firstChild) {
    backgroundList.removeChild(backgroundList.firstChild);
  }
  while (imageList.firstChild) {
    imageList.removeChild(imageList.firstChild);
  }

  for (const child of usedImages) {
    if (child.dataset.show === "true") {
      const image = new Image();
      image.src = child.src;
      image.style.objectFit = "cover";
      image.style.objectPosition = "center center";
      image.style.width = "100px";
      image.style.height = "100px";
      image.style.margin = "5px";
      image.style.border = "2px solid";
      imageList.appendChild(image);
    }
  }

  for (const child of usedBackgrounds) {
    if (child.classList.contains("active")) {
      const image = new Image();
      image.src = child.children[0].src;
      image.style.objectFit = "cover";
      image.style.objectPosition = "center center";
      image.style.width = "100px";
      image.style.height = "100px";
      image.style.margin = "5px";
      image.style.border = "2px solid";
      backgroundList.appendChild(image);
    }
  }
}

function generate() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let font = new FontFace(
    "SazanamiGothic",
    "url(./assets/fonts/sazanami-gothic.ttf)"
  );
  font
    .load()
    .then(function (loaded_face) {
      document.fonts.add(loaded_face);
    })
    .catch(function (error) {
      console.log(error);
    });

  ctx.filter = "brightness(55%)";
  let bgImage = document.querySelector(
    "#backgroundContainer .carousel-item.active > img"
  );
  if (bgImage) ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

  // Setup image
  const imageContainer = document.getElementById("imageContainer");
  let meta = false;
  if (
    document.querySelector(
      "#imageContainer img[data-world='meta'][data-show='true']"
    )
  ) {
    meta = true;
  }

  for (const child of imageContainer.children) {
    if (child.dataset.show === "true") {
      appendToList();
      switch (child.dataset.world) {
        case "normal":
        default:
          if (meta) ctx.filter = "brightness(30%)";

          switch (child.dataset.position) {
            case "left":
            default:
              ctx.drawImage(
                child,
                canvas.width * -0.13,
                canvas.width * -0.05,
                canvas.width * 0.75,
                canvas.width * 0.6
              );
              break;
            case "right":
              ctx.drawImage(
                child,
                canvas.width * 0.41,
                canvas.width * -0.05,
                canvas.width * 0.75,
                canvas.width * 0.6
              );
              break;
            case "center":
              ctx.drawImage(
                child,
                canvas.width * 0.15,
                canvas.width * -0.05,
                canvas.width * 0.75,
                canvas.width * 0.6
              );
              break;
          }
          break;
        case "meta":
          let metaOverlay = new Image();
          metaOverlay.src = "./assets/metaworld/hana1.webp";
          ctx.drawImage(metaOverlay, 0, 0, canvas.width, canvas.height);

          ctx.filter = "brightness(55%)";
          switch (child.dataset.position) {
            case "left":
              ctx.drawImage(
                child,
                canvas.width * -0.25,
                canvas.width * -0.05,
                canvas.width * 0.75,
                canvas.width * 0.6
              );
            default:
              break;
            case "right":
              ctx.drawImage(
                child,
                canvas.width * 0.41,
                canvas.width * -0.05,
                canvas.width * 0.75,
                canvas.width * 0.6
              );
              break;
            case "center":
              ctx.drawImage(
                child,
                canvas.width * 0.15,
                canvas.width * -0.05,
                canvas.width * 0.75,
                canvas.width * 0.6
              );
              break;
          }
          break;
      }
    }
  }

  ctx.globalAlpha = 1;
  ctx.filter = "none";

  // Set font size to be responsive with window
  ctx.font = (8 * 100) / window.innerHeight + "vh SazanamiGothic";
  const textX = canvas.width * 0.065;
  const textY = canvas.width * 0.055;
  const maxTextWidth = canvas.width - canvas.width * 0.065 * 2;
  const lineHeight = canvas.width * 0.034;
  const text = document.getElementById("text-content").value ?? "";
  ctx.textShadow = "2px 2px #000000";
  wrapText(ctx, text, textX, textY, maxTextWidth, lineHeight);
}

function downloadImage() {
  console.log("Downloading image...");
  // Create a new image with concrete setting
  const canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 600;

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let font = new FontFace(
    "SazanamiGothic",
    "url(./assets/fonts/sazanami-gothic.ttf)"
  );
  font
    .load()
    .then(function (loaded_face) {
      document.fonts.add(loaded_face);
    })
    .catch(function (error) {
      console.log(error);
    });

  ctx.filter = "brightness(55%)";

  bgImage = document.querySelector(
    "#backgroundContainer .carousel-item.active > img"
  );
  if (bgImage) ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

  // Setup image
  const imageContainer = document.getElementById("imageContainer");
  let meta = false;
  if (
    document.querySelector(
      "#imageContainer img[data-world='meta'][data-show='true']"
    )
  ) {
    meta = true;
  }
  const scaleFactor = 1.2;
  let adder;

  for (const child of imageContainer.children) {
    if (child.dataset.show === "true") {
      switch (child.dataset.world) {
        case "normal":
        default:
          if (meta) ctx.filter = "brightness(30%)";

          switch (child.dataset.position) {
            case "left":
            default:
              adder = 400;
              const leftImageWidth = child.width * scaleFactor;
              const leftImageHeight = child.height * scaleFactor;
              if (child.width > 500) {
                adder = 300;
              } else if (child.width < 400) {
                adder = 425;
              }
              const leftImageX = canvas.width - leftImageWidth - adder;
              const leftImageY = canvas.height - leftImageHeight + 60;
              ctx.drawImage(
                child,
                leftImageX,
                leftImageY,
                leftImageWidth,
                leftImageHeight
              );
              break;
            case "right":
              const rightImageWidth = child.width * scaleFactor;
              const rightImageHeight = child.height * scaleFactor;
              adder = 150;
              if (rightImageWidth < 500) {
                adder = 50;
              }
              const rightImageX = canvas.width - rightImageWidth / 2 - 170;
              const rightImageY = canvas.height - rightImageHeight + 50;
              ctx.drawImage(
                child,
                rightImageX,
                rightImageY,
                rightImageWidth,
                rightImageHeight
              );
              break;
            case "center":
              const centerImageWidth = child.width * scaleFactor;
              const centerImageHeight = child.height * scaleFactor;
              const centerImageX = canvas.width / 2 - centerImageWidth / 2;
              const centerImageY = canvas.height - centerImageHeight + 70;
              ctx.drawImage(
                child,
                centerImageX,
                centerImageY,
                centerImageWidth,
                centerImageHeight
              );
              break;
          }
          break;
        case "meta":
          let metaOverlay = new Image();
          metaOverlay.src = "./assets/metaworld/hana1.webp";
          ctx.drawImage(metaOverlay, 0, 0, canvas.width, canvas.height);

          ctx.filter = "brightness(55%)";
          switch (child.dataset.position) {
            case "left":
              const metaLeftImageWidth = child.width * scaleFactor;
              const metaLeftImageHeight = child.height * scaleFactor;
              const metaLeftImageX = canvas.width - metaLeftImageWidth - 400;
              const metaLeftImageY = canvas.height - metaLeftImageHeight + 60;
              ctx.drawImage(
                child,
                metaLeftImageX,
                metaLeftImageY,
                metaLeftImageWidth,
                metaLeftImageHeight
              );
            default:
              break;
            case "right":
              const metaRightImageWidth = child.width * scaleFactor;
              const metaRightImageHeight = child.height * scaleFactor;
              const metaRightImageX =
                canvas.width - metaRightImageWidth / 2 - 170;
              const metaRightImageY = canvas.height - metaRightImageHeight + 50;
              ctx.drawImage(
                child,
                metaRightImageX,
                metaRightImageY,
                metaRightImageWidth,
                metaRightImageHeight
              );
              break;
            case "center":
              const metaCenterImageWidth = child.width * scaleFactor;
              const metaCenterImageHeight = child.height * scaleFactor;
              const metaCenterImageX =
                canvas.width / 2 - metaCenterImageWidth / 2;
              const metaCenterImageY =
                canvas.height - metaCenterImageHeight + 70;
              ctx.drawImage(
                child,
                metaCenterImageX,
                metaCenterImageY,
                metaCenterImageWidth,
                metaCenterImageHeight
              );
              break;
          }
          break;
      }
    }
  }

  ctx.globalAlpha = 1;
  ctx.filter = "none";

  ctx.font = "26px SazanamiGothic";
  const textX = 50;
  const textY = 70;
  const maxTextWidth = 750;
  const lineHeight = 40;
  const text = document.getElementById("text-content").value ?? "";
  ctx.textShadow = "2px 2px #000000";
  wrapText(ctx, text, textX, textY, maxTextWidth, lineHeight);
  const dataURL = canvas.toDataURL("image/png");
  const downloadLink = document.createElement("a");
  downloadLink.href = dataURL;
  downloadLink.download = "image.png";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const colorCodes = {
    red: "#ff0000",
    blue: "#5decff",
    golden: "#ffcc00",
  };

  const regex = /\[(\w+)\](.*?)\[\/\w+\]|([^\[\n]+)|(\n)/g;
  let match;
  let currentX = x;
  let currentY = y;

  while ((match = regex.exec(text)) !== null) {
    const [fullMatch, color, content, plainText, newLine] = match;

    if (newLine) {
      currentY += lineHeight;
      currentX = x;
    } else if (color) {
      const textColor = colorCodes[color] || "white";
      const words = content.split(" ");
      let line = "";

      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + " ";
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;

        if (currentX + testWidth > x + maxWidth) {
          ctx.fillStyle = textColor;
          ctx.fillText(line, currentX, currentY);
          currentY += lineHeight;
          line = words[i] + " ";
          currentX = x;
        } else {
          line = testLine;
        }
      }

      ctx.fillStyle = textColor;
      ctx.fillText(line, currentX, currentY);

      const lineMetrics = ctx.measureText(line);
      currentX += lineMetrics.width - ctx.measureText(" ").width;
    } else if (plainText) {
      const words = plainText.split(" ");
      let line = "";

      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + " ";
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;

        if (currentX + testWidth > x + maxWidth) {
          ctx.fillStyle = "white";
          ctx.fillText(line, currentX, currentY);
          currentY += lineHeight;
          line = words[i] + " ";
          currentX = x;
        } else {
          line = testLine;
        }
      }

      ctx.fillStyle = "white";
      ctx.fillText(line, currentX, currentY);

      const lineMetrics = ctx.measureText(line);
      currentX += lineMetrics.width - ctx.measureText(" ").width;
    }
  }
}

window.addEventListener("load", function () {
  document.getElementById("loadingScreen").style.display = "none";

  // Auto insert tag to text
  const truthButton = document.getElementsByClassName("truth");
  for (let i = 0; i < truthButton.length; i++) {
    truthButton[i].onclick = function () {
      const textarea = document.getElementById("text-content");
      const currentCursorPosition = textarea.selectionEnd;
      const currentTextareaValue = textarea.value;

      // Add new tag
      textarea.value = `${currentTextareaValue}[${truthButton[i].value}][/${truthButton[i].value}]`;

      // Focus the cursor to the textarea
      textarea.focus();

      // Move the cursor to inside the newly added tag
      textarea.selectionEnd =
        currentCursorPosition + `[${truthButton[i].value}]`.length;
    };
  }

  // Add background image to carousel based on category
  document.getElementById("bg-filter").addEventListener("change", function () {
    const backgroundContainer = document.getElementById("backgroundContainer");
    backgroundContainer.innerHTML = "";

    if (this.value === "none") {
      document.getElementById("carousel-bg").style.display = "none";
      const bcl = document.getElementById("usedBackgroundList")
        while (bcl.firstChild) {
            bcl.removeChild(bcl.firstChild);
        }
    } else {
      document.getElementById("carousel-bg").style.display = "block";

      for (let i = 0; i < backgroundList[this.value].length; i++) {
        const carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");
        if (i === 0) carouselItem.classList.add("active");

        const bgImage = new Image();

        bgImage.src = backgroundList[this.value][i].background;
        generateBackgroundVariation(backgroundList[this.value])
        carouselItem.appendChild(bgImage);
        backgroundContainer.appendChild(carouselItem);
      }
    }
  });

  // Add sprite image to carousel based on character
  document
    .getElementById("character-filter")
    .addEventListener("change", function () {
      const spriteContainer = document.getElementById("spriteContainer");
      spriteContainer.innerHTML = "";

      if (this.value === "none") {
        document.getElementById("carousel-sprite").style.display = "none";
        const ucl = document.getElementById("usedCharactersList")
        while (ucl.firstChild) {
          ucl.removeChild(ucl.firstChild);
        }
      } else {
        document.getElementById("carousel-sprite").style.display = "block";

        for (let i = 0; i < spriteMap[this.value].length; i++) {
          const carouselItem = document.createElement("div");
          carouselItem.classList.add("carousel-item");
          if (i === 0) carouselItem.classList.add("active");

          const spriteImage = new Image();

          spriteImage.src = spriteMap[this.value][i].sprite;
          generateSpriteVariation(spriteMap[this.value])

          carouselItem.appendChild(spriteImage);
          spriteContainer.appendChild(carouselItem);
        }
      }
    });
});


// generate a list of available sprite variations and if pressed, move carousel to that sprite
function generateSpriteVariation(map) {
  const characterContainer = document.getElementById("characterSelection");
  characterContainer.innerHTML = "";
  const character = document.getElementById("character-filter").value;
  const sprite = map;
  for (let i = 0; i < sprite.length; i++) {
    const spriteImage = new Image();
    spriteImage.src = sprite[i].thumbnail;
    spriteImage.loading = "lazy";
    spriteImage.style.objectFit = "cover";
    spriteImage.style.objectPosition = "center center";
    spriteImage.style.width = "100px";
    spriteImage.style.height = "100px";
    spriteImage.style.margin = "5px";
    spriteImage.style.border = "2px solid";
    spriteImage.onclick = function () {
      moveCarouselToSprite(i);
    };
    characterContainer.appendChild(spriteImage);
  }
}

// generate a list of available backgrounds and if pressed, move carousel to that background
function generateBackgroundVariation(map) {
  const backgroundContainer = document.getElementById("backgroundSelection");
  backgroundContainer.innerHTML = "";
  const background = document.getElementById("bg-filter").value;
  const bg = map;
for (let i = 0; i < bg.length; i++) {
    const bgImage = new Image();
    bgImage.src = bg[i].thumbnail;
    bgImage.loading = "lazy";
    bgImage.style.objectFit = "cover";
    bgImage.style.objectPosition = "center center";
    bgImage.style.width = "100px";
    bgImage.style.height = "100px";
    bgImage.style.margin = "5px";
    bgImage.style.border = "2px solid";
    bgImage.onclick = function () {
      moveCarouselToBackground(i);
    };
    backgroundContainer.appendChild(bgImage);
  }
}

function moveCarouselToBackground(bgIndex) {
  const bgContainer = document.getElementById("backgroundContainer");
  const carouselItems = bgContainer.querySelectorAll(".carousel-item");

  carouselItems.forEach(item => {
    item.classList.remove("active");
  });

  carouselItems[bgIndex].classList.add("active");

  carouselItems[bgIndex].scrollIntoView({behavior: "smooth", block: "center"});
}

function moveCarouselToSprite(spriteIndex) {
  const spriteContainer = document.getElementById("spriteContainer");
  const carouselItems = spriteContainer.querySelectorAll(".carousel-item");

  carouselItems.forEach(item => {
    item.classList.remove("active");
  });

  carouselItems[spriteIndex].classList.add("active");

  carouselItems[spriteIndex].scrollIntoView({behavior: "smooth", block: "center"});
}