# Portfolio Deployment Workflow

This document outlines how to deploy your portfolio to your production VPS using Docker and Nginx.

## 1. Push Code to GitHub

First, initialize your Git repository locally and push it to GitHub:

```bash
cd /home/sadok/Documents/projects/SadokPortfolio
git init
git add .
git commit -m "Initial portfolio release"
# Create a repo on GitHub named "portfolio" and link it:
git remote add origin https://github.com/sadok-dridi/portfolio.git
git branch -M main
git push -u origin main
```

## 2. Deploy on your VPS

SSH into your VPS:
```bash
ssh user@your_vps_ip
```

Clone the repository (first time only):
```bash
git clone https://github.com/sadok-dridi/portfolio.git ~/portfolio
cd ~/portfolio
```

Build and run the Docker container:
```bash
# 1. Build the production image
docker build -t sadok-portfolio .

# 2. Stop old container if it exists
docker rm -f portfolio-web || true

# 3. Run the new container mapping it to port 3006 locally
docker run -d \
  --name portfolio-web \
  -p 127.0.0.1:3006:3000 \
  --restart unless-stopped \
  sadok-portfolio
```

## 3. Nginx Reverse Proxy Configuration (On VPS)

Create an Nginx configuration to point your domain (e.g., `sadok.mooo.com` or your actual domain) to the container.

```bash
sudo nano /etc/nginx/sites-available/portfolio
```

Paste the following configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com; # Replace with your actual domain

    location / {
        proxy_pass http://127.0.0.1:3006;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        
        # Real IP Forwarding
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the site and reload Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### SSL Certificate (Let's Encrypt)
To secure your site with HTTPS:
```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## 4. Future Updates

When you make changes locally:
1. Push changes to GitHub.
2. SSH into VPS.
3. Run:
```bash
cd ~/portfolio
git pull origin main
docker build -t sadok-portfolio .
docker rm -f portfolio-web
docker run -d --name portfolio-web -p 127.0.0.1:3006:3000 --restart unless-stopped sadok-portfolio
```
