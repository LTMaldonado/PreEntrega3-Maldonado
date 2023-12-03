// Declaración de la clase usuarios------------------------------------------------------------------------------------
class Usuario {
    constructor (nombre, genero, dinero) {
        this.nombre = nombre
        this.genero = genero
        this.dinero = dinero
    }
}

// Creación del array principal: contenedor de usuarios-----------------------------------------------------------------

const usuarios = [
    new Usuario ("Luciano", "Masculino", 10000),
    new Usuario ("Coscu", "Masculino", 30060),
    new Usuario ("Momo", "Masculino", 29070),
    new Usuario ("Domi", "Femenino", 16250),
    new Usuario ("Flor", "Femenino", 56900),
    new Usuario ("Roxana", "Femenino", 39560)
]

//Creación de las funciones ---------------------------------------------------------------------------------------------

// Función para el carrusel de la cotización del dólar----------------------------------------------------------------------------

const divDolarPadre = document.getElementById("carrusel")
fetch("https://dolarapi.com/v1/dolares")
  .then(response => response.json())
  .then(data => {for (const dolares of data) {
    const divDolarHijo = document.createElement("div")
    divDolarHijo.className = "carousel-item active p-4 card"

    const tablaDolar = document.createElement("table")
    tablaDolar.className = "table"
    tablaDolar.innerHTML = `<tr> <th scope="col">Tipo de dólar: ${dolares.nombre} </th> </tr>
    <tr> <th>Venta: $${dolares.venta}</th> </tr>
    <tr> <th>Compra: $${dolares.compra}</th> </tr>`

    divDolarHijo.append(tablaDolar)
    divDolarPadre.append(divDolarHijo)
  }})


//Función para renderizar las cuotas-------------------------------------------------------------------------------------
function renderizarCuotas () {
    let montoDelPrestamo = 0
    const divCuotas = document.getElementById ("cuotasFijas")
    const cuotas = [{cuota: 12, interes: 1.8}, {cuota: 18, interes: 1.9}, {cuota: 24, interes: 2.15}, {cuota: 36, interes : 2.5}, {cuota: 48, interes: 3}]
    for (const cuotitas of cuotas) {

        //creacion de los nodos
        const sectionCuotas = document.createElement ("section")

        const tituloDeCuotas = document.createElement ("p")
        tituloDeCuotas.innerText = `${cuotitas.cuota} cuotas de -`

        const totalDeCuotas = document.createElement ("p")
        totalDeCuotas.innerText = `Total a pagar: -`

        const impuestosCuotas = document.createElement("p")
        impuestosCuotas.innerHTML = `<p>TNA: ${cuotitas.interes * 80}% <br> CFT: ${cuotitas.interes * 100}%</p>`


        //Agregar los nodos al DOM
        divCuotas.append(sectionCuotas);
        sectionCuotas.append(tituloDeCuotas, totalDeCuotas, impuestosCuotas);
        

        //Cambio del monto en las cuotas
        const inputRango = document.getElementById ("rango")
        const inputNumero = document.getElementById ("inputNumero")
        inputNumero.addEventListener ("keyup", () => {
            montoDelPrestamo = inputNumero.value
            inputRango.value = montoDelPrestamo
            tituloDeCuotas.innerText = `${cuotitas.cuota} cuotas de $${Math.round((montoDelPrestamo * cuotitas.interes) / cuotitas.cuota)}`
            totalDeCuotas.innerText = `Total a pagar: $${Math.round(parseInt(montoDelPrestamo) * cuotitas.interes)}`

            //Chequeo si se llega al maximo 
            if (parseInt(montoDelPrestamo) > 10000000) {
                // se advierte el error
                const maximoh6 = document.getElementById("h6")
                maximoh6.className = "maximo"
                maximoh6.innerText = "Límite excedido"
            } 
            else {
                const maximoh6 = document.getElementById("h6")
                maximoh6.classList -= "maximo"
                maximoh6.innerHTML = "Máx: $10.000.000"
            }
        })
        inputRango.addEventListener("click", () => {
            montoDelPrestamo = inputRango.value
            inputNumero.value = montoDelPrestamo
            tituloDeCuotas.innerText = `${cuotitas.cuota} cuotas de $${Math.round((montoDelPrestamo * cuotitas.interes) / cuotitas.cuota)}`
            totalDeCuotas.innerText = `Total a pagar: $${Math.round(parseInt(montoDelPrestamo) * cuotitas.interes)}`
        })
    }
    //Solicitar el préstamo
    const botonPrestamo = document.getElementById("botonPrestamo")
    botonPrestamo.addEventListener("click", () => {
        if (parseInt(montoDelPrestamo) <= 10000000){

            let cantidadDeCuotas = parseInt(prompt("Ingrese las cuotas deseadas (12- 18- 24- 36- 48)"))

            while (cantidadDeCuotas !== 12 && cantidadDeCuotas !== 18 && cantidadDeCuotas !== 24 && cantidadDeCuotas !== 36 && cantidadDeCuotas !== 48) {
                alert("Cantidad de cuotas erronea")

                cantidadDeCuotas = parseInt(prompt("Ingrese las cuotas deseadas (12- 18- 24- 36- 48)"))
            }

            mainUser.dinero += parseInt(montoDelPrestamo)
            const inputRango = document.getElementById ("rango")
            const inputNumero = document.getElementById ("inputNumero")
            inputNumero.value = 0
            inputRango.value = 0
            Swal.fire({
                title: "Préstamo solicitado con éxito!",
                text: `Tu saldo actualizado es: $${mainUser.dinero}`,
                icon: "success"
                });
            const saldoActual = document.getElementById("dineroActual")
            saldoActual.innerHTML = `<strong>Saldo actual:</strong> $${mainUser.dinero}`
        }
        else {
            Swal.fire({
                title: "Monto excedido",
                text: `No se actualizó el saldo`,
                icon: "error"
                });
        }
    })
}

