# Home & Heart Digital Knowledge Hub

Clean Vercel-ready Next.js version.

## Vercel settings

- Framework Preset: Next.js
- Root Directory: leave empty
- Output Directory: leave empty
- Install Command: `npm install --legacy-peer-deps --no-audit --no-fund`
- Build Command: `npm run build`

Do not set Output Directory to `public`.

## Material submission form

This version includes an advanced material submission form at `#submit-materials`.

The form sends the submission details and the uploaded file to:

`ronalds.rezais@lsfp.lv`

To enable the email workflow on Vercel, add these Environment Variables in Vercel Project Settings:

- `RESEND_API_KEY` — API key from Resend
- `SUBMISSION_FROM_EMAIL` — verified sender email, for example `Home & Heart Hub <submissions@yourdomain.eu>`
- `SUBMISSION_TO_EMAIL` — `ronalds.rezais@lsfp.lv` (optional, this is also the default in code)

Important notes:

- Uploaded files are sent as email attachments.
- The current file size limit is 10 MB.
- For large videos or photo galleries, users should submit a public link instead of uploading a large file.
- Submitted materials are not automatically published in the Resource Library. They are sent for review first.
