# Ilzes Custom module

## Introduction
Simple JS module with a Composer package that provides a Block listing the users from a third party service. 

## Configuration
In order to successfully implement this solution, it is necessary to deactivate the BigPipe module and ensure that the Component module is installed via composer. Proceed by enabling the module and adding the "User component" block to any desired location on the page within the Block layout interface.

## How it works
The block allows for customization of the title and the number of items displayed per page. By default, the number of items per page is set to 0 and the API url is pre-populated. Additionally, the block features pagination functionality for easy navigation through the items.

## Install module
Add to your composer file: "repositories": [
      {
        "type": "vcs",
        "url": "https://github.com/Ilze-Bilze/ilze.git"
      }
    ]
and run composer require ilze-bilze/ilze:dev-main