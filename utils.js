function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}


function importWithScript(scriptType, scriptPath) {
    var script = document.createElement('script');
    script.type = scriptType;
    script.src = scriptPath;
    document.getElementsByTagName('head')[0].appendChild(script);
}


async function importJqueryIfAbsent() {
    if(!window.jQuery) {
        importWithScript("text/javascript", "https://code.jquery.com/jquery-3.3.1.min.js");

        // Don't return control until jQuery is usable
        while(!window.jQuery) {
            await sleep(50);
        }
    }
}


class DOMHandler {
    constructor() {
        this.window = $(window);
        this.document = $(document);
    }

    getById(id) {
        return $('#' + id);
    }

    getByClass(cls) {
        return $('.' + cls);
    }

    makeNewDiv() {
        return $('<div>');
    }

    makeNewSpan() {
        return $('<span>');
    }

    makeNewButton() {
        return $('<button>');
    }

    makeCustomButton(id, text, width, height, cls='') {
        let newButton = this.makeNewButton();
        newButton.attr('id', id);
        newButton.text(text);
        newButton.width(width);
        newButton.height(height);
        newButton.addClass(cls);
        return newButton;
    }

}


export {importJqueryIfAbsent, DOMHandler};
