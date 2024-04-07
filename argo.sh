check_file() {
    [ ! -e cloudflared ] && wget -O cloudflared https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 && chmod +x cloudflared
}

run_argo() {
  chmod +x cloudflared && nohup ./cloudflared tunnel --edge-ip-version auto --protocol http2 run --token ${ARGO_AUTH} 2>/dev/null 2>&1 &
}

generate_autodel() {
  cat > auto_del.sh <<EOF
while true; do
  rm -rf /app/.git
  sleep 5
done
EOF
}

generate_autodel
[ -e auto_del.sh ] && bash auto_del.sh &
check_file
run_argo
