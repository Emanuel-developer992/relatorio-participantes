// IMPRIMIR RELATÓRIO
function printDiv(divName) {

    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

     document.body.innerHTML = printContents;

     window.print();

     document.body.innerHTML = originalContents;

};



// FILTRAR E BUSCAS
//#region 

// Variaveis globais

    var aTb = [];
    var cabecalho = [];
    var RowCount;
    var table;
    var array;
    

function filter_participantes() {

    var cArray = [];
    
    table = document.getElementById("tb_relatorio");

    
    $("#tb_relatorio tr").remove();
    
    //Condição de Busca
    //#region Contraint

    if ($("#filter_nome").val() != "") {
        
        var nome = $("#filter_nome").val();
        var cNome = DatasetFactory.createConstraint("nomeComp", nome, nome, ConstraintType.SHOULD, true);
        cArray.push(cNome);
    }

    if ($("#filter_idade_de").val() != "") {

        var idadeDe = $("#filter_idade_de").val();

        if ($("#filter_idade_ate").val() != "") {

            var idadeAte = $("#filter_idade_ate").val();
            var cIdade = DatasetFactory.createConstraint("idade", idadeDe, idadeAte, ConstraintType.MUST);
            cArray.push(cIdade);
        }
        else {
            var cIdade = DatasetFactory.createConstraint("idade", idadeDe, idadeDe, ConstraintType.MUST);
            cArray.push(cIdade);
        }    
    }
    else {

        if ($("#filter_idade_ate").val() != "") {

            var idadeAte = $("#filter_idade_ate").val();
            var cIdade = DatasetFactory.createConstraint("idade", idadeAte, idadeAte, ConstraintType.MUST);
            cArray.push(cIdade);
        }
    }

    if ($("#filter_sexo").val() != "") {

        sexo = $("#filter_sexo").val();
        var cSexo = DatasetFactory.createConstraint("sexo", sexo, sexo, ConstraintType.MUST);
        cArray.push(cSexo);
    }

    if ($("#filter_sensibilidade").val() != "") {

        sensibilidade = $("#filter_sensibilidade").val();
        var cSensibilidade = DatasetFactory.createConstraint("sensibilidadeResp", sensibilidade, sensibilidade, ConstraintType.MUST);
        cArray.push(cSensibilidade);
    }

    if ($("#filter_fototipo").val() != "") {

        fototipo = $("#filter_fototipo").val();
        var cFototipo = DatasetFactory.createConstraint("fototipoResp",fototipo,fototipo, ConstraintType.MUST);
        cArray.push(cFototipo);
    }

    if ($("#filter_espinhas").val() != "") {

        espinhas = $("#filter_espinhas").val();
        var cEspinhas = DatasetFactory.createConstraint("frequenciaEspinhas", espinhas, espinhas, ConstraintType.MUST);
        cArray.push(cEspinhas);
    }
    
    if ($("#filter_rosto").val() != "") {

        rosto = $("#filter_rosto").val();
        var cRosto = DatasetFactory.createConstraint("classificacaoPeleRosto", rosto, rosto, ConstraintType.MUST);
        cArray.push(cRosto);
    }

    if ($("#filter_cabelo").val() != "") {

        cabelo = $("#filter_cabelo").val();
        var cCabelo = DatasetFactory.createConstraint("tipoCabelo", cabelo, cabelo, ConstraintType.MUST);
        cArray.push(cCabelo);
    }
    
    if ($("#filter_caspas").val() != "") {

        caspas = $("#filter_caspas").val();
        var cCaspas = DatasetFactory.createConstraint("caspas", caspas, caspas, ConstraintType.MUST);
        cArray.push(cCaspas);
    }
   
    if ($("#filter_corpo").val() != "") {

        corpo = $("#filter_corpo").val();
        var cCorpo = DatasetFactory.createConstraint("classificacaoPele", corpo, corpo, ConstraintType.MUST);
        cArray.push(cCorpo);
    }

    if ($("#filter_transpiracao").val() != "") {

        transpiracao = $("#filter_transpiracao").val();
        var cTranspiracao = DatasetFactory.createConstraint("transpiracao", transpiracao, transpiracao, ConstraintType.MUST);
        cArray.push(cTranspiracao);
    }

    if ($("#filter_alergia").val() != "") {

        alergia = $("#filter_alergia").val();
        var cAlergia = DatasetFactory.createConstraint("historicoAlergias", alergia, alergia, ConstraintType.MUST);
        cArray.push(cAlergia);
    }

    if ($("#filter_disponibilidade").val() != "") {

        disponibilidade = $("#filter_disponibilidade").val();
        var cDisponibilidade = DatasetFactory.createConstraint("disponibilidade", disponibilidade, disponibilidade, ConstraintType.MUST);
        cArray.push(cDisponibilidade);
    }

    if ($("#filter_fumante").val() != "") {

        fumante = $("#filter_fumante").val();
        var cFumante = DatasetFactory.createConstraint("fuma", fumante, fumante, ConstraintType.MUST);
        cArray.push(cFumante);
    }    
    
    
    //#endregion

    //Ordena o resultado pelo nome do Cliente
    var sortingFields = new Array("nomeComp");

    //Filtro de Busca 
    // Busca no Dataset + Condições de Filtro
    if (cArray == "") {
        array = DatasetFactory.getDataset("cadastro_de_participantes", null, null, sortingFields);
    }
    else {
        array = DatasetFactory.getDataset("cadastro_de_participantes", null, cArray, sortingFields);
    }

    console.log('---');
    console.log(array);
    console.log('---');
    

    // Numero de linhas do array vindo do filtro
    RowCount = array.values.length
   
};

