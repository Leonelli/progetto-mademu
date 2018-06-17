
var foto1;//foto ricerca semplice
var indice;

function Storage1(id) {
    var displayFoto = new Array();
    for (var i in foto1) {
        displayFoto.push(foto1[i].codice)
    }
    sessionStorage.ID = id;
    sessionStorage.idFoto = JSON.stringify(displayFoto);
    window.open('PaginaDettaglio.html', '_blank');
}

function Popup(i, foto) {
    var str = '<img id="fotoPopup" src="' + makeImgPath(foto[i].file_path) + '">'
    str += '<p>Titolo del soggetto<p/><p>' + foto[i].soggetto + '</p>'
    str += '<p>Intestazione<p/><p>' + foto[i].intestazione + '</p>'
    str += '<p>Identificazione del soggetto<p/><p>' + foto[i].soggetto_titolo + '</p>'
    str += '<p>Data<p/><p>Da ' + foto[i].data_da + ' validità: ' + foto[i].data_esecuz_da_valid + '</p>'
    str += '<p>A ' + foto[i].data_a + ' validità: ' + foto[i].data_esecuz_a_valid + '</p>'
    str += '<p>Collocazione<p/><p>' + foto[i].collocazione + '</p>'
    str += '<p>Numero di inventario<p/><p>' + foto[i].num_inventario + '</p>'
    str += '<p>Fondo<p/><p>' + foto[i].fondo + '</p>'
    str += '<p>Descrizione oggetto<p/><p>' + foto[i].soggetto_descrizione + '</p>'
    str += '<p>Specifiche oggetto<p/><p>' + foto[i].soggetto_specifiche + '</p>'
    str += '<p>Osservazioni<p/><p>' + foto[i].osservazioni + '</p>'
    str += '<p>Numero di negativo<p/><p>' + foto[i].num_negativo + '</p>'
    str += '<p>Altri formati<p/><p>' + foto[i].altri_formati + '</p>'
    str += '<p>Serie: identificazione<p/><p>' + foto[i].id_serie + '</p>'
    str += '<p># ordine<p/><p>' + foto[i].serie_num_ord + '</p>'
    str += '<p>Titolo <p/><p>' + foto[i].serie_titolo + '</p>'
    str += '<p>Condizione generica<p/><p>' + foto[i].condizione + '</p>'
    str += '<p>Copyright<p/><p>' + foto[i].copyright + '</p>'

    $("#popup").html(str);
    $("#popup").show();

}

function Data_ISO10(d) {
    return d.toISOString().slice(0, 10);
}

function getFotoNome1(nome) {
    var percorso = "/Dati/All/Contiene/" + nome;
    var replaced;
    $.get(MaDe_Config.server_REST + percorso, function (data) {
        foto1 = data;
        var str = '';
        var cont = 0;
        //str += '<img src="schede.png" id="schede" height="42" width="42">';
        //str += '<img src="64.png" id="sq" height="42" width="42">';
        //str += '<img src="128.png" id="cvo" height="42" width="42">';
        str += "<table>"
        //str += "<tr><th>Storage</th><th>Soggetto</th><th>Data da</th><th>Data a</th><th>Titolo Serie</th><th>Fondo Provenienza</th><th>Luogo Fondo Provenienza</th><th>Foto</th></tr>"
        for (var i in data) {
            var rep = data[i].soggetto.trim().replace(nome.toUpperCase(), "<b>" + nome.toUpperCase() + "</b>");
            var path = makeImgPath(data[i].file_path);
            var ico64 = makeIco128Path(data[i].file_path);
            ///
            str += '<div class="card">';
            str += '<img> <a href="#popupScreen"><img src="' + ico64 + '" onclick="Popup(' + cont + ',foto1)"></a></td>';
            //controllo
            //str += '<img><a href="' + path + '" target="_blank" ><img src="' + ico64 + '" ></a>';
            str += '<div class="container">'
            str += '<h4>' + rep + '</h4> '
            str += '<h5>' + data[i].soggetto_titolo + '</h5> '
            str += '</div>'
            str += '</div>'
            
            cont++;
        }
        str += "</table>"

        $("#bookmark1").html(str);
    });
}

