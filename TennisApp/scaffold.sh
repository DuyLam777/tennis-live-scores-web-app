#!/bin/bash

# Define the list of models
models=("Venue")

# Loop through each model and run the scaffolding command
for model in "${models[@]}"; do
    echo "Scaffolding CRUD pages for $model..."
    dotnet aspnet-codegenerator blazor CRUD \
        -dbProvider postgres \
        -dc TennisApp.Data.TennisAppContext \
        -m TennisApp.Models.$model \
        -outDir Components/Pages/$model
done

echo "Scaffolding completed!"
