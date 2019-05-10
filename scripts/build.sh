# Set enviroment
ENV=$1
# Set project name
PROJECT_NAME=${2%_*}

echo 'Generating build'

if [ -z "$ENV" ]
then
	echo "You are not send the enviroment var, you can set 'prod' or 'dev'"
	exit 0
fi

if [ -z "$PROJECT_NAME" ]
then
	echo "You are not send the project name var"
	exit 0
fi

FOUND_IT=false

if [ "$ENV" = "prod" ]
then
  for f in *; do
  	if [ "${f}" = "_${PROJECT_NAME}" ]
    then
			FOUND_IT=true
      echo "found ${f} folder"
      if [ -d ${f} ]
      then
				echo "building ${f} for prod"
				sed -ie "1s/.*/let api321 = { url:'https:\/\/api-v1.321ignition.dev\/api', folderName: '_${PROJECT_NAME}' };/" plugins/cogear-plugin-md-generator/script.js
				sed -ie "1s/.*/@import '..\/..\/..\/..\/${f}\/variables.scss';/" themes/v2/resources/scss/style.scss
				sed -ie "1s/.*/const api321 = 'https:\/\/api-v1.321ignition.dev\/api';/" themes/v2/js/config.js
				sed -ie "1s/.*/window.api321 = {url:'https:\/\/api-v1.321ignition.dev\/api', dealerCode: '${PROJECT_NAME}'};/" _${PROJECT_NAME}/app.js
				npm run webpack_prod;
				npm run generate:md;
				cp -f ${PROJECT_NAME}-config.yaml config.yaml
				node ./node_modules/cogear/bin/cogear.js build -s ./$f -o ./public/$f
			fi
		fi
	done
	if [ "$FOUND_IT" = false ]
	then 
		echo "The folder '${PROJECT_NAME}' doesn't exist"
	fi
elif [ "$ENV" = "dev" ]
then
	if [ -d _${PROJECT_NAME} ]
	then
		FOUND_IT=true
		sed -ie "1s/.*/let api321 = { url:'http:\/\/localhost:8081\/api', folderName: '_${PROJECT_NAME}' };/" plugins/cogear-plugin-md-generator/script.js
		sed -ie "1s/.*/@import '..\/..\/..\/..\/_${PROJECT_NAME}\/variables.scss';/" themes/v2/resources/scss/style.scss
		sed -ie "1s/.*/const api321 = 'http:\/\/localhost:8081\/api';/" themes/v2/js/config.js
		sed -ie "1s/.*/window.api321 = { url: 'http:\/\/localhost:8081\/api', dealerCode: '${PROJECT_NAME}'};/" _${PROJECT_NAME}/app.js
		npm run generate:md;
		cp -f ${PROJECT_NAME}-config.yaml config.yaml
		node ./node_modules/cogear/bin/cogear.js dev -s ./_$PROJECT_NAME -o ./public/$PROJECT_NAME
	fi
	if [ "$FOUND_IT" = false ]
	then 
		echo "The folder '${PROJECT_NAME}' doesn't exist"
	fi
else
	echo "The enviroment '${ENV}' doesn't exist"
fi
exit 0