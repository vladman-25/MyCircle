# Simple nginx + react + node + pm2 + mongodb development environment

Get yourself a fresh instance of Ubuntu!
This tutorial is suited for aws instances but may work for other providers too.

## STEP 1. Configure nginx

`sudo apt install nginx`
`sudo vim /etc/nginx/sites-available/mycircle`

Configure your file as mentioned below. By default, instance recieves web requests on port 80, so we want to redirect
our **frontend (/)** to port **3001** (my choosing) and the **backend (/api)** to port **5000** (also my choosing).

```
server {
        listen       80;
        listen       [::]:80;
        server_name  mycircle.live, www.mycircle.live;

        location / {
                proxy_pass http://localhost:3001;
        }

        location /api {
                proxy_pass http://localhost:5000;
        }
    }
```

Finalise config as below.
`sudo ln -s /etc/nginx/sites-available/mycircle /etc/nginx/sites-enabled/mycircle`
`sudo service nginx reload`

## STEP 2. Install node.js (v.18 works for sure)

`curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -`
`sudo apt-get install -y nodejs`
`sudo apt install npm`


## STEP 3. Make a github ssh-key for the repo

`sudo su` Need to get the root key
`ssh-keygen -t ed25519 -C "your@mail.com"`
`cat /home/ubuntu/.ssh/id_ed25519.pub`
Copy key to git

## STEP 4. Enable SSH auth for the deploy ssh/github script

`vim /etc/ssh/ssh_config`

```
PubkeyAuthentication yes
PubkeyAcceptedKeyTypes=+ssh-rsa
```

`vim ~/.ssh/config`

```
Host *
IgnoreUnknown UseKeychain
UseKeychain yes
AddKeysToAgent yes
IdentityFile /root/.ssh/id_ed25519
```

`sudo systemctl restart sshd.service`
## STEP 5. Clone your repo 

`cd /var/www/html`
`git clone git@github.com:[name]/[repo].git`

## STEP 6. Install mongodb

`npm install pm2 -g`

`wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -`
`echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list`
`sudo apt update`
`sudo apt install -y mongodb-org`

`echo "deb http://security.ubuntu.com/ubuntu focal-security main" | sudo tee /etc/apt/sources.list.d/focal-security.listsudo apt-get update`
`sudo apt-get update`
`sudo apt-get install libssl1.1`

`sudo apt install -y mongodb-org`
`sudo systemctl start mongod`
`sudo systemctl status mongod`

## STEP 7. Done!

Now using the current project structure and deploy script, your app should be running on your next deploy.