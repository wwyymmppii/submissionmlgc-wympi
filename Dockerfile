FROM node:18-slim  
WORKDIR /app

# Menetapkan variabel lingkungan
ENV PORT=3000
ENV MODEL_URL='https://storage.googleapis.com/model-storage-submissionmlgc-wympi/model-in-prod/model.json'

# Menyalin file yang diperlukan
COPY package*.json ./  
RUN npm ci            

COPY . .              

EXPOSE 3000           
CMD [ "npm", "run", "start" ] 
