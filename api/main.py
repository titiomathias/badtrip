from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import user, iplogger

app = FastAPI(
    title="BadTrip API",
    description="A simple FastAPI to manage BadTrip",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return {"message": "Hello, World!"}


app.include_router(user.router, prefix="/user", tags=["user"])
app.include_router(iplogger.router, prefix="/iplogger", tags=["iplogger"])