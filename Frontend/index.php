<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SENSEIoT | Login</title>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="./styles/general.css">
    <script src="./scripts/functions.js"></script>
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
    <style>
        html,
        body {
            height: 100%;
            width: 100%;
            margin: 0;
        }

        body {
            display: flex;
        }

        div {
            margin: auto;
            /* nice thing of auto margin if display:flex; it center both horizontal and vertical :) */
        }
    </style>
</head>

<body class="w3-black">

    <div class="w3-container">
        <form action="javascript:void(0);" class="w3-container w3-card-4 w3-light-grey w3-margin" onsubmit="login()"
            style="text-align: center; padding: 40px; max-width: 1200px;">
            <img src="./images/SenseIoT logo.PNG" alt="SENSEIoT">
            <h2 class="w3-center">Iniciar Sesión</h2>

            <div class="w3-row w3-section">
                <div class="w3-col" style="width:50px"><i class="w3-xxlarge fa fa-user"></i></div>
                <div class="w3-rest">
                    <input class="w3-input w3-border" name="user" type="text" placeholder="Usuario" id="usrLog">
                </div>
            </div>


            <div class="w3-row w3-section">
                <div class="w3-col" style="width:50px"><i class="w3-xxlarge fa fa-lock"></i></div>
                <div class="w3-rest">
                    <input class="w3-input w3-border" name="password" type="password" placeholder="Contraseña"
                        id="passLog">
                </div>
            </div>

            <input type="submit" class="w3-button w3-block w3-section w3-green w3-ripple w3-padding"
                value="Iniciar Sesión">
        </form>

        <div class="w3-container w3-center">
            <p>No tienes una cuenta. <a href="./register.html" style="text-decoration: underline;">Regístrate ahora.</a>
            </p>
        </div>

    </div>
</body>

</html>