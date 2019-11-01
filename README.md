# Chengdu80
University of Hong Kong - Dragon Research

## Introduction
Dragon Research is an academic research engine for financial researchers with capabilities like intelligent recurrent search 
by research papers, authors of the papers as well as by the topic of the researches. Moreover, its a highly capable research group / 
collborative network identifier in the way that you can start searching from a topic or a paper or even an author and have the capability to visualize
a research group or collaborative researcher network with an responsive graph. Besides, we also have the ability to bucket your searches
and redifining the way current search engines work where you can't possibily iteratively dive deeper into your initial search based on
the parameters of research papers, researchers and research topics as the Dragon can do. 

## Setup
Please do thie setup in the following order:

### Run Elasticsearch
On the Ubuntu Server, first check if the elasticsearch service is running by typing `sudo systemctl status elasticsearch`

If it is not running, then start the service by `sudo systemctl start elasticsearch`

### Run React Web App
On the Ubuntu Server, navigate to `/home/swufe/Chengdu80/web` and run `yarn install` and after that run `yarn build`

Then navigate to `/home/swufe/Chengdu80/server` and run `yarn install` and after that run `NODE_ENV=PROD yarn dev`

This app will open at localhost:4000/

### Run Kibana Dashboard
On the Ubuntu Server, first check if the Kibana service is running by typing `sudo systemctl status kibana`

If it is not running, then start the service by `sudo systemctl start kibana`

This dashboard will open at localhost:5601/

## Working with the app

Navigate to a web browser and type localhost:4000/ a search window appears. 

The search supports various types of queries involving research papers, research topics as well as paper authors.

Some queries you can try are:
- financial management
- foreign direct investment
- investment banking
- privatisation
- capital investment
- microfinance
- CSR
- financial crisis
- banking industry
- debt capital
- equity capital
