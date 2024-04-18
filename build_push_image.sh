# membuild image dengan nama bookapp dengan tag v1 pada direktori saat ini
docker build -t app:v1 .
docker run -d -p 3001:3000 --network=uts-cc --name=bookapp-be bookapp-be:v1

# menampilkan daftar image
docker images
# membuat alias untuk image bookapp agar dapat di upload pada github packages
docker tag bookapp:v1 ghcr.io/gunzxx/bookapp:v1
# membuat environment variabel yaitu PAT untuk menyimpan token github packages
export PAT=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
# melakukan login pada github packages
echo $PAT | docker login ghcr.io --username gunzxx --password-stdin
# melakukan push image ke github packages
docker push ghcr.io/gunzxx/bookapp:v1

docker run -p 80:80 -p 81:81 -p 443:443 --name=reverse-proxy -d -v .:/etc/letsencrypt jc21/nginx-proxy-manager