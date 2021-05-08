var temac = localStorage.getItem('temac') | 0;
var count_1 = 0;
var img_data = null;
var $_GET = [];
window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (a, name, value) { $_GET[name] = value; });
function get_id(session_info) {
    for (var i = 0; i < session_info.length; i++) {
        if (session_info[i].indexOf('_') > 0) {
            return session_info[i].split("_").pop();
        }
    }
}

function redefinir() {
    if ((window.location.pathname == "/login.html") || (window.location.pathname == "/site/website/login.html")) {
        var email = document.getElementById("InputEmail").value;
        if (!email || email == "" || email == null) {
            return;
        }
        $.ajax({
            type: 'POST',
            url: "https://xue-hua-piao.herokuapp.com/passwordrequest",
            dataType: 'json',
            data: {
                'email': email
            },
            success: function (data) {
                var post = jQuery.parseJSON((JSON.stringify(data)))['data'];
                var tipo = jQuery.parseJSON((JSON.stringify(data)))['error'];
                var target = document.getElementById("corpo-login");
                if (tipo == true) {
                    var newElement = document.createElement("div");
                    newElement.innerHTML = '<div class="alert alert-danger alert-dismissible vertical" role="alert">' + post + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></div>'
                    $(target).append(newElement);
                } else {
                    var newElement = document.createElement("div");
                    newElement.innerHTML = '<div class="alert alert-primary alert-dismissible vertical" role="alert">' + post + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></div>'
                    $(target).append(newElement);
                }

            }
        });
    }
}

function loadposts() {
    if ((window.location.pathname == "/index.html") || (window.location.pathname == "/") || (window.location.pathname == "/site/website/index.html")) {
        var addr = "https://xue-hua-piao.herokuapp.com/post";
        $.ajax({
            type: 'POST',
            url: addr,
            dataType: 'json',
            success: function (data) {
                var post = jQuery.parseJSON((JSON.stringify(data)))['data'];
                var target = document.getElementById("post-container");
                var modal_target = document.getElementById("modal-container");
                if (target) {
                    var conta = 0;
                    for (x in post) {
                        var newElement = document.createElement("div");
                        var modal = document.createElement("div");
                        newElement.style = "padding:1em;";
                        min = Math.ceil(15000);
                        max = Math.floor(1);
                        var rand = Math.floor(Math.random() * (max - min + 1)) + min;
                        var rand2 = Math.floor(Math.random() * (max - min + 1)) + min;
                        var data = new Date(post[x].data);
                        data.setSeconds(0, 0);
                        var stamp = data.toISOString().replace(/T/, " ").replace(/:00.000Z/, "");
                        stamp = stamp.replace("00:00", "");
                        newElement.classList = "float-none";
                        var conteudo = post[x].conteudo;
                        if (conteudo.length >= 100) {
                            conteudo = conteudo.substring(0, 100) + "...";
                        }
                        if (temac % 2 == 1) {
                            var bg = "bg-dark";
                        } else {
                            var bg = "bg-light";
                        }
                        newElement.innerHTML = (`
          <div class="card ` + bg + ` font-monospace buttonOverlay mb-3" style="padding=1em">
          <h5 class="card-header ` + bg + ` bg-gradient">` + post[x].nome + `</h5>
          <div class="card-body ` + bg + `">
          <h5 class="card-title">` + post[x].resumo + `</h5>
          <p class="card-text">` + conteudo + `</p><p>
          <a href="profile.html?uid=` + post[x].autor + `" style="text-decoration:none" class="text-info"><div class="col-md-4 d-flex justify-content-between" >
          <img name="img` + post[x].autor + ` ` + rand + `">
          <br>
          <cite name="autor` + post[x].autor + ` ` + rand + `"><i class="gg-loadbar-alt"></i></cite></div></a>Data: ` + stamp + `</p>
          <button class="btn btn-primary rounded-pill" data-bs-toggle="modal" data-bs-target="#modal` + post[x].id + `">Expandir</button></div> </div>`);
                        modal.innerHTML = ('<div class="modal fade" tabindex="-1"  id="modal' + post[x].id + '" aria-labelledby="modalaria' + post[x].id + '" style="display:none"aria-hidden="true"><div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg"><div class="modal-content bg-dark"><div class="modal-header"><h5 class="modal-title">' + post[x].resumo + '</h5><button type="button" class="btn-close btn-danger" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"><p>' + post[x].conteudo + '</p><p><cite name="autor' + post[x].autor + " " + rand + '"><i class="gg-loadbar-alt"></i></cite>,<br>Data: ' + stamp + '</p></div><div class="modal-footer"><button type="button" class="btn btn-danger" data-bs-dismiss="modal">Fechar</button></div></div></div></div>');
                        nomeautor(post[x].autor, rand);
                        $(target).append(newElement);
                        $(modal_target).append(modal);
                    }
                }
            }
        });
    }
}

