# install node js 22
FROM node:22-alpine

#working directory
WORKDIR /frontend

# copy package files 
COPY package*.json ./ 

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Expose port
EXPOSE 5173 

# start server 
CMD ["npm", "run","dev","--","--host"] 