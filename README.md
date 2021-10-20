# Instagram-Clone

# Author
Laurette Mong'ina 
  
# Description  
This is a clone of  Instagram where people share their  images and videos for other users to view. 
Users can sign up, login, view and post photos, search and follow other users.
##  Live Link  

  
## Screenshots 
###### Log In
 
<img src="">
 
###### Home

<img src="">

 ###### user profile
 <img src=""> 


 
## User Story  
  
* Sign in to the application to start using.  
* Upload a pictures to the application. 
* Search for different users using their usernames.  
* See your profile with all your pictures.  
* Follow other users and see their pictures on my timeline.  
  

  
## Setup and Installation  
To get the project .......  
  
##### Cloning the repository:  
 bash 
 https://github.com/LauretteMongina/Instagram-clone.git

##### Navigate into the folder and install requirements  
 bash 
cd instagram pip install -r requirements.txt 

##### Install and activate Virtual  
 bash 
- python3 -m venv virtual - source virtual/bin/activate  
  
##### Install Dependencies  
 bash 
 pip install -r requirements.txt 
  
 ##### Setup Database  
  SetUp your database User,Password, Host then make migrate  
 bash 
python manage.py makemigrations instagram
  
 Now Migrate  
 bash 
 python manage.py migrate 

##### Run the application  
 bash 
 python manage.py runserver 
 
##### Running the application  
 bash 
 python manage.py server 

##### Testing the application  
 bash 
 python manage.py test 

Open the application on your browser `127.0.0.1:8000`.  
  
  
## Technology used  
  
* [Python3.8](https://www.python.org/)  
* [Django 3.2.7](https://docs.djangoproject.com/en/2.2/)  
* [Heroku](https://heroku.com)  
  
  
## Known Bugs  
* User is not able to see comments. 
  
## Contact Information   
If you have any question or contributions, please email me at [monginalaurette@gmail.com]  
  
## License 
MIT  
* Copyright (c) 2021 *Laurette