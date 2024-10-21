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
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #0D131A;
                    border-radius: 8px;
                    overflow: hidden;
                }
                .content {
                    color: #d1d5db!important;
                    padding: 30px;
                    background-color: #0D131A;
                    font-size: 16px;
                    line-height: 1.5;
                }
                .content__highlight {
                    color: #FFF;
                }
                .content p {
                    margin: 0 0 20px 0;
                    font-size: 16px;
                    line-height: 1.5;
                    color: #d1d5db!important;
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
                    background-color: #191f26;
                    color: #f9fafb;
                    padding: 20px 30px;
                    font-size: 12px;
                }
                .footer a {
                    color: #f9fafb;
                    text-decoration: 'underline';
                }
                ul {
                    padding-left: 20px!important;
                }
                ul li {
                    color: #d1d5db!important;
                }
                ul li span {
                    color: #FFF!important;
                }
                .hidden {
                    opacity: 0;
                    font-size: 1px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <!-- Content -->
                <div class="content">
                    <p>Ahoj {!user_name}!</p>
                    <p>Právě jsme přidali nový sázkový tip 🔥. Odemkni si jej dokud je ještě čas a použij ho jako inspiraci pro svou další sázku.</p>
                    <p>
                        <ul>
                            <li>Kurz: <span>{!odd}</span></li>
                            <li>Naše sázka: <span>{!stake} Kč</span></li>
                            <li>Cena: <span>{!price} kreditů</span></li>
                        </ul>
                    </p>
                    <p>Hodně štěstí 🍀!</p>
                    <div><a href="{!offers_link}" class="btn">Zobrazit nabídky</a></div>
                    <span class="hidden">{!randomness}</span>
                </div>
                <!-- Footer -->
                <div class="footer">
                    <p>TipStrike s.r.o. Kurzova 2222/16, Stodůlky, 155 00 Praha 5</p>
                    <p>Dostáváš tento e-mail, protože jsi přihlášen k odběru našich tipů na sázení. Pokud již nechceš dostávat tato oznámení, můžeš se <a href="{!unsubscribe_link}">odhlásit zde</a>.</p>
                </div>
            </div>
        </body>
        </html>
    `

    template = template.replace('{!odd}', payload.record.odd + '')
    template = template.replace('{!stake}', payload.record.stake + '')
    template = template.replace('{!price}', payload.record.price + '')
    template = template.replace('{!offers_link}', 'https://www.tipstrike.cz/tickets/offers')
    template = template.replace('{!randomness}', Date.now() + '')

    const subject = '🔥 Nový sázkový tip k dispozici!'
    const from = 'TipStrike <noreply@tipstrike.cz>'

    //up to 100 emails per batch
    //each email up to 50 recipients
    //API rate limit = 2 requests per second
    const messagesChunks = []

    for (let i = 0; i < targetUsers.length; i += 100) {
        const chunk = targetUsers.slice(i, i + 100).map((user) => ({
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