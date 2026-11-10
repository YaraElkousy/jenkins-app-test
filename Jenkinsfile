pipeline {
    agent none

    stages {
        stage('show branch') {
            agent any
            steps {
                echo "This build is running on branch: ${env.BRANCH_NAME}"
            }
        }

        stage('build & deploy on built-in node') {
            when { branch 'main' }
            agent { label 'built-in' }
            steps {
                sh 'docker build -t node-app:builtin .'
                sh 'docker rm -f node-app-builtin || true'
                sh 'docker run -d --name node-app-builtin -p 3001:3000 node-app:builtin'
            }
        }

        stage('build & deploy on docker agent') {
            when { branch 'main' }
            agent { label 'docker-agent' }
            steps {
                sh 'docker build -t node-app:agent .'
                sh 'docker rm -f node-app-agent || true'
                sh 'docker run -d --name node-app-agent -p 3002:3000 node-app:agent'
            }
        }
    }
    post {
        always {
            mail to: 'YOUR_GMAIL@gmail.com',
                 subject: "Jenkins: ${env.JOB_NAME} #${env.BUILD_NUMBER} - ${currentBuild.currentResult}",
                 body: """Build status: ${currentBuild.currentResult}
                    Job: ${env.JOB_NAME}
                    Build number: ${env.BUILD_NUMBER}
                    Branch: ${env.BRANCH_NAME}
                    Build URL: ${env.BUILD_URL}"""
        }
    }
}
