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

        stage('Node.js Tests'){
            steps{
                sh 'npm test'
            }
        }

        stage('Robot Framework Tests') {
            steps {
                
                sh "source /opt/robotenv/bin/activate && robot -d ${WORKSPACE}/robot"
            }
            post {
                always {
                    
                    robot(
                        outputPath: 'output',
                        outputFileName: 'output.xml',
                        reportFileName: 'report.html',
                        logFileName: 'log.html',
                        passThreshold: 0,    
                        unstableThreshold: 0 
                    )
                }
            }
        }
    }
}

