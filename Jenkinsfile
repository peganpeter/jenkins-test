pipeline { 
    agent any 
    environment { 
        DOCKERHUB_CREDENTIALS = credentials('dockerhub_id')
    }
    stages { 
        stage('Building our image') { 
            steps { 
                 'docker build -t peganpeter/jenkins-test'
            } 
        }
        stage('Deploy our image') { 
            steps { 
                script { 
                    docker.withRegistry( '', registryCredential ) { 
                        dockerImage.push() 
                    }
                } 
            }
        } 
        stage('Cleaning up') { 
            steps { 
                sh "docker rmi $registry:$BUILD_NUMBER" 
            }
        } 
    }
}