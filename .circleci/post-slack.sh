#!/bin/sh

title=$1
text=$2
color=${3:-good}

if [ -z "$title" ]; then
    echo "title is empty - $text" > /dev/stderr
    exit 1
fi

if [ -z "$text" ]; then
    echo "text is empty" > /dev/stdd
    exit 1
fi

if [ -z "$SLACK_WEBHOOK_URL" ]; then
    echo "SLACK_WEBHOOK_URL is empty"
    exit 1
fi

curl -X POST \
    $SLACK_WEBHOOK_URL \
    -H 'content-type: application/json' \
    -d "{
         \"attachments\": [
           {
             \"color\": \"$color\",
             \"title\": \"[$ECW_ENV] $title\",
             \"text\": \"$text\"
           }
         ]
       }"
