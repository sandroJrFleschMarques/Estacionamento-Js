let num = document.querySelector('input#fnum')
let lista = document.querySelector('select#flista')
let res = document.querySelector('div#res')
let sai = document.querySelector('input#fsai')
let lista2 = document.querySelector('select#flista2')
let resp = document.querySelector('div#resp')
let valores = []


const getHours = () => {
    const clock = document.getElementById('horaAtual')
    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const hour = hours < 10 ? `0${hours}` : hours
    const minute = minutes < 10 ? `0${minutes}` : minutes
    const second = seconds < 10 ? `0${seconds}` : seconds
    clock.innerHTML = `${hour}:${minute}:${second}`
}

setInterval(() => {
    getHours()
}, 1000)

function adicionar() {
    res.innerHTML = ''
    resp.innerHTML = ''
    class Pessoa {
        constructor(placa, hora) {
            this.placa = placa;
            this.hora = hora;
        }
    }

    let item = new Pessoa(num.value, new Date)
    let jaExiste = false
    for (let v of valores) {
        if (v.placa == item.placa) {
            jaExiste = true
        }
    }
    if (num.value.length == 7 && jaExiste == false) {
        let mostra = document.createElement('option')
        valores.push(item)
        mostra.text = `${item.placa} ${item.hora}`
        lista.appendChild(mostra)

    } else {
        window.alert('Placa inválida ou já encontrada na lista.')
    }
    num.value = ''
    num.focus()
}
function saida() {
    let a = 1
    if (sai.value.length == 0) {
        alert('Você não digitou nada')
    }
    else if (valores.length == 0) {
        alert('Veículo não encontrado, adicione uma placa antes de remover')
    }
    for (let indice in valores) {
        if (sai.value == valores[indice].placa) {

            a = 0
            let item2 = document.createElement('option')
            let tempo = (new Date - valores[indice].hora) / 1000 / 60;
            item2.text = `${valores[indice].placa} ${new Date}`

            function loop(tempo) {
                let reais = 0;
                while (tempo > 0) {
                    if (tempo > 428) {
                        tempo -= 1440;
                        reais += 35;
                    }
                    else if (tempo > 368 && tempo <= 428) {
                        tempo -= 428;
                        reais += 28;
                    }
                    else if (tempo > 308 && tempo <= 368) {
                        tempo -= 368;
                        reais += 25;
                    }
                    else if (tempo > 248 && tempo <= 308) {
                        tempo -= 308;
                        reais += 22;
                    }
                    else if (tempo > 188 && tempo <= 248) {
                        tempo -= 248;
                        reais += 19;
                    }
                    else if (tempo > 128 && tempo <= 188) {
                        tempo -= 188;
                        reais += 16;
                    }
                    else if (tempo > 68 && tempo <= 128) {
                        tempo -= 128;
                        reais += 13;
                    }
                    else if (tempo > 38 && tempo <= 68) {
                        tempo -= 68;
                        reais += 9;
                    }
                    else if (tempo >= 5 && tempo <= 38) {
                        tempo -= 38;
                        reais += 8;
                    }
                    else if (tempo < 5) {
                        tempo -= 5;
                        reais += 0;
                    }

                }
                return reais
            }
            res.innerHTML = ''
            resp.innerHTML = ''
            let minuto = Math.floor(tempo);

            if (tempo < 5) {
                resp.innerHTML += "<br>Tolerância 04 minutos";
            }
            else if (tempo < 60) {

                resp.innerHTML += `<br>Tempo de Permanência: ${minuto} minuto(s)`;
            }
            else if (tempo >= 60) {
                let inteira = Math.floor(minuto / 60);
                let resto = minuto % 60;
                resp.innerHTML += `<br>Tempo de Permanência: ${inteira} hora(s) e ${resto} minuto(s)`;
            }

            resp.innerHTML += `<br>R$ ${loop(tempo)},00`;
            valores.splice(indice, 1)
            lista2.appendChild(item2)
            lista.removeChild(lista[indice])
        } else if (sai.value.length != 0 && Number(valores.length) == Number(indice) + Number(a)) {
            alert('Valor não encontrado')
        }
    }
    num.value = ''
    num.focus()
}

function finalizar() {
    resp.innerHTML = ''
    res.innerHTML = ''
    if (valores.length == 0) {
        window.alert('Adicione valores antes de finalizar!')
    } else {
        let tot = valores.length
        res.innerHTML += `<p>Ao todo, temos ${tot} veículos no pátio.</p>`
        for (let pos in valores) {
            res.innerHTML += `${valores[pos].placa}<br>`
        }
    }
}