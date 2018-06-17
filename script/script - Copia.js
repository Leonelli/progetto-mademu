//Storage 
function filtraHome(nome) {
    sessionStorage.nome = nome;
    window.open('ricerca.html', '_blank');
}
function Store() {
    window.open('PaginaDettaglio.html', '_blank');
}
function getExtName(ic, id_print, id_pgs, id_txt) {
    if (sessionStorage.nome != null && sessionStorage.nome != undefined) {
        $(id_txt).val(sessionStorage.nome);
        filtraSemplice(sessionStorage.nome, ic, id_print, id_pgs);
    }
}

//STORAGE PAGINA DETTAGLIO
function StorageID(codice,id) {
    console.clear();
    console.log(STR);           
            sessionStorage.ID = id;
            sessionStorage.oggetti = JSON.stringify(STR);
            window.open('PaginaDettaglio.html', '_blank');
        }


//Gestione Paginazione 
var NumFoto = 14; //NUMERO DI FOTO PER PAGINA
var pag = 0; //PAGINA ATTUALE
function CambiaPagSemp(num, nome, ic, id_print, id_pgs) {
    pag = num;
    filtraSemplice(nome, ic, id_print, id_pgs);
}
function CambiaPagAvanzata(num, ic, id_print, id_pgs) {
    pag = num;
    printResultsAvanzata(ic, id_print, id_pgs);
}
function printPagesButtonsSemp(length, nome, ic, id_print, id_pgs) {
    var str = '';
    var tp = pag;
    var pp = pag + 1;
    var n = pag + 5;
    var start = pag;
    var numpag = Math.ceil(length / NumFoto);
    if (numpag < 5){ //inizio
        n = numpag;
        start = 0;
        }    
    if (pag > 2) {
        start = pag - 2
        n = pag +3
    }
    if (pag < 3) {
        start = 0;
        if (numpag < 5) n = numpag;
        else n = 5
    }
    if (pag >= (numpag - 3) && (numpag >= 5)) { //fine        
        start = numpag - 5;
        n = numpag
    }
    if (pag != 0)
        tp = (pag - 1);
    if (pag == numpag-1)
        pp = pag
    str += '<input type="button" value="<" onclick="CambiaPagSemp(' + tp + ',' + "'" + nome + "'" + ',' + "'" + ic + "'" + ',' + "'" + id_print + "'" + ',' + "'" + id_pgs + "'" + ')" />'
    for (var i = start; i < n; i++) {
        str += '<input type="button" value="' + (i + 1) + '" onclick="CambiaPagSemp(' + i + ',' + "'" + nome + "'" + ',' + "'" + ic + "'" + ',' + "'" + id_print + "'" + ',' + "'" + id_pgs + "'" + ')" />'
    }
    str += '<input type="button" value=">" onclick="CambiaPagSemp(' + pp + ',' + "'" + nome + "'" + ',' + "'" + ic + "'" + ',' + "'" + id_print + "'" + ',' + "'" +id_pgs + "'" + ')" />'
    return str;
}
function printPagesButtonsAvanzata(length, ic, id_print, id_pgs) {
    var str = '';
    var tp = pag;
    var pp = pag +1;
    var n = pag +5;
    var start = pag;
    var numpag = Math.ceil(length / NumFoto);
    if (numpag < 5) { //inizio
        n = numpag;
        start = 0;
    }
    if (pag > 2) {
        start = pag -2
        n = pag + 3
        }
    if (pag < 3) {
        start = 0;
        if (numpag < 5) n = numpag;
        else n = 5
        }
    if (pag >= (numpag -3) && (numpag >= 5)) { //fine        
        start = numpag -5;
        n = numpag
        }
    if (pag != 0)
        tp = (pag - 1);
    if (pag == numpag-1)
        pp = pag
    str += '<input type="button" value="<" onclick="CambiaPagAvanzata(' +tp + ',' + "'" +ic + "'" + ',' + "'" +id_print + "'" + ',' + "'" +id_pgs + "'" + ')" />'
    for (var i = start; i < n; i++) {
        str += '<input type="button" value="' + (i +1) + '" onclick="CambiaPagAvanzata(' +i + ',' + "'" + ic + "'" + ',' + "'" + id_print + "'" + ',' + "'" + id_pgs + "'" + ')" />'
        }
    str += '<input type="button" value=">" onclick="CambiaPagAvanzata(' + pp + ',' + "'" + ic + "'" + ',' + "'" + id_print + "'" + ',' + "'" + id_pgs + "'" + ')" />'
    return str;
}
function riempiDropdown(id_DDG, id_DDM, id_DDA, id_DAG, id_DAM, id_DAA, id_FONDO, id_SERIE) {
    $(id_DDG).append(riempiData(1, 31));
    $(id_DAG).append(riempiData(1, 31));
    $(id_DDM).append(riempiData(1, 12));
    $(id_DAM).append(riempiData(1, 12));
    $.get(MaDe_Config.server_REST + '/Dati', function (data) {
        $(id_DDA).append(riempiData(getLowerYear(data), getHigherYear(data)));
        $(id_DAA).append(riempiData(getLowerYear(data), getHigherYear(data)));
        $(id_FONDO).append(riempiDropdownSingola('fondo_provenienza', data));
        $(id_SERIE).append(riempiDropdownSingola('serie_titolo', data));
    });
}
function azzeraDropdown(id_DDG, id_DDM, id_DDA, id_DAG, id_DAM, id_DAA, id_FONDO, id_SERIE) {
    $(id_DDG).val('-1');
    $(id_DAG).val('-1');
    $(id_DDM).val('-1');
    $(id_DAM).val('-1');
    $(id_DDA).val('-1');
    $(id_DAA).val('-1');
    $(id_FONDO).val("-1");
    $(id_SERIE).val("-1");
}
function azzeraTextbox(id_INT, id_S, id_ST) {
    $(id_INT).val('');
    $(id_S).val('');
    $(id_ST).val('');
}
function riempiData(min, max) {
    var str = '';
    for (var i = min; i <= max; i++)
        str += '<option value="' + i + '">' + i + ' </option>'
    return str;
}
function getLowerYear(data) {
    var y = 100000;
    var t;
    for (var i in data) {
        if (data[i].data_da != null) {
            t = data[i].data_da.slice(0, 4);
            if (t < y)
                y = t;
        }
    }
    return y;
}
function getHigherYear(data) {
    var y = 0;
    var t;
    for (var i in data) {
        if (data[i].data_a != null) {
            t = data[i].data_a.slice(0, 4);
            if (t > y)
                y = t;
        }
    }
    return y;
}
function riempiDropdownSingola(_filtro, data) {
    var str = '';
    var tmp = [data[0][_filtro]];
    var presente = false;
    str += '<option value="' + data[0][_filtro] + '">' + data[0][_filtro] + ' </option>'
    for (var i = 0; i < data.length; i++) {
        for (var j in tmp)
            if (data[i][_filtro] == tmp[j])
                presente = true;
        if (!presente) {
            str += '<option value="' + data[i][_filtro] + '">' + data[i][_filtro] + ' </option>'
            tmp[tmp.length] = data[i][_filtro]
        }
        presente = false;
    }
    return str;
}
function filtraSemplice(nome, ic, id_print, id_pgs) {
    var percorso = '/Dati/All/Contiene/' + nome; //gestione del percorso completo di nome
    $.get(MaDe_Config.server_REST + percorso, function (data) {
        var btn = printPagesButtonsSemp(data.length, nome, ic, id_print, id_pgs); //stampa bottoni per paginazione in cima
        var str = '<table style="border-collapse:collapse; width:100%;">'; //inizio tabella
        if (ic === '64' || ic === '128') //se la visualizzazione è a 64 o 128
            str += printResultsIcoSemp(data, ic, nome);
        else //se la visualizzazione è tramite cards
            str += printResultsCardsSemp(data, nome);
        str += '</table>'; //fine tabella
        //str += printPagesButtonsSemp(data.length, nome, ic, id_print); //stampa bottoni per paginazione in fondo
        $(id_pgs).html(btn); //scrittura della tabella nella div #risultati
        $(id_pgs).show();
        $(id_print).html(str); //scrittura della tabella nella div #risultati
        $(id_print).show();
    });
}
function printResultsCardsSemp(data, nome) {
    str = ''
    for (var i = NumFoto * pag; i < NumFoto * (pag + 1) ; i++) { //ciclo per la stampa degli oggetti a seconda della pagina
        if (data[i] != null) { //controllo per non uscire oltre gli indici
            var rep = data[i].soggetto.trim().replace(nome.toUpperCase(), '<b>' + nome.toUpperCase() + '</b>'); //la stringa del nome nel campo soggetto viene trasformata in grassetto
            str += '<div class="ricerca_schede">';
            //str += '<a href="' + makeImgPath(data[i].file_path) + '" data-lightbox="fotoRicerca"><img src="' + makeThumb320(data[i].file_path) + '"/></a>';
            str += '<a href="' + makeImgPath(data[i].file_path) + '" data-lightbox="fotoRicerca"><img src="' + makeThumb320(data[i].file_path) + '"/ onclick="StorageID('+data[i].codice+','+cont+')"  target="_blank"></a>';
            STR[cont]=data[i].codice;
            cont++;
            str += '<div class="card-text">';
            str += '<p class="titolo_foto">' + rep + '</p> ';
            str += '<p class="descrizione_foto">' + data[i].soggetto_titolo + '</p> ';
            str += '</div>';
            str += '</div>';

        }
    }
    return str; //contenuto
}

