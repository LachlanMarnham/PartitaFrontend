import * as utils from './utils.js';

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


function responsiveContent() {
    // set content height
    let contentWindow = $('#p-content');
    let width = contentWindow.width();
    contentWindow.height(width / PHI);

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
    let contentHeight = $('#p-content').height();
    let menuHeight = contentHeight / 9;
    menu.height(menuHeight);

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
    responsiveContent();
    responsiveMenu();
}


function showNewLayer(newLayerId) {
    let newLayer = $('#' + newLayerId);
    let oldLayer = $('.renderedLayer');
    oldLayer.removeClass('renderedLayer');
    newLayer.addClass('renderedLayer');
}


function showScales() {
    showNewLayer('p-content-scales');
}

function showRepertoire() {
    showNewLayer('p-content-repertoire');
}

function showFocusedPractice() {
    showNewLayer('p-content-focused-practice');
}


class WorkingView {
    constructor(anchorId) {
        this.anchor = $('#' + anchorId);
        this.renderTree();
    }

    renderTree() {
        this.menu = this.renderMenu();
        this.anchor.append(this.menu);

        this.content = this.renderContent();
        this.anchor.append(this.content);
    }

    renderMenu() {
        let menu = $('<div>');
        menu.attr('id', 'p-menu');
        let buttons = [
            this.scalesButton,
            this.repertoireButton,
            this.focusedPracticeButton,
        ] = this.renderMenuButtons();
        menu.append(buttons);

        this.scalesButton.click(showScales);
        this.repertoireButton.click(showRepertoire);
        this.focusedPracticeButton.click(showFocusedPractice);
        return menu;
    }

    renderMenuButtons() {
        let scalesButton = $('<button>');
        scalesButton.attr('id', 'p-menuScalesButton');
        scalesButton.text('Scales');

        let repertoireButton = $('<button>');
        repertoireButton.attr('id', 'p-menuRepertoireButton');
        repertoireButton.text('Repertoire');

        let focusedPracticeButton = $('<button>');
        focusedPracticeButton.attr('id', 'p-menuFocusedPracticeButton');
        focusedPracticeButton.text('Focused Practice');

        let buttons = [scalesButton, repertoireButton, focusedPracticeButton];
        const buttonWidth = String(100 / buttons.length) + '%';

        for (let button of buttons) {
            button.width(buttonWidth);
            button.height('100%');
        }
        return buttons;

    }

    renderContent() {
        var content = $('<div>');
        content.attr('id', 'p-content');

        this.contentLeft = this.renderContentLeft();
        content.append(this.contentLeft);

        this.contentRight = this.renderContentRight();
        content.append(this.contentRight);
        return content;
    }

    renderContentLeft() {
        let contentLeft = $('<span>');
        contentLeft.attr('id', 'p-content-left');

        this.contentScales = this.renderScales();
        contentLeft.append(this.contentScales);

        this.contentRepertoire = this.renderRepertoire();
        contentLeft.append(this.contentRepertoire);

        this.contentFocusedPractice = this.renderFocusedPractice();
        contentLeft.append(this.contentFocusedPractice);

        return contentLeft;
    }

    renderScales() {
        let contentScales = $('<div>');
        contentScales.attr('id', 'p-content-scales');
        contentScales.addClass('renderedLayer');
        let scalesText = $('<p>SCALES!</p>');
        contentScales.append(scalesText);
        return contentScales;
    }

    renderRepertoire() {
        let contentRepertoire = $('<div>');
        contentRepertoire.attr('id', 'p-content-repertoire');
        let repertoireText = $('<p>REPERTOIRE!</p>');
        contentRepertoire.append(repertoireText);
        return contentRepertoire;
    }

    renderFocusedPractice() {
        let contentFocusedPractice = $('<div>');
        contentFocusedPractice.attr('id', 'p-content-focused-practice');
        let FocusedPracticeText = $('<p>FOCUSED PRACTICE!</p>');
        contentFocusedPractice.append(FocusedPracticeText);
        return contentFocusedPractice;
    }

    renderContentRight() {
        var contentRight = $('<span>');
        contentRight.attr('id', 'p-content-right');

        this.tuner = this.renderTuner();
        contentRight.append(this.tuner);

        this.metronome = this.renderMetronome();
        contentRight.append(this.metronome);

        return contentRight;
    }

    renderTuner() {
        var tuner = $('<div>');
        tuner.attr('id', 'p-content-tuner');
        return tuner;
    }

    renderMetronome() {
        var metronome = $('<div>');
        metronome.attr('id', 'p-content-metronome');
        return metronome
    }
}


async function runPartita(anchorId) {
    // Ensure external dependencies are present. If not, load them before carrying on.
    await utils.importJqueryIfAbsent();

    var workingView = new WorkingView(anchorId);
    $(window).resize(responsiveSize);
    $(document).ready(responsiveSize);

}

runPartita('partita');