function projeto() {
    count_1++;
    var ipaddr = document.getElementById("divaddr");
    if (count_1 % 2 == 1) {
        ipaddr.style.visibility = "visible";
    } else {
        ipaddr.style.visibility = "hidden";
    }

}

function load_projects() {
    if ((window.location.pathname == "/projetos.html") || (window.location.pathname == "/site/website/projetos.html")) {
        $.ajax({
            type: 'POST',
            url: 'https://xue-hua-piao.herokuapp.com/proj/',
            dataType: 'json',
            success: function (data) {
                var proj = jQuery.parseJSON((JSON.stringify(data)))['data'];
                var target = document.getElementById("project-container");
                if (target) {
                    for (x in proj) {
                        var newElement = document.createElement("div");
                        newElement.style = "padding:1em;";
                        min = Math.ceil(15000);
                        max = Math.floor(1);
                        var rand = Math.floor(Math.random() * (max - min + 1)) + min;
                        var data = new Date(proj[x].data);
                        data.setSeconds(0, 0);
                        var stamp = data.toISOString().replace(/T/, " ").replace(/:00.000Z/, "");
                        stamp = stamp.replace("00:00", "");
                        newElement.classList = "float-none";
                        var conteudo = proj[x].conteudo;
                        if (temac % 2 == 1) {
                            var bg = "bg-dark";
                        } else {
                            var bg = "bg-light";
                        }
                        newElement.innerHTML = (`
              <div class="card ` + bg + ` font-monospace buttonOverlay mb-3" style="padding=1em">
              <h5 class="card-header ` + bg + ` bg-gradient">` + proj[x].nome + `</h5>
              <div class="card-body ` + bg + `">
              <h5 class="card-title">` + proj[x].resumo + `</h5>
              <p class="card-text">` + conteudo + `</p><p>
              <a href="profile.html?uid=` + proj[x].autor + `" style="text-decoration:none" class="text-info"><div class="col-md-4 d-flex justify-content-between" ><img name="img` + proj[x].autor + ` ` + rand + `">
              <br>
              <cite name="autor` + proj[x].autor + ` ` + rand + `"><i class="gg-loadbar-alt"></i></cite></div></a>Data: ` + stamp + `</p>
              <a class="btn btn-primary rounded-pill" href="` + proj[x].addr + `">Visitar</a></div> </div>`);
                        console.log(proj[x].addr);
                        nomeautor(proj[x].autor, rand);
                        $(target).append(newElement);
                    }
                }
            }
        });
    }
}

function sendpost() {
    let titulo = document.getElementById("InputTitulo1").value;
    let titulo2 = document.getElementById("InputTitulo2").value;
    let content = document.getElementsByClassName("ql-editor")[0].innerHTML;
    let addr = document.getElementById("divaddr").value;
    var apiaddr;
    if (count_1 % 2 == 0) {
        apiaddr = 'https://xue-hua-piao.herokuapp.com/addpost/'
    } else {
        apiaddr = 'https://xue-hua-piao.herokuapp.com/addproj/'
    }

    $.ajax({
        type: 'POST',
        url: apiaddr,
        dataType: 'json',
        data: {
            'session': Cookies.get("session"),
            'titulo': titulo,
            'subtitulo': titulo2,
            'conteudo': content,
            'addr': addr
        },
        success: function (data) {
            var post = jQuery.parseJSON((JSON.stringify(data)))['data'];
            var tipo = jQuery.parseJSON((JSON.stringify(data)))['error'];
            var target = document.getElementById("footer");
            if (tipo == "true") {
                var newElement = document.createElement("div");
                newElement.innerHTML = '<div class="alert alert-danger alert-dismissible" role="alert">' + post + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></div>'
                $(target).append(newElement);
            } else {
                var newElement = document.createElement("div");
                newElement.innerHTML = '<div class="alert alert-primary alert-dismissible" role="alert">' + post + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></div>'
                $(target).append(newElement);
                setTimeout(() => {
                    window.location.pathname = window.location.pathname.replace("post.html", "profile.html")
                }, 500);

            }

        }
    });
}

