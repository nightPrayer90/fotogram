// #region global fields
const IMAGEFOLDER = "./img/fotos/"; // path foto directory
const IMAGENAMES = [
    "Fish1.jpg",
    "Fish2.jpg",
    "Fish3.jpg",
    "Fish4.jpg",
    "Fish5.jpg",
    "Fish6.jpg",
    "Fish7.jpg",
    "Fish8.jpg",
    "Fish9.jpg",
    "Fish10.jpg",
    "Fish11.jpg",
    "Fish12.jpg",
]; // array for all image names
let currentIndex = 0; // Run variable for the image currently selected in the dialog
let isDialogOpen = false; // flag for keyControls -> cant press Enter if a Dialog open
//#endregion

// #region init
/** Initializes the event listeners for selecting images in the dialog using the arrow keys.*/
function init() {
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            btnNextPicture();
        } else if (event.key === "ArrowRight") {
            event.preventDefault();
            btnNextPicture();
        } else if (event.key === "Enter") {
            event.preventDefault();
            if (isDialogOpen == false) {
                let actRef = document.activeElement;
                if (actRef.tagName == "IMG") openDialog(document.activeElement);
            } else handleDialogKeyControls(document.activeElement);
        } else if (event.key === "Escape") {
            isDialogOpen = false;
        }
    });

    // logic for backdrop close
    const dialog = document.getElementById("diagRoot");
    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
            btnCloseDialog();
        }
    });
}
//#endregion

// #region dialog controls
/**
 * Opens the dialog box for displaying the images.
 * @param {number} index - index of the image for which we are building the dialog
 */
function openDialog(img) {
    let diagRef = document.getElementById("diagRoot");
    let imagePath = img.getAttribute("src");
    currentIndex = getIndexByPath(imagePath);

    buildDialog();
    diagRef.showModal();
    isDialogOpen = true;
}

/** close the dialog */
function btnCloseDialog() {
    let diagRef = document.getElementById("diagRoot");
    diagRef.close();
    isDialogOpen = false;
}

/** handleDialogKeyboardFunctions */
function handleDialogKeyControls(element) {
    let elementId = element.getAttribute("id");

    switch (elementId) {
        case "diagButtonClose":
            btnCloseDialog();
            break;
        case "diagButtonLeft":
            btnPrevPicture();
            break;
        case "diagButtonRight":
            btnNextPicture();
            break;
    }
}

/** Dialog button - selection of the next image */
function btnNextPicture() {
    currentIndex++;
    if (currentIndex >= IMAGENAMES.length) {
        currentIndex = 0;
    }
    buildDialog(currentIndex);
}

/** Dialog button - selection of the previous image */
function btnPrevPicture() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = IMAGENAMES.length - 1;
    }
    buildDialog(currentIndex);
}
//#endregion

// #region dialog render
/**
 * The function changes the displayed path, the displayed image, and the image navigation.
 * @param {number} index - index of the image for which we are building the dialog
 */
function buildDialog() {
    setImageName();
    setImage();
    setImageNavText();
}

/** Dialog text - Changes the displayed name of the image */
function setImageName() {
    let pathTextRef = document.getElementById("diagImagePath");
    pathTextRef.innerText = IMAGENAMES[currentIndex];
}

/** Dialog image - Changes the displayed image*/
function setImage() {
    let imageRef = document.getElementById("diagImage");
    imageRef.setAttribute("src", getImagePath(currentIndex));
}

/** Dialog text - Changes the displayed image navigation number */
function setImageNavText() {
    let textRex = document.getElementById("diagImageCounter");
    textRex.innerText = `${+currentIndex + 1} / ${IMAGENAMES.length} `;
}
//#endregion

// #region Helper
/**
 * Helper to build the imagePath as string
 * @return {string} path of an image
 */
function getImagePath(index) {
    let path = IMAGEFOLDER + IMAGENAMES[index];
    return path;
}

/** Helper compares a path with the path array
 *  @return {number} index of the incomming image path
 */
function getIndexByPath(path) {
    for (let i = 0; i < IMAGENAMES.length; i++) {
        if (path == IMAGEFOLDER + IMAGENAMES[i]) {
            return i;
        }
    }
}
//#endregion
