$(document).ready(function(){
    cardapio.metodos.obterItensCardapio();
})
var cardapio = {};

cardapio.eventos={
    init:() => {
        
    }
}

cardapio.metodos={
    //obtem a lista de itens json co cardapio
    obterItensCardapio:()=>{
        var filtro = MENU['burgers'];
        console.log(filtro);
    },
}

cardapio.templates={

}