function openFile() {
    var input = document.getElementById("formFile");
    var reader = new FileReader();
    reader.onload = function () {
        if (reader.result.length > 1048576) {
            let target = document.getElementById("corpo-registro");
            let newElement = document.createElement("div");
            newElement.innerHTML = '<div class="alert alert-danger alert-dismissible" role="alert">Arquivo muito grande(maior que 1MB)!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></div>'
            $(target).append(newElement);
            $('#formFile').val('')
        } else {
            assinala_valor(reader.result);
        }
    };
    try {
        reader.readAsDataURL(input.files[0]);
    } catch (exception) { }
}
async function assinala_valor(data) {
    if (data) {
        img_data = data;
    } else {
        return img_data;
    }
}

function register() {
    let email = document.getElementById("InputEmail").value;
    let nome = document.getElementById("InputNome").value;
    let target = document.getElementById("corpo-registro");
    let newElement = document.createElement("div");
    let senha = document.getElementById("InputPassword1").value;
    if ((nome) && (email)) {
        $.ajax({
            type: 'POST',
            url: 'https://xue-hua-piao.herokuapp.com/register/',
            dataType: 'json',
            data: {
                'nome': nome,
                'email': email,
                'imagem': img_data,
                'senha': senha
            },
            success: function (data) {
                var tipo = jQuery.parseJSON((JSON.stringify(data)))['error'];
                var post = jQuery.parseJSON((JSON.stringify(data)))['data'];
                if (tipo == true) {
                    newElement.innerHTML = '<div class="alert alert-danger alert-dismissible" role="alert">' + post + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></div>'
                    $(target).append(newElement);
                } else {
                    newElement.innerHTML = '<div class="alert alert-primary alert-dismissible text-wrap" role="alert"><b>' + post + '<br>Verifique seu email!</b><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></div>'
                    $(target).append(newElement);
                }

            }
        });
    } else {
        newElement.innerHTML = '<div class="alert alert-danger alert-dismissible" role="alert">Informe nome de usuário e email!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></div>'
        $(target).append(newElement);
    }
}

function nomeautor(id, rand) {
    let data2 = autor(id);
    data2.then(function (data3) {
        var img_autor = document.getElementsByName("img" + id + " " + rand);
        var autor = document.getElementsByName("autor" + id + " " + rand);
        var autordata = jQuery.parseJSON((JSON.stringify(data3)))['data'];
        for (x in autor) {
            autor[x].innerHTML = "- " + autordata.nome;
        }
        if (autordata.image) {
            imagemautor(img_autor, autordata.image);
        }
    });
    return id;
}

function imagemautor(img, data) {
    for (x in img) {
        img[x].src = data;
        img[x].classList = "bg-dark border-info";
        img[x].style = "max-width:10em";
    }
}

