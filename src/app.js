require('dotenv').config();
const { App, LogLevel } = require('@slack/bolt');

// Initializes your app with your bot token and signing secret
const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    logLevel: LogLevel.ERROR
});



// Listen for a slash command invocation
app.command(process.env.CREATE_TICKET_COMMAND, async ({ ack, body, client, context }) => {
    // Acknowledge the command request
    await ack();

    try {
        // Call views.open with the built-in client
        const result = await client.views.open({
            token: context.botToken,
            // Pass a valid trigger_id within 3 seconds of receiving it
            trigger_id: body.trigger_id,
            // View payload
            view: {
                type: 'modal',
                // View identifier
                callback_id: 'view_1',
                title: {
                    type: 'plain_text',
                    text: 'Modal title'
                },
                blocks: [
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: 'Welcome to a modal with _blocks_'
                        },
                        accessory: {
                            type: 'button',
                            text: {
                                type: 'plain_text',
                                text: 'Click me!'
                            },
                            action_id: 'button_abc'
                        }
                    },
                    {
                        type: 'input',
                        block_id: 'input_c',
                        label: {
                            type: 'plain_text',
                            text: 'What are your hopes and dreams?'
                        },
                        element: {
                            type: 'plain_text_input',
                            action_id: 'dreamy_input',
                            multiline: true
                        }
                    }
                ],
                submit: {
                    type: 'plain_text',
                    text: 'Submit'
                }
            }
        });
        console.log(result);
    }
    catch (error) {
        console.error(error);
    }
});

(async () => {
    // Start your app
    await app.start(process.env.PORT || 3000);

    console.log('⚡️ Bolt app is running!');
})();