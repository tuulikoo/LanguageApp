pipeline {
    agent any
    environment {
        NODE_ENV = 'dev'
    }
    triggers {
        cron('0 * * * *') // Run every hour
        pollSCM('H/5 * * * *') // Poll SCM every 5 minutes
    }
    stages {
        stage('Checkout Code') {
            steps {
                checkout([
                    $class: 'GitSCM', 
                    branches: [[name: '*/master']], 
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
        dir('/var/jenkins_home/workspace/LanguageApp/robot') {
            sh '''
                #!/bin/bash
                python3 -m venv venv_robot
                source venv_robot/bin/activate
                pip install robotframework robotframework-browser robotframework-seleniumlibrary
                rfbrowser init
            ''', returnStdout: true
        }
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
        dir('/var/jenkins_home/workspace/LanguageApp/robot') {
            sh '''#!/bin/bash
                source venv_robot/bin/activate
                robot .
            ''', returnStdout: true
        }
    }
}
       stage('Build and Deploy') {
            steps {
                sh 'docker-compose up -d --build'
            }
        }
        stage('Cleanup') {
            steps {
                sh 'docker system prune -f'
            }
        }
    }
    post {
        always {
            robot outputPath: '.', logFileName: 'log.html', outputFileName: 'output.xml', reportFileName: 'report.html'
            sh 'pkill -f "next start" || true'
        }
    }
}




       
