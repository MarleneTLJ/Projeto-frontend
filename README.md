# Projeto MEAN - FrontEnd

Este projeto utiliza o Angular CLI versão 13.3.1, feito para se utilizar com o MEAN stack (MongoDB, Express, Angular e Node.js).<br>
É utilizado o [Angular Material](https://material.angular.io/) e SCSS como escolha de design.

## Pré-requisitos

- Node.js (de preferência a versão LTS) - [Página de download](https://nodejs.org/en/download/)
- [Angular CLI](https://angular.io/cli) - Simplesmente execute o comando ```npm install -g @angular/cli``` no terminal. Certifique que o Node.js esteja instalado!

## Instalação e execução

Antes de executar o framework, é necessário instalar as dependências com o comando ```npm install``` no terminal (certifique que esteja na pasta do projeto).<br>
Após a instalação, execute o comando ```ng serve``` e abra a aplicação no seu navegador:
```
http://localhost:4200/
```

Caso queira que abra automaticamente no seu navegador, utilize com a tag ```--open```:

```
ng serve --open
```

## Este projeto ainda está em progresso e há algumas inconveniências:

- Por enquanto, apenas os "administradores" tem login, logo, a página de registro está protegida, sendo acessada apenas quando está você logado. Mesmo se tentar entrar no link, ele não irá deixar. Futuramente será feito papéis de admininstradores e usuários comuns, acabando com esta inconveniência.

### Registrar o primeiro usuário

Para registrar o primeiro usuário, vá até o "/src/app/app-routing.module.ts" e comente a linha "canActivate: [AuthGuard]".<br>
Após isso, vá até o ```http://localhost:4200/auth/register``` e registre seu usuário. Feito isso, descomente a linha "canActivate: [AuthGuard]" e certifique que você não pode acessar a página de registro sem estar logado.