function getFotoNome2(nome) {
    var percorso = "/Dati/All/Contiene/" + nome;
    var replaced;
    $.get(MaDe_Config.server_REST + percorso, function (data) {
        foto1 = data;
        var str = '';
        var cont = 0;
        str += "<table border=1>"
        for (var i in data) {
            var rep = data[i].soggetto.trim().replace(nome.toUpperCase(), "<b>" + nome.toUpperCase() + "</b>");
            var path = makeImgPath(data[i].file_path);
            var ico64 = makeIco64Path(data[i].file_path);

            str += '<tr>';
            str += '<td class="txtCenter"><a href="#popupScreen"><img src="' + ico64 + '" onclick="Popup(' + cont + ',foto1)"></a></td>';

            //str += '<td class="txtCenter"><a href="' + path + '" target="_blank" ><img src="' + ico64 + '" ></a></td>';
            //str += '<td><input type="button" value="TEST Storage" onclick="Storage1(' + cont + ')" /></td>'
            str += '<td>' + rep + '<br>' + data[i].soggetto_titolo + "<br>Album: " + data[i].id_album + ", serie: " + data[i].id_serie + ", codice: " + data[i].codice + '</td>';
            str += '</tr>';
            cont++;
        }
        str += "</table>"

        $("#bookmark1").html(str);
    });
}
function getFotoNome3(nome) {
    var percorso = "/Dati/All/Contiene/" + nome;
    var replaced;
    $.get(MaDe_Config.server_REST + percorso, function (data) {
        foto1 = data;
        var str = '';
        var cont = 0;
        str += "<table border=1>"
        for (var i in data) {
            var rep = data[i].soggetto.trim().replace(nome.toUpperCase(), "<b>" + nome.toUpperCase() + "</b>");
            var path = makeImgPath(data[i].file_path);
            var ico128 = makeIco128Path(data[i].file_path); //DACAMBIARE DIMENSIONE IMMAGINI

            str += '<tr>';
            str += '<td class="txtCenter"><a href="#popupScreen"><img src="' + ico128 + '" onclick="Popup(' + cont + ',foto1)"></a></td>';
            //str += '<td class="txtCenter"><a href="' + path + '" target="_blank" ><img src="' + ico128 + '" ></a></td>';
            //str += '<td><input type="button" value="TEST Storage" onclick="Storage1(' + cont + ')" /></td>'
            str += '<td>' + rep + '<br>' + data[i].soggetto_titolo + "<br>Album: " + data[i].id_album + ", serie: " + data[i].id_serie + ", codice: " + data[i].codice + '</td>';
            str += '</tr>';
            cont++;
        }
        str += "</table>"

        $("#bookmark1").html(str);
    });
}
/////////////////////////////////////////////////////////////////////////////////////////
var foto;//foto ricerca complessa
var indice;

function Storage(id) {
    var displayFoto = new Array();
    for (var i in foto) {
        if (foto[i].visibile) {
            displayFoto.push(foto[i].codice)
        }
    }
    sessionStorage.ID = id;
    sessionStorage.idFoto = JSON.stringify(displayFoto);
    window.open('PaginaDettaglio.html', '_blank');
}

function showContatore() {
    iCnt = 0;
    for (var i in foto) {
        if (foto[i].visibile)
            iCnt++;
    }
    $("#numfoto").html("Trovate " + iCnt + " foto");
}

function azzeraRicerca() {
    $("#bookmark").hide();
    $(".inputTxt").val("");
    $(".inputCb").val("-1");
    $(".filtro_txt").html("")

    for (var i in foto) {
        foto[i].visibile = true;
    }
    showContatore();
}

function getFotoAll() {
    $.get(MaDe_Config.server_REST + "/094C4271-7FB0-4070-985E-26EC39EBACF5/Dati", function (data) {
        foto = data;
        azzeraRicerca();
    });
}

function riempiDropdownSingola(percorso, _filtro, txt) {
    $.get(MaDe_Config.server_REST + percorso, function (data) {
        var str1 = '<option value="-1"></option>';
        var tmp = [data[0][_filtro]];
        var presente = false;
        str1 += '<option value="' + data[0][_filtro] + '">' + data[0][_filtro] + ' </option>'
        for (var i = 0; i < data.length; i++) {
            for (var j in tmp)
                if (data[i][_filtro] == tmp[j])
                    presente = true;
            if (!presente) {
                str1 += '<option value="' + data[i][_filtro] + '">' + data[i][_filtro] + ' </option>'
                tmp[tmp.length] = data[i][_filtro]
            }
            presente = false;
        }
        $(txt).html(str1);
    });
}