//Función para renderizar las tasas de interés del plazo fijo

function plazoFijoInteres () {
    const divPF = document.getElementById("divPF")

    const inputPF = document.getElementById("inputPF")
    const inputPF2 = document.getElementById("inputPF2")

    const sectionPF = document.getElementById ("sectionPF")
    sectionPF.innerHTML = `<section class="card p-3">Tasa nominal anual: <br> 120%</section>
    <section class="card p-3">Intereses a cobrar: <br> ---</section>
    <section class="card p-3">Monto neto a cobrar <br> ---</section>`

    divPF.append(sectionPF)

    inputPF.addEventListener("keyup", () => {
        sectionPF.innerHTML = `<section class="card p-3">Tasa nominal anual: <br> 120%</section>
        <section class="card p-3">Intereses a cobrar: <br> ${Math.round(parseInt(inputPF.value) * 1.2)}</section>
        <section class="card p-3">Monto neto a cobrar <br> ${Math.round(parseInt(inputPF.value) * 2.2)}</section>`
    })

    inputPF2.addEventListener("keyup", () => {
        sectionPF.innerHTML = `<section class="card p-3">Tasa nominal anual: <br> 120%</section>
        <section class="card p-3">Intereses a cobrar: <br> ${Math.round((parseInt(inputPF.value) * 1.2) * (inputPF2.value / 12))}</section>
        <section class="card p-3">Monto neto a cobrar <br> ${Math.round((parseInt(inputPF.value) * 2.2) * (inputPF2.value / 12))}</section>`
    })


    const botonPF = document.getElementById("botonPF")
    botonPF.addEventListener("click", () => {

        if(mainUser.dinero >= inputPF.value) {
            mainUser.dinero -= inputPF.value
            const saldoActual = document.getElementById("dineroActual")
            saldoActual.innerHTML = `<strong>Saldo actual:</strong> $${mainUser.dinero}`
    
            Swal.fire({
                title: "Acción exitosa",
                text: `Has invertido en Banco Lagos`,
                icon: "success"
                });
        }
        else {
            Swal.fire({
                title: "Fondos insuficientes",
                text: `Ingrese un monto disponible`,
                icon: "error"
                });
        }

    })
}



//Función para renderizar card del main user con su respectiva información----------------------------------------------------------
function renderizarMainUser () {

    //Llamar al nodo padre
    const userCard = document.getElementById("user")

    //Renderizado de sus datos
    const divAbuelo = document.createElement("div")
    divAbuelo.className = "card m-5"
    divAbuelo.setAttribute("style", "max-width: 540px;")

    const divPadre = document.createElement ("div")
    divPadre.className = "row g-0"

    const divImg = document.createElement ("div")
    divImg.className = "col-md-4"

    const img = document.createElement ("img")
    img.className = "img-fluid rounded-start"
    img.setAttribute("src", "https://w7.pngwing.com/pngs/627/693/png-transparent-computer-icons-user-user-icon-thumbnail.png")
    img.setAttribute("alt", "usuario")

    const divHijito = document.createElement ("div")
    divHijito.className = "col-md-8"

    const divNieto = document.createElement ("div")
    divNieto.className = "card-body"

    const userh5 = document.createElement ("h5")
    userh5.className = "card-title"
    userh5.setAttribute ("id", "nombreDelUsuario")
    userh5.innerText = `Welcome ${mainUser.nombre}`

    const p = document.createElement("p")
    p.className = "card-text dinero"
    p.setAttribute("id", "dineroActual")
    p.innerHTML = `<strong>Saldo actual:</strong> $${mainUser.dinero}`

    const botonCS = document.createElement("button")
    botonCS.className = "btn btn-warning m-1"
    botonCS.innerText = "Cerrar sesión"

    // colocar cada nodo en el html

    divNieto.append(userh5, p, botonCS,);
    divHijito.append(divNieto);
    divImg.append(img);
    divPadre.append(divImg, divHijito);
    divAbuelo.append(divPadre);
    userCard.append(divAbuelo)


    //Evento del boton "Cerrar sesión"
    botonCS.addEventListener ("click", () => {

        //cartel de sesión cerrada
        Swal.fire({
            title: "Banco Lagos",
            text: "Sesión cerrada",
            icon: "success",
            timer: 2000
        })
        //Nuevo registro
        setTimeout(() => {
            mainUser = {nombre: prompt("Ingrese su nombre"), genero: prompt("Ingrese género"), dinero: parseInt(prompt("Ingrese su saldo actual"))}

            //Arreglar el DOM con el nuevo registro
            const userh5 = document.getElementById ("nombreDelUsuario")
            userh5.innerText = `Welcome ${mainUser.nombre}`
    
            const p = document.getElementById ("dineroActual")
            p.innerHTML = `<strong>Saldo actual:</strong> $${mainUser.dinero}`
        }, 2500)
    }) 
}


