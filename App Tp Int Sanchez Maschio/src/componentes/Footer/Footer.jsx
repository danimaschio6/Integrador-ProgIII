import './Footer.css' ;
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faInstagram, faTwitter, faFacebook, faYoutube} from "@fortawesome/free-brands-svg-icons"


//logo
import Logo2 from "../img/logo afa.png"

export function Footer(){
    return <footer class="pie-pagina">
            <div class="grupo1">
                    <div class="box">
                        <figure>
                            <a href="#"> <img src={Logo2} alt="pie-pagina"/></a>
                        </figure>
                    </div>  
                    <div class="box">
                        <h2>SOBRE NOSOTROS</h2>
                        <p>
                            La AFA es la organización rectora del fútbol en Argentina, encargada de promover y desarrollar este deporte a nivel nacional. Desde su fundación en 1893, ha trabajado incansablemente para fomentar la práctica del fútbol y apoyar a los jugadores, entrenadores y árbitros en todo el país.
                        </p>
                    </div>
                    <div class="box">
                        <h2>SIGUENOS</h2>
                        <div class="redSocial">
                            <a href="https://www.instagram.com/afa.oficial/"><FontAwesomeIcon icon={faInstagram} size="2xl"/></a>
                            <a href="https://twitter.com/AFA"><FontAwesomeIcon icon={faTwitter} size="2xl"/></a>
                            <a href="https://www.facebook.com/AFAOFICIAL/"><FontAwesomeIcon icon={faFacebook} size="2xl"/></a>
                            <a href="https://www.youtube.com/user/AFAOficial"><FontAwesomeIcon icon={faYoutube} size="2xl"/></a>

                        </div>
                    </div>

                </div>

                <div class="grupo2">
                    <small>Copyright © 2023. Asociación del Fútbol Argentino. Todos los derechos reservados.</small>

                </div>

        </footer>

}


