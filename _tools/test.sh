find * -type d | while read -r dir; do 
    cd $(echo $dir) && audiosprite --format howler2 --export m4a --output "$(echo $dir | sed 's/-mp3//')" *.mp3 && cd ..
done
