# **App Name**: HDB Insights

## Core Features:

- Town Filtering: Allows users to select a town from a dropdown menu to view relevant HDB resale data.
- Data Visualization: Presents HDB resale price trends for the selected town in a table or chart format using data queried from BigQuery.
- Property Detail Mockup: Shows a mock page for specific HDB listings based on historical data, including the resale price.
- Intent Tracking: Sets and updates a cookie named intent_town with the user's town selections to track their interests and browsing behavior.
- Ad Slot & Dynamic Creative: An area that displays ads based on the intent_town cookie content. Reads the intent_town cookie, queries BigQuery for average price in that town and month and displays it.
- GDPR/PDPC Consent Simulation: A feature for users to agree with cookies consent

## Style Guidelines:

- Primary color: Soft blue (#A0C4FF) to evoke trust and reliability.
- Background color: Very light blue (#F0F8FF) providing a clean and neutral backdrop.
- Accent color: Light purple (#BDB2FF) for interactive elements and call-to-actions to guide the user.
- Font: 'Inter', a sans-serif font that's modern, neutral, and suitable for both headlines and body text.
- Use simple, outlined icons to represent different data points and UI actions.
- Employ a clean and structured layout to present data clearly, emphasizing key metrics and user navigation.
- Incorporate subtle transitions and loading animations to enhance user engagement and perceived performance.