class Controller {
    constructor(views, model) {
        this.views = views;
        this.model = model;
        this.model.populate();
    }

    renderWorkingView() {
        this.views.renderWorkingView();

        this.views.workingView.scalesButton.click(this.views.workingView.showScales);
        this.views.workingView.repertoireButton.click(this.views.workingView.showRepertoire);
        this.views.workingView.focusedPracticeButton.click(this.views.workingView.showFocusedPractice);
    }

    run() {
        this.renderWorkingView();
    }
}


export {Controller};
