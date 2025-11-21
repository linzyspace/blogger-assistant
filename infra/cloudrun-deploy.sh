#!/usr/bin/env bash
PROJECT=${PROJECT:-your-gcp-project}
REGION=${REGION:-us-central1}
SERVICE=blog-assistant-api


gcloud builds submit --tag gcr.io/$PROJECT/$SERVICE:latest api


gcloud run deploy $SERVICE \
--image gcr.io/$PROJECT/$SERVICE:latest \
--region $REGION \
--platform managed \
--allow-unauthenticated