function filtrar() {
    
    //window.location.hash = '#relatorio_a4';
    document.getElementById( 'relatorio_a4' ).scrollIntoView();
    filter_participantes();
    filter_cadastro();

};

//Limpar campos + tabela
function filter_clear() {

    $("#filter_nome").val("");
    $("#filter_idade_de").val("");
    $("#filter_idade_ate").val("");
    $("#filter_cpf").val("");
    $("#filter_rg").val("");
    $("#filter_cep").val("");
    $("#filter_sexo").val("");
    $("#filter_fototipo").val("");
    $("#filter_sensibilidade").val("");
    $("#filter_classe").val("");

    $("#filter_espinhas").val("");
    $("#filter_rosto").val("");
    $("#filter_cabelo").val("");
    $("#filter_caspas").val("");
    $("#filter_corpo").val("");
    $("#filter_transpiracao").val("");
    $("#filter_alergia").val("");
    $("#filter_disponibilidade").val("");
    $("#filter_fumante").val("");

    $("#tb_relatorio tr").remove();

};

//pesquisar todos participantes
function filter_all() {

  filter_clear();
  filtrar(); 

};

//FILTROS POR CATEGORIA
function filter_responsavel() {

    filter_participantes();

    cabecalho = [];

    cabecalho.push(""); 
    cabecalho.push("Nome"); 
    cabecalho.push("Data de Cadastro"); 
    cabecalho.push("Data de Nascimento"); 
    cabecalho.push("Nome do Responsável"); 
    cabecalho.push("RG do Responsável"); 
    cabecalho.push("Celular do Responsável"); 
    cabecalho.push("Email do Responsável");

    var rowHead = table.insertRow(0);

        //Inserção de linhas
        for (var i = 0; i < 8; i++) {
            
            headCell = rowHead.insertCell(i);
            
            headCell.innerHTML = cabecalho[i];
            
        }
    
    

    for (var n = 0; n < RowCount; n++) {

        aTb = [];

        //Valores para integração ao campos
        //#region array.values[]
        var a_cod = n + 1;
        var a_nomeComp = array.values[n].nomeComp;
        var a_dataCadastro = array.values[n].dataCadastro;
        var a_dataNascimento = array.values[n].dataNascimento;
        var a_nomeResponsavel = array.values[n].nomeResponsavel;
        var a_rgResponsavel = array.values[n].rgResponsavel;
        var a_celularResponsavel = array.values[n].celularResponsavel;
        var a_emailResponsavel = array.values[n].emailResponsavel;

        //#endregion

        //Integração aos campos
        //#region aTb.push();
        aTb.push(a_cod);
        aTb.push(a_nomeComp);
        aTb.push(a_dataCadastro);
        aTb.push(a_dataNascimento);
        aTb.push(a_nomeResponsavel);
        aTb.push(a_rgResponsavel);
        aTb.push(a_celularResponsavel);
        aTb.push(a_emailResponsavel);

        //#endregion

        var newRow = table.insertRow(n + 1);

        //Inserção de linhas
        for (var i = 0; i < 8; i++) {
            
                newCell = newRow.insertCell(i);
                
                newCell.innerHTML = aTb[i];
            
        }
        
    }

};

