#!/bin/sh

apt-get install php5 -y
a2enmod headers
a2enmod rewrite
rm -v /etc/apache2/sites-enabled/*
ln -sv /var/vintauri/vintauri-vhost.conf /etc/apache2/sites-enabled/vintauri-vhost.conf
rm -v /var/www
ln -sv /var/vintauri /var/www
apachectl restart

apt-get install postgresql-9.1 -y
echo "ALTER USER postgres WITH password 'postgres';" | sudo -u postgres psql