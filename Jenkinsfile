pipeline {
    agent any

    environment {
        NODE_ENV = 'dev'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout([
                    $class: 'GitSCM', 
                    branches: [[name: '*/ui/ux']], 
                    doGenerateSubmoduleConfigurations: false, 
                    extensions: [], 
                    submoduleCfg: [], 
                    userRemoteConfigs: [[url: 'https://github.com/tuulikoo/LanguageApp.git']]
                ])
            }
        }

        stage('Setup Environment') {
            steps {
                script {
                    nodejs(nodeJSInstallationName: 'Node20', configId: null) {
                        sh 'npm ci'
                    }
                }
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Node.js Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Setup Robot Framework') {
            steps {
                sh '''
                    pip install robotframework robotframework-browser
                    rfbrowser init
                '''
            }
        }

        stage('Run Next.js App') {
            steps {
                sh 'npm start &'
                sleep 15  
            }
        }

        stage('Run Robot Tests') {
            steps {
                sh 'robot test_app.robot'
            }
        }
    }

    post {
        always {
           
            sh 'pkill -f "next start" || true'
        }
    }
}










       
