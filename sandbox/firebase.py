import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use a service account
cred = credentials.Certificate('/home/ubuntu/lakshay/GoalsApp-figma/sandbox/tensile-rite-345521-ee8201120995.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

lsgs = db.collection('users').document("lakshay")
lsgs.set({
    'goals': [{"goal":"mg"}]
})
a = lsgs.get()
print(a.to_dict())
