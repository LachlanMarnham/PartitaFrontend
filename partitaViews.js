import {DOMHandler} from './utils.js'


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

        return menu;
    }

    renderMenuButtons() {
        const numberOfButtons = 3;
        const buttonWidth = String(100 / numberOfButtons) + '%';

        let scalesButton = this.domHandler.makeCustomButton(
            'p-menuScalesButton',
            'Scales',
            buttonWidth,
            '100%',
            'btn-selected',
        );

        this.selectedButton = scalesButton;

        let repertoireButton = this.domHandler.makeCustomButton(
            'p-menuRepertoireButton',
            'Repertoire',
            buttonWidth,
            '100%',
        );

        let focusedPracticeButton = this.domHandler.makeCustomButton(
            'p-menuFocusedPracticeButton',
            'Focused Practice',
            buttonWidth,
            '100%',
        );

        return [scalesButton, repertoireButton, focusedPracticeButton];

    }

    renderContent() {
        var content = this.domHandler.makeNewDiv();
        content.attr('id', 'p-content');

        this.contentLeft = this.renderContentLeft();
        content.append(this.contentLeft);

        this.contentRight = this.renderContentRight();
        content.append(this.contentRight);
        return content;
    }

    renderContentLeft() {
        let contentLeft = this.domHandler.makeNewSpan();
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
        let contentScales = this.domHandler.makeNewDiv();
        contentScales.attr('id', 'p-content-scales');
        contentScales.addClass('renderedLayer');
        this.renderedLayer = contentScales;
        let scalesText = $('<p>SCALES!</p>');
        contentScales.append(scalesText);
        return contentScales;
    }

    renderRepertoire() {
        let contentRepertoire = this.domHandler.makeNewDiv();
        contentRepertoire.attr('id', 'p-content-repertoire');
        let repertoireText = $('<p>REPERTOIRE!</p>');
        contentRepertoire.append(repertoireText);
        return contentRepertoire;
    }

    renderFocusedPractice() {
        let contentFocusedPractice = this.domHandler.makeNewDiv();
        contentFocusedPractice.attr('id', 'p-content-focused-practice');
        let FocusedPracticeText = $('<p>FOCUSED PRACTICE!</p>');
        contentFocusedPractice.append(FocusedPracticeText);
        return contentFocusedPractice;
    }

    showNewLayer = (newLayerId, newSelectedButton) => {
        let newLayer = this.domHandler.getById(newLayerId);

        // Bring the selected layer to the top of the stack
        this.renderedLayer.removeClass('renderedLayer');
        newLayer.addClass('renderedLayer');
        this.renderedLayer = newLayer;

        // Mark the button corresponding to the selected layer as selected
        this.selectedButton.removeClass('btn-selected');
        newSelectedButton.addClass('btn-selected');
        this.selectedButton = newSelectedButton;
    }

    showScales = () => {
        this.showNewLayer('p-content-scales', this.scalesButton);
    }

    showRepertoire = () => {
        this.showNewLayer('p-content-repertoire', this.repertoireButton);
    }

    showFocusedPractice = () => {
        this.showNewLayer('p-content-focused-practice', this.focusedPracticeButton);
    }

    renderContentRight() {
        var contentRight = this.domHandler.makeNewSpan();
        contentRight.attr('id', 'p-content-right');

        this.tuner = this.renderTuner();
        contentRight.append(this.tuner);

        this.metronome = this.renderMetronome();
        contentRight.append(this.metronome);

        return contentRight;
    }

    renderTuner() {
        var tuner = this.domHandler.makeNewDiv();
        tuner.attr('id', 'p-content-tuner');
        return tuner;
    }

    renderMetronome() {
        var metronome = this.domHandler.makeNewDiv();
        metronome.attr('id', 'p-content-metronome');
        return metronome
    }
}


class Views {
    constructor(anchorId) {
        this.currentView = null;
        this.domHandler = new DOMHandler();
        this.anchor = this.domHandler.getById(anchorId);
        this.workingView = new WorkingView(this.anchor, this.domHandler);
    }

    renderWorkingView() {
        this.workingView.render();
        this.currentView = this.workingView;
    }
}

export {Views};
