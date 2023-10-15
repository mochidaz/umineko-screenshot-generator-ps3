function load_images(key, position, id) {

    const imagesContainer = document.getElementById(id);

    while (imagesContainer.firstChild) {
        imagesContainer.removeChild(imagesContainer.firstChild);
    }

    let currentSprite = spriteMap[key]

    for (let i = 0; i < currentSprite.length; i++) {

        const imgElement = document.createElement("img");

        imgElement.src = currentSprite[i]

        imgElement.style.objectFit = "cover";
        imgElement.style.objectPosition = "center center";
        imgElement.style.width = "100px";
        imgElement.style.height = "100px";
        imgElement.style.margin = "5px";
        imgElement.style.border = "2px solid"
        imgElement.onclick = function() {
            if (position === "left") {
                left = currentSprite[i]
                const selected = document.getElementById("selectedLeftSprite");
                selected.src = currentSprite[i]
            } else if (position === "center") {
                center = currentSprite[i] 
                const selected = document.getElementById("selectedCenterSprite");
                selected.src = currentSprite[i]
            } else if (position === "right") {
                right = currentSprite[i]
                const selected = document.getElementById("selectedRightSprite");
                selected.src = currentSprite[i]
            } else if (position === "metaWorldLeft") {
                metaLeft = currentSprite[i]
                const selected = document.getElementById("selectedMetaLeftSprite");
                selected.src = currentSprite[i]
            }
            else if (position === "metaWorldCenter") {
                metaCenter = currentSprite[i]
                const selected = document.getElementById("selectedMetaCenterSprite");
                selected.src = currentSprite[i]
            }
            else if (position === "metaWorldRight") {
                metaRight = currentSprite[i]
                const selected = document.getElementById("selectedMetaRightSprite");
                selected.src = currentSprite[i]
            }
        }

        imagesContainer.appendChild(imgElement);
    }
}


function createThumbnails(map, position, id, imageId) {
    const thumbnailsContainer = document.getElementById(id);
    const imageContainer = document.getElementById(imageId);

    let sprites = load_thumbnails(map)

    for (let i = 0; i < sprites.length; i++) {
        const sprite = sprites[i];
        const spriteName = sprite[0];
        const spritePath = sprite[1];

        const imgElement = document.createElement("img");

        imgElement.src = spritePath;

        imgElement.style.objectFit = "cover";
        imgElement.style.objectPosition = "center center";
        imgElement.style.width = "100px";
        imgElement.style.height = "100px";
        imgElement.style.margin = "5px";
        imgElement.style.border = "2px solid"

        imgElement.onclick = function () {
            load_images(spriteName, position, imageId)
        }

        thumbnailsContainer.appendChild(imgElement);
    }

    const imgElement = document.createElement("img");
    imgElement.src = "";
    imgElement.style.objectFit = "cover";
    imgElement.style.objectPosition = "center center";
    imgElement.style.width = "100px";
    imgElement.style.height = "100px";
    imgElement.style.margin = "5px";
    imgElement.style.border = "2px solid"
    imgElement.onclick = function() {
        if (position === "left") {
            left = ""
            const selected = document.getElementById("selectedLeftSprite");
            selected.src = ""
            while (imageContainer.firstChild) {
                imageContainer.removeChild(imageContainer.firstChild);
            }
        } else if (position === "center") {
            center = ""
            const selected = document.getElementById("selectedCenterSprite");
            selected.src = ""
            while (imageContainer.firstChild) {
                imageContainer.removeChild(imageContainer.firstChild);
            }
        } else if (position === "right") {
            right = ""
            const selected = document.getElementById("selectedRightSprite");
            selected.src = ""
            while (imageContainer.firstChild) {
                imageContainer.removeChild(imageContainer.firstChild);
            }
        } else if (position === "metaWorldLeft") {
            metaLeft = ""
            const selected = document.getElementById("selectedMetaLeftSprite");
            selected.src = ""
            while (imageContainer.firstChild) {
                imageContainer.removeChild(imageContainer.firstChild);
            }
        } else if (position === "metaWorldCenter") {
            metaCenter = ""
            const selected = document.getElementById("selectedMetaCenterSprite");
            selected.src = ""
            while (imageContainer.firstChild) {
                imageContainer.removeChild(imageContainer.firstChild);
            }
        }
        else if (position === "metaWorldRight") {
            metaRight = ""
            const selected = document.getElementById("selectedMetaRightSprite");
            selected.src = ""
            while (imageContainer.firstChild) {
                imageContainer.removeChild(imageContainer.firstChild);
            }
        }
    }

    thumbnailsContainer.appendChild(imgElement);
}