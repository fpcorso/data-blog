Title: XXXXXX
Date: 2021-01-20 08:20
Category: Python
Tags: API
Slug: setting-up-python-environment-venv-requirements
Authors: Frank Corso
Summary: XXXX
Status: draft

INTRO

GETTING APP ID AND SECRET

Before we can begin getting data from the Help Scout API, we need to generate an app ID and secret. First, log into HelpScout and go to "Your Profile".

INSERT IMAGE

Click the "My Apps" in the left menu.

INSERT IMAGE

Click the "Create My App" button and fill in a name. Since we won't have users authenticating with this app, you can enter any URL for the redirect. I usually just put the URL for the company's site.

INSERT IMAGE

Click the "Create" button. Once created, you will see your app's ID and Secret.

While in Help Scout, open the Mailbox you want to retrieve the conversation for. In the URL, you will find the mailbox's ID which we will need later:

INSERT IMAGE

GETTING AUTHORIZATION TOKEN

Since we won't be authenticating users, we will use Help Scout's [client credentials flow](https://developer.helpscout.com/mailbox-api/overview/authentication/#client-credentials-flow) for authentication. To do so, we first need to get an access token.

First, I almost always use the `requests` package when working with APIs so we need to import that first:

```
:::python
import requests
```

Next, we need to send our app's ID and secret to their token endpoint. We can do this by making a request and getting the `access_token` key from the JSON they return.

```
:::python
# The token endpoint.
auth_endpoint = 'https://api.helpscout.net/v2/oauth2/token'

# Preparing our POST data.
post_data = ({
    'grant_type': 'client_credentials',
    'client_id': HELPSCOUT_APP_ID,
    'client_secret': HELPSCOUT_APP_SECRET
})

# Send the data.
r = requests.post(auth_endpoint, data=post_data)

# Save our token.
token = r.json()['access_token']
```

Next, we will define a starting page and a flag for if we have already retrieved all conversations. Then, we need to prepare our authorization headers.

```
:::python
all_conversations = False
page = 1

# Prepare our headers for all endpoints using token.
endpoint_headers = {
    'Authorization': 'Bearer {}'.format(token)
}
```

PREPARING CSV FILE

Now that we have our token, we can set up our CSV file. If you haven't worked with CSV's in Python before, check out my article ....

First, make sure to import the package:

```
:::python
import csv
```

Then, open our CSV file and write the header:

```
:::python
# Creates our file, or rewrites it if one is present.
with open('conversations.csv', mode="w", newline='', encoding='utf-8') as fh:
    # Define our columns.
    columns = ['ID', 'Customer Name', 'Customer email addresses', 'Assignee', 'Status', 'Subject', 'Created At',
               'Closed At', 'Closed By', 'Resolution Time (seconds)']  
    csv_writer = csv.DictWriter(fh, fieldnames=columns) # Create our writer object.
    csv_writer.writeheader() # Write our header row.
```

GETTING OUR CONVERSATIONS AND PUTTING INTO CSV

Now that we have our access token and our CSV opened, it's time to actually retrieve the conversations. Help Scout's API sends over the conversations in a paginated format.

Remember to keep all of this indented inside the `with open()` statement so we can write to our CSV.  

Inside a while loop, we will get our first conversations:

```
:::python
while not all_conversations:
    # Prepare conversations endpoint with status of conversations we want and the mailbox.
    conversations_endpoint = 'https://api.helpscout.net/v2/conversations?status=all&mailbox=YOUR_MAILBOX_ID&page={}'.format(
        page
    )
    r = requests.get(conversations_endpoint, headers=endpoint_headers)
    conversations = r.json()
```

Next, we will cycle over each of the conversations within this response to save them to the CSV. Since there are many keys in the JSON that might be missing depending on the conversation, we need to clean and process the data just enough to save it.

```
:::python
# Cycle over conversations in response.
for conversation in conversations['_embedded']['conversations']:

    # If the email is missing, we won't keep this conversation.
    # Depending on what you will be using this data for,
    # You might omit this.
    if 'email' not in conversation['primaryCustomer']:
        print('Missing email for {}'.format(customer_name))
        continue

    # Prepare customer name.
    customer_name = '{} {}'.format(
        conversation['primaryCustomer']['first'],
        conversation['primaryCustomer']['last']
    )

    # Prepare assignee, subject, and closed date if they exist.
    assignee = '{} {}'.format(conversation['assignee']['first'], conversation['assignee']['last']) \
        if 'assignee' in conversation else ''
    subject = conversation['subject'] if 'subject' in conversation else 'No subject'
    closed_at = conversation['closedAt'] if 'closedAt' in conversation else ''

    # If the conversation has been closed, let's get the resolution time and who closed it.
    closed_by = ''
    resolution_time = 0
    if 'closedByUser' in conversation and conversation['closedByUser']['id'] != 0:
        closed_by = '{} {}'.format(
            conversation['closedByUser']['first'], conversation['closedByUser']['last']
        )
        resolution_time = dateutil.parser.parse(conversation['closedAt']).timestamp() - \
            dateutil.parser.parse(conversation['createdAt']).timestamp()
```

Then, write our results to the CSV:

```
:::python
# Write row to CSV
csv_writer.writerow({
    'ID': conversation['id'],
    'Customer Name': customer_name,
    'Customer email addresses': conversation['primaryCustomer']['email'],
    'Assignee': assignee,
    'Status': conversation['status'],
    'Subject': subject,
    'Created At': conversation['createdAt'],
    'Closed At': closed_at,
    'Closed By': closed_by,
    'Resolution Time (seconds)': resolution_time
})
```

Lastly, check their 'totalPages' key against the page we are on to see if we have retrieved all the conversations:

```
:::python
if page == conversations['page']['totalPages']:
    all_conversations = True
    continue
```

NEXT STEPS