function filter_cadastro() {

    filter_participantes();

    cabecalho = [];

    cabecalho.push(""); 
    cabecalho.push("Nome"); 
    cabecalho.push("Sexo"); 
    cabecalho.push("RG"); 
    cabecalho.push("CPF"); 
    cabecalho.push("Data de Nascimento"); 
    cabecalho.push("Idade"); 
    cabecalho.push("Celular");
    cabecalho.push("Telefone");

    var rowHead = table.insertRow(0);

        //Inserção de linhas
        for (var i = 0; i < 9; i++) {
            
                headCell = rowHead.insertCell(i);
                
                headCell.innerHTML = cabecalho[i];
            
        }

    for (var n = 0; n < RowCount; n++) {

        aTb = [];

        //Valores para integração ao campos
        //#region array.values[]
        var a_cod = n + 1;
        var a_nomeComp = array.values[n].nomeComp;
        var a_sexo = array.values[n].sexo;
        var a_rg = array.values[n].rg;
        var a_cpf = array.values[n].cpf;
        var a_dataNasc = array.values[n].dataNasc;
        var a_idade = array.values[n].idade;
        var a_cContato = array.values[n].cContato;
        var a_tContato = array.values[n].tContato;
        
        //#endregion

        //Integração aos campos
        //#region aTb.push();
        aTb.push(a_cod);
        aTb.push(a_nomeComp);
        aTb.push(a_sexo);
        aTb.push(a_rg);
        aTb.push(a_cpf);
        aTb.push(a_dataNasc);
        aTb.push(a_idade);
        aTb.push(a_cContato);
        aTb.push(a_tContato);

        //#endregion

        var newRow = table.insertRow(n + 1);

        //Inserção de linhas
        for (var i = 0; i < 9; i++) {
            
                newCell = newRow.insertCell(i);
                
                newCell.innerHTML = aTb[i];
            
        }
        
    }

};

function filter_localidade() {

    filter_participantes();

    cabecalho = [];

    cabecalho.push(""); 
    cabecalho.push("Nome"); 
    cabecalho.push("CEP residencial"); 
    cabecalho.push("Endereço"); 
    cabecalho.push("Número"); 
    cabecalho.push("Complemento"); 
    cabecalho.push("Bairro"); 
    cabecalho.push("Cidade");
    cabecalho.push("Estado");
    cabecalho.push("País");

    var rowHead = table.insertRow(0);

        //Inserção de linhas
        for (var i = 0; i < 10; i++) {
            
                headCell = rowHead.insertCell(i);
                
                headCell.innerHTML = cabecalho[i];
            
        }

    for (var n = 0; n < RowCount; n++) {

        aTb = [];

        //Valores para integração ao campos
        //#region array.values[]
        var a_cod = n + 1;
        var a_nomeComp = array.values[n].nomeComp;
        var a_cepResid = array.values[n].cepResid;
        var a_endereco = array.values[n].endereco;
        var a_numero = array.values[n].numero;
        var a_complemento = array.values[n].complemento;
        var a_bairro = array.values[n].bairro;
        var a_cidade = array.values[n].cidade;
        var a_estado = array.values[n].estado;
        var a_pais = array.values[n].pais;
        
        //#endregion

        //Integração aos campos
        //#region aTb.push();
        aTb.push(a_cod);
        aTb.push(a_nomeComp);
        aTb.push(a_cepResid);
        aTb.push(a_endereco);
        aTb.push(a_numero);
        aTb.push(a_complemento);
        aTb.push(a_bairro);
        aTb.push(a_cidade);
        aTb.push(a_estado);
        aTb.push(a_pais);

        //#endregion

        var newRow = table.insertRow(n + 1);

        //Inserção de linhas
        for (var i = 0; i < 10; i++) {
            
                newCell = newRow.insertCell(i);
                
                newCell.innerHTML = aTb[i];
            
        }
        
    }

};

function filter_social() {

    filter_participantes();

    cabecalho = [];

    cabecalho.push(""); 
    cabecalho.push("Nome"); 
    cabecalho.push("Instagram"); 
    cabecalho.push("Facebook"); 
    cabecalho.push("E-mail"); 

    var rowHead = table.insertRow(0);

        //Inserção de linhas
        for (var i = 0; i < 5; i++) {
            
            headCell = rowHead.insertCell(i);
            
            headCell.innerHTML = cabecalho[i];

        }
            

    for (var n = 0; n < RowCount; n++) {

        aTb = [];

        //Valores para integração ao campos
        //#region array.values[]
        var a_cod = n + 1;
        var a_nomeComp = array.values[n].nomeComp;
        var a_instagram = array.values[n].instagram;
        var a_facebook = array.values[n].facebook;
        var a_email = array.values[n].email;        
        
        //#endregion

        //Integração aos campos
        //#region aTb.push();
        aTb.push(a_cod);
        aTb.push(a_nomeComp);
        aTb.push(a_instagram);
        aTb.push(a_facebook);
        aTb.push(a_email);

        //#endregion

        var newRow = table.insertRow(n + 1);

        //Inserção de linhas
        for (var i = 0; i < 5; i++) {
            
                newCell = newRow.insertCell(i);
                
                newCell.innerHTML = aTb[i];
            
        }
        
    }

};

