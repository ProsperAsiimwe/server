# Boo | Backend Engineer | Coding Test

## v1.0.0

### Installation
- clone the repository
- CD into the repository folder on your computer and run command: npm install 

##### SERVER TERMINAL COMMANDS (found in package.json under scripts)

| Script                | Role                                        |
| -----------           | ------------------------                    |
| npm run start:dev     | Start Server In Developement Mode           |
| npm run start:prod    | Start Server In Production Mode             |
| npm test              | Run All Tests                               |


##### API ENDPOINTS (Assuming the base URL is localhost and server is running on port 3000 http://127.0.0.1:3000)


## 🎯 profiles  

- [Create a new profile][POST](http://127.0.0.1:3000/profiles)
# 📝 Sample request body
{
    "name": "PROSPER ASIIMWE",
    "description": "Humble, kind and so very down to earth.",
    "mbti": "ISFJ",
    "enneagram": "9W3",
    "variant": "SP/SO",
    "tritype": 725,
    "socionics": "SEE",
    "sloan": "RCOEN",
    "psyche": "FEVL",
    "image": "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
}

- [Fetch profile by id and render it onto template][GET](http://127.0.0.1:3000/profiles/63f5e7170a136fbf67b2e3c6)

⭐️ Replace 63f5e7170a136fbf67b2e3c6 with a valid profile _id

- [Fetch all profiles][GET](http://127.0.0.1:3000/profiles)         

## 🎯 users  
- [Create a new user][POST](http://127.0.0.1:3000/users)

# 📝 Sample request body
{
    "name": "MARCUS RASHFORD"
}

- [Fetch all users][GET](http://127.0.0.1:3000/users)  

## 🎯 comments  
- [Create a new comments][POST](http://127.0.0.1:3000/comments)

# 📝 Sample request body
{
    "user": "63f5ed648c5855e19d0c37f9",
    "profile": "63f5ed808c5855e19d0c37fe",
    "content": "Amazing personality, I would totally recommend you date him."
}

- [Fetch all comments][GET](http://127.0.0.1:3000/comments)  

- [Fetch all comments by user id][GET](http://127.0.0.1:3000/comments/user/63f5ed648c5855e19d0c37f9)  

⭐️ Replace 63f5ed648c5855e19d0c37f9 with a valid user _id

- [Fetch all comments by profile id][GET](http://127.0.0.1:3000/comments/profile/63f5ed808c5855e19d0c37fe) 

⭐️ Replace 63f5ed808c5855e19d0c37fe with a valid profile _id

- [Fetch all comments sorted by date in descending order][GET](http://127.0.0.1:3000/comments/sort/date) 

- [Fetch all comments filtered by content][GET](http://127.0.0.1:3000/comments/filter-by-content?content=Amazing) 

⭐️ ?content=Amazing is the query param

- [Like a comment][PUT](http://127.0.0.1:3000/comments/like)

# 📝 Sample request body
{
  "userId": "63f4d00efcb3959a328b0e9a",
  "commentId": "63f4d032fcb3959a328b0ea1"
}

- [Unlike a comment][PUT](http://127.0.0.1:3000/comments/unlike)

# 📝 Sample request body
{
  "userId": "63f4d00efcb3959a328b0e9a",
  "commentId": "63f4d032fcb3959a328b0ea1"
}