## CC20-Fakebook-API

### env guide
PORT = 8472

DATABASE_URL = ""

JWT_SECRET = "8888"

CLOUDINARY_URL=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
---
### service

|path |method |authen |params |query |body |
|:-- |:-- |:-- |:-- |:-- |:-- |
|/api/auth/login |post |-|-|-|{identity, password}
|/api/auth/register|post|-|-|-| {identity, firstName, lastName, password, confirmPassword}
|/api/auth/me|get|y|-|-|-|
|/api/post|get|y|-|-|-|
|/api/post|post|y|-|-|{message, image(file)}
|/api/post|put|y|:id|-|{message, image(file)}
|/api/post|delete|y|:id|-|-
|/api/comment|post|y|-|-|{message, postId}
|/api/like|post|y|-|-|{postId}
|/api/like|delete|y|:id|-|-

---
Notes