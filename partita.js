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


class WorkingView {
    constructor(anchorId) {
        this.anchor = $('#' + anchorId);
        this.renderTree();
    }

    renderTree() {
        this.menu = this.renderMenu();
        console.log(this.button1.text());
        this.anchor.append(this.menu);

        this.content = this.renderContent();
        this.anchor.append(this.content);
    }

    renderMenu() {
        var menu = $('<div>');
        menu.attr('id', 'p-menu');
        var buttons = [this.button1, this.button2, this.button3] = this.renderMenuButtons();
        menu.append(buttons);
        return menu;
    }

    renderMenuButtons() {
        var button1 = $('<button>');
        button1.attr('id', 'p-menuButton-1');
        button1.text('Button 1');

        var button2 = $('<button>');
        button2.attr('id', 'p-menuButton-2');
        button2.text('Button 2');

        var button3 = $('<button>');
        button3.attr('id', 'p-menuButton-3');
        button3.text('Button 3');

        var buttons = [button1, button2, button3];
        var buttonWidth = String(100 / buttons.length) + '%';

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
        var contentLeft = $('<span>');
        contentLeft.attr('id', 'p-content-left');
        return contentLeft;
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

