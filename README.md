## FreeGPT35-Glitch

You can deploy this repository on Glitch by uploading the files. 

First, download the repository using [this link](<https://github.com/k0baya/FreeGPT35-Glitch/archive/refs/heads/reserve-proxy.zip>).

After unzipping it, upload all the files to Glitch, set the variables, and you're all set to enjoy.

### Variables

You can add variables in `.env` file.

| Key         | Value                          | Note                                      |
|-------------|----------------------------------------|-------------------------------------------|
| `AUTH_TOKEN` | any_string_you_like | This is your API key for accessing FreeGPT35. |
|`ARGO_AUTH`|Cloudflared token|Use Argo Tunnel to access FreeGPT35 (Optional)|

>If no settings are made, then any API-Key can be accessed

>If you are using the Argo Tunnel, the `3000` port can add the `AUTH_TOKEN`, and the `3040` port can be accessed with any API-Key.
### Usage
Use the URL that Glitch provided as endpoint.
```bash
curl --location 'https://your-glitch-project.glitch.me/v1/chat/completions' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer any_string_you_like' \
--data '{
  "model": "gpt-3.5-turbo",
  "messages": [{"role": "user", "content": "Tell me a story about socialism."}]
}'
```