function filter_fototipo() {

    filter_participantes();

    cabecalho = [];

    cabecalho.push(""); 
    cabecalho.push("Nome"); 
    cabecalho.push("Cor dos Olhos"); 
    cabecalho.push("Cor dos Cabelos"); 
    cabecalho.push("Cor de Pele"); 
    cabecalho.push("Exposição Solar"); 
    cabecalho.push("Classificação do Fototipo"); 

    var rowHead = table.insertRow(0);

        //Inserção de linhas
        for (var i = 0; i < 7; i++) {
            
            headCell = rowHead.insertCell(i);
            
            headCell.innerHTML = cabecalho[i];

        }

    for (var n = 0; n < RowCount; n++) {

        aTb = [];

        //Valores para integração ao campos
        //#region array.values[]
        var a_cod = n + 1;
        var a_nomeComp = array.values[n].nomeComp;

        //Converção de Resultados
        //Cor dos Olhos
        if (array.values[n].corOlhos == 1) {
            var a_corOlhos = "Azul";
        }
        else if (array.values[n].corOlhos == 2) {
            var a_corOlhos = "Verde";
        }
        else if (array.values[n].corOlhos == 3) {
            var a_corOlhos = "Mel, castanho claro";
        }
        else {
            var a_corOlhos = "Castanho Escuro";
        }

        //Cor dos cabelos
        if (array.values[n].corCabelos == 1) {
            var a_corCabelos = "Ruivo, avermelhado";
        }
        else if (array.values[n].corCabelos == 2) {
            var a_corCabelos = "Loiro";
        }
        else if (array.values[n].corCabelos == 3) {
            var a_corCabelos = "Castanho Clara";
        }
        else if (array.values[n].corCabelos == 4) {
            var a_corCabelos = "Castanho Escura";
        }
        else {
            var a_corCabelos = "Preto";
        }

        //Cor da pele
        if (array.values[n].corPele == 1) {
        var a_corPele = "Branca Pálida";
        }
        else if (array.values[n].corPele == 2) {
            var a_corPele = "Branca";
        }
        else if (array.values[n].corPele == 3) {
            var a_corPele = "Morena Clara";
        }
        else if (array.values[n].corPele == 4) {
            var a_corPele = "Morena Escura";
        }
        else {
            var a_corPele = "Negra";
        }

        //Exposição solar
        if (array.values[n].exposicaoSolar == 1) {
            var a_exposicaoSolar = "Queima, nunca bronzeia";
        }
        else if (array.values[n].exposicaoSolar == 2) {
            var a_exposicaoSolar = "Queima, bronzeia muito pouco";
        }
        else if (array.values[n].exposicaoSolar == 3) {
            var a_exposicaoSolar = "Queima e bronzeia moderado";
        }
        else if (array.values[n].exposicaoSolar == 4) {
            var a_exposicaoSolar = "Queima pouco e bronzeia bastante";
        }
        else if (array.values[n].exposicaoSolar == 5) {
            var a_exposicaoSolar = "Queima raramente e bronzeia bastante";
        }
        else {
            var a_exposicaoSolar = "Nunca queima, pele muito pigmentada";
        }
        var a_fototipoResp = array.values[n].fototipoResp;      
        
        //#endregion

        //Integração aos campos
        //#region aTb.push();
        aTb.push(a_cod);
        aTb.push(a_nomeComp);
        aTb.push(a_corOlhos);
        aTb.push(a_corCabelos);
        aTb.push(a_corPele);
        aTb.push(a_exposicaoSolar);
        aTb.push(a_fototipoResp);

        //#endregion

        var newRow = table.insertRow(n + 1);

        //Inserção de linhas
        for (var i = 0; i < 7; i++) {
            
                newCell = newRow.insertCell(i);
                
                newCell.innerHTML = aTb[i];
            
        }
        
    }

};

