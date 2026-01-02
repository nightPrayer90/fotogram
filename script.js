// #region global fields
const IMAGEFOLDER = "./img/fotos/"; // path foto directory
const IMAGENAMES = [
    "fish1.jpg",
    "fish2.jpg",
    "fish3.jpg",
    "fish4.jpg",
    "fish5.jpg",
    "fish6.jpg",
    "fish7.jpg",
    "fish8.jpg",
    "fish9.jpg",
    "fish10.jpg",
    "fish11.jpg",
    "fish12.jpg",
]; // array for all image names
let currentIndex = 0; // Run variable for the image currently selected in the dialog
let isDialogOpen = false; // flag for keyControls -> cant press Enter if a Dialog open
//#endregion

// #region init
/** Initializes the event listeners for selecting images in the dialog using the arrow keys.*/
function init() {
    addEventKeyControls();
    addEventCloseBackdropClick();
}

/**logic for backdrop close */
function addEventCloseBackdropClick() {
    //
    const dialog = document.getElementById("diagRoot");
    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
            btnCloseDialog();
        }
    });
}

/** add EventListeners for key controls  */
function addEventKeyControls() {
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            btnNextPicture();
        } else if (event.key === "ArrowRight") {
            event.preventDefault();
            btnNextPicture();
        } else if (event.key === "Enter") {
            event.preventDefault();
            handleEnterKey();
        } else if (event.key === "Escape") {
            isDialogOpen = false;
        }
    });
}
//#endregion

//#region Events 
/** handle Enter Key*/
function handleEnterKey() {
    let actRef = document.activeElement;
    if (isDialogOpen == false) {
        if (actRef.tagName == "IMG") openDialog(actRef);
    } else handleDialogKeyControls(actRef);
}

/** handle dialog keyboard controls */
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

/** Dialog button - selection of the next image */
function btnNextPicture() {
    currentIndex++;
    if (currentIndex >= IMAGENAMES.length) {
        currentIndex = 0;
    }
    buildDialog();
}

/** Dialog button - selection of the previous image */
function btnPrevPicture() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = IMAGENAMES.length - 1;
    }
    buildDialog();
}
//#endregion

// #region dialog render
/**
 * The function changes the displayed path, the displayed image, and the image navigation.
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
