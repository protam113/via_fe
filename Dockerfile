# Stage 1: Build stage
FROM node:20-slim AS builder

WORKDIR /app

# Copy file yarn
COPY package.json yarn.lock ./

# Cài đặt tất cả dependencies (bao gồm devDependencies) để build
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build Next.js app
RUN yarn build

# Stage 2: Production stage
FROM node:20-slim AS runner

WORKDIR /app

# Copy các files cần thiết từ builder
COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./

# Cài đặt dependencies production
RUN yarn install --production --frozen-lockfile && \
    yarn cache clean

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000

CMD ["yarn", "start"]


