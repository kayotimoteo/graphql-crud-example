def LABEL_ID = "010graphql-${UUID.randomUUID().toString()}"

podTemplate(
    name: '010graphql',
    namespace: 'devops',
    label: LABEL_ID,
    containers: [
            containerTemplate(args: 'cat', command: '/bin/sh -c', image: 'docker', livenessProbe: containerLivenessProbe(execArgs: '', failureThreshold: 0, initialDelaySeconds: 0, periodSeconds: 0, successThreshold: 0, timeoutSeconds: 0), name: 'docker-container', resourceLimitCpu: '', resourceLimitMemory: '', resourceRequestCpu: '', resourceRequestMemory: '', ttyEnabled: true, workingDir: '/home/jenkins/agent'),
            containerTemplate(args: 'cat', command: '/bin/sh -c', image: 'lachlanevenson/k8s-helm:v3.2.4', name: 'helm-container', ttyEnabled: true)
            ],
    volumes: [hostPathVolume(hostPath: '/var/run/docker.sock', mountPath: '/var/run/docker.sock')],
)
{
    def REPOS
    def IMAGE_VERSION
    def IMAGE_POSFIX = ""
    def KUBE_NAMESPACE
    def IMAGE_NAME = "repo.tftsolutions.com.br/docker/010graphql"
    def ENVIRONMENT
    def GIT_REPOS_URL = "git@github.com:kayotimoteo/graphql-crud-example.git"
    def GIT_BRANCH
    def HELM_CHART_NAME = "tftsolutions/010graphql"
    def HELM_DEPLOY_NAME
    def CHARTMUSEUM_URL = "http://192.168.15.2:30010"
    def INGRESS_HOST = "tftsolutions.com.br"
    def INGRESS_PATHS = "/"
    node(LABEL_ID) {
        stage('Checkout') {
            echo 'Iniciando Clone do Repositorio'
            REPOS = checkout scm
            GIT_BRANCH = REPOS.GIT_BRANCH
            if(GIT_BRANCH.equals("master")){
                KUBE_NAMESPACE = "prod"
                ENVIRONMENT = "production"
            } else if (GIT_BRANCH.equals("staging")){
                KUBE_NAMESPACE = "staging"
                ENVIRONMENT = "staging"
                IMAGE_POSFIX = "-RC"
                INGRESS_HOST = "staging.tftsolutions.com.br"
            } else{
                def error = "Nao existe pipeline para a branch ${GIT_BRANCH}"
                echo error
                throw new Exception(error)
            }
            HELM_DEPLOY_NAME = KUBE_NAMESPACE + "010graphql"
            IMAGE_VERSION = sh returnStdout: true, script: 'sh read-package-version.sh'
            IMAGE_VERSION = IMAGE_VERSION.trim() + IMAGE_POSFIX
        }
        stage('Package') {
            container('docker-container') {
                echo 'Iniciando Empacotamento com Docker'
                withDockerRegistry(credentialsId: 'dockerrepo', url: 'https://repo.tftsolutions.com.br') {
                    sh label: '', script: "docker build -t ${IMAGE_NAME}:${IMAGE_VERSION} -f dockerfile.${ENVIRONMENT} . --build-arg NPM_ENV='${ENVIRONMENT}'"
                    sh label: '', script: "docker push ${IMAGE_NAME}:${IMAGE_VERSION}"
                }
            }
        }
        stage('Deploy') {
            container('helm-container'){
                echo 'Iniciando Deploy com Helm'
                sh label: '', script: "helm repo add tftsolutions ${CHARTMUSEUM_URL}"
                sh label: '', script: "helm repo update"
                sh label: '', script: "helm search repo tftsolutions/"
                sh label: '', script: "helm ls -n prod"
                try{
                    sh label: '', script: "helm upgrade ${HELM_DEPLOY_NAME} devops/ --set image.tag=${IMAGE_VERSION} --set ingress.hosts[0].host=${INGRESS_HOST} --set ingress.hosts[0].paths[0]=${INGRESS_PATHS} -n ${KUBE_NAMESPACE}"
                }catch(Exception e){
                    sh label: '', script: "helm install ${HELM_DEPLOY_NAME} devops/ --set image.tag=${IMAGE_VERSION} --set ingress.hosts[0].host=${INGRESS_HOST} --set ingress.hosts[0].paths[0]=${INGRESS_PATHS} -n ${KUBE_NAMESPACE}"
                    // sh label: '', script: "helm install ${HELM_DEPLOY_NAME} ${HELM_CHART_NAME} --set image.tag=${IMAGE_VERSION} --set ingress.hosts[0].host=${INGRESS_HOST} --set ingress.hosts[0].paths[0]=${INGRESS_PATHS} -n ${KUBE_NAMESPACE}"
                }
            }
        }
    }
}
