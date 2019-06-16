import * as utils from './utils.js';

const PHI = 1.61803398875;


const CORNER_RADIUS_WIDTH_RATIO = 0.015;


const TOP_CORNER_CSS_ATTRIBUTES = [
		"-moz-border-top-right-radius",
        "-webkit-border-top-right-radius",
        "-khtml-border-top-right-radius",
        "border-top-right-radius",
        "-moz-border-top-left-radius",
        "-webkit-border-top-left-radius",
        "-khtml-border-top-left-radius",
        "border-top-left-radius",
];


const BOTTOM_RIGHT_CORNER_CSS_ATTRIBUTES = [
		"-moz-border-bottom-right-radius",
        "-webkit-border-bottom-right-radius",
        "-khtml-border-bottom-right-radius",
        "border-bottom-right-radius",
];


const BOTTOM_LEFT_CORNER_CSS_ATTRIBUTES = [
        "-moz-border-bottom-left-radius",
        "-webkit-border-bottom-left-radius",
        "-khtml-border-bottom-left-radius",
        "border-bottom-left-radius",
];


function responsiveContent() {
    // set content height
    let contentWindow = $('#p-content');
    let width = contentWindow.width();
    contentWindow.height(width / PHI);

    // set content corner radii
    let cornerRadius = width * CORNER_RADIUS_WIDTH_RATIO;

    let leftContent = $('#p-content-left');
    for (let cssAttribute of BOTTOM_LEFT_CORNER_CSS_ATTRIBUTES) {
        leftContent.css(cssAttribute, cornerRadius);
    }

    let metronome = $('#p-content-metronome');
    for (let cssAttribute of BOTTOM_RIGHT_CORNER_CSS_ATTRIBUTES) {
        metronome.css(cssAttribute, cornerRadius);
    }
}


function responsiveMenu() {
    // set menu height
    let menu = $('#p-menu');
    let contentHeight = $('#p-content').height();
    let menuHeight = contentHeight / 9;
    menu.height(menuHeight);

    // set menu corner radii
    let menuWidth = menu.width();
    let cornerRadius = menuWidth * CORNER_RADIUS_WIDTH_RATIO;
    for (let cssAttribute of TOP_CORNER_CSS_ATTRIBUTES) {
        menu.css(cssAttribute, cornerRadius);
    }
}


function responsiveSize() {
    responsiveContent();
    responsiveMenu();
}


async function runPartita() {
    // Ensure external dependencies are present. If not, load them before carrying on.
    await utils.importJqueryIfAbsent();
    $(window).resize(responsiveSize);
    $(document).ready(responsiveSize);
}


runPartita();
