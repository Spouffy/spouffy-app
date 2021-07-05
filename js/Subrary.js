// Spouffy's library
// Open source

/*GLOBAL VARIABLES*/
    /* for del() */
        var DeletedElements = [];
    /* for createWindow() */
        var StyleState = false;
        var i = 1;
        var windowHTML = `
        <div class="btop" id='window`+i+`btop'>
            <label class="window_name" id='window_name` + i + `' >Window</label>
            <div class="window_controls_container">
                <input class="window_controls" class='window_shrink_button' id="shrink_button" type="button" onclick='hide(this.parentElement.parentElement.parentElement)' value="-">
                <input class="window_controls" class='window_close_button' id='close_button' type="button" onclick="del(this.parentElement.parentElement.parentElement)" value="X">
            </div>
        </div>
        <div class="window_container" id='window_container`+i+ `'>
        </div>
        `;
        var windowCSS = `
        .Sub-window{
            width: 20vw;
            box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.575);
            overflow: hidden;
            resize: both;
            border: 2px black solid;
            border-top: none;
        }
            .btop{
                display: flex;
                background-color: black;
                justify-content: space-between;
            }
                .window_name{
                    font-family: sans-serif;
                    color: white;
                    margin-left: 5px;
                    margin-top: 2px;
                }
                .window_controls_container{
                }
                .window_controls{
                    border: none;
                    border-radius: 0px;
                    outline: none;
                    box-shadow: none;
                    color: white;
                    width: 2vw;
                    height: 3vh;
                }
                    .window_close_button{
                    }
                    .window_close_button:hover{
                        background-color: red;
                    }

                    .window_shrink_button{
                    }
                    #window_shrink_button:hover{
                        background-color: yellow;
                    }
            .window_container{
                min-width: 10vw;
                min-height: 15vh;
                display: block;
            }
        `

function l(v){console.log(v)}

function getElm(target){
    try {
        var a = document.getElementById(target);
    } catch (error) {}
    try {
        var b = document.getElementsByClassName(target);
    } catch (error) {}
    try {
        var c = document.getElementsByTagName(target)
    } catch (error) {}
    if(a !== null){
        var e = a;
        return e;
    }else if(b.length !== 0){
        var e = b;
        return e;
    }else if(c.length !== 0){
        var e = c;
        return e;
    }else if(target.tagName){
        var e = target;
        return e;
    }else {l("Element doesn't exist")}
}

function hide(e){
    try {
        getElm(e).style.display = 'none'
    } catch (error) {
    }
    try {
        var x = getElm(e);
        for (let i = 0; i < x.length; i++) {
            x[i].style.display = 'none';  
        }
    } catch (error) {
    }
}

function show(e){
    try {
        getElm(e).style.display = 'block'
    } catch (error) {
    }
    try {
        var x = getElm(e);
        for (let i = 0; i < x.length; i++) {
            x[i].style.display = 'block';  
        }
    } catch (error) {
    }
}

function ElmFollowCursor(delay, id){
    if(delay === 0 || delay > 0){
        let cursor = document.getElementById(id);
        function follow(e){
            cursor.style.position = 'absolute';
            cursor.style.pointerEvents = 'none';
            setTimeout(function(){
                cursor.style.left = (e.pageX - 16) + 'px';
                cursor.style.top = (e.pageY - 16) + 'px';
            }, delay);
        }
        document.addEventListener('mousemove', function func(e){
            follow(e);
            return func;
        })
        
    }else{
        console.error('imgFollowCursor : please, provide an integer and then a string. EX: ElmFollowCursor(100, "imgId")');
}}

function pgcd(min, max){
    var max = Math.max(min,max);
    var min = Math.min(min,max);
    var temp;
    var state = false;
    var bigger;
    var smaller;
    if (min > max || min < max){
            state = false;
            temp = max - min;
            bigger = Math.max(temp, min);
            smaller = Math.min(temp, min);
        while(!state){
                temp = bigger - smaller;
                bigger = Math.max(temp, smaller);
                smaller = Math.min(temp, smaller);
            if(temp == 0){
                state = true;
                return bigger;
            }
    }
    }
}

function randomInt(min, max){
    rand = Math.round(Math.random() * (max - min) ) + min;
    return rand
}

function createElm(tag,parent){
    try {
        var parent = getElm(parent)
        parent = parent[0] || parent
        var e = document.createElement(tag);
        parent.appendChild(e);
        return e;
    } catch (error) {
        l(error)
    }
}

function on(event,target, f){
    try {
        getElm(target).addEventListener(event, f, {once: false})
    } catch (error) {
    }
    try {
        var x = getElm(target);
        for (let i = 0; i < x.length; i++) {
            x[i].addEventListener(event, f,{once: false});
        }
    } catch (error) {
    }
}

function load(page_id, file_path){
    getElm(page_id).innerHTML='<object type="text/html" data="' + file_path + '" ></object>';
}

