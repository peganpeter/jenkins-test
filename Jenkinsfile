node {    
      def app     
      stage('Clone repository') {               
            checkout scm    
      }
      stage('Build image') {          
            app = docker.build("pegpet/repo")    
       }           
       stage('Test image') {
            app.inside {            
             
            sh 'echo "Tests passed"'        
            }    
        } 
       stage('Push image') {
            docker.withRegistry('https://registry.hub.docker.com', 'dockerhub_id') {                  
                 app.push("${env.BUILD_NUMBER}")            
                 app.push("latest")        
              }    
           }
       stage('Docker Run') {
               sh 'docker run -i --name jenkins-test -p 8090:3000 jenkins-test'
        }
}