# mengambil image node:20 dari local, jika tidak ada mengambil dari docker hub
FROM node:20
# mengatur working directory container pada folder /app, jika tidak ada maka akan dibuat seperti perintah mkdir
WORKDIR /app
# menyalin kode pada lokasi saat ini untuk tanda titik (.) ke lokasi tujuan yaitu /app pada container
COPY . /app
# mengatur environment untuk NODE_ENV dan DB_HOST
ENV DB_HOST=mysql-server DB_PORT=3306 DB_USER=root DB_PASSWORD=password DB_NAME=bookapp
# menjalankan perintah instalasi dan build pada projek selama proses pembuatan image
RUN npm install
# mengatur/mengekspose port 3000 pada container agar dapat diakses
EXPOSE 3000
# menjalankan perintah npm start ketika container dari image ini dijalankan
CMD ["npm", "run", "start"]