pipeline {
    agent none

    stages {
        stage('build & deploy on built-in node') {
            agent { label 'built-in' }
            steps {
                sh 'docker build -t node-app:builtin .'
                sh 'docker rm -f node-app-builtin || true'
                sh 'docker run -d --name node-app-builtin -p 3001:3000 node-app:builtin'
            }
        }

        stage('build & deploy on docker agent') {
            agent { label 'docker-agent' }
            steps {
                sh 'docker build -t node-app:agent .'
                sh 'docker rm -f node-app-agent || true'
                sh 'docker run -d --name node-app-agent -p 3002:3000 node-app:agent'
            }
        }
    }
}
