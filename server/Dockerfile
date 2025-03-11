FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Install nodemon globally for auto-reloading
RUN npm install -g nodemon

EXPOSE 5000
CMD ["npm run dev"]