import * as utils from './utils.js';
import * as partitaController from './partitaController.js';
import * as partitaViews from './partitaViews.js'


const PHI = 1.61803398875;


const CORNER_RADIUS_WIDTH_RATIO = 0.015;


const TOP_LEFT_CORNER_CSS_ATTRIBUTES = [
        "-moz-border-top-left-radius",
        "-webkit-border-top-left-radius",
        "-khtml-border-top-left-radius",
        "border-top-left-radius",
];


const TOP_RIGHT_CORNER_CSS_ATTRIBUTES = [
		"-moz-border-top-right-radius",
        "-webkit-border-top-right-radius",
        "-khtml-border-top-right-radius",
        "border-top-right-radius",
];


const TOP_CORNER_CSS_ATTRIBUTES = TOP_LEFT_CORNER_CSS_ATTRIBUTES.concat(TOP_RIGHT_CORNER_CSS_ATTRIBUTES);


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


const BOTTOM_CORNER_CSS_ATTRIBUTES = BOTTOM_LEFT_CORNER_CSS_ATTRIBUTES.concat(BOTTOM_RIGHT_CORNER_CSS_ATTRIBUTES);


const CORNER_CSS_ATTRIBUTES = TOP_CORNER_CSS_ATTRIBUTES.concat(BOTTOM_CORNER_CSS_ATTRIBUTES);


function responsiveWrapper() {
    let partitaWrapper = $('#partita');
    let width = partitaWrapper.width();
    partitaWrapper.height(width / PHI);

    let cornerRadius = width * CORNER_RADIUS_WIDTH_RATIO;

    for (let cssAttribute of CORNER_CSS_ATTRIBUTES) {
        partitaWrapper.css(cssAttribute, cornerRadius);
    }
}


function responsiveContent() {
    // set content height
    let contentWindow = $('#p-content');
    let wrapperHeight = $('#partita').height();

    let width = contentWindow.width();
    contentWindow.height(wrapperHeight * 0.9);

    // set content corner radii
    let cornerRadius = width * CORNER_RADIUS_WIDTH_RATIO;

    let leftContent = $('#p-content-left');
    for (let cssAttribute of BOTTOM_LEFT_CORNER_CSS_ATTRIBUTES) {
        // The contentWindow is a wrapper which isn't visible, but
        // it has a visible boarder so that needs to be curved
        contentWindow.css(cssAttribute, cornerRadius);

        // We have scales, repertoire etc as different layers in the
        // leftContent window. To view them we simply change their
        // z-indices. This means we have to curve their respective corners
        // separately to get the right effect
        for (let contentViewLayer of leftContent.children()) {
            $(contentViewLayer).css(cssAttribute, cornerRadius);
        }
    }

    let metronome = $('#p-content-metronome');
    for (let cssAttribute of BOTTOM_RIGHT_CORNER_CSS_ATTRIBUTES) {
        metronome.css(cssAttribute, cornerRadius);
        contentWindow.css(cssAttribute, cornerRadius);
    }
}


function responsiveMenu() {
    // set menu height
    let menu = $('#p-menu');
    let wrapperHeight = $('#partita').height();
    menu.height(wrapperHeight * 0.1);

    // set menu corner radii
    let menuWidth = menu.width();
    let cornerRadius = menuWidth * CORNER_RADIUS_WIDTH_RATIO;
    for (let cssAttribute of TOP_CORNER_CSS_ATTRIBUTES) {
        menu.css(cssAttribute, cornerRadius);
    }

    let buttons = menu.children();
    let leftButton = $(buttons[0]);
    let rightButton = $(buttons[buttons.length - 1]);

    for (let cssAttribute of TOP_LEFT_CORNER_CSS_ATTRIBUTES) {
        leftButton.css(cssAttribute, cornerRadius);
    }

    for (let cssAttribute of TOP_RIGHT_CORNER_CSS_ATTRIBUTES) {
        rightButton.css(cssAttribute, cornerRadius);
    }
}


function responsiveSize() {
    responsiveWrapper();
    responsiveContent();
    responsiveMenu();
}


async function runPartita(anchorId) {
    // Ensure external dependencies are present. If not, load them before carrying on.
    await utils.importJqueryIfAbsent();

    var views = new partitaViews.Views(anchorId);
    var controller = new partitaController.Controller(views, null);

    controller.run();

    $(window).resize(responsiveSize);
    $(document).ready(responsiveSize);

}


runPartita('partita');
