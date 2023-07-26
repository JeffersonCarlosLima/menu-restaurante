$(document).ready(function(){
    cardapio.metodos.obterItensCardapio();
})
var cardapio = {};

cardapio.eventos={
    init:() => {
        cardapio.metodos.obterItensCardapio();
    }
}


cardapio.metodos={
    //obtem a lista de itens json co cardapio
    obterItensCardapio:(categoria = 'burgers')=>{
        var filtro = MENU[categoria];
        
        $("#itensCardapio").html('')
        
        $.each(filtro, (i, e)=>{

            let temp = cardapio.templates.item
            .replace(/\${img}/g, e.img)
            .replace(/\${name}/g, e.name)
            .replace(/\${price}/g, e.price.toFixed(2).replace('.',","));

            $("#itensCardapio").append(temp)
        })
        //remover o ativo após clicar no item
        $(".container-menu a").removeClass('active');
        //Setar menu para ativo
        $("#menu-" + categoria).addClass('active');
    },

}



cardapio.templates = {
    item: `
        <div class="col-3 mb-5">
            <div class="card card-item">
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
                    <spam class="btn-menos"><i class="fas fa-minus"></i></spam>
                    <spam class="add-numero-itens">0</spam>
                    <spam class="btn-mais"><i class="fas fa-plus"></i></spam>
                    <spam class="btn btn-add"><i class="fas fa-shopping-bag"></i></spam>
                </div>
            </div>
        </div>
    `
}