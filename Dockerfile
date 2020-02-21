# ---- Base Node ----
FROM node:12-stretch-slim AS base
ENV NODE_ENV=development
RUN mkdir /server && chown -R node:node /server
WORKDIR /server
USER node
RUN npm set progress=false && npm config set depth 0

# ---- Audit ----
FROM base AS audit
COPY --chown=node:node package*.json ./
RUN npm audit

# ---- Dependencies ----
FROM base AS dependencies
COPY --chown=node:node package*.json ./
RUN npm install --no-audit
COPY --chown=node:node . ./

#---- Test ----
FROM dependencies AS test
RUN npm test


# ---- Release ----
FROM base AS release
ENV NODE_ENV=production
COPY --chown=node:node package*.json ./
RUN npm ci && npm cache clean --force
COPY --chown=node:node /client/build ../../client/build
COPY --chown=node:node /server ./
COPY --chown=node:node /server/server.js ./
CMD [ "node","server.js"]