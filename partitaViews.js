import {DOMHandler} from './utils.js'


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
    constructor(anchor, domHandler) {
        this.anchor = anchor;
        this.domHandler = domHandler;
    }

    render() {
        this.menu = this.renderMenu();
        this.anchor.append(this.menu);

        this.content = this.renderContent();
        this.anchor.append(this.content);
    }

    renderMenu() {
        let menu = this.domHandler.makeNewDiv();
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
        const numberOfButtons = 3;
        const buttonWidth = String(100 / numberOfButtons) + '%';

        let scalesButton = this.domHandler.makeMenuButton(
            'p-menuScalesButton',
            'Scales',
            buttonWidth,
            '100%',
        );

        let repertoireButton = this.domHandler.makeMenuButton(
            'p-menuRepertoireButton',
            'Repertoire',
            buttonWidth,
            '100%',
        );

        let focusedPracticeButton = this.domHandler.makeMenuButton(
            'p-menuFocusedPracticeButton',
            'Focused Practice!',
            buttonWidth,
            '100%',
        );

        return [scalesButton, repertoireButton, focusedPracticeButton];

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


class Views {
    constructor(anchorId) {
        this.currentView = null;
        this.domHandler = new DOMHandler();
        this.anchor = this.domHandler.getById(anchorId); //$('#' + anchorId);
        this.workingView = new WorkingView(this.anchor, this.domHandler);
    }

    renderWorkingView() {
        this.workingView.render();
        this.currentView = this.workingView;
    }
}

export {Views};
