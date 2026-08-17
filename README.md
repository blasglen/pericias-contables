# Registro de Pericias Contables

App para llevar el registro de pericias contables (propias y de otros contadores),
con línea de tiempo de novedades y alertas de vencimiento. Los datos se guardan
como commits en este mismo repositorio, así que cada cambio queda en el historial.

## 1. Crear el repositorio en GitHub

1. Entrá a https://github.com/new
2. Nombre sugerido: `pericias-contables`
3. Marcá **Private** (importante: los datos de las pericias son confidenciales).
4. No agregues README ni .gitignore (ya vienen en esta carpeta). Creá el repo vacío.

## 2. Subir estos archivos

Desde una terminal, parado en esta carpeta:

```bash
git add .
git commit -m "Primera versión del registro de pericias"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/pericias-contables.git
git push -u origin main
```

Reemplazá `TU_USUARIO` por tu usuario de GitHub.

## 3. Activar GitHub Pages

1. En el repo: **Settings → Pages**.
2. En "Build and deployment" elegí **Deploy from a branch**.
3. Rama: `main`, carpeta: `/ (root)`. Guardar.
4. En un minuto vas a tener una URL tipo:
   `https://TU_USUARIO.github.io/pericias-contables/`

> Nota: aunque el repositorio es privado, la página publicada queda accesible
> por esa URL (así funciona GitHub Pages). Eso no expone los datos de las
> pericias: la página en sí no contiene ningún dato, solo el programa. Los
> datos reales solo se pueden leer o escribir con un token válido, que vive
> únicamente en el navegador de quien lo cargue.

## 4. Generar el token de acceso

1. Andá a https://github.com/settings/personal-access-tokens/new
2. Tipo: **Fine-grained token**.
3. Repository access: **Only select repositories** → elegí `pericias-contables`.
4. Permisos → Repository permissions → **Contents: Read and write**. El resto
   dejalo en "No access".
5. Generá el token y copialo (empieza con `github_pat_...`). Solo se muestra una vez.

## 5. Conectar la app

1. Abrí la URL de GitHub Pages del paso 3.
2. Tocá **⚙ Configuración**.
3. Completá: usuario, nombre del repo (`pericias-contables`), rama (`main`) y el token.
4. Guardar y conectar.

Desde ese momento, cada pericia y cada novedad que cargues se guarda como un
commit en `data/pericias.json`, visible en la pestaña **Commits** del repositorio
como historial completo de cambios.

## Seguridad del token

- El token queda guardado solo en el navegador donde lo cargaste (localStorage),
  nunca se sube al repositorio.
- Tiene permiso únicamente sobre este repositorio (nada más de tu cuenta).
- Si algún día se pierde o se comparte por error, se puede revocar al instante
  desde Settings → Developer settings → Fine-grained tokens.
- Cada persona que use la app (por ejemplo, tu mamá desde su propia compu) debe
  cargar su propio token — no conviene compartir el mismo token por chat o mail.
