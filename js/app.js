$(document).ready(function(){
    cardapio.metodos.obterItensCardapio();
})
var cardapio = {};
meu_carrinho=[
    {"nome":"Hamburger","preco":30,"quantidade":5},
]

cardapio.eventos={
    init:() => {
        cardapio.metodos.obterItensCardapio();
    }
}


cardapio.metodos={
    //obtem a lista de itens json co cardapio
    obterItensCardapio:(categoria = 'burgers', verMais = false)=>{
        var filtro = MENU[categoria];
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

            if(verMais && i >= 8 && i < 12){
                $("#itensCardapio").append(temp)
            }

            //pagina inicial retorna 8 itens

            if(!verMais && i < 8 ){
                $("#itensCardapio").append(temp)
            }
        })

        //remover o ativo após clicar no item
        $(".container-menu a").removeClass('active');
        //Setar menu para ativo
        $("#menu-" + categoria).addClass('active');
    },
    //clique no botão no ver mais
    verMais:() =>{
        //categoria ativa
        var ativo = $(".container-menu a.active").attr('id').split('menu-')[1]; //[menu-][burgers]
        cardapio.metodos.obterItensCardapio(ativo,true)
        $("#btnVerMais").addClass('hidden');
    },
    //diminuir quantidade de itens do cardápio
    diminuirQuantidadeItens:(id)=>{

        let qtdAtual = parseInt($("#qtd-" + id).text());

            if(qtdAtual > 0){

                $("#qtd-" + id).text(qtdAtual - 1)
                console.log("Diminuindo")
        }
    },
    aumentarQuantidadeItens:(id)=>{
        let qtdAtual = parseInt($("#qtd-" + id).text())
        $("#qtd-" + id).text(qtdAtual + 1)
        console.log("Aumentando")
    },
    //adicionar ao carrinho o item do cardápio
    adicinarCarrinho:(id)=>{
        let qtdAtual = parseInt($("#qtd-" + id).text())
        if (qtdAtual>0){
            //obter a categoria ativa
            var categoria = $(".container-menu a.active").attr('id').split('menu-')[1];
            //obter a lista de itens
            let filtro = MENU[categoria];
            //obter o item
            let item = $.grep(filtro, (e, i)=>{return e.id==id})
            if(item){

            }
        }else{
            alert("Informe antes a quantidade de itens, valor informado é menor que 1")
        }

    }
}



cardapio.templates = {
    item: `
        <div class="col-3 mb-5">
            <div class="card card-item" id="\${id}">
                <div class="img-produto">
                    <img src="\${img}"/>
                </div>
                <p class="title-produto text-center mt-4">
                    <b>\${name}</b>
                </p>
                <p class="price-produto text-center">
                    <b>R$\${price}</b>
                </p>
                <div class="add-carrinho">
                    <spam class="btn-menos" onclick="cardapio.metodos.diminuirQuantidadeItens('\${id}')"><i class="fas fa-minus"></i></spam>
                    <spam class="add-numero-itens" id="qtd-\${id}">0</spam>
                    <spam class="btn-mais" onclick="cardapio.metodos.aumentarQuantidadeItens('\${id}')"><i class="fas fa-plus"></i></spam>
                    <spam class="btn btn-add" onclick="cardapio.metodos.adicinarCarrinho('\${id}')"><i class="fas fa-shopping-bag"></i></spam>
                </div>
            </div>
        </div>
    `
}

