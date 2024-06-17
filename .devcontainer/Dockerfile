# Base image setup; use bullseye for better compatibility when building packages
FROM node:21-bullseye AS base

WORKDIR /app

ENV NODE_ENV=production
# Add the local node_modules/.bin to the PATH
ENV PATH="/app/node_modules/.bin:${PATH}"

RUN \
  # Install yarn
  corepack enable && \
  corepack prepare yarn@4.3.0 --activate

# Install dependencies ---------------------------------------------------------
FROM base AS deps

ENV NODE_ENV=development

COPY package.json .yarnrc.yml ./
COPY .yarn ./.yarn

# Install dependencies
RUN yarn

# Dev container config ---------------------------------------------------------
FROM base AS dev

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .
