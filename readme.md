# Test Cat Mash pour l'Atelier

Ceci est un projet qui sert de test de recrutement pour l'Atelier.

J'ai décidé de faire le front de l'application web en React et le back en Nest (framework Node) et de prendre une bdd postgresql.

Les sources du front sont dans `client` et les sources du back dans `server`.

Pour pouvoir voter il faut avoir un compte et se connecter, la validation de création de compte se fait par mail.

J'ai décidé d'utiliser Mailgun pour envoyer des mails.

Les variables d'environnement sont à mettre dans un `.env`
- NODE_ENV => `development` ou `production`
- PORT => port du server node (back) (optionel defaut 3000)
- TYPEORM_HOST => host de la bdd postgre
- TYPEORM_PORT => port de la bdd postgre (optionel defaut 5432)
- TYPEORM_USERNAME=postgres => username de la bdd postgre
- TYPEORM_PASSWORD=root => password de la bdd postgre
- TYPEORM_DATABASE=chat => nom de la bdd postgres
- DEV_CLIENT_PORT => port du client en mode dévelopement (optionel defaut 8000)
- CLIENT_URL => exemple http://localhost/ DEV_CLIENT_PORT (optionel si en mode production)
- API_URL => exemple http://localhost/ PORT
- MAILGUN_API_KEY => Key Mailgun
- MAILGUN_DOMAINE => Domaine Mailgun
- MAILGUN_HOST => exemple eu : api.eu.mailgun.net
- JWT_SECRET => une chaîne de caractère
- AUTH_SECRET => une chaîne de caractère

## les Commandes

- pour build les dépendances `npm install`
- pour lancer le back en mode dévelopement : `npm run start-server`.
- pour lancer le front en mode dévelopement: `npm run start-react`.
- pour build en production le front : `npm run prod-react`.
- pour build en production le back : `npm run prod-server`.

## le tests

- pour lancer les tests unitaires du back : `npm run test-server`.
- pour lancer les tests react : `npm run test-react`