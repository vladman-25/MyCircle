# Simple nginx + react + node + pm2 + mongodb development environment

Get yourself a fresh instance of Ubuntu! <br />
This tutorial is suited for aws instances but may work for other providers too. <br />

## STEP 1. Configure nginx

`sudo apt install nginx` <br />
`sudo vim /etc/nginx/sites-available/mycircle` <br />

Configure your file as mentioned below. By default, instance recieves web requests on port 80, so we want to redirect
our **frontend (/)** to port **3001** (my choosing) and the **backend (/api)** to port **5000** (also my choosing). <br />

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

Finalise config as below. <br />
`sudo ln -s /etc/nginx/sites-available/mycircle /etc/nginx/sites-enabled/mycircle` <br />
`sudo service nginx reload` <br />

## STEP 2. Install node.js (v.18 works for sure)

`curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -` <br />
`sudo apt-get install -y nodejs` <br />
`sudo apt install npm` <br />


## STEP 3. Make a github ssh-key for the repo

`sudo su` Need to get the root key <br />
`ssh-keygen -t ed25519 -C "your@mail.com"` <br />
`cat /home/ubuntu/.ssh/id_ed25519.pub` <br />
Copy key to github <br />

## STEP 4. Enable SSH auth for the deploy ssh/github script

`vim /etc/ssh/ssh_config` <br />

```
PubkeyAuthentication yes
PubkeyAcceptedKeyTypes=+ssh-rsa
```

`vim ~/.ssh/config` <br />

```
Host *
IgnoreUnknown UseKeychain
UseKeychain yes
AddKeysToAgent yes
IdentityFile /root/.ssh/id_ed25519
```

`sudo systemctl restart sshd.service` <br />
## STEP 5. Clone your repo 

`cd /var/www/html` <br />
`git clone git@github.com:[name]/[repo].git` <br />

## STEP 6. Install mongodb

`npm install pm2 -g` <br />

`wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -` <br />
`echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list` <br />
`sudo apt update` <br />
`sudo apt install -y mongodb-org` <br />

`echo "deb http://security.ubuntu.com/ubuntu focal-security main" | sudo tee /etc/apt/sources.list.d/focal-security.listsudo apt-get update` <br />
`sudo apt-get update` <br />
`sudo apt-get install libssl1.1` <br />

`sudo apt install -y mongodb-org` <br />
`sudo systemctl start mongod` <br />
`sudo systemctl status mongod` <br />

## STEP 7. Done!

Now using the current project structure and deploy script, your app should be running on your next deploy.