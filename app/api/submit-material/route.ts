import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const TO_EMAIL = process.env.SUBMISSION_TO_EMAIL || 'ronalds.rezais@lsfp.lv';
const MAX_ATTACHMENT_SIZE = 10 * 1024 * 1024; // 10 MB
const allowedMaterialTypes = ['Document', 'Video', 'Photos'];

function getText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

function getList(formData: FormData, key: string) {
  return formData.getAll(key).map(String).filter(Boolean);
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.SUBMISSION_FROM_EMAIL;

    if (!apiKey || !fromEmail) {
      return NextResponse.json(
        { error: 'Submission email is not configured yet. Please add RESEND_API_KEY and SUBMISSION_FROM_EMAIL in Vercel environment variables.' },
        { status: 500 }
      );
    }

    const formData = await request.formData();

    const organisation = getText(formData, 'organisation');
    const contactPerson = getText(formData, 'contactPerson');
    const contactEmail = getText(formData, 'contactEmail');
    const materialTitle = getText(formData, 'materialTitle');
    const description = getText(formData, 'description');
    const materialType = getText(formData, 'materialType');
    const materialLanguage = getText(formData, 'materialLanguage');
    const materialLink = getText(formData, 'materialLink');
    const reviewConsent = getText(formData, 'reviewConsent');
    const audiences = getList(formData, 'audiences');
    const topics = getList(formData, 'topics');

    if (!organisation || !contactPerson || !contactEmail || !materialTitle || !description || !materialLanguage) {
      return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 });
    }

    if (!allowedMaterialTypes.includes(materialType)) {
      return NextResponse.json({ error: 'Please select a valid material type.' }, { status: 400 });
    }

    if (!reviewConsent) {
      return NextResponse.json({ error: 'Please confirm that the material can be reviewed before publication.' }, { status: 400 });
    }

    const submittedFile = formData.get('materialFile');
    const hasFile = submittedFile instanceof File && submittedFile.size > 0;

    if (!hasFile && !materialLink) {
      return NextResponse.json({ error: 'Please upload a file or provide a link to the material.' }, { status: 400 });
    }

    const attachments = [] as Array<{ filename: string; content: string }>;

    if (hasFile) {
      if (submittedFile.size > MAX_ATTACHMENT_SIZE) {
        return NextResponse.json({ error: 'The uploaded file is too large. Please upload a file up to 10 MB or provide a link instead.' }, { status: 400 });
      }

      const buffer = Buffer.from(await submittedFile.arrayBuffer());
      attachments.push({
        filename: submittedFile.name || 'submitted-material',
        content: buffer.toString('base64'),
      });
    }

    const html = `
      <h2>New Home & Heart Resource Library submission</h2>
      <p>A new material has been submitted for review before publication.</p>
      <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;border:1px solid #d7e7f0;">
        <tr><td><strong>Organisation</strong></td><td>${escapeHtml(organisation)}</td></tr>
        <tr><td><strong>Contact person</strong></td><td>${escapeHtml(contactPerson)}</td></tr>
        <tr><td><strong>Contact email</strong></td><td>${escapeHtml(contactEmail)}</td></tr>
        <tr><td><strong>Material title</strong></td><td>${escapeHtml(materialTitle)}</td></tr>
        <tr><td><strong>Material type</strong></td><td>${escapeHtml(materialType)}</td></tr>
        <tr><td><strong>Material language</strong></td><td>${escapeHtml(materialLanguage)}</td></tr>
        <tr><td><strong>Target audience</strong></td><td>${escapeHtml(audiences.join(', ') || 'Not specified')}</td></tr>
        <tr><td><strong>Topic</strong></td><td>${escapeHtml(topics.join(', ') || 'Not specified')}</td></tr>
        <tr><td><strong>Material link</strong></td><td>${materialLink ? `<a href="${escapeHtml(materialLink)}">${escapeHtml(materialLink)}</a>` : 'No link provided'}</td></tr>
        <tr><td><strong>File attached</strong></td><td>${hasFile ? escapeHtml(submittedFile.name) : 'No file uploaded'}</td></tr>
      </table>
      <h3>Description</h3>
      <p>${escapeHtml(description).replaceAll('\n', '<br/>')}</p>
      <p><strong>Review note:</strong> This material should be reviewed before it is uploaded to the Resource Library.</p>
    `;

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [TO_EMAIL],
        reply_to: contactEmail,
        subject: `New resource submission: ${materialTitle}`,
        html,
        attachments,
      }),
    });

    if (!resendResponse.ok) {
      const details = await resendResponse.text();
      console.error('Resend submission error:', details);
      return NextResponse.json({ error: 'The submission could not be emailed. Please check the email service configuration.' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Submission route error:', error);
    return NextResponse.json({ error: 'Unexpected error while sending the submission.' }, { status: 500 });
  }
}