function riempiDropdown() {
    riempiDropdownSingola("/094C4271-7FB0-4070-985E-26EC39EBACF5/Dati", "collocazione", "#cbAlbum");
    riempiDropdownSingola("/094C4271-7FB0-4070-985E-26EC39EBACF5/Dati", "fondo_provenienza", "#cbFondo");
    riempiDropdownSingola("/094C4271-7FB0-4070-985E-26EC39EBACF5/Dati", "serie_titolo", "#cbSerie");
}

function Filtra(combobox, txt, txtF, _filtro, includes) {
    if (!combobox) {
        s = $(txt).val().toUpperCase();
        $(txtF).append(s + ' ');
        for (var i in foto)
            if (foto[i].visibile) {
                if (includes) trovato = (foto[i][_filtro].includes(s));
                else trovato = (foto[i][_filtro] == s);
                if (!trovato)
                    foto[i].visibile = false;
            }
        showContatore();
        Tabella();
    }
    else {
        var ix = document.getElementById(txt).selectedIndex;
        var opt = document.getElementById(txt).options;
        $(txtF).append(opt[ix].text);
        for (var i in foto) {
            if (foto[i].visibile) {
                if (opt[ix].text == "null" && foto[i][_filtro] == null)
                    trovato = true;
                else
                    trovato = (foto[i][_filtro] == opt[ix].text);
                if (!trovato) {
                    foto[i].visibile = false;
                }
            }
        }
        showContatore();
        Tabella();
    }
}

function filtraPeriodo() {

    sdMin = $("#dMin").val();
    sdMax = $("#dMax").val();

    for (var i in foto) {
        if (foto[i].visibile) {
            fdmin = Data_ISO10(new Date(foto[i].data_da));
            fdmax = Data_ISO10(new Date(foto[i].data_a));
            if (document.getElementById('chEs').checked) {
                trovato = fdmin >= sdMin && fdmax <= sdMax;
            }
            else if (document.getElementById('chInc').checked) {
                trovato = fdmin <= sdMax && fdmax >= sdMin;
            }
            if (!trovato) {
                foto[i].visibile = false;
            }
        }
    }

    showContatore();
    Tabella();
}
function chIncUncheck() {
    document.getElementById('chInc').checked = false;
}
function chEsUncheck() {
    document.getElementById('chEs').checked = false;
}

function Tabella() {
    var str = '';
    var cont = 0;
    str += "<table>"
    str += "<tr><th>Storage</th><th>codice</th><th>intestazione</th><th>id_album</th><th>fondo</th><th>soggetto</th><th>soggetto_titolo</th><th>id_serie</th><th>data_da</th><th>data_esecuz_da</th><th>data_esecuz_da_valid</th><th>data_a</th><th>data_esecuz_a</th><th>data_esecuz_a_valid</th><th>Foto</th></tr>"
    for (var i in foto) {
        if (foto[i].visibile) {
            var path = makeImgPath(foto[i].file_path);
            var ico64 = makeIco64Path(foto[i].file_path);

            str += '<tr>';
            str += '<td><input type="button" value="TEST Storage" onclick="Storage(' + cont + ')" /></td>'
            str += '<td class="txtCenter">' + foto[i].codice + '</td>';
            str += '<td class="txtCenter">' + foto[i].intestazione + '</td>';
            str += '<td class="txtCenter">' + foto[i].id_album + '</td>';
            str += '<td class="txtCenter">' + foto[i].fondo + '</td>';
            str += '<td class="txtCenter">' + foto[i].soggetto + '</td>';
            str += '<td class="txtCenter">' + foto[i].soggetto_titolo + '</td>';
            str += '<td class="txtCenter">' + foto[i].id_serie + '</td>';
            str += '<td class="txtCenter">' + foto[i].data_da.slice(0, 10) + '</td>';
            str += '<td class="txtCenter">' + foto[i].data_esecuz_da + '</td>';
            str += '<td class="txtCenter">' + foto[i].data_esecuz_da_valid + '</td>';
            str += '<td class="txtCenter">' + foto[i].data_a.slice(0, 10) + '</td>';
            str += '<td class="txtCenter">' + foto[i].data_esecuz_a + '</td>';
            str += '<td class="txtCenter">' + foto[i].data_esecuz_a_valid + '</td>';
            str += '<td class="txtCenter"><a href="' + path + '" target="_blank" ><img src="' + ico64 + '" ></a></td>';
            str += '<tr>';
            cont++;
        }
    }
    str += "<table>"
    $("#bookmark").html(str);
    $("#bookmark").show();
}