//IMPLEMENTAZIONE STORAGE
var STR=new Array();
var cont=0;
function printResultsIcoSemp(data, ic, nome) {
    str = ''
    //var cont=0;
    for (var i = NumFoto * pag; i < NumFoto * (pag + 1) ; i++) { //ciclo per la stampa degli oggetti a seconda della pagina
        if (data[i] != null) {//controllo per non uscire oltre gli indici
            if (ic === '128') { //gestione del tipo di visualizzazione
                var ico = makeIco128Path(data[i].file_path);
                var c = 'descrizione-min128'
            }
            else {
                var ico = makeIco64Path(data[i].file_path);
                var c = 'descrizione-min64'
            }

            var rep = data[i].soggetto.trim().replace(nome.toUpperCase(), '<b>' + nome.toUpperCase() + '</b>'); //la stringa del nome nel campo soggetto viene trasformata in grassetto			
            str += '<tr class="righericerca-style" style="vertical-align: top; border-bottom: 1px solid gray">';
            //my versione (avanzata)
            str += '<td class="txtCenter" style="padding-top:15px;">' + '<a onclick="StorageID('+data[i].codice+','+cont+')"  target="_blank" >' + '<img src="' + ico + '"></td>';
            console.log(data[i].codice);
            STR[cont]=data[i].codice;
            cont++;
            //dionigi version
            //str += '<td class="txtCenter" style="padding-top:15px;"><a href="' + makeImgPath(data[i].file_path) + '" data-lightbox="fotoRicerca"><img src="' + ico + '"></td>';
            str += '<td style="padding-top:15px;"><p class="titolo-righericerca">' + rep + '</p><p class="descrizione-righericerca">' + data[i].soggetto_titolo + '</p><p class="' + c + '">Album:' + data[i].id_album + ", serie: " + data[i].id_serie + ", codice: " + data[i].codice + '</p>';
            //str += '<hr/>';
            str += '</td>';
            str += '</tr>';
        }
    }
    console.log(STR);//memorizza correttamente
    return str; //contenuto
}


