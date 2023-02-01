Small Javascript game that uses Spotify's API to allow users to guess what year a certain song was in their Wrapped playlist (or top 100 songs of the year playlist).
Still in early development
Currently will need .env file w/ a user's own client ID, client secret, and redirect uri as specified in Spotify's developer dashboard. 
Format of the .env file should be as below, with the respective values replacing the 'XXX' placeholder:
CLIENT_ID=XXX
CLIENT_SECRET=XXX
REDIRECT_URI=XXX (Currently, I use http://localhost:8888/callback. Make sure your developer dashboard reflects this same URI)

TODO:

Short-term:
- (FIXED 1/31/23 - Under active-dev branch) Fix error with authentication not working correctly
- Implement logic to get user's Spotify data

Long-term:
- Implement CSS styling
- Clean up webpage, make it more readable
