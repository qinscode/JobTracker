pipeline {
    agent any

    environment {
        GITHUB_REPO = 'https://github.com/qinscode/JobTracker.git'
        DOCKER_IMAGE = 'jobtracker'
        DOCKER_TAG = "${BUILD_NUMBER}"
        CONTAINER_NAME = 'jobtracker-container'
        VITE_API_URL = credentials('API_URL_SECRET')
        VITE_GOOGLE_CLIENT_ID = credentials('VITE_GOOGLE_CLIENT_ID')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: env.GITHUB_REPO
            }
        }

        stage('Generate .env file') {
            steps {
                sh '''
                    echo "VITE_API_URL=${VITE_API_URL}" > .env
                    echo "VITE_GOOGLE_CLIENT_ID=${VITE_GOOGLE_CLIENT_ID}" >> .env

                '''
            }
        }

        stage('Environment Info') {
            steps {
                sh '''
                    echo "Node version:"
                    node --version
                    echo "Yarn version:"
                    yarn --version
                    echo "Docker version:"
                    docker --version
                '''
            }
        }

        stage('Lint and Format') {
            steps {
                sh 'yarn install'
                sh 'yarn lint'
                sh 'yarn format'
                sh 'yarn format:check'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                }
            }
        }

        stage('Deploy Docker Container') {
            steps {
                script {
                   sh """
                       docker stop ${CONTAINER_NAME} || true
                       docker rm ${CONTAINER_NAME} || true
                       docker run -d --name ${CONTAINER_NAME} -p 4173:4173 --restart unless-stopped ${DOCKER_IMAGE}:${DOCKER_TAG}

                       # Keep only latest 3 images
                       docker images ${DOCKER_IMAGE} --format "{{.ID}}" | sort -r | tail -n +4 | xargs -r docker rmi

                       echo "Waiting for container to start..."
                       sleep 10

                       if ! docker ps | grep -q ${CONTAINER_NAME}; then
                           echo "Container failed to start"
                           exit 1
                       fi
                   """
                }
            }
        }
    }

    post {
        success {
            echo 'JobTracker build and deployment successful!'
        }
        failure {
            echo 'JobTracker build or deployment failed.'
        }
    }
}