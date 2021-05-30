function delete_post(p_id) {
    $.ajax({
        type: 'POST',
        url: 'https://xue-hua-piao.herokuapp.com/delete/',
        dataType: 'json',
        data: {
            'post': p_id,
            'session': Cookies.get('session')
        },
        success: function (data) {
            var tipo = jQuery.parseJSON((JSON.stringify(data)))['error'];
            var data = jQuery.parseJSON((JSON.stringify(data)))['data'];
            if (tipo == false) {
                let post = document.getElementById("post_" + p_id);
                post.remove();
            } else {
            }
        }
    });
}
function delete_prompt(p_id) {
    let dialog = document.createElement("dialog");
    dialog.id = "dialogo_" + p_id;
    dialog.classList="card border-warning bg-light text-dark";
    dialog.style = "padding:0";
    let modal = `
    <div class="card-header"><h5>Por favor, confirme.</h5></div>
    <div class="card-body"><b><p><h5>Tem certeza de que deseja deletar a postagem?</h5></p>
    <p>
    <h5>Essa ação não poderá ser desfeita.</h5>
    </p></b>
    </div>
    <div class="card-footer">
    <button class="btn btn-outline-danger mb-3" style="margin-right:0.5em" onclick="delete_post(`+ p_id + `)">Confirmar</button>
    <button class="btn btn-outline-secondary mb-3" onclick="close_modal(` + p_id + `)">Cancelar</button>
    </div>
    `
    dialog.innerHTML = modal;
    $("#post_"+p_id).append(dialog);
    dialog.showModal();
}
function close_modal(id) {
    let modal = document.getElementById("dialogo_" + id);
    modal.remove();
}