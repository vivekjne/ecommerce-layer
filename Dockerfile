# Storefront (with the native SQLite backend and chat SDK) as one container.
# node:sqlite needs Node >= 22.13.
FROM node:22-slim

RUN corepack enable
WORKDIR /app

COPY . .
RUN pnpm install --frozen-lockfile && pnpm --filter @commerce/storefront build

# Set after install so devDependencies (the build toolchain) were available above.
ENV NODE_ENV=production \
    PORT=3000 \
    DATABASE_PATH=/data/commerce.db

# Mount a persistent volume at /data, or the database resets on every deploy.
# (Railway rejects a Dockerfile VOLUME instruction; attach a Railway Volume.)
EXPOSE 3000

WORKDIR /app/apps/storefront
CMD ["pnpm", "start"]
