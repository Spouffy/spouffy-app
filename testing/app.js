
function addApp(appname, iconpath) {
    var i = getElm('apps').length || 0;
    apps = getElm('apps_container')[0];
    apps.innerHTML = apps.innerHTML + `
    <div class="apps">
        <div id="app${i}">
            <button class='apps_buttons' id='${appname}:launcher' onclick="spawnWindow('main_container', ${appname});">
                <img class='apps_icons' src="${iconpath}" alt="">
            </button>
        </div>
    </div>`
}

on('click', 'apps_buttons', function (e) {
    this.parentElement.style.background = 'red'
})