function filter_sensibilidade() {

    filter_participantes();

    cabecalho = [];

    cabecalho.push(""); 
    cabecalho.push("Nome"); 
    cabecalho.push("Reação a Temperatura"); 
    cabecalho.push("Descama?"); 
    cabecalho.push("Reação a Sabonete?"); 
    cabecalho.push("Reação a tônicos?"); 
    cabecalho.push("Reação Pós Barba?"); 
    cabecalho.push("Classificação da Sensibilidade"); 

    var rowHead = table.insertRow(0);

        //Inserção de linhas
        for (var i = 0; i < 8; i++) {
            
            headCell = rowHead.insertCell(i);
            
            headCell.innerHTML = cabecalho[i];

        }

    for (var n = 0; n < RowCount; n++) {

        aTb = [];

        //Valores para integração ao campos
        //#region array.values[]
        var a_cod = n + 1;
        var a_nomeComp = array.values[n].nomeComp;
        var a_reacaoTemperatura = array.values[n].reacaoTemperatura;
        var a_descamar = array.values[n].descamar;
        var a_reacaoSabonete = array.values[n].reacaoSabonete;
        var a_reacaoTonico = array.values[n].reacaoTonico;
        var a_reacaoPosBarba = array.values[n].reacaoPosBarba;
        var a_sensibilidadeResp = array.values[n].sensibilidadeResp;    
        
        //#endregion

        //Integração aos campos
        //#region aTb.push();
        aTb.push(a_cod);
        aTb.push(a_nomeComp);
        aTb.push(a_reacaoTemperatura);
        aTb.push(a_descamar);
        aTb.push(a_reacaoSabonete);
        aTb.push(a_reacaoTonico);
        aTb.push(a_reacaoPosBarba);
        aTb.push(a_sensibilidadeResp);
        //#endregion

        var newRow = table.insertRow(n + 1);

        //Inserção de linhas
        for (var i = 0; i < 8; i++) {
            
                newCell = newRow.insertCell(i);
                
                newCell.innerHTML = aTb[i];
            
        }
        
    }

};

function filter_rosto() {

    filter_participantes();

        cabecalho = [];

        cabecalho.push(""); 
        cabecalho.push("Nome"); 
        cabecalho.push("Classificação da Pele do Rosto"); 
        cabecalho.push("Tipo de Depilação"); 
        cabecalho.push("Frequencia de Espinhas"); 
        cabecalho.push("Classificação do Envelhecimento da Pele"); 
        cabecalho.push("Classificação de Manchas Facial"); 
        cabecalho.push("Classificação de Olheiras"); 

        var rowHead = table.insertRow(0);

            //Inserção de linhas
            for (var i = 0; i < 8; i++) {
                
                headCell = rowHead.insertCell(i);
                
                headCell.innerHTML = cabecalho[i];

            }

    for (var n = 0; n < RowCount; n++) {

        aTb = [];

        //Valores para integração ao campos
        //#region array.values[]
        var a_cod = n + 1;
        var a_nomeComp = array.values[n].nomeComp;

        //Converção de valores
        //Pele do rosto
        if (array.values[n].classificacaoPeleRosto == 1) {
            var a_classificacaoPeleRosto = "Hidratada";
        }
        else if (array.values[n].classificacaoPeleRosto == 2) {
            var a_classificacaoPeleRosto = "Ressecada";
        }
        else if (array.values[n].classificacaoPeleRosto == 3) {
            var a_classificacaoPeleRosto = "Mista, oleosidadeb testa, nariz e queixo";
        }
        else if (array.values[n].classificacaoPeleRosto == 4) {
            var a_classificacaoPeleRosto = "Oleosa";
        }
        else {
            var a_classificacaoPeleRosto = "Normal";
        }

        //Tipo de depilação
        if (array.values[n].tipoDepilacao == 1) {
            var a_tipoDepilacao = "Não tenho hábito";
        }
        else if (array.values[n].tipoDepilacao == 2) {
            var a_tipoDepilacao = "Cera";
        }
        else if (array.values[n].tipoDepilacao == 3) {
            var a_tipoDepilacao = "Lâmina";
        }
        else if (array.values[n].tipoDepilacao == 4) {
            var a_tipoDepilacao = "Aparelho Depilatório";
        }
        else {
            var a_tipoDepilacao = "Laser";
        }
       
        //Frequência de espinhas
        if (array.values[n].fequenciaEspinhas == 1) {
            var a_frequenciaEspinhas = "Sempre tenho espinha no rosto";
        }
        else if (array.values[n].fequenciaEspinhas == 2) {
            var a_frequenciaEspinhas = "As vezes, sem motivo aparente";
        }
        else if (array.values[n].fequenciaEspinhas == 3) {
            var a_frequenciaEspinhas = "Somente próximo ao ciclo mentrual";
        }
        else {
            var a_frequenciaEspinhas = "Não tenho espinhas";
        }

        //Classificação de envelhecimento
        if (array.values[n].classificacaoEvelhecimentoPele == 1) {
            var a_classficacaoEvelhecimentoPele = "Rugas e linhas de expressões intensas";
        }
        else if (array.values[n].classificacaoEvelhecimentoPele == 2) {
            var a_classficacaoEvelhecimentoPele = "Rugas e linhas de expressões moderadas";
        }
        else if (array.values[n].classificacaoEvelhecimentoPele == 3) {
            var a_classficacaoEvelhecimentoPele = "Rugas e linhas de expressões leves";
        }
        else {
            var a_classficacaoEvelhecimentoPele = "Sem rugas e linhas de expressões";
        }

        //Manchas facial
        if (array.values[n].classificacaoManchasFacial == 1) {
            var a_classificacaoManchasFacial = "Tenho manchas intensas";
        }
        else if (array.values[n].classificacaoManchasFacial == 2) {
            var a_classificacaoManchasFacial = "Tenho manchas moderadas";
        }
        else if (array.values[n].classificacaoManchasFacial == 3) {
            var a_classificacaoManchasFacial = "Tenho manchas leves";
        }
        else {
            var a_classificacaoManchasFacial = "Não tenho manchas";
        }

        //Clssificação de olheiras
        if (array.values[n].classificacaoOlheiras == 1) {    
            var a_classificacaoOlheiras = "Tenho bolsas e olheiras intensas";
        }
        else if (array.values[n].classificacaoOlheiras == 2) {    
            var a_classificacaoOlheiras = "Tenho bolsas e olheiras moderadas";
        }
        else if (array.values[n].classificacaoOlheiras == 3) {    
            var a_classificacaoOlheiras = "Tenho bolsas e olheiras leves";
        }
        else {    
            var a_classificacaoOlheiras = "Não tenho bolsas e olheiras";
        }
        
        //#endregion

        //Integração aos campos
        //#region aTb.push();
        aTb.push(a_cod);
        aTb.push(a_nomeComp);
        aTb.push(a_classificacaoPeleRosto);
        aTb.push(a_tipoDepilacao);
        aTb.push(a_frequenciaEspinhas);
        aTb.push(a_classficacaoEvelhecimentoPele);
        aTb.push(a_classificacaoManchasFacial);
        aTb.push(a_classificacaoOlheiras);

        //#endregion

        var newRow = table.insertRow(n + 1);

        //Inserção de linhas
        for (var i = 0; i < 8; i++) {
            
                newCell = newRow.insertCell(i);
                
                newCell.innerHTML = aTb[i];
            
        }
        
    }

};

