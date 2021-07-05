/*Preset windows for Subrary*/

var layoutWindow = {
    name:'',
    id:'',
    btopid:'',
    html:``,
    css:``,
    js: ``,
}

var windowCreator = {
    name: 'Window Creator',
    id: 'windowcreator',
    btopid:'windowcreator:btop',
    html: `
    <div class="Sub-window" id="windowcreator">
            <div class="btop" id="windowcreator:btop">
                <label class="window_name" id="windowcreator:name">Window Creator</label>
                <div class="window_controls_container">
                    <input class="window_controls window_shrink_button" id="shrink_button" type="button" onclick="hide(this.parentElement.parentElement.parentElement)" value="-">
                    <input class="window_controls window_close_button" id="close_button" type="button" onclick="del(this.parentElement.parentElement.parentElement)" value="X">
                </div>
            </div>
            <div class="window_container" id="window_container1">
                <div id="windowcreator:tool">
                    <label>Window name : </label>
                    <input type="text" id='windowcreator:window_name'>
                    <label>HTML : </label>
                    <input type="text" id='windowcreator:html'>
                    <input type="button" value="Create" onclick="windowcreator('windowcreator:window_name', 'windowcreator:html')">
                </div>
            </div>
        </div>
    `,
    js: `function windowcreator(x, y){
        var name = getElm(x).value;
        var html = getElm(y).value;
        var lol = createWindow('main_container', name);
        windowlike(lol.firstChild.nextSibling, true);
        lol.lastChild.previousSibling.innerHTML = html;
    }`,
}

function spawnWindow(parent,wName){
    var p = getElm(parent)[0] || getElm(parent);
    p.innerHTML = p.innerHTML + wName.html;
    windowlike(wName.btopid, true);
    if(wName.css){
        s = addStyle(wName.css)
        s.id = wName.name + 'css'
    }
    if(wName.js){
        js = addScript(wName.js)
        js.id = wName.name + 'js'
    }
}