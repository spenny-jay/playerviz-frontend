# Welcome to the PlayerViz.io Frontend!

PlayerViz.io is a web-application that eases evaluating player performances across an array of statistical categories. Rather than opening countless tabs, you can seamlessly create data visualizations and analyze individual performances on the platform. This frontend repository holds the React code and a set of API calls to the project's backend repository to retrieve the user's data and the latest player statistics.

<img width="1573" alt="Screenshot 2024-06-23 at 8 18 36 PM" src="https://github.com/spenny-jay/playerviz-frontend/assets/82179552/3f9a2ae5-404b-4df5-8c00-6b96292e990f">

## Tech Stack
The frontend is primarily comprised of React.js, TypeScript, CSS, React-Bootstrap, and MUI X Charts. The client utilizes stateless auth, where tokens will remain client-side to be verified by the backend. The user's session is maintained until their refresh token has expired, where the user will be prompted to log back in.

## Main features
- Search and add active NFL QB's to generate custom data visualizations (AKA dashboards)
- View individual career statistics in a tabular layout
- User login and sign-up
- Save and load existing dashboards

## Renaining Work
- Additional NFL positions and more players
- More chart types
- Robust logging 
