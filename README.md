# DermalaWeb2

DermalaWeb2 is the basis for a secondary community based website for Dermala Inc. The original intent behind this project was to simultaneously give UCSD students an opportunity for an internship in which they would be building a project that eventually Dermala would launch and build a website that would help teach people about the microbiome as well as giving them a space to discuss with others about microbiome-based products.

## Getting Started

### Prerequisites

1) You need git to clone the repository to your local computer
```
https://git-scm.com
```
2) Use firebase, the service that I used, or a similar service to host the site
```
https://firebase.google.com
```
3) Create an AWS account in order to use your DynamoDB database
```
https://aws.amazon.com
```

### Deployment

Assuming you are working on a mac and have the firebase cli, git, and a functioning aws account follow these instructions to get the site working. I assume windows will be similar but I've only done it on a mac.

1) Go to https://firebase.google.com, sign in, go to console, and add a project. Then use the firebase cli to create a firebase project on your computer. Choose hosting since that is the only service the site currently uses (Don't worry you can add more later if you need to). Choose your project. Keep the default public folder and answer No to the single page application question.
```
firebase init
...
You're about to initialize a Firebase project in this directory:

  /Users/Dnutz/Desktop

? Which Firebase CLI features do you want to setup for this folder? Press Space 
to select features, then Enter to confirm your choices. 
 ◯ Database: Deploy Firebase Realtime Database Rules
 ◯ Firestore: Deploy rules and create indexes for Firestore
 ◯ Functions: Configure and deploy Cloud Functions
❯◉ Hosting: Configure and deploy Firebase Hosting sites
 ◯ Storage: Deploy Cloud Storage security rules
...
? Select a default Firebase project for this directory: (Use arrow keys)
  [don't setup a default project] 
❯ your_project_name_here
  [create a new project] 
...
? What do you want to use as your public directory? public
? Configure as a single-page app (rewrite all urls to /index.html)? No
...
✔  Firebase initialization complete!
```
2) Clone the githb repositiory into the firebase project folder.
```
cd your_firebase_folder
git clone https://github.com/DNutz/DermalaWeb2.git
```
3) Read and learn how to use Amazon DynamoDB. You will need to mkae edits to the javascript files to direct them to use your database and account.

    1. Setting Up DynamoDB -> Setting Up DynamoDB (Web Service)
    https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/SettingUp.DynamoWebService.html

    2. Getting Started with DynamoDB -> JavaScript and DynamoDB
    https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.JavaScript.html
	    1. follow the 5 steps to help you learn the basics
	    2. summary is important for getting it to work online

    3. Configure AWS Credentials in Your Files Using Amazon Cognito 
	    1. https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Cognito.Credentials.html
	    2. follow steps to create Amazon Cognito Role so you don’t need to hard code your secret stuff

## Backlog

Here are requests of the customers that have yet to be implemented as well as some other things to do to improve the project.
1) Latest reseach page:
    As you can see in the navigation bar and on the homepage there are disabled links that are designed to lead to a research page. The idea for this page is to have a list view of new and relevent research and news articles on the microbiome. We talked about possibly using some connection to social media for this.

2) Produt review page:
    As you can see in the navigation bar and on the homepage there are disabled links that are designed to lead to a review page. The idea for this page is to have a Amazon-like view of skin care products, allow users to review them as well as show how they compare to microbiome products i.e. analytics to show which ones work faster or which ones have longer lasting results.

3) Improve the discussion forum:
    - Give accounts tagged as experts a special badge to show that they are an expert in the field
    - Allow users to respond to comments i.e. make the post/comments into a tree that can have a large finite number of levels or even infinite levels
    - Allow users to like posts and comments
    - Add a report or flag post feature for inappropriate responses
    - Allow users to attach images in their posts and comments
    - Can always try to improve the UI styling and flow
    - Add a search feature so you can find an older post without having to scroll
    - Page the posts in topic-view and the comments in post-view i.e. only have a certain number load until the user requests more
        - https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Scan.html under "Paginating the Results"

4) Improve the account page:
    - Allow users to change their email, password, and display name

5) Clean up the legacy code:
    - Remove unnecessary code to reduce loading time, some imported libraries maybe be unused and thus unnecessary at this point
    - Standardize code style across files for example:
        - airbnb javascript style guide: https://github.com/airbnb/javascript
        - html and css style guide: https://google.github.io/styleguide/htmlcssguide.html
    - Add more comments to make code more understandable

6) Finalize the images:
    - purchase/procure non-watermarked versions of the images that are being used
    - take high-resoltions versions and create smaller versions to reduce loading time

7) Optimize for mobile / in general:
    - Add/change styling to account for device/window width
    - Remove unnecessary code to reduce loading time
    - Create smaller versions of images to reduce loading time
    - Don't link libraries by url, download them and link them locally
    - Minimize code before final shipping to reduce loading time
        - https://javascript-minifier.com
        - https://kangax.github.io/html-minifier/
        - https://cssminifier.com

8) Launch the product for public use:
    - Finalize and thoroughly test the webiste
    - Use firebase or another hosting service to deploy it under the preferred url, currently "microbiomebeautyforum.com"

## Built With

* [twbs](https://github.com/twbs/bootstrap) - A popular HTML, CSS, and JavaScript framework for developing responsive, mobile first projects on the web.
* [fontawesome](http://fontawesome.io) - A popular icon set and toolkit.
* [jquery](https://jquery.com/) - Used to simplify javascript.
* Some other ibraries, but honestly nearly all the javascript I wrote was in vanilla so you may be able to remove many

## Authors

* **Daniel Nuttall** - *Initial work* - [DNutz](https://github.com/Dnutz)