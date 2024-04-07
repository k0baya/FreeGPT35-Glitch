check_file() {
    [ ! -e cloudflared ] && wget -O cloudflared https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 && chmod +x cloudflared
}

run_argo() {
  chmod +x cloudflared && nohup ./cloudflared tunnel --edge-ip-version auto --protocol http2 run --token ${ARGO_AUTH} 2>/dev/null 2>&1 &
}

check_file
run_argo
