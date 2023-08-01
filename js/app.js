$(document).ready(function(){
    cardapio.metodos.obterItensCardapio();
})
let cardapio = {};
let meu_carrinho = [];
let valor_carrinho = 0;
let valor_entrega = 6;

let meu_endereco = null;

let celular_empresa = '5563984908862';

cardapio.eventos={
    init:() => {
        cardapio.metodos.obterItensCardapio();
    }
}


cardapio.metodos={
    //obtem a lista de itens json co cardapio
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
        let ativo = $(".container-menu a.active").attr('id').split('menu-')[1]; //[menu-][burgers]
        cardapio.metodos.obterItensCardapio(ativo,true)
        $("#btnVerMais").addClass('hidden');
    },
    //diminuir quantidade de itens do cardápio
    diminuirQuantidadeItens:(id)=>{

        let qtdAtual = parseInt($("#qtd-" + id).text());

            if(qtdAtual > 0){

                $("#qtd-" + id).text(qtdAtual - 1)
        
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
        if (qtdAtual > 0){
            //obter a categoria ativa
            let categoria = $(".container-menu a.active").attr('id').split('menu-')[1];
            //obter a lista de itens
            let filtro = MENU[categoria];

            //obter o item que esta sendo adicionado ao carrinho
            let item = $.grep(filtro, (e, i) => {return e.id==id});
            if(item.length > 0){
                //validar se ja exite o item no carrinho
                let existe = $.grep(meu_carrinho, (elem, index)=>{return elem.id==id})
                //caso exista o item so altera a quantidade
                if(existe.length > 0){
                    let objindex = meu_carrinho.findIndex(obj => obj.id==id);
                    meu_carrinho[objindex].qtd = meu_carrinho[objindex].qtd + qtdAtual;
                    //alert("Item adicionado ao carrinho");
                }else{
                    //se nao existir o item no carrinho devera inserir um novo item
                    item[0].qtd = qtdAtual;
                    meu_carrinho.push(item[0])
                }
                cardapio.metodos.mensagem('Item adicionado ao carrinho','green');
                $("#qtd-"+ id).text(0);
                console.log(meu_carrinho);
                cardapio.metodos.atualizaBagTotal();
            }
        }

    },
    //Atualiza o bag de total de itens adicionados ao carrinho dos botões do carrinho
    atualizaBagTotal:() => {
        let total = 0;

        $.each(meu_carrinho,(i, e)=>{

            total += e.qtd

            console.log(total)

            return total
        })

        if(total > 0){
        
            $(".btn-carrinho").removeClass('hidden');
            $(".total-carrinho-in-btn-carrinho").removeClass('hidden');
        
        }
        else{
        
            $(".btn-carrinho").addClass('hidden');
            $(".total-carrinho-in-btn-carrinho").addClass('hidden');
        
        }
        
        $(".badge-total-carrinho").html(total);

    },
    //mensgens de aviso e notificações
    mensagem:(texto, cor = 'red', tempo = 3500)=>{
        let id = Math.floor(Date.now() * Math.random()).toString();
        let msg = `<div id="msg-${id}" class="animated fadeInDown toast ${cor}">${texto}</div>`;
        $("#container-mensagem").append(msg);
        setTimeout(()=>{
            $("#msg-"+id).removeClass('fadeInDown');
            $("#msg-"+id).addClass('fadeOutUp');
            setTimeout(()=>{
                $("#msg-"+id).remove();
            },1000);
        }, tempo)
        
        return msg
    },
    //abrir o modal de carrinho
    abrirCarrinho:(abrir)=>{
        if(abrir){
            $('#modal-carrinho').removeClass('hidden');
            cardapio.metodos.carregarCarrinho();
        }else{
            $('#modal-carrinho').addClass('hidden');
        }
    },
    //carrega a etapa
    carregarEtapa:(etapa)=>{
        if(etapa == 1){
            $("#lblTituloEtapa").text("Seu Carrinho:");
            $("#itensCarrinho").removeClass('hidden');
            $("#LocalEntrega").addClass('hidden');
            $("#resumoCarrinho").addClass('hidden');

            $(".etapa").removeClass('active');
            $(".etapa-1").addClass('active');
            
            $("#btnEtapaPedido").removeClass('hidden');
            $("#btnEtapaEndereco").addClass('hidden');
            $("#btnEtapaResumo").addClass('hidden');
            $("#btnVoltar").addClass('hidden');
        }if(etapa == 2){

            $("#lblTituloEtapa").text("Endereço de entrega:");
            $("#itensCarrinho").addClass('hidden');
            $("#LocalEntrega").removeClass('hidden');
            $("#resumoCarrinho").addClass('hidden');

            $(".etapa").removeClass('active');
            $(".etapa-1").addClass('active');
            $(".etapa-2").addClass('active');
            
            $("#btnEtapaPedido").addClass('hidden');
            $("#btnEtapaEndereco").removeClass('hidden');
            $("#btnEtapaResumo").addClass('hidden');
            $("#btnVoltar").removeClass('hidden');
        
        }if(etapa == 3){

            $("#lblTituloEtapa").text("Endereço de entrega:");
            $("#itensCarrinho").addClass('hidden');
            $("#LocalEntrega").addClass('hidden');
            $("#resumoCarrinho").removeClass('hidden');

            $(".etapa").removeClass('active');
            $(".etapa-1").addClass('active');
            $(".etapa-2").addClass('active');
            $(".etapa-3").addClass('active');
            
            $("#btnEtapaPedido").addClass('hidden');
            $("#btnEtapaEndereco").addClass('hidden');
            $("#btnEtapaResumo").removeClass('hidden');
            $("#btnVoltar").removeClass('hidden');
    }

    },
    //retornar para a etapa anterior
    voltarEtapa:() => {
        let etapa = $(".etapa.active").length;
        cardapio.metodos.carregarEtapa(etapa - 1);
    },
    //carrega itens adicionados ao carrinho
    carregarCarrinho:()=>{
        //carrega a etapa 1 ao abrir o carrinho
        cardapio.metodos.carregarEtapa(1);
        
        if(meu_carrinho.length > 0){
            $("#itensCarrinho").html('');
            $.each(meu_carrinho, (i, e) => {
                let temp = cardapio.templates.intensCarrinho 
                .replace(/\${img}/g, e.img)
                .replace(/\${name}/g, e.name)
                .replace(/\${id}/g, e.id)
                .replace(/\${qntd}/g, e.qtd)
                .replace(/\${price}/g, e.price.toFixed(2).replace('.',",")); 
                $("#itensCarrinho").append(temp);
                //carrega os valores do carrinho
                if((i + 1) == meu_carrinho.length){
                    cardapio.metodos.carregarValoresCarrinho();

                }
            })


        }
        else{
            $("#itensCarrinho").html('<div class="container-carrinho-vazio"><p class="carrinho-vazio"><i class="fas fa-shopping-bag" aria-hidden="true"></i>Seu carrinho está vazio.</p></div>')
            cardapio.metodos.carregarValoresCarrinho();
            //console.log("sem items no cart");


        }

    },
    //aumenta a quantidade de itens no carrinho
    aumentarQuantidadeCarrinho: (id)=>{
        
        let qtdAtual = parseInt($("#qtd-carrinho-" + id).text());

        if(qtdAtual >= 1){

            $("#qtd-carrinho-" + id).text(qtdAtual + 1)
            cardapio.metodos.atualizarCarrinho(id, qtdAtual + 1);
            
    }

    },
    //diminuir a quantidade de itens no carrinho
    diminuirQuantidadeCarrinho: (id)=>{
        
        let qtdAtual = parseInt($("#qtd-carrinho-" + id).text());

        if(qtdAtual > 1){

            $("#qtd-carrinho-" + id).text(qtdAtual - 1)
            cardapio.metodos.atualizarCarrinho(id, qtdAtual - 1);
            
    }else{

        cardapio.metodos.removeItemCarrinho(id);

    }
    },
    //btn remover item do carrinho
    removeItemCarrinho: (id) => {
        meu_carrinho = $.grep(meu_carrinho, (e, i) => {return e.id != id});

        cardapio.metodos.carregarCarrinho();
        //Atualiza o botão carrinho com a qtd atualizada
        cardapio.metodos.atualizaBagTotal();

    },
    //Atualização dos itens do carrinho com a quantidade atual
    atualizarCarrinho:(id, qtd)=>{

        let objindex = meu_carrinho.findIndex((obj => obj.id == id));

        meu_carrinho[objindex].qtd = qtd;

        
        //carrega os valores do carrinho
        cardapio.metodos.carregarValoresCarrinho();
        //Atualiza o botão carrinho com a qtd atualizada
        cardapio.metodos.atualizaBagTotal();
        console.log("carrinho atualizado")


    },
    //carrega totais do carrinho
    carregarValoresCarrinho:()=>{

        valor_carrinho = 0;

        $("#lblSubTotal").text('R$ 0,00');
        $("#lblValorEntrega").text('+ R$ 0,00');
        $("#lblValorTotal").text('R$ 0,00');

        //console.log('alteração de valores ok');
        
        $.each(meu_carrinho, (i, e) => {
            valor_carrinho += parseFloat(e.price * e.qtd);
        //console.log('valor do carrinho calculado com sucesso!');


            if((i + 1) == meu_carrinho.length){
                $("#lblSubTotal").text(`R$ ${valor_carrinho.toFixed(2).replace('.', ',')}`);
                $("#lblValorEntrega").text(`+ R$ ${valor_entrega.toFixed(2).replace('.' , ',')}`);
                $("#lblValorTotal").text(`R$ ${(valor_entrega + valor_carrinho).toFixed(2).replace('.', ',')}`);
                //console.log('dados inseridos com sucesso!');
            
            }
        })
        return
    },
      //carrega etapa de endereco
      carregarEndereco:()=>{
        //realiza validacao se o carrinho esta vazio.
        if(meu_carrinho.length <=0){
            cardapio.metodos.mensagem('Seu carrinho esta vazio.');
            return;
        }cardapio.metodos.carregarEtapa(2)

    },
    buscarCEP:()=>{
        //cria letiavel com valor do CEP digitado(Regexp)
        let CEP = $("#txtCEP").val().trim().replace(/\D/g,'');

        
        
        if(CEP != ""){
            //expressao regurar para validacao do cep
            let validacep = /^[0-9]{8}/;

            //verificar se o cep possui os valores
            if(validacep.test(CEP)){
                $.getJSON("https://viacep.com.br/ws/"+CEP+"/json?callback=?",function(dados){
                    if(!("erro" in dados)){
                        //atualizar os campos com os valores retornados pela api.
                        $("#txtEndereco").val(dados.logradouro);
                        $("#txtBairro").val(dados.bairro);
                        $("#txtCidade").val(dados.localidade);
                        $("#ddlUF").val(dados.uf);
                        
                        $("#txtNumero").focus();
                        cardapio.metodos.mensagem('Para finalizar informe o numero da suas residencia.', 'green');

                    }else{
                        cardapio.metodos.mensagem('CEP nao localizado, preencha as informacoes manualmente.');
                        $("#txtEndereco").focus();


                    }
                });
                
            }else{
                cardapio.metodos.mensagem('O CEP digitado e invalido');
                $("#txtCEP").focus();

            }
        }
        else{
            cardapio.metodos.mensagem('Informe o CEP, por favor.');
            $("#txtCEP").focus();
        }
        return
    },
    //validacao antes de seguir para a etapa  3
    resumoPedido:()=>{

        let cep = $("#txtCEP").val().trim();
        let endereco = $("#txtEndereco").val().trim();
        let bairro = $("#txtBairro").val().trim();
        let cidade= $("#txtCidade").val().trim();
        let uf = $("#ddlUF").val().trim();
        let num = $("#txtNumero").val().trim();
        let complemento = $("#txtComplemento").val().trim();

        if(cep.length <= 0){
            cardapio.metodos.mensagem('CEP invalido', 'red');
            $("#txtCEP").focus();
            return;
        }
        if(endereco.length <= 0){
            cardapio.metodos.mensagem('Informe o endereco', 'red');
            $("#txtEndereco").focus();
            return;
        }
        if(bairro.length <=0 ){
            cardapio.metodos.mensagem('Informe o bairro', 'red');
            $("#txtBairro").focus();
            return;
        }
        if(cidade.length <=0 ){
            cardapio.metodos.mensagem('Informe a cidade', 'red');
            $("#txtCidade").focus();
            return;
        }
        if(uf === "-1"){
            cardapio.metodos.mensagem('Informe o (UF) Estado', 'red');
            $("#ddlUF").focus();
            return;
        }
        if(num.length <= 0){
            cardapio.metodos.mensagem('Informe o numero da sua residencia', 'red');
            $("#txtNumero").focus();
            return;
        }
        if(complemento.length <= 0){
            cardapio.metodos.mensagem('Informe um complemento para seu endereco', 'red');
            $("#txtComplemento").focus();
            return;
        }
        meu_endereco = {
            cep:cep,
            endereco:endereco,
            bairro: bairro,
            cidade: cidade,
            uf: uf,
            num: num,
            complemento: complemento
            
        }
        //console.log(meu_endereco);
        cardapio.metodos.carregarEtapa(3);
        cardapio.metodos.caregarResumo();
        return;
    },
    //carrega o resumo do pedido.
    caregarResumo:() => {
        $("#listaItensResumo").html('');

        $.each(meu_carrinho, (i, e) => {
            let temp = cardapio.templates.itensResumo
                .replace(/\${img}/g, e.img)
                .replace(/\${name}/g, e.name)
                .replace(/\${qntd}/g, e.qtd)
                .replace(/\${price}/g, e.price.toFixed(2).replace('.',",")); 
                
                $("#listaItensResumo").append(temp);
                //console.log(temp);

        });
                //montando endereco do resumo do pedido
                $("#resumoEndereco").html(`${meu_endereco.endereco}, ${meu_endereco.bairro}, ${meu_endereco.num} `);
                $("#cidade-endreco").html(`${meu_endereco.cidade}-${meu_endereco.uf} / ${meu_endereco.cep} - ${meu_endereco.complemento}`);
                
                cardapio.metodos.finalizarPedido();

    },
    //envia o pedido pelo whatsapp
    //atualiza o link do botao do whatsapp
    finalizarPedido: () => {
        if (meu_carrinho.length > 0 && meu_endereco != null) {
            let texto = 'Ola gostaria de fazer um pedido:';
            let itens = '';
    
            $.each(meu_carrinho, (i, e) => {
                itens += `*${e.qtd}x* ${e.name}..........R$ ${e.price.toFixed(2).replace('.', ',')}\n`;
            });
    
            texto += `\n *Itens do pedido:*\n\n${itens}`;
            texto += '\n*Endereço de entrega:8*';
            texto += `\n${meu_endereco.endereco}, ${meu_endereco.bairro}, ${meu_endereco.num}`;
            texto += `\n${meu_endereco.cidade}-${meu_endereco.uf} / ${meu_endereco.cep} - ${meu_endereco.complemento}`;
            texto += `\n\n*Total (com a entrega): R$ ${(valor_carrinho + valor_entrega).toFixed(2).replace('.', ',')}*`;
    
            console.log(texto);
    
            let encode = encodeURI(texto);
            let URL = `https://wa.me/${celular_empresa}?text=${encode}`;
            //https://wa.me/55+DDD+Numero?text=Mensagem
            $('#btnEtapaResumo').attr('href', URL);
        }
    }
    
    
},


cardapio.templates = {
    item: `
        <div class="col-sm-6 col-md-3 p-2 mb-5">
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

