# API Rest

Utilização de rotas para criação de usuário com senha criptografada, autenticação de usuário retornando um token JWT para validar o login em futuras requisições.

O projeto possui os seguintes endpoints:
* POST/users/register - Inclui um novo usuário conforme as características informadas no contrato model com senha criptografada. (HTTP 201 ok)
* POST/useres/authenticate - autenticação de usuário retornando um token JWT para validar o login em futuras requisições. (HTTP 200 ok)

Techs:
- NodeJs;
- MongoDB.


