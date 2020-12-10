# Test Cat Mash pour l'Atelier

Ceci est un projet qui sert de test de recrutement pour l'Atelier.

J'ai décidé de faire le front de l'application web en React et le back en Nest (framework Node) et de prendre une bdd postgresql.

Les sources du front sont dans `client` et les sources du back dans `server`.

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

## les Commandes

- pour build les dépendances `npm install`
- pour lancer le back en mode dévelopement sur windows: `npm run start-server-win` et sur linux: `npm run start-server-lin`.
- pour lancer le front en mode dévelopement: `npm run start-react`.
- pour build en production le front : `npm run prod-react`.
- pour build en production le back sur windows: `npm run prod-server-win` et sur linux: `npm run prod-server-lin`.