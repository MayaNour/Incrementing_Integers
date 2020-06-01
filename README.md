 
To test this api:
1. npm start
2. open postman
3. to register a new user:
    > access this link http://localhost:3000/api/user/register with a post request
    > in Body section enter user email and password as a json object, example:
      {
    	"email": "test@test.com",
	    "password": "12345678"
      }
    > save the responsed token for the "next" and "current" links
    > don't worry if you lose the token, you can get a new one through "login" link
4. to login:
    > access this link http://localhost:3000/api/user/login with a post request
    > write the email and password you registered with in the previous step as a json object
5. to get the current integer:
    > access this link http://localhost:3000/api/current with a get request
    > don't forget to enter your token in Headers section, with key name : authtoken
6. to get the next integer:
    > access this link http://localhost:3000/api/next with a get request
    > don't forget to enter your token in Headers section, with key name : authtoken
7. to reset the current integer:
    > access this link http://localhost:3000/api/current with a put request
    > don't forget to enter your token in Headers section, with key name : authtoken
    > enter the new current value as a json object in Body section, example: 
      {
          "current": "234"
      }
	  
