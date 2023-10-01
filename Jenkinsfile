
pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
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
    }
}

    









       