function clone(target){ // Finished, but need to be fully tested
    var e = getElm(target)
    var l = e.length
    if (e[0]) {
        var p = e[0].parentElement;
        for (let i = 0; i < l; i++) {
            var elmc = e[i].cloneNode(true);
            p.appendChild(elmc);
        }
    } else if(e){
        var p = e.parentElement;
        var elmc = e.cloneNode(true);
        p.appendChild(elmc);
    }
}

function cNode(target){
    var e = getElm(target)
    var l = e.length;
    if (e[0]) {
        var a = new Array(l)
        for (let i = 0; i < l; i++) {
            var elmc = e[i].cloneNode(true);
            a[i] = elmc;
        }
        return a;
    } else if(e){
        var elmc = e.cloneNode(true);
        return elmc;
    }
}

function ElmRescue(e, parent){
    var p = getElm(parent)
    p = p[0] || p
        if (e[0]) {
            var l = e.length;
            for (let i = 0; i < l; i++) {
                p.appendChild(e[i]);
            }
        } else if(e){
            p.appendChild(e);
        }
}

function changeParent(target, parent) { // Finished, but need to be fully tested
    var e;
    try {
        var e = getElm(target);
        var p = getElm(parent)[0] || getElm(parent);
        p.appendChild(e);
    } catch (error) {}
    try {
        var e = getElm(target);
        var p = getElm(parent)[0] || yeoogetElm(parent);
        for (let i = 0; i < e.length; i++){
            p.appendChild(e[0]);
        }
    } catch (error) {}
}

function del(target) {
    var e = getElm(target);
    DeletedElements[DeletedElements.length] = cNode(target);
    if (e[0]) {
        for (let i = 0; i < e.length; i++) {
            e[i - i--].remove();
        }
    } else if(e){
        e.remove()
    }
    return DeletedElements;
}

function Get(url){ // Deprecated
    var Httpreq = new XMLHttpRequest();
    Httpreq.open("GET",url,false);
    Httpreq.send(null);
    return Httpreq.responseText;
}

function write(target,value) {
    try {
        var e = getElm(target);
        if(e[0]){
            for (let i = 0; i < e.length; i++) {
                e[i].innerText = value;
            }
        }else if(e){
            e.innerText = value;
        }
    } catch(error){console.error("Element doesn't exist")}
}

function windowlike(target, b){ // WAW, surprisingly working
    var y = getElm(target)[0] || getElm(target);
    var x = getElm(target)[0] || getElm(target);
    var p = y.parentElement;
    if(b){
        x = y.parentElement
        p = x.parentElement
    }
    x.style.position = 'absolute';
    x.style.zIndex = '1';
    y.addEventListener('mousedown', function(){
        window.addEventListener('mousemove', function mmove(e){
            y.style.userSelect = 'none';
            x.style.left = (e.pageX - 16) + 'px';
            x.style.top = (e.pageY - 16) + 'px';
            window.addEventListener('mouseup', function(e){
                window.removeEventListener('mousemove', mmove);
                y.style.userSelect = 'text';
            })
        })
    })
}

function webcam(target){
    let video = getElm(target)[0] || getElm(target);
    if(video.tagName !== 'VIDEO'){
        video = createElm('video', video)
    }
        window.navigator.mediaDevices.getUserMedia({ video: true})
        .then(stream => {
            video.srcObject = stream;
            video.onloadedmetadata = (e) => {
                video.play();
            };
    })
        .catch(() => {
            alert('lool')
        })
    return video
}

function addStyle(text){
    var s = createElm('style','head');
    s.innerText = text;
    return s;
}

function addScript(text){
    var js = createElm('script','head');
    js.innerText = text;
    return js;
}

function createWindow(parentid, name, style){
    var w = createElm('div', parentid);
    var s;

    w.className = 'Sub-window';
    i = getElm('Sub-window').length;
    w.id = 'window'+i;
    windowHTML = `
    <div class="btop" id='window`+i+`btop'>
        <label class="window_name" id='window_name` + i + `' >Window</label>
        <div class="window_controls_container">
            <input class="window_controls window_shrink_button" id="window_shrink_button`+i+`" type="button" onclick='hide(this.parentElement.parentElement.parentElement)' value="-">
            <input class="window_controls window_close_button" id='window_close_button`+i+`' type="button" onclick="del(this.parentElement.parentElement.parentElement)" value="X">
        </div>
    </div>
    <div class="window_container" id='window_container`+i+ `'>
    </div>
    `;

    w.innerHTML = windowHTML;
    windowlike(w.firstChild.nextSibling, true);

    if(!StyleState && style){
        s = addStyle(style);
        s.id = 'WindowStyles';
        StyleState = true;
    }else if(StyleState && style){
        s.innerText = style;
    }else if(!style){
        s = addStyle(windowCSS);
        s.id = 'WindowStyles';
        StyleState = true;
    }
    if(name){
        name_lab = getElm('window_name')[i-1]
        name_lab.innerText = name;
    }
    return w;
}


function windowRescue(e,parent,affectParent){
        l(name_lab)
        ElmRescue(e,parent);
    windowlike(e,affectParent);
}