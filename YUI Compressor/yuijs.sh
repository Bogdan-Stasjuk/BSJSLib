#!/bin/sh
# Scriptacular - yuijs.sh
# JavaScript file compression & obfuscation with yuicompressor

echox() {
	return 0
}

scriptDir="$(dirname "$0")"
YUI_PATH="$scriptDir/yuicompressor-2.4.8.jar"
echox "YUI_PATH: $YUI_PATH"

currentDir=${PWD##*/}
minDirName="$currentDir min"
minDirPath="../$minDirName"
echox "$minDirPath"
if [[ -d "$minDirPath" ]]; then
	rm -rf "$minDirPath"
	echo "$minDirPath was removed"
else
	echo "$minDirPath couldn't be found"
fi
mkdir "$minDirPath"

searchJSFilesAndApplyObfuscator() {
	local searchPath=$1
	echo "searchPath: $searchPath"

	for itemName in $searchPath
		do 
			if [ -d "$itemName" ]
				then
					mkdir "$minDirPath/$itemName"
					searchJSFilesAndApplyObfuscator "$itemName/*"
				else
					if [[ "${itemName##*.}" == "js" ]]; 
						then
							java -jar "$YUI_PATH" -o "$minDirPath/$itemName" "$itemName"
							if (( $? )); then
								echo "$file was not able to be minified" >&2
								exit 1
							else
								echo "$itemName was minified"
							fi
						else
							cp "$itemName" "$minDirPath/$itemName"
					fi
			fi
		done
}

searchJSFilesAndApplyObfuscator "*"

zipMinDirPath="$minDirPath.zip"
echox "$zipMinDirPath"
if [ -f "$zipMinDirPath" ]; then
	rm "$zipMinDirPath"
	echo "$zipMinDirPath was removed"
else
	echo "$zipMinDirPath couldn't be found"
fi
zip -r "$zipMinDirPath" "$minDirPath"