import { createClient } from 'jsr:@supabase/supabase-js@2'

interface TicketOffer {
    id: string
    odd: number
    stake: number
    price: number
    start_date: string
}

interface WebhookPayload {
    type: 'INSERT' | 'UPDATE' | 'DELETE'
    table: string
    record: TicketOffer
    schema: 'public'
    old_record: null | TicketOffer
}

const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

Deno.serve(async (req) => {
    const payload: WebhookPayload = await req.json()
    const { data: targetUsers, error } = await supabase
        .from('users')
        .select('email, hash, name')
        .eq('email_notifications_enabled', true)

    if (error) {
        return new Response(JSON.stringify(error), { status: 400 })
    }

    if (targetUsers.length === 0) {
        return new Response('No users to notify', { status: 200 })
    }

    //let template = '<div style="max-width: 600px; margin: 0 auto; background-color: #0D131A; color: #d1d5db; border-radius: 8px; overflow: hidden; font-family: "Roboto", sans-serif;"> <div style="background-color: #0D131A; padding: 20px; font-family: "Roboto", sans-serif;"> <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-family: "Roboto", sans-serif;">Nový sázkový tip k dispozici!</h1> </div> <div style="padding: 20px; color: #d1d5db; background-color: #0D131A; font-family: "Roboto", sans-serif;"> <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.5; font-family: "Roboto", sans-serif;">Ahoj {!user_name}!</p> <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.5; font-family: "Roboto", sans-serif;">Právě jsme přidali nový sázkový tip s kurzem {!odd}. Odemkni tento tip dokud je ještě čas a použij ho jako inspiraci pro svou další sázku.</p><p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.5; font-family: "Roboto", sans-serif;">Hodně štěstí!</p> <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.5; font-family: "Roboto", sans-serif;"><a href="{!offers_link}" style="display: inline-block; padding: 10px 20px; background-color: #FBC10D; color: #0D131A; text-decoration: none; font-weight: bold; border-radius: 5px; font-family: "Roboto", sans-serif;">Zobrazit nabídky</a></p> </div> <div style="background-color: #0D131A; color: #ffffff; padding: 10px; font-size: 12px; font-family: "Roboto", sans-serif;"> <p style="margin: 0; font-family: "Roboto", sans-serif;">Dostáváš tento e-mail, protože jsi přihlášen k odběru našich tipů na sázení. Pokud již nechceš dostávat tato oznámení, můžeš se <a href="{!unsubscribe_link}" style="color: #FBC10D; text-decoration: none; font-family: "Roboto", sans-serif;">odhlásit zde</a>.</p> </div> </div>'
    let template = `
        <html lang="cs">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nový sázkový tip k dispozici!</title>
            <style>
                body {
                    font-family: 'Roboto', sans-serif;
                    background-color: #0D131A;
                    color: #d1d5db;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #0D131A;
                    color: #d1d5db;
                    border-radius: 8px;
                    overflow: hidden;
                }
                .header {
                    background-color: #0D131A;
                    padding: 20px;
                }
                .header h1 {
                    color: #ffffff;
                    margin: 0;
                    font-size: 24px;
                }
                .content {
                    padding: 20px;
                    background-color: #0D131A;
                }
                .content__highlight {
                    color: #FFF;
                }
                .content p {
                    margin: 0 0 20px 0;
                    font-size: 16px;
                    line-height: 1.5;
                }
                .btn {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #FBC10D;
                    color: #000!important;
                    text-decoration: none;
                    font-weight: bold;
                    border-radius: 5px;
                }
                .footer {
                    background-color: #0D131A;
                    color: #ffffff;
                    padding: 20px;
                    font-size: 12px;
                }
                .footer a {
                    color: #FBC10D;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <!-- Header -->
                <div class="header">
                    <h1>Nový sázkový tip k dispozici!</h1>
                </div>

                <!-- Content -->
                <div class="content">
                    <p>Ahoj {!user_name}!</p>
                    <p>Právě jsme přidali nový sázkový tip s kurzem <span class="content__highlight">{!odd}</span>. Odemkni tento tip dokud je ještě čas a použij ho jako inspiraci pro svou další sázku.</p>
                    <p>Hodně štěstí!</p>
                    <p><a href="{!offers_link}" class="btn">Zobrazit nabídky</a></p>
                </div>

                <!-- Footer -->
                <div class="footer">
                    <p>Dostáváš tento e-mail, protože jsi přihlášen k odběru našich tipů na sázení. Pokud již nechceš dostávat tato oznámení, můžeš se <a href="{!unsubscribe_link}">odhlásit zde</a>.</p>
                </div>
            </div>
        </body>
        </html>
    `

    template = template.replace('{!odd}', payload.record.odd + '')
    template = template.replace('{!offers_link}', 'https://www.tipstrike.cz/tickets/offers')

    const subject = 'Nový sázkový tip k dispozici'
    const from = 'TipStrike <noreply@tipstrike.cz>'

    //up to 100 emails per batch
    //each email up to 50 recipients
    //API rate limit = 2 requests per second
    const messagesChunks = []

    for (let i = 0; i < targetUsers.length; i += 50) {
        const chunk = targetUsers.slice(i, i + 50).map((user) => ({
            from,
            subject,
            to: user.email,
            html: template.replace('{!unsubscribe_link}', 'https://www.tipstrike.cz/unsubscribe?token=' + user.hash).replace('{!user_name}', user.name)
        }))
        messagesChunks.push(chunk)
    }

    for (let i = 0; i < messagesChunks.length; i++) {
        // Send the current chunk of messages
        const res = await fetch('https://api.resend.com/emails/batch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
            },
            body: JSON.stringify(messagesChunks[i]),  // Send the current chunk
        });

        // Log the response (optional)
        console.log(`Batch ${i + 1} response:`, await res.json());

        // Wait for 1 second before sending the next chunk
        await delay(1000);
    }

    return new Response('Emails sent', { status: 200, headers: { 'Content-Type': 'application/json' } })
})