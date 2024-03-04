FROM node:14
WORKDIR /app
RUN echo "Copying files...."
COPY . .
WORKDIR /app/server/
RUN npm install
CMD ["npm", "run", "start"]
EXPOSE 5000
