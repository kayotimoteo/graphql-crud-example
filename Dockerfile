FROM node:lts-alpine

RUN mkdir -p /usr/src/app/node_modules && chown -R node:node /usr/src/app

WORKDIR /usr/src/app

COPY --chown=node:node package.json yarn.* /usr/src/app/

USER node

RUN yarn install --frozen-lockfile

COPY --chown=node:node . /usr/src/app

RUN yarn build

ENV NODE_ENV staging

EXPOSE 80

CMD ["node", "dist/index.js"]
