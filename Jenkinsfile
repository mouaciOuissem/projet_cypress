pipeline{
    agent{
       docker{
        
       image 'cypress/included:13.6.6' 
        args '--entrypoint=""'
       }
    }
    stages{
        stage('intall dependencies'){
            steps{
                sh 'npx cypress install'
            }
        }
        stage('Run cypress'){
            steps{
                //sh './batchs/e2etests.sh'
                //sh './batchs/e2etests.sh'
                sh 'npx cypress run'
            }
        }
        stage('Generer un rapport'){
            steps{
                junit 'results/*.xml'
            }
        }

    }
    
}