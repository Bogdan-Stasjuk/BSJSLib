#!/bin/sh
# compile.sh
# JavaScript file compilation

echox() {
	return 0
}

readonly scriptDir="$(dirname "$0")"

compilerZipPath="$scriptDir/compiler.zip"
if [[ -f "$compilerZipPath" ]]; then
	rm -rf "$compilerZipPath"
	echo "old $compilerZipPath was removed"
fi

compilerFolderPath="$scriptDir/compiler"
echox "compilerFolderPath: $compilerFolderPath"
if curl -f -o "$compilerZipPath" "https://dl.google.com/closure-compiler/compiler-latest.zip"; then
	if [[ -d "$compilerFolderPath" ]]; then
		rm -rf "$compilerFolderPath"
		echo "old $compilerFolderPath was removed"
	fi
	unzip "$compilerZipPath" -d "$compilerFolderPath"
	rm "$compilerZipPath"
else
	echo "can't download compiler from https://dl.google.com/closure-compiler/compiler-latest.zip";
fi

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

readonly projDir="$(dirname "${scriptDir}")"
readonly minDirPath="${projDir}Min"
if [[ -d "$minDirPath" ]]; then
	rm -rf "$minDirPath"
	echo "old $minDirPath was removed"
fi
mkdir "$minDirPath"

cd "${projDir}" || exit 1

compileOrCopy() {
	local searchPath=$1
	echo "searchPath: $searchPath"

	for itemName in $searchPath
		do 
			if [ -d "$itemName" ]; then
				echox "dirname: $itemName"
				if  [[ "$compilerFolderPath" != *"${itemName}" ]]; then
					mkdir "$minDirPath/$itemName"
					compileOrCopy "$itemName/*"
				fi
			elif [ "${itemName##*.}" = "md" ]; then
				echo "${itemName} was skipped"
			else
				if [[ "${itemName##*.}" == "js" && $itemName != *".min.js" ]]; then
					if java -jar "$compilerPath" --compilation_level SIMPLE_OPTIMIZATIONS --js_output_file="$minDirPath/$itemName" "$itemName"; then
						echo "${itemName} was minified"
					else
						echo "${itemName} wasn't minified"
						exit 1
					fi
				elif [[ "${0}" != *"$itemName" ]]; then
						cp "$itemName" "$minDirPath/$itemName"
						echo "$itemName was copied"
				fi
			fi
		done
}

compileOrCopy "*"

zipMinDirPath="$minDirPath.zip"
echox "$zipMinDirPath"
if [ -f "$zipMinDirPath" ]; then
	rm "$zipMinDirPath"
	echo "old ${zipMinDirPath} was removed"
fi
ditto -c -k --sequesterRsrc --keepParent "$minDirPath" "$zipMinDirPath" && echo "new ${zipMinDirPath} was created"
