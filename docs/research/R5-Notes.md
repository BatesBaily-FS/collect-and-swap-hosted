<br>

# Project & Portfolio

- **Research Notes - Milestone 5**
- **Baily Bates**
- **July 8th, 2025**

<br>

## Topic - Evaluating my previous work for possible improvements

For this first week back, my main focus will be on evaluating my previous work and looking for opportunities for improvement before getting into development. By the end of this week any major questions or concerns about development will be addressed. Before moving into development, I want to ensure there is a clear direction and avoid any future obstacles caused by a lack of planning. From there, I will move into stepping up the foundation for my application including essential routes, models, state management, and user authentication.

<br>

## Sub-Topic 1 - Selecting API for access to book data

After looking through my previous work, it has come to my attention that I never established an API that I will be using to access book data for names, authors, dates, etc. This is a essential component to my application so, it is important to find the ideal fit for API.

- Google Books API: allows developers accesses to interact with vast book data collected by Google Books. Key features include: Full-text search, book information retrieval, manage personal bookshelves.Can access public data using API key and with Auth0 2.0 can access user-specific data.

- Open Library API: this API is designed for retrieving book data including bibliographic information, book details such as authors, editions, subjects, and more. Open Library API offers RESTful endpoints for easy access to data in various formats. There is no API key required.

- Between my 2 options, Google Books API & Open Library API, I have decided to use Google Books API for my book data retrieval. Although, the setup was slightly more complicated, since I am already using Auth0 signing in with Google credentials it made the most sense to stick with Google.

<br>

## Sub-Topic 2 - Best approach for users transactions

Now that I am back working on this project it is important for me to establish the most ideal and effective for handling user transactions. I previously decided to have a points based system, but did not get into specifics. It is important that come to a decision before moving into production.

- By assigning a fixed flat rate token value to each book type (paperback = 1 token & hardcover = 2 tokens), the structure to the currency exchange is greatly simplified and leaves users with an easy to understand and manage process for handling book transactions.

- A simple token system is much faster to implement and test than a complex, variable-value or real-currency exchange. With this approach I can minimize delays from integrating payment gateways or handling disputes over book value. It also avoids monthly fees associated with payment gateways.

- This fixed-rate token value approach will ensure simplicity. Users can free empowered knowing they can accept or deny trade offers based on their own preferences, the prices (value) will be fixed but description could determine their decision. This approach is to keep the platform's core logic simple and easy to maintain. With possibility for future enhancements once the basic system proves stable.

<br>

## Sub-Topic 3 - Adding an additional page

At the end of the last phase, I had established a prototype with my desired layout and visuals. After going back, I believe my project navigation would benefit from having an additional "Book Club" tab rather than only access through the explore tab. I believe it is a component that holds great impact but with its current setup is easily overlooked. I must evaluate if it is worth the time and effort it will take to add an additional page.

- Adding a dedicated "Book Club" tab will increase the viability of this feature, making it easier for users to find and interact with. When important features are hidden under secondary navigation (like only inside the "explore" tab), they can easily be overlooked leading to lower engagement.

- Users expect primary features to be accessible from the main navigation. Since Book Clubs are a important aspect of my app's concept, it is important that it is displayed as such.

- A dedicated "Book Club" tab not only improves current usability but also provides as a scalable space for future enhancement such as book club events, book discussion chat rooms, and book recommendations. It signals to users that Book Clubs are a core part of the platform, encouraging deeper community interaction.

<br>

## Questions

**Question 1: Is my project ready to "Kick off"?**
Yes, I would say that my project is ready for a Kick Off after this first milestone. It wasn't until I went back and reevaluated my project that I identified key features and components that I had initially overlooked. If I hadn't taken the time this week to evaluate issues such as my Book data API, the specifics of desired currency exchange, and adjustments in UI they would have eventually would of become an obstacle in development. With these issues addressed, I feel far more confident with my production plan and foresee less challenges arising.

**Question 2: Create your own 30-second pitch.**
Looking for a smarter way to swap books and connect with fellow book lovers? My app, Collect & Swap, is a community-driven platform where you can list, trade, and collect books using a simple token system- no cash, just fair and transparent way to grow your library. Connect instantly with fellow readers through Book Clubs, find local book-related resources with our built-in locator tool, and never miss out on literary happenings with the events page. Whether you're looking to swap for your next read or join a lively community, Collect and Swap makes book sharing smarter and rewarding.

## Reference Links

Use this section to highlight your own independent research. Replace the example references below with your own links and recommended resources. For example...

**Resource 1: Google Books API**  
[Documentation](https://developers.google.com/books/docs/overview): By exploring Google Books API documentation I learned how to utilize their resources for retrieving book data.

**Resource 2: Navigation Nightmares: How Bad UX Drives Away Business**  
[20 Best Practices in Project Management](https://graticle.com/blog/navigation-nightmares-how-bad-ux-drives-away-business/): This article is a great resource for identifying UI mistakes to avoid and how to improve UX practices.

<br>

**Note:**

- It is acceptable to provide multiple links for a single sub-topic.
- Be sure to explain what resource(s) you found most helpful for the current milestone.