//Función para renderizar las cards con los usuarios del array----------------------------------------------------------------------
function renderizarListado () {   

    const contenedor = document.getElementById("contenedor") 

    for (const usuario of usuarios) {

        //Creacion de los nodos

        const divCard = document.createElement("div")
        divCard.className = "card mx-5 my-2 col-12 col-sm-3 p-3";

        const h5 = document.createElement("h5")
        h5.className = "card-title text-center";
        h5.innerText = usuario.nombre;
        
        const divHijo = document.createElement ("div")
        divHijo.className = "card-body d-flex justify-content-center"

        const botonTransferir = document.createElement("button")
        botonTransferir.className = "btn btn-warning mx-2"
        botonTransferir.innerText = "Transferir"

        const botonPedir = document.createElement("button")
        botonPedir.className = "btn btn-warning mx-2"
        botonPedir.innerText = "Pedir plata"

        const botonELiminar = document.createElement("button")
        botonELiminar.className = "btn btn-danger text-center mx-5 mb-1"
        botonELiminar.innerText = "Eliminar"

        //Agregar al HTML

         divHijo.append(botonPedir, botonTransferir)
         divCard.append(h5, divHijo, botonELiminar)
         contenedor.append(divCard)

         //Transferencia
         botonTransferir.addEventListener("click", () => {   
         let monto = parseInt(prompt("Ingrese monto a transferir"))
         if (monto > mainUser.dinero) {
             alert ("Fondos insuficientes")
         }
         else {
             usuario.dinero += monto;
             mainUser.dinero -= monto;
             alert(`Saldo de ${usuario.nombre} actualizado a $${usuario.dinero}`)
             const saldoActual = document.getElementById("dineroActual")
             saldoActual.innerHTML = `<strong>Saldo actual:</strong> $${mainUser.dinero}`
         }
        })

        //Pedir dinero
        botonPedir.addEventListener("click", () => {
            let montoAPedir = parseInt(prompt("Ingrese monto a solicitar"))
            if(montoAPedir > usuario.dinero) {
                alert(`Fondos de ${usuario.nombre} insuficientes`)
            }
            else {
                usuario.dinero -= montoAPedir
                mainUser.dinero += montoAPedir
                alert(`Transferencia realizada con éxito, saldo actual: $${mainUser.dinero}`)
                const saldoActual = document.getElementById("dineroActual")
                saldoActual.innerHTML = `<strong>Saldo actual:</strong> $${mainUser.dinero}`
            }
        })

        //Eliminar usuario
        botonELiminar.addEventListener("click", () => {
            contenedor.removeChild(divCard)
        })
    }
}
// Agregar usuarios al LS------------------------------------------------------------------------------------------------------------
function agregarUsersALS () {
    for(let i = 0; i < usuarios.length; i++) {
        localStorage.setItem(`${usuarios[i].nombre}`, `${usuarios[i].dinero}`)
    }
}


//Guardar el inicio de sesión en el local storage-------------------------------------------------------------------------------------
function sesionLS () {
   userJSON = JSON.stringify(mainUser)
   localStorage.setItem("Main User", userJSON)
   localStorage.setItem("Registrado", "Si")
}

//Iniciar sesión
function iniciarSesion () {
    const sesionIniciada = localStorage.getItem("Registrado")
    if(sesionIniciada === "Si") {
        userJSON = localStorage.getItem("Main User")
        mainUser = JSON.parse(userJSON)
        Swal.fire({
            title: "Banco Lagos",
            text: `Bienvenido/a nuevamente ${mainUser.nombre}`,
            icon: "success"
          });
    }
    else {
        mainUser = new Usuario (prompt("Ingrese su nombre"), prompt("Ingrese su género"), parseInt(prompt("Ingrese su dinero actual")))
    }
}




//Inicio del programa -----------------------------------------------------------------------------------------------------------------
let userJSON = ""
let mainUser = {}
iniciarSesion()
sesionLS()
setTimeout(renderizarMainUser(), 3000);
renderizarListado()
agregarUsersALS()
renderizarCuotas()
plazoFijoInteres()
