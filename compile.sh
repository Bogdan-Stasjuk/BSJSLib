#!/bin/sh
# compile.sh
# JavaScript file compilation

echox() {
	return 0
}

scriptDir="$(dirname "$0")"

compilerZipPath="$scriptDir/compiler.zip"
if [[ -f "$compilerZipPath" ]]; then
	rm -rf "$compilerZipPath"
	echo "old $compilerZipPath was removed"
fi
curl -o "$compilerZipPath" "https://dl.google.com/closure-compiler/compiler-latest.zip"

compilerFolderPath="$scriptDir/compiler"
if [[ -d "$compilerFolderPath" ]]; then
	rm -rf "$compilerFolderPath"
	echo "old $compilerFolderPath was removed"
fi
unzip "$compilerZipPath" -d "$compilerFolderPath"
rm "$compilerZipPath"

compilerPath=""
compilerSearchPath="$compilerFolderPath/*"
for itemName in $compilerSearchPath
	do 
		if [[ $itemName == *".jar"* ]];
			then
				compilerPath="$itemName"
				echo "compilerPath: $compilerPath"
		fi
	done

currentDir=${PWD##*/}
minDirName="${currentDir}Min"
minDirPath="../$minDirName"
echox "$minDirPath"
if [[ -d "$minDirPath" ]]; then
	rm -rf "$minDirPath"
	echo "old $minDirPath was removed"
fi
mkdir "$minDirPath"

scriptAbsolutePath="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/$(basename "${BASH_SOURCE[0]}")"
echo "$scriptAbsolutePath"

compileOrCopy() {
	local searchPath=$1
	echo "searchPath: $searchPath"

	for itemName in $searchPath
		do 
			if [ -d "$itemName" ]
				then
					if  [ "$itemName" != "$compilerFolderPath" ]
					 then
						mkdir "$minDirPath/$itemName"
						compileOrCopy "$itemName/*"
					fi
				else
					if [[ "${itemName##*.}" == "js" && $itemName != *".min.js"* ]]; 
						then
							java -jar "$compilerPath" --compilation_level SIMPLE_OPTIMIZATIONS --js_output_file="$minDirPath/$itemName" "$itemName"
							if (( $? )); then
								echo "$file was not able to be minified" >&2
								exit 1
							else
								echo "$itemName was minified"
							fi
						elif [[ "$scriptAbsolutePath" != *"$itemName"* ]]
							then
								cp "$itemName" "$minDirPath/$itemName"
								echo "$itemName was copied"
					fi
			fi
		done
}

compileOrCopy "*"
rm -rf "$compilerFolderPath"

zipMinDirPath="$minDirPath.zip"
echox "$zipMinDirPath"
if [ -f "$zipMinDirPath" ]; then
	rm "$zipMinDirPath"
	echo "old $zipMinDirPath was removed"
fi
ditto -c -k --sequesterRsrc --keepParent "$minDirPath" "$zipMinDirPath"