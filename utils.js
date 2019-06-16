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

export {importJqueryIfAbsent};
