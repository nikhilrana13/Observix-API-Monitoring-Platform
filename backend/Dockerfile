# install node js 22 
FROM node:22-alpine 

# work directory 
WORKDIR /backend 

# copy package files 
COPY package*.json ./  

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Expose port
EXPOSE 4000 

# start server 
CMD ["npm", "run","dev"] 