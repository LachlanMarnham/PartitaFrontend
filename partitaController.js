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

class Controller {
    constructor(views, model) {
        this.views = views;
        this.model = model;
    }

    renderWorkingView() {
        this.views.renderWorkingView();

        this.views.workingView.scalesButton.click(showScales);
        this.views.workingView.repertoireButton.click(showRepertoire);
        this.views.workingView.focusedPracticeButton.click(showFocusedPractice);

    }

    run() {
        this.renderWorkingView();

    }
}


export {Controller};