var foto;//foto ricerca complessa
var fotoVis = []; //foto visibili

function getFotoAll(id_DDG, id_DDM, id_DDA, id_DAG, id_DAM, id_DAA, id_FONDO, id_SERIE, id_INT, id_S, id_ST, id_print) {
    $.get(MaDe_Config.server_REST + "/Dati", function (data) {
        foto = data;
        //azzeraRicerca(id_DDG, id_DDM, id_DDA, id_DAG, id_DAM, id_DAA, id_FONDO, id_SERIE, id_INT, id_S, id_ST, id_print);
    for (var i in foto)
        foto[i].visibile = true;
        });
}

function azzeraRicerca(id_DDG, id_DDM, id_DDA, id_DAG, id_DAM, id_DAA, id_FONDO, id_SERIE, id_INT, id_S, id_ST, id_print) {
    $(id_print).html('');
    azzeraDropdown(id_DDG, id_DDM, id_DDA, id_DAG, id_DAM, id_DAA, id_FONDO, id_SERIE);
    azzeraTextbox(id_INT, id_S, id_ST)
    pag = 0;

    for (var i in foto)
        foto[i].visibile = true;
}

function filtraAvanzata(id_DDG, id_DDM, id_DDA, id_DAG, id_DAM, id_DAA, id_FONDO, id_SERIE, id_INT, id_S, id_ST, vis, id_print, id_mancanti, id_pgs) {
    var includiMancanti = false;
    if (document.getElementById(id_mancanti).checked) includiMancanti = true;
    if ($(id_INT).val() != '') filtraCampo(false, id_INT, 'intestazione', true, vis, id_print, includiMancanti, id_pgs);
    if ($(id_S).val() != '') filtraCampo(false, id_S, 'soggetto', true, vis, id_print, includiMancanti, id_pgs);
    if ($(id_ST).val() != '') filtraCampo(false, id_ST, 'soggetto_titolo', true, vis, id_print, includiMancanti, id_pgs);
    if ($(id_FONDO).val() != -1) filtraCampo(true, id_FONDO, 'fondo_provenienza', false, vis, id_print, includiMancanti, id_pgs);
    if ($(id_SERIE).val() != -1) filtraCampo(true, id_SERIE, 'serie_titolo', false, vis, id_print, includiMancanti, id_pgs);
    if ($(id_DDA).val() != -1 || $(id_DAA).val() != -1) filtraPeriodo(id_DDG, id_DDM, id_DDA, id_DAG, id_DAM, id_DAA, vis, id_print, includiMancanti, id_pgs);
}