function filter_cabelo() {
    
    filter_participantes();

    cabecalho = [];

    cabecalho.push(""); 
    cabecalho.push("Nome"); 
    cabecalho.push("Tipo do Cabelo"); 
    cabecalho.push("Procedimento Capilar"); 
    cabecalho.push("Caspas"); 
    cabecalho.push("Queda Capilar"); 

    var rowHead = table.insertRow(0);

        //Inserção de linhas
        for (var i = 0; i < 6; i++) {
            
            headCell = rowHead.insertCell(i);
            
            headCell.innerHTML = cabecalho[i];

        }

    for (var n = 0; n < RowCount; n++) {

        aTb = [];

        //Valores para integração ao campos
        //#region array.values[]
        var a_cod = n + 1;
        var a_nomeComp = array.values[n].nomeComp;

        //Conveção de valores
        //Tipo de Cabelo
        if (array.values[n].tipoCabelo == 1) {
            var a_tipoCabelo = "Liso";
        }
        else if (array.values[n].tipoCabelo == 2) {
            var a_tipoCabelo = "Ondulado";
        }
        else if (array.values[n].tipoCabelo == 3) {
            var a_tipoCabelo = "Enrolado";
        }
        else {
            var a_tipoCabelo = "Crespo";
        }

        //Procedimento capilar
        if (array.values[n].procedimentoCapilar == 1) {
            var a_procedimentoCapilar = "Alisamento/Progressiva";
        }
        else if (array.values[n].procedimentoCapilar == 2) {
            var a_procedimentoCapilar = "Tintura";
        }
        else if (array.values[n].procedimentoCapilar == 3) {
            var a_procedimentoCapilar = "Luzes";
        }
        else if (array.values[n].procedimentoCapilar == 4) {
            var a_procedimentoCapilar = "Mega hair";
        }
        else {
            var a_procedimentoCapilar = "Nenhum, Cabelo virgem";
        }

        //caspas
        if (array.values[n].caspas == 1) {
            var a_caspas = "Muitas caspas";
        }
        else if (array.values[n].caspas == 2) {
            var a_caspas = "Normal";
        }
        else {
            var a_caspas = "Não tenho caspa";
        }

        //Queda capilar
        if (array.values[n].quedaCapilar == 1) {
            var a_quedaCapilar = "Muita queda capilar";
        }
        else if (array.values[n].quedaCapilar == 2) {
            var a_quedaCapilar = "Queda capilar moderada";
        }
        else {
            var a_quedaCapilar = "Não tenho queda capilar";
        }
        
        //#endregion

        //Integração aos campos
        //#region aTb.push();
        aTb.push(a_cod);
        aTb.push(a_nomeComp);
        aTb.push(a_tipoCabelo);
        aTb.push(a_procedimentoCapilar);
        aTb.push(a_caspas);
        aTb.push(a_quedaCapilar);
        //#endregion

        var newRow = table.insertRow(n + 1);

        //Inserção de linhas
        for (var i = 0; i < 6; i++) {
            
                newCell = newRow.insertCell(i);
                
                newCell.innerHTML = aTb[i];
            
        }
        
    }

};

