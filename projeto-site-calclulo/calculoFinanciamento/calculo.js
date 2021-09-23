function colocarValoresNaTabela(tabelaPronta){
    var elemento = ""
    for(var j = 0; j < 5; j++){
    elemento += "<tr><td>" + tabelaPronta[j].prestacaoTabela+ "</td>";
    elemento += "<td>" + tabelaPronta[j].amotizacaoTabela.toFixed(2) + "</td>";
    elemento += "<td>" + tabelaPronta[j].jurosTabela.toFixed(2) + "</td>";
    elemento += "<td>" + tabelaPronta[j].totalTabela.toFixed(2) + "</td>";
    }

    var tabelaFinanciamento = document.getElementById("tabelaFinanciamento")
    tabelaFinanciamento.innerHTML = elemento
}

function simular(){
    //Entrada de valores
    var valor = Number(document.getElementById("valor").value)
    var prazoAno = Number(document.getElementById("prazo").value)
    var jurosAno = Number(document.getElementById("juros").value)

    //Calculos Prazo(meses) e Juros ao mês
    var prazoTela = document.getElementById("prazoMeses")
    var prazoMeses = prazoAno * 12
    prazoTela.innerHTML = prazoMeses

    var jurosMeses = (1 + jurosAno)**(1/12) - 1
    var jurosMesesTela = document.getElementById("jurosMeses")
    jurosMesesTela.innerHTML = jurosMeses

    //Calculo de Amortização
    var amortizacao = valor / prazoMeses

    //Calculo saldo devedor, juros Saldo Devedor, Juros acumulado e valor Total
    var jurosAcumulado = 0
    var jurosSaldoDevedor = []
    var total = []
    for(var i = 0; i < prazoMeses; i++){
        var saldoDevedor = valor - i * amortizacao
        jurosSaldoDevedor[i] = saldoDevedor * jurosMeses
        jurosAcumulado += jurosSaldoDevedor[i]

        total[i] = amortizacao + jurosSaldoDevedor[i]
    }
    var jurosAcumuladoTela = document.getElementById("jurosAcumulados")
    jurosAcumuladoTela.innerHTML = jurosAcumulado.toFixed(2)
    
    //Montando Tabela
    tabelaPronta = []
    jurosTabela = []
    for(var z = 0; z < 5; z++){
        tabelaPronta[z] = {prestacaoTabela: z + 1, amotizacaoTabela: amortizacao, jurosTabela: jurosSaldoDevedor[z], totalTabela: total[z]}
    }

    colocarValoresNaTabela(tabelaPronta)
}