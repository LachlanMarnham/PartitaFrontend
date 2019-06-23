class Controller {
    constructor(views, model) {
        this.views = views;
        this.model = model;
    }

    renderWorkingView() {
        this.views.renderWorkingView();
    }

    run() {
        this.renderWorkingView();

    }
}


export {Controller};
