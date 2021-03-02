const $ = function(elm) {
    return document.querySelector(elm)
};

const $a = function(elm) {
    return document.querySelectorAll(elm);
}

Element.prototype.hasClass = function(cls) {
    let classList = this.classList;
    for (let i in classList) {
        if (classList[i] == cls) {
            return true;
        }
    }
    return false;
}

Element.prototype.addClass = function(cls) {
    if (Array.isArray(cls)) {
        for (let i in cls) {
            this.classList.add(cls[i]);
        }
        return;
    }
    this.classList.add(cls);
}

Element.prototype.removeClass = function(cls) {
    if (Array.isArray(cls)) {
        for (let i in cls) {
            this.classList.remove(cls[i]);
        }
        return;
    }
    this.classList.remove(cls);
}

Element.prototype.toggleClass = function(cls) {
    if (Array.isArray(cls)) {
        for (let i in cls) {
            this.classList.toggle(cls[i]);
        }
        return;
    }
    this.classList.toggle(cls);
}

Element.prototype.css = function(css) {
    this.style.cssText = css;
}

const scrollTop = function() {
    return self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
}

const cookie = {
    set: function(name, value, days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        let expires = 'expires=' + date.toGMTString();
        document.cookie = `${name}=${value};${expires};path=/`;
    },
    get: function(cname) {
        let name = cname + '=';
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }
}

const copy = function(obj) {
    let selection = window.getSelection();
    let range = document.createRange();
    range.selectNodeContents(obj);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    selection.removeAllRanges();
}

const toast = function(msg, sec) {
    sec = sec || 2;
    let toast = document.createElement('div');
    toast.style.cssText = `display: block; position: fixed; line-height: 24px; left: 50%; bottom: 10vh; padding: 8px 24px; color: #FFFFFF; background: rgba(0, 0, 0, 0.6); -webkit-border-radius: 4px; border-radius: 4px; font-size: 16px; -webkit-transform: translateX(-50%); transform: translateX(-50%); -webkit-animation: fade-in 0.25s, fade-out 0.25s ${sec - 0.25}s; animation: fade-in 0.25s, fade-out 0.25s ${sec - 0.25}s; -webkit-animation-fill-mode: none, forwards; animation-fill-mode: none, forwards; z-index: 9999;`;
    toast.innerHTML = msg;
    $('body').appendChild(toast);
    setTimeout(function() {
        $('body').removeChild(toast);
    }, sec * 1000);
}

/*────────*/

document.body.style.display = 'block';

var arrFunc = 'var func = () => {};';

try {
    var es6Test = new Function(arrFunc);
} catch (e) {
    document.body.innerHTML = '您使用的浏览器版本过低，网页将无法加载';
}

if (!/AppleWebkit/i.test(navigator.userAgent)) {
    document.body.innerHTML = '请使用Chrome或Safari浏览器访问此页面';
}

if (/MicroMessenger|\sQQ/i.test(navigator.userAgent)) {
    document.body.innerHTML = '请前往浏览器访问此页面';
}

window.addEventListener('load', function() {
    if (!$('header') && !$('main').hasClass('no-margin')) {
        $('main').style.marginTop = '50px';
    }
});

/*已弃用
if ($('body').hasClass('back-top')) {
    let top = document.createElement('i');
    top.id = 'top';
    top.addClass(['fa', 'fa-arrow-up']);
    top.css('display: none; position: fixed; width: 50px; height: 50px; line-height: 50px; right: 25px; bottom: 25px; color: #FFFFFF; background: #9898FF; -webkit-border-radius: 50%; border-radius: 50%; text-align: center; font-size: 1.125em;');
    top.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    $('body').appendChild(top);

    window.addEventListener('scroll', function() {
        if (scrollTop() >= 100) {
            $('#top').style.display = 'block';
        } else {
            $('#top').style.display = 'none';
        }
    });
};*/

/*────────*/

if ($('nav')) {
    $('nav').innerHTML = `<span class="title">${'StarSky919'/*$('title').innerHTML.split(' | ')[0]*/}</span>` +
        `<input type="checkbox" id="menu-cb" />` +
        `<label for="menu-cb" class="menu-btn"><span></span><span></span><span></span></label>` +
        `<div class='items'></div>`;
    $('nav .title').addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    let items = [['/', '网站首页'], ['blog/', '我的博客'], ['downloads/', '文件下载'], ['about/', '关于本站']];
    let url = location.href.split('/');

    for (let x in items) {
        var a = items;
        if (url.length > 4) {
            for (let y in url) {
                if (y >= 4 - 1) {
                    a[x][0] = `../${a[x][0]}`;
                }
            }
            a[x][0] = `${a[x][0]}`;
        }
        $('nav .items').innerHTML += `<a href="${a[x][0]}" style="--i: ${x};">${a[x][1]}</a>`;
    }

    let closeMenu = () => {
        $('#menu-cb').checked = false;
    }

    window.addEventListener('beforeunload', closeMenu);
}

/*────────*/

if ($('footer')) {
    $('footer').innerHTML = '<span><i class="fa fa-copyright"></i> 2021 StarSky919</span>';
}

/*────────*/