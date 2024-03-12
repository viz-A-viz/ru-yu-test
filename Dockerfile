FROM node:19

WORKDIR /app

COPY . .
RUN npm ci
RUN npx prisma generate
RUN npm run build

ENTRYPOINT npx prisma db push && npx prisma migrate reset --force && npm run start