function filtraCampo(combobox, id, _filtro, includes, vis, id_print, includiMancanti, id_pgs) {    
    if (!combobox) { //ricerca textbox
        s = $(id).val().toUpperCase();
        for (var i in foto)
            if (foto[i].visibile) {
                if (includes) trovato = (foto[i][_filtro].includes(s));
                else trovato = (foto[i][_filtro] == s);
                if (includiMancanti && (foto[i][_filtro] == null || foto[i][_filtro] == '')) trovato = true;
                if (!trovato)
                    foto[i].visibile = false;
            }
        printResultsAvanzata(vis, id_print, id_pgs);
    }
    else { //ricerca combobox
        var t = $(id).find('option:selected').val();
        for (var i in foto) {
            if (foto[i].visibile) {
                if (t == "null" && foto[i][_filtro] == null) trovato = true;
                else trovato = (foto[i][_filtro] == t);
                if (includiMancanti && (foto[i][_filtro] == null || foto[i][_filtro] == '')) trovato = true;
                if (!trovato) foto[i].visibile = false;
            }
        }
        printResultsAvanzata(vis, id_print, id_pgs);
    }
}
function filtraPeriodo(id_DDG, id_DDM, id_DDA, id_DAG, id_DAM, id_DAA, vis, id_print, includiMancanti, id_pgs) {
    var DDA = $(id_DDA).find('option:selected').val(); if (DDA == -1) DDA = getLowerYear(foto);
    var DAA = $(id_DAA).find('option:selected').val(); if (DAA == -1) DAA = getHigherYear(foto);
    var DDM = $(id_DDM).find('option:selected').val(); if (DDM == -1) DDM = 1;
    var DAM = $(id_DAM).find('option:selected').val(); if (DAM == -1) DAM = 1;
    var DDG = $(id_DDG).find('option:selected').val(); if (DDG == -1) DDG = 1;
    var DAG = $(id_DAG).find('option:selected').val(); if (DAG == -1) DAG = 1;

    var sdMin = new Date(DDA, DDM - 1, DDG)
    var sdMax = new Date(DAA, DAM - 1, DAG)

    for (var i in foto) {
        if (foto[i].visibile) {
            var fdmin = new Date(Data_ISO10(new Date(foto[i].data_da)));
            var fdmax = new Date(Data_ISO10(new Date(foto[i].data_a)));
            var trovato = fdmin >= sdMin && fdmax <= sdMax; //ESATTA
            //var trovato = fdmin <= sdMax && fdmax >= sdMin; //INCLUSA
            if (includiMancanti && (foto[i].data_da == null || foto[i].data_da == '')) trovato = true;
            if (!trovato) foto[i].visibile = false;
        }
    }
    printResultsAvanzata(vis, id_print, id_pgs);
}