function filter_corpo() {

    filter_participantes();

    cabecalho = [];

    cabecalho.push(""); 
    cabecalho.push("Nome"); 
    cabecalho.push("Classificação da pele"); 
    cabecalho.push("Pelos da Axilas"); 
    cabecalho.push("Transpiração"); 
    cabecalho.push("Classificação de Celulite"); 
    cabecalho.push("Classificação de Estrias"); 
    cabecalho.push("Classificação das Unhas"); 

    var rowHead = table.insertRow(0);

        //Inserção de linhas
        for (var i = 0; i < 8; i++) {
            
            headCell = rowHead.insertCell(i);
            
            headCell.innerHTML = cabecalho[i];

        }

    for (var n = 0; n < RowCount; n++) {

        aTb = [];

        //Valores para integração ao campos
        //#region array.values[]
        var a_cod = n + 1;
        var a_nomeComp = array.values[n].nomeComp;
        var a_classificacaoPele = array.values[n].classificacaoPele;

        //Converção de valores
        //Pelos Axilas
        if (array.values[n].pelosAxilas == 1) {
            var a_pelosAxilas = "Depilo com frequência";
        }        
        else if (array.values[n].pelosAxilas == 2) {
            var a_pelosAxilas = "Não depilo, mas depilaria de necessário";
        }
        else {
            var a_pelosAxilas = "Não depilo";
        }

        //Tranpiração
        if (array.values[n].transpiracao == 1) {
            var a_transpiracao = "Excessiva, suo muito";
        }
        else if (array.values[n].transpiracao == 2) {
            var a_transpiracao = "Normal";
        }
        else {
            var a_transpiracao = "Não suo, dificilmente transpito";
        }

        //Classificação de celulite
        if (array.values[n].classificacaoCelulites == 1) {
            var a_classificacaoCelulite = "Celulite intensa";
        }
        else if (array.values[n].classificacaoCelulites == 2) {
            var a_classificacaoCelulite = "Celulite moderada";
        }
        else if (array.values[n].classificacaoCelulites == 3) {
            var a_classificacaoCelulite = "Celulite leve";
        }
        else {
            var a_classificacaoCelulite = "Não tenho celulite";
        }

        //Classificação de estrias
        if (array.values[n].classificacaoEstrias == 1) {
            var a_classificacaoEstrias = "Muitas estrias";
        }
        else if (array.values[n].classificacaoEstrias == 2) {
            var a_classificacaoEstrias = "Estrias de forma moderada";
        }
        else if (array.values[n].classificacaoEstrias == 3) {
            var a_classificacaoEstrias = "Poucas estrias";
        }
        else {
            var a_classificacaoEstrias = "Não tenho estrias";
        }

        //Classificação de unhas
        if (array.values[n].classificacaoUnhas == 1) {
            var a_classificacaoUnhas = "Muito fracas e não cresce";
        }
        else if (array.values[n].classificacaoUnhas == 2) {
            var a_classificacaoUnhas = "Fracas, quebra com frequência";
        }
        else if (array.values[n].classificacaoUnhas == 3) {
            var a_classificacaoUnhas = "Normal, unhas saudáveis";
        }
        else {
            var a_classificacaoUnhas = "Muito fortes";
        }

        //#endregion

        //Integração aos campos
        //#region aTb.push();
        aTb.push(a_cod);
        aTb.push(a_nomeComp);
        aTb.push(a_classificacaoPele);
        aTb.push(a_pelosAxilas);
        aTb.push(a_transpiracao);
        aTb.push(a_classificacaoCelulite);
        aTb.push(a_classificacaoEstrias);
        aTb.push(a_classificacaoUnhas);

        //#endregion

        var newRow = table.insertRow(n + 1);

        //Inserção de linhas
        for (var i = 0; i < 8; i++) {
            
                newCell = newRow.insertCell(i);
                
                newCell.innerHTML = aTb[i];
            
        }
        
    }

};