function autor(id) {
    return Promise.resolve($.ajax({
        type: 'POST',
        url: 'https://xue-hua-piao.herokuapp.com/usuario/',
        dataType: 'json',
        data: {
            'id': id
        }
    }));
}
jQuery(document).ready(function () {
    var subst = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
    $("#loader").delay(600).fadeOut(400, function () {
        $("#corpo").delay(200).fadeIn(400);
        $("#corpo").css("visibility", "visible");
    });
    if (Cookies.get('session')) {
        if ((subst == "login.html") || (subst == "registro.html")) {
            setTimeout(() => {
                window.location.pathname = window.location.pathname.replace(subst, "index.html")
            }, 1000);
        } else {
            $.ajax({
                type: 'POST',
                url: 'https://xue-hua-piao.herokuapp.com/sessiondata/',
                dataType: 'json',
                data: {
                    session: Cookies.get("session")
                },
                success: function (data) {
                    var session_info = jQuery.parseJSON((JSON.stringify(data)))['data']
                    if (session_info == "undo") {
                        Cookies.remove("session");
                        $("#loader").delay(600).fadeIn(400, function () {
                            $("#corpo").delay(200).fadeOut(400);
                            $("#corpo").css("visibility", "visible");
                        });
                        setTimeout(() => {
                            window.location.pathname = window.location.pathname.replace(subst, "index.html")
                        }, 1000);
                    }
                }
            });
        }
    }
    loadposts();
    shfunc();
    initial();
    load_projects();
    if ((subst == "novasenha.html") && ($_GET['pc'])) {
        $.ajax({
            type: 'POST',
            url: 'https://xue-hua-piao.herokuapp.com/pcr/',
            dataType: 'json',
            data: {
                pcr: $_GET['pc']
            },
            success: function (data) {
                var post = jQuery.parseJSON((JSON.stringify(data)))['data'];
                var tipo = jQuery.parseJSON((JSON.stringify(data)))['error'];
                var target = document.getElementById("alert-container");
                if (tipo == true) {
                    let newElement = document.createElement("div");
                    newElement.innerHTML = ('<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong class="alert-heading"></strong>' + post + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
                    $(target).append(newElement);
                } else {
                    document.getElementById("loginbtn").setAttribute("onclick","mudarsenha()");
                    let iemail = document.getElementById("divemail");
                    let email = document.getElementById("InputEmail");
                    let fs = document.getElementById("form-nsenha");
                    let isenha1 = document.createElement("input");
                    let isenha2 = document.createElement("input");
                    let txts = document.createElement("label");
                    let div1 = document.createElement("div");
                    div1.classList = "mb-3";
                    let div2 = document.createElement("div");
                    div2.classList = "mb-3";
                    txts.innerHTML = "Nova Senha";
                    let txts2 = document.createElement("label");
                    email.value = post;
                    email.setAttribute("readonly", true);
                    txts2.innerHTML = "Confirme a Senha";
                    isenha2.id = "InputSenha2";
                    isenha1.id = "InputSenha1";
                    isenha1.classList = "input col-12";
                    isenha2.classList = "input col-12";
                    isenha1.type = "password";
                    isenha2.type = "password";
                    fs.setAttribute("onkeyup", "nsenhaver(this);");;
                    iemail.after(div1);
                    div1.appendChild(isenha2);
                    isenha2.before(txts2);
                    iemail.after(div2);
                    div2.appendChild(isenha1);
                    isenha1.before(txts);
                }
            }
        });

    }
});

function shfunc() {
    if (Cookies.get("session")) {
        let btn = document.getElementById("lpbtn");
        btn.href = "profile.html";
        btn.innerHTML = `<i class="gg-profile"></i>Perfil`;
        var prfnav = document.getElementById("prfnav");
        var logoutbt = document.createElement("li");
        logoutbt.classList = "navbar-nav nav-item";
        logoutbt.innerHTML = `<button onclick="logout()" class="btn btn-dark text-start text-danger"><i class="gg-log-out" style="margin-left:0.1%"></i>Sair</button>`;
        prfnav.after(logoutbt);
    } else {
        let plink = document.getElementById("addpub");
        if (plink) {
            plink.style.visibility = "hidden";
        }
    }
    if (((window.location.pathname == "/post.html") || (window.location.pathname == "/site/website/post.html")) && (Cookies.get("session") == undefined)) {
        window.location.pathname = window.location.pathname.replace("post.html", "index.html");
    }
}

function initial() {
    var bgc = document.getElementsByTagName("body")[0];
    bgc.classList.add("font-monospace");
    tema(true);
}

function tema(ini) {
    if (!ini) {
        temac++;
        localStorage.setItem('temac', temac);
    }
    for (var a = 0; a < 150; a++) {
        if (temac % 2 == 1) {
            tema_escuro();
        } else {
            tema_claro();
        }
    }
}

function tema_claro() {
    try {
        document.getElementById('corpo').classList = "bg-zigzag-light text-dark font-monospace sc4";
        /*var listafrmctrl = document.getElementsByClassName("form-control");
        for(var a = 0; a < listafrmctrl.length;a++){
          listafrmctrl[a].classList.replace('bg-dark','bg-light');
        }*/
        var listacard = document.getElementsByClassName("card");
        for (var b = 0; b < listacard.length; b++) {
            listacard[b].classList.replace('bg-dark', 'bg-light');
        }
        var listabtn = document.getElementsByClassName("btn-dark");
        for (var b = 0; b < listabtn.length; b++) {
            listabtn[b].classList.replace('btn-dark', 'btn-light');
        }
        var botaotema = document.getElementById('temabtn');
        botaotema.innerHTML = '<i class="gg-sun"></i>Modo noturno';
        var list = document.getElementsByClassName("bg-dark");
        for (c = 0; c < list.length; c++) {
            if (list[c].tagName == 'NAV') {
                list[c].classList.replace('navbar-dark', 'navbar-light');
            }
            list[c].classList.replace('bg-dark', 'bg-light');
        }
    } catch (error) {
        return;
    }
}

function tema_escuro() {
    try {
        document.getElementById('corpo').classList = "bg-zigzag-dark text-light font-monospace sc4";
        var listafrmctrl = document.getElementsByClassName("form-control");
        for (var i = 0; i < listafrmctrl.length; i++) {
            listafrmctrl[i].classList.replace('bg-light', 'bg-dark');
        }
        var listacard = document.getElementsByClassName("card");
        for (var a = 0; a < listacard.length; a++) {
            listacard[a].classList.replace('bg-light', 'bg-dark');
        }
        var listabtn = document.getElementsByClassName("btn-light");
        for (var b = 0; b < listabtn.length; b++) {
            listabtn[i].classList.replace('btn-light', 'btn-dark');
        }
        var botaotema = document.getElementById("temabtn");
        botaotema.innerHTML = "<i class='gg-moon'></i>Modo diurno";
        var list = document.getElementsByClassName("bg-light");
        for (c = 0; c < list.length; c++) {
            if (list[c].tagName == 'NAV') {
                list[c].classList.replace('navbar-light', 'navbar-dark');
            }
            list[c].classList.replace('bg-light', 'bg-dark');
        }
    } catch (error) {
        return;
    }
}

function confirma() {
    let email = document.getElementById("InputEmail1").value;
    let hash = document.getElementById("InputPassword1").value;
    var newElement = document.createElement("div");
    if ((window.location.pathname == "/confirmar.html") || (window.location.pathname == "/site/website/confirmar.html")) {
        $.ajax({
            type: 'POST',
            url: 'https://xue-hua-piao.herokuapp.com/confirmar/',
            dataType: 'json',
            data: {
                'email': email,
                'hash': hash
            },
            success: function (data) {
                var post = jQuery.parseJSON((JSON.stringify(data)))['data'];
                var tipo = jQuery.parseJSON((JSON.stringify(data)))['error'];
                var target = document.getElementById("alert-container");
                if (target) {
                    if (tipo == "true") {
                        newElement.innerHTML = ('<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong class="alert-heading">Erro!</strong>' + post + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
                        $(target).append(newElement);
                    } else {
                        newElement.innerHTML = ('<div class="alert alert-primary alert-dismissible fade show" role="alert"><strong class="alert-heading">Sucesso!</strong>' + post + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
                        $(target).append(newElement);
                    }
                }
            }
        });
    }
}

function logout() {
    $.ajax({
        type: 'POST',
        url: 'https://xue-hua-piao.herokuapp.com/logout/',
        dataType: 'json',
        data: {
            'session': Cookies.get("session")
        },
        success: function () {
            $("#loader").delay(600).fadeIn(400, function () {
                $("#corpo").delay(200).fadeOut(400);
                $("#corpo").css("visibility", "visible");
            });
            Cookies.remove("session");
            setTimeout(() => {
                window.location.pathname = window.location.pathname.replace(window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1), "index.html")
            }, 1000);
        }
    });

}

function login() {
    if ((window.location.pathname == "/login.html") || (window.location.pathname == "/site/website/login.html")) {
        var newElement = document.createElement("div");
        let email = document.getElementById("InputEmail");
        let hash = document.getElementById("InputHash");
        $.ajax({
            type: 'POST',
            url: 'https://xue-hua-piao.herokuapp.com/login/',
            dataType: 'json',
            data: {
                'email': email.value,
                'senha': hash.value
            },
            success: function (data) {
                var sessionhash = jQuery.parseJSON((JSON.stringify(data)))['data'];
                var tipo = jQuery.parseJSON((JSON.stringify(data)))['error'];
                var mensagem = jQuery.parseJSON((JSON.stringify(data)))['message'];
                var target = document.getElementById("alert-container");
                if (target) {
                    if (tipo == "true") {
                        newElement.innerHTML = ('<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong class="alert-heading">Erro!</strong>' + mensagem + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
                        $(target).append(newElement);
                    } else {
                        Cookies.set('session', sessionhash, { expires: 0.04 });
                        newElement.innerHTML = ('<div class="alert alert-primary alert-dismissible fade show" role="alert"><strong class="alert-heading">Sucesso!</strong>' + mensagem + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
                        $(target).append(newElement);
                        $("#loader").delay(600).fadeIn(400, function () {
                            $("#corpo").delay(200).fadeOut(400);
                            $("#corpo").css("visibility", "visible");
                        });
                        setTimeout(() => {
                            window.location.pathname = window.location.pathname.replace("login.html", "index.html")
                        }, 1000);
                    }
                }
            }
        });
    }
}
function mudarsenha(){
    var subst = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
    if(subst=="novasenha.html"){
        var newElement = document.createElement("div");
        let hash = document.getElementById("InputSenha1");
        $.ajax({
            type: 'POST',
            url: 'https://xue-hua-piao.herokuapp.com/changepassword/',
            dataType: 'json',
            data: {
                'request_id': $_GET['pc'],
                'senha': hash.value
            },
            success: function (data) {
                var mensagem = jQuery.parseJSON((JSON.stringify(data)))['data'];
                var tipo = jQuery.parseJSON((JSON.stringify(data)))['error'];
                var target = document.getElementById("alert-container");
                if (target) {
                    if (tipo == true) {
                        newElement.innerHTML = ('<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong class="alert-heading"></strong>' + mensagem + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
                        $(target).append(newElement);
                    } else {
                        newElement.innerHTML = ('<div class="alert alert-primary alert-dismissible fade show" role="alert"><strong class="alert-heading">' + mensagem + '</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
                        $(target).append(newElement);
                        $("#loader").delay(600).fadeIn(400, function () {
                            $("#corpo").delay(200).fadeOut(400);
                            $("#corpo").css("visibility", "visible");
                        });
                        setTimeout(() => {
                            window.location.pathname = window.location.pathname.replace("novasenha.html", "login.html")
                        }, 1000);
                    }
                }
            }
        });
    }
}
function nsenha() {
    if ((window.location.pathname == "/novasenha.html") || (window.location.pathname == "/site/website/novasenha.html")) {
        var newElement = document.createElement("div");
        let email = document.getElementById("InputEmail");
        $.ajax({
            type: 'POST',
            url: 'https://xue-hua-piao.herokuapp.com/passwordrequest/',
            dataType: 'json',
            data: {
                'email': email.value,
            },
            success: function (data) {
                var tipo = jQuery.parseJSON((JSON.stringify(data)))['error'];
                var mensagem = jQuery.parseJSON((JSON.stringify(data)))['data'];
                var target = document.getElementById("alert-container");
                if (target) {
                    if (tipo == true) {
                        newElement.innerHTML = ('<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong class="alert-heading">Erro!</strong>' + mensagem + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
                        $(target).append(newElement);
                    } else {
                        newElement.innerHTML = ('<div class="alert alert-primary alert-dismissible fade show" role="alert"><strong class="alert-heading">Sucesso!</strong>' + mensagem + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
                        $(target).append(newElement);
                        $("#loader").delay(600).fadeIn(400, function () {
                            $("#corpo").delay(200).fadeOut(400);
                            $("#corpo").css("visibility", "visible");
                        });
                        setTimeout(() => {
                            window.location.pathname = window.location.pathname.replace("novasenha.html", "login.html")
                        }, 1000);
                    }
                }
            }
        });
    }
}
function verentry(entry) {
    let email = entry.InputEmail;
    let hash = entry.InputHash;
    let loginbtn = document.getElementById("loginbtn");
    var flagemail = false;
    var flaghash = false;
    if (emailIsValid(email.value) == true) {
        email.classList.remove("border-danger");
        email.classList.add("border-success");
        flagemail = false;
    } else {
        email.classList.remove("border-sucess");
        email.classList.add("border-danger");
        flagemail = true;
    }
    if (hash.value == "" || hash.value.length < 8) {
        hash.classList.remove("border-sucess");
        hash.classList.add("border-danger");
        flaghash = true;
    } else {
        hash.classList.remove("border-danger");
        hash.classList.add("border-success");
        flaghash = false;
    }
    if (flagemail == true || flaghash == true) {
        loginbtn.disabled = true;
    } else {
        loginbtn.disabled = false;
    }
}

function vernsenha(entry) {
    let email = entry.InputEmail;
    let loginbtn = document.getElementById("loginbtn");
    var flagemail = false;
    if (emailIsValid(email.value) == true) {
        email.classList.remove("border-danger");
        email.classList.add("border-success");
        flagemail = false;
    } else {
        email.classList.remove("border-sucess");
        email.classList.add("border-danger");
        flagemail = true;
    }
    if (flagemail == true) {
        loginbtn.disabled = true;
    } else {
        loginbtn.disabled = false;
    }
}
function emailIsValid(email) {
    return /\S+@\S+\.\S+/.test(email)
}

function regver(entry) {
    let email = entry.InputEmail;
    let nome = entry.InputNome;
    let senha1 = entry.InputPassword1;
    let senha2 = entry.InputPassword2;
    let reg = document.getElementById("regbtn");
    var flagemail = false;
    var flaghash = false;
    if (emailIsValid(email.value) == true) {
        email.classList.remove("border-danger");
        email.classList.add("border-success");
        flagemail = false;
    } else {
        email.classList.remove("border-sucess");
        email.classList.add("border-danger");
        flagemail = true;
    }
    if (senha1.value == "" || senha1.value.length < 8) {
        senha1.classList.remove("border-sucess");
        senha1.classList.add("border-danger");
        flaghash = true;
    } else {
        senha1.classList.remove("border-danger");
        senha1.classList.add("border-success");
        flaghash = false;
    }
    if (senha1.value != senha2.value) {
        senha2.classList.remove("border-sucess");
        senha2.classList.add("border-danger");
        flaghash = true;
    } else {
        flaghash = false;
        senha2.classList.remove("border-danger");
        senha2.classList.add("border-success");
    }
    if (flagemail == true || flaghash == true || nome.value == "") {
        reg.disabled = true;
    } else {
        reg.disabled = false;
    }
}
function nsenhaver(entry) {
    let senha1 = entry.InputSenha1;
    let senha2 = entry.InputSenha2;
    let reg = document.getElementById("loginbtn");
    var flaghash = false;
    if (senha1.value == "" || senha1.value.length < 8) {
        senha1.classList.remove("border-sucess");
        senha1.classList.add("border-danger");
        flaghash = true;
    } else {
        senha1.classList.remove("border-danger");
        senha1.classList.add("border-success");
        flaghash = false;
    }
    if (senha1.value != senha2.value) {
        senha2.classList.remove("border-sucess");
        senha2.classList.add("border-danger");
        flaghash = true;
    } else {
        flaghash = false;
        senha2.classList.remove("border-danger");
        senha2.classList.add("border-success");
    }
    if ( flaghash == true) {
        reg.disabled = true;
    } else {
        reg.disabled = false;
    }
}