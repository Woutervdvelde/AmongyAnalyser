const camera = document.getElementById("camera");
const positionContainer = document.getElementById("position-container");
const zoomContainer = document.getElementById("zoom-container");

let dragging = false;
let currentX = 0;
let currentY = 0;
let zoom = 1;
const zoomMin = .1;
const zoomMax = 40;
const zoomStep = .1;

camera.onwheel = (e) => {
    e.preventDefault(); //prevent page scrolling
    zoom = zoom + ((e.deltaY * -1) / 100 * zoomStep);
    if (zoom > zoomMax) zoom = zoomMax;
    if (zoom < zoomMin) zoom = zoomMin;
    setZoom(zoom);
}

const stopDragging = () => dragging = false;
camera.onmousedown = (e) => dragging = true;
camera.onmouseup = stopDragging;
camera.onmouseleave = stopDragging;

camera.onmousemove = (e) => {
    if (!dragging) return;
    currentX = currentX + (e.movementX / zoom);
    currentY = currentY + (e.movementY / zoom);
    setTransform(currentX, currentY);
}

const setTransform = (x, y) => {
    positionContainer.style.transform = `translateX(${x}px) translateY(${y}px)`;
    zoomContainer.style.transformOrigin = `${camera.clientWidth / 2 - x}px ${camera.clientWidth / 2 - y}px`;
}

const setZoom = (zoom) => {
    zoomContainer.style.transform = `scale(${zoom})`;
}

const reset = () => {
    zoom = 1;
    currentX = 0;
    currentY = 0;
    setTransform(currentX, currentY);
    setZoom(zoom);
}

window.addEventListener("load", e => setTransform(0,0));