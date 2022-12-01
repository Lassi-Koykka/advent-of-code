#!/usr/bin/bash

if [[ -e ./template.py ]]; then
        if [[ ! -z "$1" ]]; then
                mkdir "day${1}"
                cp "template.py" "day${1}/main.py"
                touch "day${1}/input"
                touch "day${1}/inputtest"
                code "day${1}"
        else
                echo "Please provide number of the day"
        fi
else
        echo "Please move to the root folder before executing this script"
fi