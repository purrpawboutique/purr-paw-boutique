#!/bin/bash

# Load environment variables from .env file
export $(cat .env | grep -v '^#' | xargs)

# Start the production server
PORT=3001 npm start