FROM node:18.13.0-alpine AS build 
WORKDIR /app
COPY package*.json ./
RUN npm install -g @angular/cli@16.2.12
RUN npm install
# RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points
COPY . .
RUN npm run build

# FROM nginx:stable
# COPY --from=build /app/dist/steg0vault-frontend/ /usr/share/nginx/html
# EXPOSE 80

CMD ["ng", "serve", "--host", "0.0.0.0"]
