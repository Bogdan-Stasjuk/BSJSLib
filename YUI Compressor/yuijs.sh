#!/bin/sh
# Scriptacular - yuijs.sh
# JavaScript file compression & obfuscation with yuicompressor

echox() {
	return 0
}

YUI_PATH="/Users/stasjukb/Programming/JavaScript/BSJSLib/YUI Compressor/yuicompressor-2.4.8.jar"

currentDir=${PWD##*/}
minDirName="$currentDir min"
minDirPath="../$minDirName"
echox "$minDirPath"
if [[ -d "$minDirPath" ]]; then
	rm -rf "$minDirPath"
	echox "$minDirPath was removed"
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