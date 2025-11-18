pipeline {
    agent {
        docker {
            // image 'cypress/browsers:node-24.11.1-chrome-142.0.7444.162-1-ff-145.0-edge-142.0.3595.65-1'
            image 'cypress/browsers:latest'
            args '--entrypoint=""' // 
        }
    }
    // stages 
    stages {
        stage('Install dependencies') {
            steps {
                sh 'node --version'
                sh 'npx cypress cache clear'
                sh 'npm --version'
                sh 'npm install '
            }   
        }

        stage('Run tests') {
            steps {
                sh 'cypress/e2e/batchs/e2e_test.sh'
            }
        }
    }// comment git 
}