function Data_ISO10(d) {
    return d.toISOString().slice(0, 10);
}

function printResultsAvanzata(vis, id_print, id_pgs) {
    var btn = printPagesButtonsAvanzata(getFotoVisibili().length, vis, id_print, id_pgs);
    var cont = 0;
    var str = '<table style="border-collapse:collapse; width:100%;">'
    for (var i = NumFoto * pag; i < NumFoto * (pag + 1) ; i++) { //ciclo per la stampa degli oggetti a seconda della pagina
        if (fotoVis[i] != null) { //controllo per non uscire oltre gli indici
            if (vis === 'cards') { //gestione del tipo di visualizzazione
                str += '<div class="ricerca_schede">';
                str += '<a href="' + makeImgPath(fotoVis[i].file_path) + '" data-lightbox="fotoAvanzata"><img src="' + makeThumb320(fotoVis[i].file_path) + '"/></a>';
                str += '<div class="card-text">';
                str += '<p class="titolo_foto">' + fotoVis[i].soggetto + '</p> ';
                str += '<p class="descrizione_foto">' + fotoVis[i].soggetto_titolo + '</p> ';
                str += '</div>';
                str += '</div>';

            }
            else {
                if (vis === '128') { //gestione del tipo di visualizzazione
                    var ico = makeIco128Path(fotoVis[i].file_path);
                    var c = 'descrizione-min128'
                }
                else {
                    var ico = makeIco64Path(fotoVis[i].file_path);
                    var c = 'descrizione-min64'
                }

                str += '<tr class="righericerca-style" style="vertical-align: top; border-bottom: 1px solid gray">';
                str += '<td class="txtCenter" style="padding-top:15px;"><a href="' + makeImgPath(fotoVis[i].file_path) + '" data-lightbox="fotoAvanzata"><img src="' + ico + '"></a></td>';
                str += '<td style="padding-top:15px;"><p class="titolo-righericerca">' + fotoVis[i].soggetto + '</p><p class="descrizione-righericerca">' + fotoVis[i].soggetto_titolo + '</p><p class="' + c + '">Album:' + fotoVis[i].id_album + ", serie: " + fotoVis[i].id_serie + ", codice: " + fotoVis[i].codice + '</p>';
                //str += '<hr/>';
                str += '</td>';
                str += '</tr>';


            }
        }
    }
    str += '</table>'
    //str += printPagesButtonsAvanzata(getFotoVisibili().length, vis, id_print);
    $(id_pgs).html(btn);
    $(id_pgs).show();
    $(id_print).html(str);
    $(id_print).show();
}


function getFotoVisibili() {
    fotoVis = [];
    for (var i in foto) 
        if (foto[i].visibile)
            fotoVis.push(foto[i]);
    return fotoVis;
}



