# Utilise l’image officielle MySQL comme base
FROM mysql:8.0

# Définir les variables d’environnement
ENV MYSQL_ROOT_PASSWORD=superpwd
ENV MYSQL_DATABASE=library
ENV MYSQL_USER=nicolas
ENV MYSQL_PASSWORD=nikospwd

# Copier un script SQL dans le conteneur pour initialisation (optionnel)
# Il sera exécuté automatiquement si placé dans /docker-entrypoint-initdb.d
COPY init.sql /docker-entrypoint-initdb.d/

# Port exposé (optionnel, utile à des fins de documentation)
EXPOSE 3306
