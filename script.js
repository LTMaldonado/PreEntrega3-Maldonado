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
    new Usuario ("Roxana", "Femenino", 39560),
    new Usuario ("Franco", "Masculino", 17000)
]

//Creación de las funciones ---------------------------------------------------------------------------------------------

//Función para renderizar card del main user con su respectiva información-----------------------------------------------
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
    userh5.innerText = `Welcome ${mainUser.nombre}`

    const p = document.createElement("p")
    p.className = "card-text"
    p.innerHTML = `<strong>Saldo actual:</strong> $${mainUser.dinero}`

    const botonCS = document.createElement("button")
    botonCS.className = "btn btn-primary"
    botonCS.innerText = "Cerrar sesión"

    // colocar cada nodo en el html

    divNieto.append(userh5, p, botonCS);
    divHijito.append(divNieto);
    divImg.append(img);
    divPadre.append(divImg, divHijito);
    divAbuelo.append(divPadre);
    userCard.append(divAbuelo)
}


//Función para renderizar las cards con los usuarios del array---------------------------------------------------
function renderizarListado () {   

    const contenedor = document.getElementById("contenedor") 

    for (const usuario of usuarios) {

        //Creacion de los nodos

        const divCard = document.createElement("div")
        divCard.className = "card mx-5 my-2 col-12 col-sm-3";

        const h5 = document.createElement("h5")
        h5.className = "card-title text-center";
        h5.innerText = usuario.nombre;
        
        const divHijo = document.createElement ("div")
        divHijo.className = "card-body d-flex justify-content-center"

        const botonTransferir = document.createElement("button")
        botonTransferir.className = "btn btn-primary mx-2"
        botonTransferir.innerText = "Transferir"

        const botonPedir = document.createElement("button")
        botonPedir.className = "btn btn-primary mx-2"
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
            }
        })

        //Eliminar usuario
        botonELiminar.addEventListener("click", () => {
            contenedor.removeChild(divCard)
        })
    }
}
// Agregar usuarios al LS
function agregarUsersALS () {
    for(let i = 0; i < usuarios.length; i++) {
        localStorage.setItem(`${usuarios[i].nombre}`, `${usuarios[i].dinero}`)
    }
}



//Inicio del programa ------------------------------------------------------------------
//Inicio de sesión del usuario
let mainUser = new Usuario (prompt("Ingrese su nombre"), prompt("Ingrese su género"), parseInt(prompt("Ingrese su dinero actual")))
renderizarMainUser()
renderizarListado()
agregarUsersALS()