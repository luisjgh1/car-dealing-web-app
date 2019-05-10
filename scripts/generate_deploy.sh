# $1 is a project name, EX: ford

echo 'Generate app.yaml'

PROJECT_NAME=${1%_*}

# If Project N
if [ -z "$PROJECT_NAME" ]
then 
  echo 'You are not send the PROJECT_NAME'
else 
  echo "Copy app.back.yaml to app.yaml'"
  # Copy app.yaml to project folder
  cp "./app.back.yaml" "app.yaml"

  echo "Replacing all \${_PROJECT} to ${PROJECT_NAME}'"

  # Replace ${_PROJECT} to project name, to set the service
  sed -i '' -e "s/\${_PROJECT}/${PROJECT_NAME}/g" "app.yaml"
fi

exit 0