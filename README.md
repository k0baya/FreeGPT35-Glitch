## FreeGPT35-Glitch

You can deploy this repository to Glitch by clicking [This link](https://glitch.com/edit/#!/import/git?url=https://github.com/k0baya/FreeGPT35-Glitch).

### Variables

You can add variables in `.env` file.

| Key         | Value                          | Note                                      |
|-------------|----------------------------------------|-------------------------------------------|
| `AUTH_TOKEN` | any_string_you_like | This is your API key for accessing FreeGPT35. |
|`ARGO_AUTH`|Cloudflared token|Use Argo Tunnel to access FreeGPT35 (Optional)|

>If no settings are made, then any API-Key can be accessed

>If you are using the Argo Tunnel, add the `http://localhost:3000` in your dashboard.

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
