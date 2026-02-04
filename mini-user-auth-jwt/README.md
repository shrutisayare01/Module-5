# Mini User Authentication System (JWT)

## APIs
POST /signup  
POST /login  
GET /myprofile (Protected)

## Login Response
{
  "message": "Login successful",
  "token": "JWT_TOKEN"
}

## Authorization Header
Authorization: Bearer JWT_TOKEN