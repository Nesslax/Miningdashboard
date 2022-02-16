# Create image based on the official latest Node image from the dockerhub
FROM node:13

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY . /usr/src/app

# Install dependecies
RUN npm install


# Expose the port the app runs in
EXPOSE 3000


# Serve the app
CMD ["npm", "start"]
