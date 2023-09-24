$(document).ready(function() {
    let itensCardapio = cardapio.metodos.obterItensCardapio();

    // Exemplo de como iterar pelos itens e anexá-los ao DOM
    for (let i = 0; i < itensCardapio.length; i++) {
        let item = itensCardapio[i];
        let temp = cardapio.templates.item
            .replace(/\${img}/g, item.img)
            .replace(/\${name}/g, item.name)
            .replace(/\${id}/g, item.id)
            .replace(/\${price}/g, item.price);

        $("#itensCardapio").append(temp);
    }
});


cardapio.metodos = {
    // Obtem a lista de itens json do cardapio
    obterItensCardapio:(categoria = 'burgers', verMais = false)=>{
        let filtro = MENU[categoria];
        if(!verMais){
            $("#itensCardapio").html('')
            $("#btnVerMais").removeClass('hidden')

        }
        
        $.each(filtro, (i, e)=>{

            let temp = cardapio.templates.item
            .replace(/\${img}/g, e.img)
            .replace(/\${name}/g, e.name)
            .replace(/\${id}/g, e.id)
            .replace(/\${price}/g, e.price.toFixed(2).replace('.',","));
            //botão ver mais clicado 12 itens

            if(!verMais && i < 100 ){
                $("#itensCardapio").append(temp)
            }
        })

        //remover o ativo após clicar no item
        $(".container-menu a").removeClass('active');
        //Setar menu para ativo
        $("#menu-" + categoria).addClass('active');
    },
}

cardapio.templates = {
    item: `
        <div class="col-12 col-sm-6 col-md-3 p-2">
            <div class="card card-item" id="\${id}">
                <div class="img-produto">
                    <img src="\${img}"/>
                </div>
                <p class="title-produto text-center mt-4">
                    <b>\${name}</b>
                </p>
                <p class="price-produto text-center">
                    <b>R$ \${price}</b>
                </p>
                <div class="add-carrinho">
                    <spam class="btn-menos" onclick="cardapio.metodos.diminuirQuantidadeItens('\${id}')"><i class="fas fa-minus"></i></spam>
                    <spam class="add-numero-itens" id="qtd-\${id}">0</spam>
                    <spam class="btn-mais" onclick="cardapio.metodos.aumentarQuantidadeItens('\${id}')"><i class="fas fa-plus"></i></spam>
                    <spam class="btn btn-add" onclick="cardapio.metodos.adicinarCarrinho('\${id}')"><i class="fas fa-shopping-bag"></i></spam>
                </div>
            </div>
        </div>
    `,
    intensCarrinho:
    `
    <div class="col-12 item-carrinho">
        <div class="info-produto">
            <div class="img-produto">
                <img class="img-produto" src="\${img}" alt="">
            </div>
            <div class="dados-produto">
                <p class="title-produto"><b>\${name}</b></p>
                <p class="price-produto"><b>R$ \${price}</b></p>
            </div>
        </div>
        <div class="add-carrinho">
            <spam class="btn-menos" onclick="cardapio.metodos.diminuirQuantidadeCarrinho('\${id}')"><i class="fas fa-minus"></i></spam>
            <spam class="add-numero-itens" id="qtd-carrinho-\${id}">\${qntd}</spam>
            <spam class="btn-mais" onclick="cardapio.metodos.aumentarQuantidadeCarrinho('\${id}')"><i class="fas fa-plus"></i></spam>
            <spam class="btn btn-remove" onclick="cardapio.metodos.removeItemCarrinho('\${id}')"><i class="fas fa-times"></i></spam>
        </div>
    </div>
    `,
itensResumo:
    `<div class="col-12  item-carrinho-resumo">
        <div class="img-produto-resumo">
            <img src="\${img}" alt="imagem do produto">
        </div>
        <div class="dados-produto">
            <p class="title-produto-resumo"><b>\${name}</b></p>
            <p class="price-produto-resumo">
                <b>R$ \${price}</b>
            </p>
        </div>
        <p class="quantidade-produto-resumo">
            x <b>\${qntd}</b>
        </p>
    </div>`
};