function filter_saude() {

    filter_participantes();

    cabecalho = [];

    cabecalho.push(""); 
    cabecalho.push("Nome"); 
    cabecalho.push("Histórico de Alergia"); 
    cabecalho.push("Cosméstico Ultilizados"); 
    cabecalho.push("Disponibilidade"); 
    cabecalho.push("Ciclo Menstrual"); 
    cabecalho.push("Uso de medicamentos"); 
    cabecalho.push("Fumante"); 
    cabecalho.push("Pratica Esportes?"); 
    cabecalho.push("Bebida Alcoólica"); 

    var rowHead = table.insertRow(0);

        //Inserção de linhas
        for (var i = 0; i < 10; i++) {
            
            headCell = rowHead.insertCell(i);
            
            headCell.innerHTML = cabecalho[i];

        }

    for (var n = 0; n < RowCount; n++) {

        aTb = [];

        //Valores para integração ao campos
        //#region array.values[]
        var a_cod = n + 1;
        var a_nomeComp = array.values[n].nomeComp;
        var a_historicoAlergias = array.values[n].historicoAlergias;

        //Conversão de valores
        //Cosméticos
        if (array.values[n].cosmeticosUtilizados == 1) {
            var a_cosmeticosUtilizados = "Protetor Solar";
        }
        else if (array.values[n].cosmeticosUtilizados == 2) {
            var a_cosmeticosUtilizados = "Cremes antievelhecimento";
        }
        else if (array.values[n].cosmeticosUtilizados == 3) {
            var a_cosmeticosUtilizados = "Maquiagem";
        }
        else if (array.values[n].cosmeticosUtilizados == 4) {
            var a_cosmeticosUtilizados = "Hidratante para corpo";
        }
        else if (array.values[n].cosmeticosUtilizados == 5) {
            var a_cosmeticosUtilizados = "Perfumes";
        }
        else if (array.values[n].cosmeticosUtilizados == 6) {
            var a_cosmeticosUtilizados = "Desodorante e antitraspirante";
        }
        else if (array.values[n].cosmeticosUtilizados == 7) {
            var a_cosmeticosUtilizados = "Cremes para os cabelos";
        }
        else if (array.values[n].cosmeticosUtilizados == 8) {
            var a_cosmeticosUtilizados = "Esmalte";
        }
        else {
            var a_cosmeticosUtilizados = "Óleo corporal";
        }

        //Disponibilidade
        if (array.values[n].disponibilidade == 1) {
            var a_disponibilidade = "1 ou 2 horas no máximo";
        }
        else if (array.values[n].disponibilidade == 2) {
            var a_disponibilidade = "Até 4 horas";
        }
        else if (array.values[n].disponibilidade == 3) {
            var a_disponibilidade = "Até 6 horas";
        }
        else {
            var a_disponibilidade = "Mais de 6 horas";
        }

        //Ciclo mentrual
        if (array.values[n].cicloMenstrual == 1) {
            var a_cicloMenstrual = "Ciclo regular com anticoncepcional";
        }
        else if (array.values[n].cicloMenstrual == 2) {
            var a_cicloMenstrual = "Ciclo regular sem anticoncepcional";
        }
        else if (array.values[n].cicloMenstrual == 3) {
            var a_cicloMenstrual = "Ciclo irregular com anticoncepcional";
        }
        else if (array.values[n].cicloMenstrual == 4) {
            var a_cicloMenstrual = "Ciclo irregular sem anticoncepcional";
        }
        else if (array.values[n].cicloMenstrual == 5) {
            var a_cicloMenstrual = "Pré menopausa";
        }
        else {
            var a_cicloMenstrual = "Menopausa";
        }

        var a_usoMedicamentos = array.values[n].usoMedicamentos;
        var a_fuma = array.values[n].fuma;
        var a_praticaEsportes = array.values[n].praticaEsportes;
        var a_bebidaAcoolica = array.values[n].bebidaAlcoolica;
    
        //#endregion

        //Integração aos campos
        //#region aTb.push();
        aTb.push(a_cod);
        aTb.push(a_nomeComp);
        aTb.push(a_historicoAlergias);
        aTb.push(a_cosmeticosUtilizados);
        aTb.push(a_disponibilidade);
        aTb.push(a_cicloMenstrual);
        aTb.push(a_usoMedicamentos);
        aTb.push(a_fuma);
        aTb.push(a_praticaEsportes);
        aTb.push(a_bebidaAcoolica);

        //#endregion

        var newRow = table.insertRow(n + 1);

        //Inserção de linhas
        for (var i = 0; i < 10; i++) {
            
                newCell = newRow.insertCell(i);
                
                newCell.innerHTML = aTb[i];
            
        }
        
    }

};

//#endregion

function printAvd() {

    $("#scroll").removeClass();

    setTimeout(function(){   
        printDiv('relatorio_a4');
        $("#scroll").addClass('tb_scroll');
    }, 120);
    

}
